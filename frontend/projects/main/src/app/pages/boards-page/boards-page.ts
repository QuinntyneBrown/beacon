import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { BOARDS_STATE_SERVICE } from 'domain';

@Component({
  selector: 'app-boards-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './boards-page.html',
  styleUrl: './boards-page.scss'
})
export class BoardsPageComponent implements OnInit {
  readonly boards = inject(BOARDS_STATE_SERVICE).boards;
  readonly isLoading = inject(BOARDS_STATE_SERVICE).isLoading;
  readonly errorMessage = signal('');
  readonly creating = signal(false);

  readonly createForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]]
  });

  private readonly boardsState = inject(BOARDS_STATE_SERVICE);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.boardsState.load().subscribe({
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to load boards.')
    });
  }

  create(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.creating.set(true);
    this.boardsState.create(this.createForm.getRawValue()).subscribe({
      next: (board) => {
        this.creating.set(false);
        this.createForm.reset({ name: '' });
        this.router.navigate(['/boards', board.boardId]);
      },
      error: (error) => {
        this.creating.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to create the board.');
      }
    });
  }

  remove(boardId: string, name: string): void {
    if (!globalThis.confirm(`Delete board "${name}"? This cannot be undone.`)) {
      return;
    }

    this.boardsState.delete(boardId).subscribe({
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to delete the board.')
    });
  }
}
