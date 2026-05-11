import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatedSession } from '../models/authenticated-session';
import { PasswordResetTicket } from '../models/password-reset-ticket';
import { RegisterRequest } from '../models/register-request';
import { SignInRequest } from '../models/sign-in-request';

export interface IAuthService {
  signIn(request: SignInRequest): Observable<AuthenticatedSession>;
  register(request: RegisterRequest): Observable<AuthenticatedSession>;
  refresh(refreshToken: string): Observable<AuthenticatedSession>;
  signOut(refreshToken: string): Observable<void>;
  requestPasswordReset(email: string): Observable<PasswordResetTicket>;
  resetPassword(resetToken: string, password: string): Observable<void>;
}

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
