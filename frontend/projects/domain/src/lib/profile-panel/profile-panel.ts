import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PROFILE_SERVICE } from 'api';
import { SESSION_SERVICE } from '../services/session.service.contract';

@Component({
  selector: 'lib-profile-panel',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './profile-panel.html',
  styleUrl: './profile-panel.scss'
})
export class ProfilePanelComponent {
  readonly session = inject(SESSION_SERVICE).session;
  readonly helperMessage = signal('');
  readonly errorMessage = signal('');

  readonly profileForm = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required]],
    displayName: ['', [Validators.required]]
  });

  private readonly sessionService = inject(SESSION_SERVICE);
  private readonly profileService = inject(PROFILE_SERVICE);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      const activeSession = this.session();
      if (!activeSession) {
        return;
      }

      this.profileService.getProfile().subscribe({
        next: (profile) => {
          this.profileForm.patchValue(
            {
              userName: profile.userName,
              displayName: profile.displayName
            },
            { emitEvent: false }
          );
        }
      });
    });
  }

  save(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.sessionService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: () => this.helperMessage.set('Profile updated.'),
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to update the profile.')
    });
  }

  deleteAccount(): void {
    if (!globalThis.confirm('Delete this account and its board?')) {
      return;
    }

    this.sessionService.deleteAccount().subscribe(() => this.router.navigateByUrl('/sign-in'));
  }
}
