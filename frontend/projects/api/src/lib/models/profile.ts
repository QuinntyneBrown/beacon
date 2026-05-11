export interface Profile {
  readonly userId: string;
  readonly email: string;
  readonly userName: string;
  readonly displayName: string;
  readonly roles: readonly string[];
}
