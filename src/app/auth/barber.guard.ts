import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const barberGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = await auth.restoreSession(true);
  if (!user) return router.createUrlTree(['/login']);
  return user.tipo === 'BARBEIRO' ? true : router.createUrlTree(['/barbearias']);
};
