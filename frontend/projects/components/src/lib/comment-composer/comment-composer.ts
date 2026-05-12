import { Component, computed, input, output, signal } from '@angular/core';
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
  readonly draftValue = signal<string | null>(null);
  readonly currentValue = computed(() => this.draftValue() ?? this.value());

  onValueInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.draftValue.set(value);
    this.valueChanged.emit(value);
  }

  submit(): void {
    const value = this.currentValue().trim();

    if (!value) {
      return;
    }

    this.submitted.emit(value);
    this.draftValue.set('');
  }
}
