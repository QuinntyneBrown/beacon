import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarComponent } from '../avatar/avatar';

export interface CommentComposerAvatar {
  readonly label: string;
  readonly initials?: string;
  readonly imageUrl?: string | null;
}

@Component({
  selector: 'lib-comment-composer',
  imports: [
    AvatarComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './comment-composer.html',
  styleUrl: './comment-composer.scss'
})
export class CommentComposerComponent {
  readonly avatar = input<CommentComposerAvatar | null>(null);
  readonly value = input('');
  readonly placeholder = input('Write a comment');
  readonly disabled = input(false);
  readonly submitting = input(false);
  readonly error = input('');
  readonly valueChanged = output<string>();
  readonly submitted = output<string>();
  readonly canceled = output<void>();

  onValueInput(event: Event): void {
    this.valueChanged.emit((event.target as HTMLTextAreaElement).value);
  }
}
