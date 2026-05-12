import { Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export type OutlinedTextFieldType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

@Component({
  selector: 'lib-outlined-text-field',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './outlined-text-field.html',
  styleUrl: './outlined-text-field.scss'
})
export class OutlinedTextFieldComponent {
  readonly label = input.required<string>();
  readonly value = input('');
  readonly placeholder = input('');
  readonly type = input<OutlinedTextFieldType>('text');
  readonly required = input(false);
  readonly errors = input<readonly string[]>([]);
  readonly supportingText = input('');
  readonly disabled = input(false);
  readonly multiline = input(false);
  readonly rows = input(4);
  readonly valueChanged = output<string>();
  readonly blurred = output<void>();
  readonly submitted = output<string>();

  readonly passwordVisible = signal(false);
  readonly effectiveType = computed(() => {
    if (this.type() === 'password' && this.passwordVisible()) {
      return 'text';
    }

    return this.type();
  });

  onValueInput(event: Event): void {
    this.valueChanged.emit((event.target as HTMLInputElement | HTMLTextAreaElement).value);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }
}
