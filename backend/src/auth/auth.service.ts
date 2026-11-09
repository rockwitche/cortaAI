import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from 'crypto';
import type { User } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmailService } from './email.service.js';
import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ResendCodeDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  // ─── Helpers ────────────────────────────────────────────────────────────────

  private normalizeEmail(email: string) {
    if (typeof email !== 'string' || email.length > 254)
      throw new BadRequestException('E-mail inválido.');
    return email.trim().toLowerCase();
  }

  async checkEmailExists(email: string) {
    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length === 0 ||
      email.length > 254
    ) {
      return { exists: false, valid: false, reason: 'E-mail inválido.' };
    }
    const normalized = email.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    if (!valid)
      return { exists: false, valid: false, reason: 'E-mail inválido.' };

    const user = await this.prisma.user.findUnique({
      where: { email: normalized },
    });
    return {
      exists: !!user?.emailVerified,
      pendingVerification: !!user && !user.emailVerified,
      valid: true,
      reason: user?.emailVerified ? 'Este e-mail já está cadastrado.' : null,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        tipo: true,
        plano: true,
        avatar: true,
        emailVerified: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    return user;
  }

  private validatePassword(password: string) {
    if (
      typeof password !== 'string' ||
      password.length < 8 ||
      Buffer.byteLength(password, 'utf8') > 72
    )
      throw new BadRequestException(
        'Use pelo menos 8 caracteres e no máximo 72 bytes na senha.',
      );
  }

  private secret() {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret || secret.length < 32)
      throw new ServiceUnavailableException('Autenticação indisponível.');
    return secret;
  }

  private otpHash(email: string, nonce: string, code: string) {
    return createHmac('sha256', this.secret())
      .update('verify:' + email + ':' + nonce + ':' + code)
      .digest('hex');
  }

  private generateJwt(user: User, rememberMe = false) {
    const payload = {
      sub: user.id,
      email: user.email,
      ver: user.authVersion,
      purpose: 'access',
    };
    return this.jwtService.sign(payload, {
      expiresIn: rememberMe ? '30d' : '1d',
    });
  }

  private verificationToken(user: User, rememberMe = false) {
    return this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        ver: user.authVersion,
        purpose: 'email-verification',
        rememberMe,
      },
      { expiresIn: '30m' },
    );
  }

  private async pendingVerification(user: User, rememberMe = false) {
    let verificationEmailSent = true;
    try {
      await this.sendChallenge(user);
    } catch (error) {
      if (!(error instanceof ServiceUnavailableException)) throw error;
      verificationEmailSent = false;
    }
    return {
      requiresVerification: true,
      email: user.email,
      verificationToken: this.verificationToken(user, rememberMe),
      verificationEmailSent,
      message: verificationEmailSent
        ? 'Enviamos um código para confirmar seu e-mail.'
        : 'Sua conta aguarda confirmação, mas não conseguimos enviar o e-mail. Use Reenviar código para tentar novamente.',
    };
  }

  private async verificationUser(token: string, email?: string) {
    let payload: {
      sub: string;
      email: string;
      ver: number;
      purpose: string;
      rememberMe?: boolean;
    };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException(
        'Sua confirmação expirou. Faça login para receber outro código.',
      );
    }
    if (
      payload.purpose !== 'email-verification' ||
      typeof payload.sub !== 'string'
    ) {
      throw new UnauthorizedException('Token de confirmação inválido.');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (
      !user ||
      user.emailVerified ||
      user.authVersion !== payload.ver ||
      user.email !== payload.email ||
      (email && this.normalizeEmail(email) !== user.email)
    ) {
      throw new UnauthorizedException(
        'Confirmação inválida. Faça login novamente.',
      );
    }
    return { user, rememberMe: payload.rememberMe === true };
  }

  // ─── Registro ───────────────────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    const email = this.normalizeEmail(dto.email);
    this.validatePassword(dto.senha);

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      if (existing.emailVerified) throw new ConflictException('E-mail já cadastrado.');
      if (!existing.senha || !(await bcrypt.compare(dto.senha, existing.senha))) {
        throw new UnauthorizedException('Este e-mail aguarda confirmação. Use a senha informada no primeiro cadastro para continuar.');
      }
      return this.pendingVerification(existing, dto.rememberMe);
    }

    const hashedPassword = await bcrypt.hash(dto.senha, 12);

    const user = await this.prisma.user.create({
      data: {
        nome: dto.nome,
        email,
        senha: hashedPassword,
        telefone: dto.telefone,
        tipo: dto.tipo ?? 'CLIENTE',
        emailVerified: false,
      },
    });

    return this.pendingVerification(user, dto.rememberMe);
  }

  // ─── Login ──────────────────────────────────────────────────────────────────

  async login(dto: LoginDto) {
    const email = this.normalizeEmail(dto.email);

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.senha) {
      // Timing safe: compara hash mesmo sem usuário
      await bcrypt.compare(
        dto.senha,
        '$2b$12$placeholder.salt.for.timing.safety',
      );
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const passwordMatch = await bcrypt.compare(dto.senha, user.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    if (!user.emailVerified) {
      return this.pendingVerification(user, dto.rememberMe);
    }

    const token = this.generateJwt(user, dto.rememberMe);
    const userPayload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      tipo: user.tipo,
      plano: user.plano,
      avatar: user.avatar,
    };
    return {
      access_token: token,
      user: userPayload,
      rememberMe: dto.rememberMe,
    };
  }

  // ─── Verificação de e-mail ──────────────────────────────────────────────────

  private async sendChallenge(user: User) {
    // Reutiliza o desafio recente no login, evitando invalidar um código recém-enviado.
    if (
      user.verificationExpires &&
      user.verificationExpires.getTime() > Date.now() + 14 * 60_000
    ) {
      return {
        message:
          'Um código já foi enviado. Aguarde um minuto antes de reenviar.',
      };
    }
    const code = String(randomInt(100000, 1000000));
    const nonce = randomBytes(24).toString('hex');

    const changed = await this.prisma.user.updateMany({
      where: {
        id: user.id,
        emailVerified: false,
        authVersion: user.authVersion,
        verificationCode: user.verificationCode,
        verificationExpires: user.verificationExpires,
      },
      data: {
        verificationCode: nonce + ':' + this.otpHash(user.email, nonce, code),
        verificationAttempts: 0,
        verificationExpires: new Date(Date.now() + 15 * 60_000),
      },
    });

    if (!changed.count)
      throw new BadRequestException('Faça login para continuar.');

    const sent = await this.emailService.sendVerificationCode(
      user.email,
      code,
      user.nome,
    );

    if (!sent) {
      await this.prisma.user.updateMany({
        where: {
          id: user.id,
          verificationCode: nonce + ':' + this.otpHash(user.email, nonce, code),
        },
        data: { verificationCode: null, verificationExpires: null },
      });
      throw new ServiceUnavailableException(
        'Não foi possível enviar o código. Tente novamente em instantes.',
      );
    }

    return { message: 'Código enviado para ' + user.email };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const { user, rememberMe } = await this.verificationUser(
      dto.verificationToken,
      dto.email,
    );

    if (
      !user.verificationCode ||
      !user.verificationExpires ||
      user.verificationExpires < new Date()
    ) {
      throw new BadRequestException('Código expirado. Solicite um novo.');
    }

    const MAX_ATTEMPTS = 5;
    if (user.verificationAttempts >= MAX_ATTEMPTS) {
      throw new BadRequestException(
        'Muitas tentativas. Solicite um novo código.',
      );
    }

    // Reserva uma tentativa atomicamente, inclusive quando chegam pedidos simultâneos.
    const attempt = await this.prisma.user.updateMany({
      where: {
        id: user.id,
        emailVerified: false,
        authVersion: user.authVersion,
        verificationCode: user.verificationCode,
        verificationExpires: { gt: new Date() },
        verificationAttempts: { lt: MAX_ATTEMPTS },
      },
      data: { verificationAttempts: { increment: 1 } },
    });
    if (!attempt.count)
      throw new BadRequestException(
        'Código expirado ou limite de tentativas atingido. Solicite um novo.',
      );

    const [nonce, storedHash] = user.verificationCode.split(':');
    const expectedHash = this.otpHash(user.email, nonce, dto.code);
    const isValid =
      storedHash?.length === expectedHash.length &&
      (() => {
        try {
          return timingSafeEqual(
            Buffer.from(storedHash, 'hex'),
            Buffer.from(expectedHash, 'hex'),
          );
        } catch {
          return false;
        }
      })();

    if (!isValid) {
      throw new BadRequestException('Código incorreto.');
    }

    const verified = await this.prisma.user.updateMany({
      where: {
        id: user.id,
        emailVerified: false,
        authVersion: user.authVersion,
        verificationCode: user.verificationCode,
        verificationExpires: { gt: new Date() },
      },
      data: {
        emailVerified: true,
        verificationCode: null,
        verificationExpires: null,
        verificationAttempts: 0,
        authVersion: { increment: 1 },
      },
    });
    if (!verified.count)
      throw new BadRequestException(
        'Código já utilizado ou substituído. Faça login novamente.',
      );
    const updatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!updatedUser)
      throw new UnauthorizedException('Usuário não encontrado.');

    const token = this.generateJwt(updatedUser, rememberMe);
    const userPayload = {
      id: updatedUser.id,
      nome: updatedUser.nome,
      email: updatedUser.email,
      telefone: updatedUser.telefone,
      tipo: updatedUser.tipo,
      plano: updatedUser.plano,
      avatar: updatedUser.avatar,
    };
    return {
      access_token: token,
      user: userPayload,
      rememberMe,
      message: 'E-mail verificado com sucesso!',
    };
  }

  async resendCode(dto: ResendCodeDto) {
    const { user, rememberMe } = await this.verificationUser(
      dto.verificationToken,
      dto.email,
    );
    const result = await this.sendChallenge(user);
    return {
      ...result,
      verificationToken: this.verificationToken(user, rememberMe),
    };
  }

  // ─── Forgot / Reset Password ────────────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Sempre retorna sucesso para não enumerar usuários
    const genericResponse = {
      message: 'Se o e-mail estiver cadastrado, você receberá um link.',
    };

    if (!user || !user.emailVerified) return genericResponse;

    const rawToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(rawToken).digest('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: new Date(Date.now() + 60 * 60_000), // 1 hora
      },
    });

    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:4200';
    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

    await this.emailService.sendPasswordReset(user.email, resetUrl, user.nome);

    return genericResponse;
  }

  async resetPassword(dto: ResetPasswordDto) {
    this.validatePassword(dto.senha);

    const hashedToken = createHash('sha256').update(dto.token).digest('hex');

    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Token inválido ou expirado.');
    }

    const hashedPassword = await bcrypt.hash(dto.senha, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        authVersion: { increment: 1 }, // Invalida todos os tokens JWT existentes
      },
    });

    return { message: 'Senha redefinida com sucesso. Faça login novamente.' };
  }

  // ─── Google OAuth ────────────────────────────────────────────────────────────

  async handleGoogleLogin(
    googleUser: {
      googleId: string;
      email: string;
      nome: string;
      avatar?: string;
    },
    tipo: 'CLIENTE' | 'BARBEIRO' = 'CLIENTE',
    rememberMe = false,
  ) {
    const email = this.normalizeEmail(googleUser.email);

    let user = await this.prisma.user.findUnique({
      where: { googleId: googleUser.googleId },
    });
    user ??= await this.prisma.user.findUnique({ where: { email } });

    if (user?.googleId && user.googleId !== googleUser.googleId) {
      throw new UnauthorizedException(
        'Esta conta está vinculada a outro perfil Google.',
      );
    }

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          nome: googleUser.nome,
          email,
          googleId: googleUser.googleId,
          avatar: googleUser.avatar,
          emailVerified: true,
          tipo,
        },
      });
    } else if (!user.googleId) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleUser.googleId,
          emailVerified: true,
          avatar: user.avatar ?? googleUser.avatar,
          // Não preserve uma senha criada por terceiros antes da prova de posse do e-mail.
          ...(!user.emailVerified ? { senha: null } : {}),
          verificationCode: null,
          verificationExpires: null,
          authVersion: { increment: 1 },
        },
      });
    }

    return { access_token: this.generateJwt(user, rememberMe) };
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  async logout(userId: string) {
    // Incrementa authVersion para invalidar todos os JWTs existentes
    await this.prisma.user.update({
      where: { id: userId },
      data: { authVersion: { increment: 1 } },
    });
    return { message: 'Logout realizado com sucesso.' };
  }
}
