import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_CONFIGURATION } from '../configuration/api-configuration';
import { AuthenticatedSession } from '../models/authenticated-session';
import { PasswordResetTicket } from '../models/password-reset-ticket';
import { RegisterRequest } from '../models/register-request';
import { SignInRequest } from '../models/sign-in-request';
import { IAuthService } from './auth.service.contract';

@Injectable()
export class AuthService implements IAuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);

  signIn(request: SignInRequest): Observable<AuthenticatedSession> {
    return this.httpClient.post<AuthenticatedSession>(`${this.configuration.baseUrl}/api/auth/sign-in`, request);
  }

  register(request: RegisterRequest): Observable<AuthenticatedSession> {
    return this.httpClient.post<AuthenticatedSession>(`${this.configuration.baseUrl}/api/auth/register`, request);
  }

  refresh(refreshToken: string): Observable<AuthenticatedSession> {
    return this.httpClient.post<AuthenticatedSession>(`${this.configuration.baseUrl}/api/auth/refresh`, { refreshToken });
  }

  signOut(refreshToken: string): Observable<void> {
    return this.httpClient.post<void>(`${this.configuration.baseUrl}/api/auth/sign-out`, { refreshToken });
  }

  requestPasswordReset(email: string): Observable<PasswordResetTicket> {
    return this.httpClient.post<PasswordResetTicket>(`${this.configuration.baseUrl}/api/auth/request-password-reset`, { email });
  }

  resetPassword(resetToken: string, password: string): Observable<void> {
    return this.httpClient
      .post<void>(`${this.configuration.baseUrl}/api/auth/reset-password`, { resetToken, password })
      .pipe(map(() => void 0));
  }
}
