import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

/** Visitantes podem agendar; uma credencial enviada deve ser validada integralmente. */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.cookies?.access_token && !req.headers.authorization) return true;
    return super.canActivate(context);
  }
}
