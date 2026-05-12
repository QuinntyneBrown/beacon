import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDetail, CARDS_SERVICE } from 'api';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonComponent,
  OutlinedTextFieldComponent,
  PageHeaderComponent,
  SectionBlockComponent,
  SnackbarComponent
} from 'components';
import {
  CardActivityItem,
  CardActivityThreadComponent,
  CardAttachment,
  CardAttachmentListComponent,
  CardChecklistComponent,
  CardLabel,
  CardLabelListComponent,
  CardMetaPanelComponent,
  CardMetaPanelModel,
  CardPermissions,
  CardWorkflowActionsComponent,
  DomainAvatar,
  SESSION_SERVICE
} from 'domain';

@Component({
  selector: 'app-card-page',
  imports: [
    BreadcrumbComponent,
    ButtonComponent,
    CardActivityThreadComponent,
    CardAttachmentListComponent,
    CardChecklistComponent,
    CardLabelListComponent,
    CardMetaPanelComponent,
    CardWorkflowActionsComponent,
    OutlinedTextFieldComponent,
    PageHeaderComponent,
    SectionBlockComponent,
    SnackbarComponent
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss'
})
export class CardPageComponent implements OnInit {
  readonly card = signal<CardDetail | null>(null);
  readonly errorMessage = signal('');
  readonly helperMessage = signal('');
  readonly isSaving = signal(false);
  readonly commentSubmitting = signal(false);
  readonly busyChecklistItemIds = signal<readonly string[]>([]);
  readonly watched = signal(false);
  readonly cardPermissions: CardPermissions = {
    canEdit: true,
    canMove: false,
    canComplete: false,
    canShare: false,
    canComment: true,
    canAttach: false
  };
  readonly cardLabels: readonly CardLabel[] = [];
  readonly cardAttachments: readonly CardAttachment[] = [];

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
  private readonly router = inject(Router);
  private readonly cardsService = inject(CARDS_SERVICE);
  private readonly session = inject(SESSION_SERVICE).session;
  readonly boardId = this.route.snapshot.paramMap.get('boardId') ?? '';
  readonly currentUser = computed<DomainAvatar | null>(() => {
    const activeSession = this.session();

    if (!activeSession) {
      return null;
    }

    return {
      id: activeSession.userId,
      label: activeSession.displayName,
      initials: activeSession.displayName.slice(0, 2).toUpperCase()
    };
  });

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
    this.errorMessage.set('');
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

    this.commentSubmitting.set(true);
    this.cardsService.addComment(card.cardId, this.commentForm.getRawValue().body).subscribe({
      next: (updated) => {
        this.applyCard(updated);
        this.commentForm.reset({ body: '' });
        this.commentSubmitting.set(false);
      },
      error: (error) => {
        this.commentSubmitting.set(false);
        this.errorMessage.set(error.error?.detail ?? 'Unable to add the comment.');
      }
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

    this.busyChecklistItemIds.update((itemIds) => [...itemIds, itemId]);
    this.cardsService.toggleChecklistItem(card.cardId, itemId, isCompleted).subscribe({
      next: (updated) => {
        this.applyCard(updated);
        this.clearBusyChecklistItem(itemId);
      },
      error: (error) => {
        this.clearBusyChecklistItem(itemId);
        this.errorMessage.set(error.error?.detail ?? 'Unable to update the checklist item.');
      }
    });
  }

  addChecklistItemText(text: string): void {
    this.checklistForm.reset({ text: text.trim() });
    this.addChecklistItem();
  }

  addCommentText(body: string): void {
    this.commentForm.reset({ body: body.trim() });
    this.addComment();
  }

  updateEditField(field: 'title' | 'description', value: string): void {
    const control = this.editForm.controls[field];
    control.setValue(value);
    control.markAsDirty();
  }

  markEditFieldTouched(field: 'title' | 'description'): void {
    this.editForm.controls[field].markAsTouched();
  }

  titleErrors(): readonly string[] {
    const control = this.editForm.controls.title;

    if (!control.touched || control.valid) {
      return [];
    }

    if (control.hasError('required')) {
      return ['Title is required.'];
    }

    if (control.hasError('maxlength')) {
      return ['Title must be 200 characters or fewer.'];
    }

    return ['Title is invalid.'];
  }

  breadcrumbItems(card: CardDetail): readonly BreadcrumbItem[] {
    return [
      { id: 'boards', label: 'Boards', icon: 'dashboard' },
      { id: this.boardId, label: 'Board', icon: 'view_kanban' },
      { id: card.cardId, label: card.title, icon: 'article' }
    ];
  }

  navigateBreadcrumb(itemId: string): void {
    if (itemId === 'boards') {
      this.router.navigateByUrl('/boards');
      return;
    }

    if (itemId === this.boardId) {
      this.router.navigate(['/boards', this.boardId]);
    }
  }

  metadataFor(card: CardDetail): CardMetaPanelModel {
    const currentUser = this.currentUser();

    return {
      status: this.checklistProgress(card) === 100 && card.checklistItems.length > 0 ? 'done' : 'open',
      columnName: card.columnName,
      dueDateUtc: card.dueDateUtc,
      estimate: card.checklistItems.length > 0 ? `${this.checklistProgress(card)}% checklist` : undefined,
      reporter: currentUser,
      assignees: currentUser ? [currentUser] : []
    };
  }

  activityItemsFor(card: CardDetail): readonly CardActivityItem[] {
    return [
      {
        id: 'column',
        icon: 'view_column',
        title: `Card is in ${card.columnName}`,
        description: card.description || 'No description has been added yet.'
      }
    ];
  }

  dismissMessages(): void {
    this.errorMessage.set('');
    this.helperMessage.set('');
  }

  showUnavailableAction(action: string): void {
    this.helperMessage.set(`${action} is managed from the board workflow.`);
  }

  checklistProgress(card: CardDetail): number {
    if (card.checklistItems.length === 0) {
      return 0;
    }

    const completed = card.checklistItems.filter((item) => item.isCompleted).length;
    return Math.round((completed / card.checklistItems.length) * 100);
  }

  private applyCard(card: CardDetail): void {
    this.card.set(card);
    this.editForm.reset({ title: card.title, description: card.description ?? '' });
    this.errorMessage.set('');
  }

  private clearBusyChecklistItem(itemId: string): void {
    this.busyChecklistItemIds.update((itemIds) => itemIds.filter((candidate) => candidate !== itemId));
  }
}
