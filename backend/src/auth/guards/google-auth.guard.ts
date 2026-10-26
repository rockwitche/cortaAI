import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    if (req.path.endsWith('/callback')) {
      const expected = (req as any).cookies?.oauth_state;
      const actual = req.query.state as string | undefined;

      res.clearCookie('oauth_state', {
        path: '/api/auth/google',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      if (
        typeof expected !== 'string' ||
        typeof actual !== 'string' ||
        expected.length !== actual.length ||
        !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))
      ) {
        throw new UnauthorizedException('Estado OAuth inválido (CSRF).');
      }

      return super.canActivate(context) as boolean | Promise<boolean>;
    }

    // Inicia o fluxo OAuth – gera estado CSRF e salva em cookie
    const state = randomBytes(24).toString('hex');
    res.cookie('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000, // 10 min
      path: '/api/auth/google',
    });

    // Passa o state para o passport
    (this as any).state = state;
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('Falha na autenticação Google.');
    }
    return user;
  }
}
