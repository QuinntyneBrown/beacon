import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignInCredentials } from '../models/domain-ui-models';
import { SESSION_SERVICE } from '../services/session.service.contract';

@Component({
  selector: 'lib-sign-in-form',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.scss'
})
export class SignInFormComponent {
  readonly authenticated = output<void>();
  readonly credentialsSubmitted = output<SignInCredentials>();
  readonly fieldChanged = output<{ readonly field: 'email' | 'password'; readonly value: string }>();
  readonly rememberMeChanged = output<boolean>();
  readonly authMode = inject(SESSION_SERVICE).authMode;

  readonly mode = signal<'sign-in' | 'register' | 'reset'>('sign-in');
  readonly isBusy = signal(false);
  readonly errorMessage = signal('');
  readonly helperMessage = signal('');

  readonly signInForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  readonly registerForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required]],
    displayName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(12)]]
  });
  readonly resetForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    resetToken: ['']
  });

  private readonly sessionService = inject(SESSION_SERVICE);

  signIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isBusy.set(true);
    this.errorMessage.set('');
    const credentials = this.signInForm.getRawValue();
    this.credentialsSubmitted.emit(credentials);
    this.sessionService.signIn({ email: credentials.email, password: credentials.password }).subscribe({
      next: () => {
        this.isBusy.set(false);
        this.authenticated.emit();
      },
      error: (error) => {
        this.isBusy.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to sign in.');
      }
    });
  }

  emitFieldChanged(field: 'email' | 'password'): void {
    this.fieldChanged.emit({ field, value: this.signInForm.controls[field].value });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isBusy.set(true);
    this.errorMessage.set('');
    this.sessionService.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        this.isBusy.set(false);
        this.authenticated.emit();
      },
      error: (error) => {
        this.isBusy.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to register.');
      }
    });
  }

  requestReset(): void {
    const emailControl = this.resetForm.controls.email;
    if (emailControl.invalid) {
      emailControl.markAsTouched();
      return;
    }

    this.isBusy.set(true);
    this.helperMessage.set('');
    this.errorMessage.set('');
    this.sessionService.requestPasswordReset(emailControl.getRawValue()).subscribe({
      next: (ticket) => {
        this.isBusy.set(false);
        this.resetForm.patchValue({ resetToken: ticket.resetToken ?? '' });
        this.helperMessage.set(ticket.resetToken ? `Development reset token: ${ticket.resetToken}` : 'If the email exists, a reset token has been issued.');
      },
      error: (error) => {
        this.isBusy.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to request a reset.');
      }
    });
  }

  resetPassword(): void {
    if (this.resetForm.invalid || !this.resetForm.controls.resetToken.value) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isBusy.set(true);
    this.errorMessage.set('');
    const { resetToken, password } = this.resetForm.getRawValue();
    this.sessionService.resetPassword(resetToken, password).subscribe({
      next: () => {
        this.isBusy.set(false);
        this.helperMessage.set('Password updated. Sign in with the new password.');
        this.mode.set('sign-in');
      },
      error: (error) => {
        this.isBusy.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to reset the password.');
      }
    });
  }

  signInWithOidc(): void {
    void this.sessionService.beginOidcSignIn();
  }
}
