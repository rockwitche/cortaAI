import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ResendCodeDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto.js';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ─── Cookie helpers ──────────────────────────────────────────────────────────

  private getCookieOptions(rememberMe = false) {
    const isProduction = process.env.NODE_ENV === 'production';
    const base = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      path: '/',
    };
    return rememberMe
      ? { ...base, maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 dias
      : base;
  }

  private getClearCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
      path: '/',
      secure: isProduction,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
    };
  }

  // ─── Verificar sessão ────────────────────────────────────────────────────────

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  check(@Req() req: Request) {
    return { authenticated: true, user: req.user };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req: Request) {
    const user = req.user as any;
    return this.authService.getMe(user.id);
  }

  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    return this.authService.checkEmailExists(email);
  }

  // ─── Registro ────────────────────────────────────────────────────────────────

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // ─── Login ───────────────────────────────────────────────────────────────────

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    if ('requiresVerification' in result) {
      return result;
    }

    if (result.access_token) {
      res.cookie(
        'access_token',
        result.access_token,
        this.getCookieOptions(result.rememberMe),
      );
    }

    return { message: 'Login realizado com sucesso.' };
  }

  // ─── Verificação de e-mail ───────────────────────────────────────────────────

  @Post('verify-email')
  @UseGuards(AuthGuard('jwt'))
  async verifyEmail(
    @Req() req: Request,
    @Body() dto: VerifyEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as any;
    const result = await this.authService.verifyEmail(user.id, dto);

    if (result.access_token) {
      res.cookie('access_token', result.access_token, this.getCookieOptions());
    }

    return { message: result.message };
  }

  // ─── Reenviar código ─────────────────────────────────────────────────────────

  @Post('resend-code')
  async resendCode(@Body() dto: ResendCodeDto) {
    return this.authService.resendCode(dto);
  }

  // ─── Esqueci a senha ─────────────────────────────────────────────────────────

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // ─── Redefinir senha ─────────────────────────────────────────────────────────

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as any;
    await this.authService.logout(user.id);
    res.clearCookie('access_token', this.getClearCookieOptions());
    return { message: 'Logout realizado com sucesso.' };
  }

  // ─── Google OAuth ────────────────────────────────────────────────────────────

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Redireciona para o Google (tratado pelo guard)
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const googleUser = req.user as any;
    const result = await this.authService.handleGoogleLogin(googleUser);

    if (result.access_token) {
      res.cookie('access_token', result.access_token, this.getCookieOptions());
    }

    const frontendUrl =
      process.env.FRONTEND_URL ?? 'http://localhost:4200';
    res.redirect(`${frontendUrl}/dashboard`);
  }
}
