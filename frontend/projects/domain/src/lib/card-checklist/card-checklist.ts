import { Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProgressBarComponent } from 'components';
import { ApiChecklistItem } from '../models/domain-ui-models';

@Component({
  selector: 'lib-card-checklist',
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, ProgressBarComponent],
  templateUrl: './card-checklist.html',
  styleUrl: './card-checklist.scss'
})
export class CardChecklistComponent {
  readonly checklistItems = input<readonly ApiChecklistItem[]>([]);
  readonly editable = input(false);
  readonly busyItemIds = input<readonly string[]>([]);
  readonly itemToggled = output<{ readonly itemId: string; readonly completed: boolean }>();
  readonly itemAdded = output<string>();
  readonly itemEdited = output<{ readonly itemId: string; readonly text: string }>();
  readonly itemRemoved = output<string>();
  readonly newItemText = signal('');

  readonly completedCount = computed(() => this.checklistItems().filter((item) => item.isCompleted).length);

  addItem(): void {
    const text = this.newItemText().trim();

    if (!text) {
      return;
    }

    this.itemAdded.emit(text);
    this.newItemText.set('');
  }

  isBusy(itemId: string): boolean {
    return this.busyItemIds().includes(itemId);
  }
}
