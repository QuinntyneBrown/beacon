import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { API_CONFIGURATION, AuthenticatedSession, IAuthService, IProfileService, PasswordResetTicket, Profile, RegisterRequest, SignInRequest, UpdateProfileRequest, AUTH_SERVICE, PROFILE_SERVICE } from 'api';
import { ISessionService } from './session.service.contract';

@Injectable()
export class SessionService implements ISessionService {
  readonly authMode = inject(API_CONFIGURATION).authMode;
  readonly session = signal<AuthenticatedSession | null>(this.readStoredSession());
  readonly isAuthenticated = computed(() => this.session() !== null);

  private readonly authService = inject(AUTH_SERVICE);
  private readonly profileService = inject(PROFILE_SERVICE);
  private readonly configuration = inject(API_CONFIGURATION);

  signIn(request: SignInRequest): Observable<void> {
    return this.authService.signIn(request).pipe(
      tap((session) => this.storeSession(session)),
      map(() => void 0)
    );
  }

  register(request: RegisterRequest): Observable<void> {
    return this.authService.register(request).pipe(
      tap((session) => this.storeSession(session)),
      map(() => void 0)
    );
  }

  requestPasswordReset(email: string): Observable<PasswordResetTicket> {
    return this.authService.requestPasswordReset(email);
  }

  resetPassword(resetToken: string, password: string): Observable<void> {
    return this.authService.resetPassword(resetToken, password);
  }

  signOut(): Observable<void> {
    const activeSession = this.session();
    if (!activeSession) {
      return of(void 0);
    }

    if (this.authMode === 'oidc') {
      this.clearSession();
      if (this.configuration.oidc.endSessionEndpoint) {
        globalThis.location.assign(this.configuration.oidc.endSessionEndpoint);
      }
      return of(void 0);
    }

    return this.authService.signOut(activeSession.refreshToken).pipe(
      catchError(() => of(void 0)),
      tap(() => this.clearSession()),
      map(() => void 0)
    );
  }

  updateProfile(request: UpdateProfileRequest): Observable<Profile> {
    return this.profileService.updateProfile(request).pipe(
      tap((profile) => {
        const activeSession = this.session();
        if (!activeSession) {
          return;
        }

        this.storeSession({
          ...activeSession,
          displayName: profile.displayName,
          roles: profile.roles,
          email: profile.email,
          userId: profile.userId
        });
      })
    );
  }

  deleteAccount(): Observable<void> {
    return this.profileService.deleteAccount().pipe(
      tap(() => this.clearSession()),
      map(() => void 0)
    );
  }

  async beginOidcSignIn(): Promise<void> {
    const verifier = this.createVerifier();
    const challenge = await this.createCodeChallenge(verifier);
    sessionStorage.setItem('beacon:oidc-verifier', verifier);

    const authorizeUrl = new URL(this.configuration.oidc.authorizationEndpoint);
    authorizeUrl.searchParams.set('response_type', 'code');
    authorizeUrl.searchParams.set('client_id', this.configuration.oidc.clientId);
    authorizeUrl.searchParams.set('redirect_uri', this.configuration.oidc.redirectUri);
    authorizeUrl.searchParams.set('scope', this.configuration.oidc.scope);
    authorizeUrl.searchParams.set('code_challenge', challenge);
    authorizeUrl.searchParams.set('code_challenge_method', 'S256');
    globalThis.location.assign(authorizeUrl.toString());
  }

  async completeOidcSignIn(search: string): Promise<void> {
    const parameters = new URLSearchParams(search);
    const code = parameters.get('code');
    const verifier = sessionStorage.getItem('beacon:oidc-verifier');
    if (!code || !verifier) {
      throw new Error('Missing OIDC authorization data.');
    }

    const response = await fetch(this.configuration.oidc.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.configuration.oidc.clientId,
        code,
        redirect_uri: this.configuration.oidc.redirectUri,
        code_verifier: verifier
      }).toString()
    });

    if (!response.ok) {
      throw new Error('OIDC token exchange failed.');
    }

    const tokenResponse = (await response.json()) as { access_token: string };
    const profile = await this.fetchProfile(tokenResponse.access_token);
    this.storeSession({
      userId: profile.userId,
      email: profile.email,
      displayName: profile.displayName,
      roles: profile.roles,
      accessToken: tokenResponse.access_token,
      refreshToken: '',
      expiresAtUtc: this.readExpiry(tokenResponse.access_token)
    });
    sessionStorage.removeItem('beacon:oidc-verifier');
  }

  private clearSession(): void {
    this.session.set(null);
    localStorage.removeItem('beacon:session');
  }

  private createVerifier(): string {
    const randomValues = globalThis.crypto.getRandomValues(new Uint8Array(32));
    return Array.from(randomValues, (value) => value.toString(16).padStart(2, '0')).join('');
  }

  private async createCodeChallenge(verifier: string): Promise<string> {
    const encodedVerifier = new TextEncoder().encode(verifier);
    const hashedVerifier = await globalThis.crypto.subtle.digest('SHA-256', encodedVerifier);
    return btoa(String.fromCharCode(...new Uint8Array(hashedVerifier)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private async fetchProfile(accessToken: string): Promise<Profile> {
    const response = await fetch(`${this.configuration.baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) {
      throw new Error('Unable to retrieve the signed-in profile.');
    }

    return (await response.json()) as Profile;
  }

  private readExpiry(accessToken: string): string {
    const payloadSegment = accessToken.split('.')[1];
    if (!payloadSegment) {
      return new Date(Date.now() + 60 * 60 * 1000).toISOString();
    }

    const payload = JSON.parse(atob(payloadSegment.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    return payload.exp ? new Date(payload.exp * 1000).toISOString() : new Date(Date.now() + 60 * 60 * 1000).toISOString();
  }

  private readStoredSession(): AuthenticatedSession | null {
    const rawSession = localStorage.getItem('beacon:session');
    if (!rawSession) {
      return null;
    }

    const storedSession = JSON.parse(rawSession) as AuthenticatedSession;
    if (new Date(storedSession.expiresAtUtc).getTime() <= Date.now()) {
      localStorage.removeItem('beacon:session');
      return null;
    }

    return storedSession;
  }

  private storeSession(session: AuthenticatedSession): void {
    this.session.set(session);
    localStorage.setItem('beacon:session', JSON.stringify(session));
  }
}
