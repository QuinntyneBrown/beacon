import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardDetail, CARDS_SERVICE } from 'api';

@Component({
  selector: 'app-card-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss'
})
export class CardPageComponent implements OnInit {
  readonly card = signal<CardDetail | null>(null);
  readonly errorMessage = signal('');
  readonly helperMessage = signal('');
  readonly isSaving = signal(false);

  readonly editForm = inject(FormBuilder).nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['']
  });

  readonly commentForm = inject(FormBuilder).nonNullable.group({
    body: ['', [Validators.required, Validators.maxLength(2000)]]
  });

  readonly checklistForm = inject(FormBuilder).nonNullable.group({
    text: ['', [Validators.required, Validators.maxLength(200)]]
  });

  private readonly route = inject(ActivatedRoute);
  private readonly cardsService = inject(CARDS_SERVICE);
  readonly boardId = this.route.snapshot.paramMap.get('boardId') ?? '';

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('cardId');
    if (!cardId) {
      this.errorMessage.set('Card not found.');
      return;
    }

    this.cardsService.get(cardId).subscribe({
      next: (card) => this.applyCard(card),
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to load the card.')
    });
  }

  save(): void {
    const card = this.card();
    if (!card || this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.cardsService.update(card.cardId, { ...this.editForm.getRawValue() }).subscribe({
      next: (updated) => {
        this.applyCard(updated);
        this.isSaving.set(false);
        this.helperMessage.set('Card updated.');
      },
      error: (error) => {
        this.isSaving.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to update the card.');
      }
    });
  }

  addComment(): void {
    const card = this.card();
    if (!card || this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.cardsService.addComment(card.cardId, this.commentForm.getRawValue().body).subscribe({
      next: (updated) => {
        this.applyCard(updated);
        this.commentForm.reset({ body: '' });
      },
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to add the comment.')
    });
  }

  addChecklistItem(): void {
    const card = this.card();
    if (!card || this.checklistForm.invalid) {
      this.checklistForm.markAllAsTouched();
      return;
    }

    this.cardsService.addChecklistItem(card.cardId, this.checklistForm.getRawValue().text).subscribe({
      next: (updated) => {
        this.applyCard(updated);
        this.checklistForm.reset({ text: '' });
      },
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to add the checklist item.')
    });
  }

  toggleChecklistItem(itemId: string, isCompleted: boolean): void {
    const card = this.card();
    if (!card) {
      return;
    }

    this.cardsService.toggleChecklistItem(card.cardId, itemId, isCompleted).subscribe({
      next: (updated) => this.applyCard(updated),
      error: (error) => this.errorMessage.set(error.error?.detail ?? 'Unable to update the checklist item.')
    });
  }

  private applyCard(card: CardDetail): void {
    this.card.set(card);
    this.editForm.reset({ title: card.title, description: card.description ?? '' });
    this.errorMessage.set('');
  }
}
