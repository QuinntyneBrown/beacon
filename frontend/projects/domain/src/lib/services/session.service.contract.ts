import { InjectionToken, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthMode, AuthenticatedSession, PasswordResetTicket, Profile, RegisterRequest, SignInRequest, UpdateProfileRequest } from 'api';

export interface ISessionService {
  readonly authMode: AuthMode;
  readonly session: Signal<AuthenticatedSession | null>;
  readonly isAuthenticated: Signal<boolean>;
  signIn(request: SignInRequest): Observable<void>;
  register(request: RegisterRequest): Observable<void>;
  requestPasswordReset(email: string): Observable<PasswordResetTicket>;
  resetPassword(resetToken: string, password: string): Observable<void>;
  signOut(): Observable<void>;
  updateProfile(request: UpdateProfileRequest): Observable<Profile>;
  deleteAccount(): Observable<void>;
  beginOidcSignIn(): Promise<void>;
  completeOidcSignIn(search: string): Promise<void>;
}

export const SESSION_SERVICE = new InjectionToken<ISessionService>('SESSION_SERVICE');
