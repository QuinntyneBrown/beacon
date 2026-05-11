export interface AuthenticatedSession {
  readonly userId: string;
  readonly email: string;
  readonly displayName: string;
  readonly roles: readonly string[];
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAtUtc: string;
}
