import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret || secret.length < 32) {
      throw new Error(
        'Configure JWT_SECRET com pelo menos 32 caracteres aleatórios.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            if (!req || !req.headers) return null;
            const cookie = req.headers.cookie;
            if (!cookie) return null;

            const match = cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
            return match ? decodeURIComponent(match[1]) : null;
          } catch {
            return null;
          }
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          if (req?.body && typeof req.body.verificationToken === 'string') {
            return req.body.verificationToken;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    ver: number;
  }) {
    // Verifica a versão de autenticação para invalidar tokens após logout ou mudança de senha
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, authVersion: true, emailVerified: true },
    });

    if (!user || user.authVersion !== payload.ver) {
      return null;
    }

    return { id: payload.sub, email: payload.email, ver: payload.ver };
  }
}
