import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BarberAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const req = context.switchToHttp().getRequest();
    if (req.user?.tipo !== 'BARBEIRO') {
      throw new ForbiddenException('Esta área é exclusiva para contas de barbeiro.');
    }
    return true;
  }
}
