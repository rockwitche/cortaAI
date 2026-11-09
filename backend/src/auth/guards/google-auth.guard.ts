import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { randomBytes, timingSafeEqual } from 'crypto';

export interface GoogleAuthRequest extends Request {
  googleAuth?: { tipo: 'CLIENTE' | 'BARBEIRO'; rememberMe: boolean };
  googleState?: string;
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly jwt: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<GoogleAuthRequest>();
    const res = context.switchToHttp().getResponse<Response>();
    const callback = req.path.endsWith('/callback');
    const cookieOptions = {
      path: '/api/auth/google',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: true,
    };

    try {
      if (callback) {
        const expected: unknown = req.cookies?.oauth_state;
        const actual = req.query.state;
        res.clearCookie('oauth_state', cookieOptions);
        if (
          typeof expected !== 'string' ||
          typeof actual !== 'string' ||
          Buffer.byteLength(expected) !== Buffer.byteLength(actual) ||
          !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))
        ) {
          throw new UnauthorizedException('Estado OAuth inválido.');
        }
        const payload = this.jwt.verify(actual);
        if (
          payload.purpose !== 'google-oauth' ||
          !['CLIENTE', 'BARBEIRO'].includes(payload.tipo)
        ) {
          throw new UnauthorizedException('Estado OAuth inválido.');
        }
        req.googleAuth = {
          tipo: payload.tipo,
          rememberMe: payload.rememberMe === true,
        };
      } else {
        const tipo = req.query.tipo ?? 'CLIENTE';
        if (tipo !== 'CLIENTE' && tipo !== 'BARBEIRO') {
          throw new UnauthorizedException('Tipo de conta inválido.');
        }
        // Estado por requisição: duas pessoas podem iniciar o fluxo simultaneamente.
        req.googleState = this.jwt.sign(
          {
            purpose: 'google-oauth',
            tipo,
            rememberMe: req.query.rememberMe === 'true',
            nonce: randomBytes(24).toString('hex'),
          },
          { expiresIn: '10m' },
        );
        res.cookie('oauth_state', req.googleState, {
          ...cookieOptions,
          maxAge: 10 * 60_000,
        });
      }
      return (await super.canActivate(context)) as boolean;
    } catch {
      const frontend = (
        process.env.FRONTEND_URL ?? 'http://localhost:4200'
      ).replace(/\/$/, '');
      const error =
        callback && req.query.error === 'access_denied'
          ? 'cancelled'
          : 'failed';
      res.redirect(`${frontend}/login?oauthError=${error}`);
      return false;
    }
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<GoogleAuthRequest>();
    return {
      session: false,
      ...(req.googleState ? { state: req.googleState } : {}),
    };
  }
}
