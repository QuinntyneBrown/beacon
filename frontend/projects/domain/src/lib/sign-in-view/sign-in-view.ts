import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AuthCardComponent,
  AuthShellComponent,
  ButtonComponent,
  CheckboxComponent,
  DividerTextComponent,
  InlineLinkComponent,
  OutlinedTextFieldComponent
} from 'components';
import { AuthHeroFeature, ExternalAuthProvider, SignInCredentials } from '../models/domain-ui-models';
import { AuthHeroPanelComponent } from '../auth-hero-panel/auth-hero-panel';
import { BrandMarkComponent } from '../brand-mark/brand-mark';
import { ExternalAuthOptionsComponent } from '../external-auth-options/external-auth-options';

@Component({
  selector: 'lib-sign-in-view',
  imports: [
    AuthCardComponent,
    AuthHeroPanelComponent,
    AuthShellComponent,
    BrandMarkComponent,
    ButtonComponent,
    CheckboxComponent,
    DividerTextComponent,
    ExternalAuthOptionsComponent,
    InlineLinkComponent,
    OutlinedTextFieldComponent
  ],
  templateUrl: './sign-in-view.html',
  styleUrl: './sign-in-view.scss'
})
export class SignInViewComponent {
  readonly returnUrl = input('');
  readonly initialEmail = input('');
  readonly authProviders = input<readonly ExternalAuthProvider[]>([]);
  readonly heroFeatures = input<readonly AuthHeroFeature[]>([]);
  readonly loading = input(false);
  readonly errorMessage = input('');
  readonly submittingProviderId = input<string | null>(null);
  readonly signInSubmitted = output<SignInCredentials>();
  readonly forgotPasswordSelected = output<void>();
  readonly createAccountSelected = output<void>();
  readonly externalProviderSelected = output<string>();

  readonly signInForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  constructor() {
    effect(() => {
      const email = this.initialEmail();

      if (email && !this.signInForm.controls.email.dirty) {
        this.signInForm.patchValue({ email }, { emitEvent: false });
      }
    });
  }

  updateField(field: 'email' | 'password', value: string): void {
    this.signInForm.controls[field].setValue(value);
    this.signInForm.controls[field].markAsDirty();
  }

  updateRememberMe(value: boolean): void {
    this.signInForm.controls.rememberMe.setValue(value);
    this.signInForm.controls.rememberMe.markAsDirty();
  }

  submit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.signInSubmitted.emit(this.signInForm.getRawValue());
  }

  emailErrors(): readonly string[] {
    const control = this.signInForm.controls.email;

    if (!control.touched && !control.dirty) {
      return [];
    }

    if (control.hasError('required')) {
      return ['Email is required.'];
    }

    if (control.hasError('email')) {
      return ['Enter a valid email address.'];
    }

    return [];
  }

  passwordErrors(): readonly string[] {
    const control = this.signInForm.controls.password;
    return (control.touched || control.dirty) && control.hasError('required') ? ['Password is required.'] : [];
  }
}
