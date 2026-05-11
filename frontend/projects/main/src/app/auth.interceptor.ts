import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AUTH_SERVICE } from 'api';
import { SESSION_SERVICE } from 'domain';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const sessionService = inject(SESSION_SERVICE);
  const authService = inject(AUTH_SERVICE);
  const accessToken = sessionService.session()?.accessToken;
  const authorized = accessToken ? withBearer(request, accessToken) : request;

  return next(authorized).pipe(
    catchError((error) => {
      const refreshToken = sessionService.session()?.refreshToken;
      const isAuthEndpoint = request.url.includes('/api/auth/');
      if (error?.status !== 401 || !refreshToken || isAuthEndpoint) {
        return throwError(() => error);
      }

      return authService.refresh(refreshToken).pipe(
        switchMap((renewed) => {
          sessionService.adoptSession(renewed);
          return next(withBearer(request, renewed.accessToken));
        }),
        catchError((refreshError) => {
          sessionService.signOut().subscribe();
          return throwError(() => refreshError);
        })
      );
    })
  );
};

function withBearer<T>(request: HttpRequest<T>, token: string): HttpRequest<T> {
  return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

