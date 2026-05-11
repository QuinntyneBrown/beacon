import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SESSION_SERVICE } from 'domain';

export const unauthGuard: CanActivateFn = () => {
  const sessionService = inject(SESSION_SERVICE);
  const router = inject(Router);
  if (!sessionService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/boards']);
};
