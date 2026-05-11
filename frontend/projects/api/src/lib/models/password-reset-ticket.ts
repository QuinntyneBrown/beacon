export interface PasswordResetTicket {
  readonly email: string;
  readonly resetToken: string | null;
}
