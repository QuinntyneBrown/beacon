import { Component, input, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AvatarStackComponent } from 'components';
import { BoardInviteRequest, DomainAvatar } from '../models/domain-ui-models';

@Component({
  selector: 'lib-board-member-invite',
  imports: [AvatarStackComponent, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './board-member-invite.html',
  styleUrl: './board-member-invite.scss'
})
export class BoardMemberInviteComponent {
  readonly boardId = input.required<string>();
  readonly currentMembers = input<readonly DomainAvatar[]>([]);
  readonly invitePermission = input(true);
  readonly open = input(false);
  readonly submitting = input(false);
  readonly validationError = input('');
  readonly inviteSubmitted = output<BoardInviteRequest>();
  readonly inviteCanceled = output<void>();

  readonly inviteForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    role: ['Member', [Validators.required]]
  });

  submit(): void {
    if (this.inviteForm.invalid || !this.invitePermission()) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    this.inviteSubmitted.emit({
      boardId: this.boardId(),
      ...this.inviteForm.getRawValue()
    });
  }
}
