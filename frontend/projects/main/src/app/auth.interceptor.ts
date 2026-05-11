import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SESSION_SERVICE } from 'domain';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = inject(SESSION_SERVICE).session()?.accessToken;
  if (!accessToken) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  );
};
