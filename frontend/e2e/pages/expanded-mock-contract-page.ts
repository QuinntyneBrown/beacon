import { expect, Page } from '@playwright/test';
import { SignInPage } from './sign-in-page';

export class ExpandedMockContractPage {
  constructor(private readonly page: Page) {}

  async signInAsDemo(): Promise<void> {
    const signIn = new SignInPage(this.page);
    await signIn.goto();
    await signIn.signIn('demo@beacon.local', 'Password12345!');
  }

  async expectExpandedShellContract(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Menu' })).toBeVisible();
    await expect(this.page.locator('.top-app-bar .title, .shell-header__page-title')).toContainText('Beacon Web App');
    await expect(this.page.locator('.nav-drawer')).toHaveCSS('width', '256px');
    await expect(this.page.getByRole('button', { name: 'New board', exact: true }).first()).toBeVisible();
    await expect(this.page.getByText('Inbox').first()).toBeVisible();
    await expect(this.page.getByText('Today').first()).toBeVisible();
    await expect(this.page.getByText('Team').first()).toBeVisible();
    await expect(this.page.locator('.badge').first()).toBeVisible();
  }

  async expectExpandedMobileShellContract(): Promise<void> {
    await this.page.setViewportSize({ width: 390, height: 844 });
    await this.page.goto('/boards');
    await expect(this.page.locator('.bottom-nav')).toBeVisible();
    await expect(this.page.locator('.bottom-nav')).toHaveCSS('height', '80px');
    await expect(this.page.getByText('Inbox').last()).toBeVisible();
    await expect(this.page.getByText('Today').last()).toBeVisible();
    await expect(this.page.getByText('Profile').last()).toBeVisible();
  }

  async expectMockClassAliases(): Promise<void> {
    await this.page.goto('/sign-in');
    await expect(this.page.locator('.auth-brand')).toBeVisible();
    await expect(this.page.locator('.form-stack')).toBeVisible();
    await expect(this.page.locator('.divider-text')).toBeVisible();
    await expect(this.page.locator('.checkbox.checked')).toBeVisible();
    await expect(this.page.locator('.sign-in-form .text-field.outlined .field').first()).toBeVisible();
    await expect(this.page.locator('.sign-in-form .supporting').first()).toBeVisible();
    await expect(this.page.locator('.sign-in-form .btn-filled')).toBeVisible();
    await expect(this.page.locator('.sign-in-form .btn-outlined').first()).toBeVisible();
    await expect(this.page.locator('.sign-in-form .material-symbols-rounded').first()).toBeVisible();
    await expect(this.page.locator('.auth-hero .brand .ico')).toBeVisible();
    await expect(this.page.locator('.auth-hero .features .feat').first()).toBeVisible();
    await expect(this.page.locator('.auth-card .footer-text')).toBeVisible();

    await this.signInAsDemo();
    await this.page.goto('/boards');
    await expect(this.page.locator('.brand .logo')).toBeVisible();
    await expect(this.page.locator('.fixed-br')).toBeVisible();
    await expect(this.page.locator('.board-tile .tile-meta').first()).toBeVisible();
    await expect(this.page.locator('.board-tile .tile-title').first()).toBeVisible();
    await expect(this.page.locator('.board-tile .tile-bottom').first()).toBeVisible();
    await expect(this.page.locator('.board-tile.bg-3, .board-tile.bg-4, .board-tile.bg-5').first()).toBeVisible();
    await expect(this.page.locator('.board-tile.bg-4')).toBeVisible();
    await expect(this.page.locator('.board-tile.bg-5')).toBeVisible();
    await expect(this.page.locator('.board-tile .leading').first()).toBeVisible();
    await expect(this.page.locator('.board-tile .trailing').first()).toBeVisible();
    await expect(this.page.locator('.boards-page .chip.selected.active')).toBeVisible();
    await expect(this.page.locator('.boards-page .action.with-icon').first()).toBeVisible();
    await expect(this.page.locator('.btn-tonal.with-icon').first()).toBeVisible();

    await this.page.locator('.boards-page__card a, .board-tile a').first().click();
    await expect(this.page.getByRole('button', { name: 'Back' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'New card' }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add card' }).first()).toBeVisible();
    await expect(this.page.locator('.board-page__header .titles')).toBeVisible();
    await expect(this.page.locator('.board-page__header .trailing')).toBeVisible();
    await expect(this.page.locator('.board-toolbar .chip.selected')).toBeVisible();
    await expect(this.page.locator('.board-toolbar .chip.selected').filter({ hasText: /view_column\s*Board/ })).toBeVisible();
    await expect(this.page.locator('.board-toolbar .chip.assist').first()).toBeVisible();
    await expect(this.page.locator('.board-toolbar .btn-tonal').first()).toBeVisible();
    await expect(this.page.locator('.board-toolbar .btn-text').first()).toBeVisible();
    await expect(this.page.locator('.members .avatar.sm').first()).toBeVisible();
    await expect(this.page.locator('.board-page .icon-wrap').first()).toBeVisible();
    await expect(this.page.locator('.kanban-column.col-todo, .kanban-column.col-progress, .kanban-column.col-review, .kanban-column.col-done').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .card-labels').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .card-meta').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .card-title').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .meta-item').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .label-feature').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .label-bug').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .label-docs').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .label-research').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .meta-left').first()).toBeVisible();
    await expect(this.page.locator('.kanban-card .progress').first()).toBeVisible();

    await this.page.locator('.kanban-card a, .kanban-board__card a').first().click();
    await expect(this.page.getByRole('button', { name: 'Back' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Share' })).toBeVisible();
    await expect(this.page.locator('.card-page .icon-btn[aria-label="Watch"]')).toBeVisible();
    await expect(this.page.locator('.card-page__header .titles')).toBeVisible();
    await expect(this.page.locator('.card-page__header .btn-tonal')).toBeVisible();
    await expect(this.page.locator('.card-page .chip.selected.active')).toBeVisible();
    await expect(this.page.locator('.card-page .chip.assist').first()).toBeVisible();
    await expect(this.page.locator('.card-page .col-dot').first()).toBeVisible();
    await expect(this.page.locator('.card-page .body-large').first()).toBeVisible();
    await expect(this.page.locator('.card-page .body-medium').first()).toBeVisible();
    await expect(this.page.locator('.card-page .comment .body').first()).toBeVisible();
    await expect(this.page.locator('.card-page .comment .text').first()).toBeVisible();
    await expect(this.page.locator('.card-page .checklist-item.done').first()).toBeVisible();
    await expect(this.page.locator('.card-page .headline').first()).toBeVisible();
    await expect(this.page.locator('.card-page .supporting').first()).toBeVisible();
    await expect(this.page.locator('.card-page textarea[placeholder="Write a comment, @mention to notify"]')).toBeVisible();
    await expect(this.page.locator('.label-tag').first()).toBeVisible();
    await expect(this.page.locator('.checklist-item').first()).toBeVisible();
    await expect(this.page.locator('.comment').first()).toBeVisible();
    await expect(this.page.locator('.side-meta .meta-item').first()).toBeVisible();
    await expect(this.page.locator('.card-page .avatar-stack .avatar').first()).toBeVisible();
    await expect(this.page.locator('.card-page .text-field.outlined .field').first()).toBeVisible();
    await expect(this.page.locator('.card-page .checkbox.checked').first()).toBeVisible();
    await expect(this.page.locator('.card-page .list .list-item').first()).toBeVisible();
    await expect(this.page.locator('.card-page .name').first()).toBeVisible();
    await expect(this.page.locator('.card-page .time').first()).toBeVisible();
    await expect(this.page.locator('.btn-text').first()).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /notes\s*Description/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /checklist\s*Checklist/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /forum\s*Activity/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /history\s*History/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /attach_file\s*Attachments/ })).toBeVisible();

    await this.page.goto('/settings');
    await expect(this.page.locator('.settings-page__header .titles')).toBeVisible();
    await expect(this.page.locator('.settings-page__header .body-medium')).toBeVisible();
    await expect(this.page.locator('.settings-page__header .trailing')).toBeVisible();
    await expect(this.page.locator('.settings-page__help.icon-btn')).toBeVisible();
    await expect(this.page.locator('.settings-nav.card.outlined')).toBeVisible();
    await expect(this.page.locator('.settings-nav .list-item.active .leading .icon-wrap').first()).toBeVisible();
    await expect(this.page.locator('.settings-nav .list-item.active .headline').first()).toContainText('Profile');
    await expect(this.page.locator('.settings-nav .list-item').first()).toBeVisible();
    await expect(this.page.locator('.text-field.outlined .field').first()).toBeVisible();
    await expect(this.page.locator('.settings-page .text-field.outlined .field .floating-label').filter({ hasText: 'Full name' })).toBeVisible();
    await expect(this.page.locator('.settings-page .text-field.outlined .supporting').filter({ hasText: 'Used for sign-in and notifications.' })).toBeVisible();
    await expect(this.page.locator('.settings-page__switch .track').first()).toBeVisible();
    await expect(this.page.locator('.settings-page__switch .thumb').first()).toBeVisible();
    await expect(this.page.locator('.settings-page .switch .track .thumb').first()).toBeVisible();
    await expect(this.page.locator('.profile-panel.card .avatar.lg')).toBeVisible();
    await expect(this.page.locator('.profile-panel .meta')).toBeVisible();
    await expect(this.page.locator('.settings-row').first()).toBeVisible();
    await expect(this.page.locator('.settings-row .headline').first()).toBeVisible();
    await expect(this.page.locator('.settings-row .supporting').first()).toBeVisible();
    await expect(this.page.locator('.settings-page__segmented .chip.selected').filter({ hasText: /light_mode\s*Light/ })).toBeVisible();
    await expect(this.page.locator('.settings-page__segmented .chip').filter({ hasText: /dark_mode\s*Dark/ })).toBeVisible();
    await expect(this.page.locator('.settings-page__segmented .chip').filter({ hasText: /contrast\s*System/ })).toBeVisible();
    await expect(this.page.locator('.settings-page .btn-tonal.with-icon').first()).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /person\s*Profile/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /notifications\s*Notifications/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /palette\s*Appearance/ })).toBeVisible();
    await expect(this.page.locator('h2').filter({ hasText: /warning\s*Danger zone/ })).toBeVisible();

    await this.page.goto('/components');
    await expect(this.page.locator('.components-page .page-header .titles')).toBeVisible();
    await expect(this.page.locator('.components-page .page-header .trailing')).toBeVisible();
    await expect(this.page.locator('.components-page .body-medium').first()).toBeVisible();
    await expect(this.page.locator('.components-page .body-large').first()).toBeVisible();
    await expect(this.page.locator('.components-page .headline-small').first()).toBeVisible();
    await expect(this.page.locator('.components-page .title-small').first()).toBeVisible();
    await expect(this.page.locator('.components-page .title-medium').first()).toBeVisible();
    await expect(this.page.locator('.components-page .title-large').first()).toBeVisible();
    await expect(this.page.locator('.components-page .chip.selected').filter({ hasText: /check\s*Selected/ })).toBeVisible();
    await expect(this.page.locator('.components-page .chip.assist').first()).toBeVisible();
    await expect(this.page.locator('.components-page .chip').filter({ hasText: /label\s*Bug/ })).toBeVisible();
    await expect(this.page.locator('.components-page .chip').filter({ hasText: /Sam R\.\s*close/ })).toBeVisible();
    await expect(this.page.locator('.components-page .label').first()).toBeVisible();
    await expect(this.page.locator('.components-page button').filter({ hasText: /notifications\s*5/ })).toBeVisible();
    await expect(this.page.locator('.components-page button').filter({ hasText: /RETRY/ })).toBeVisible();
    await expect(this.page.locator('.components-page .text-field.filled .supporting').filter({ hasText: 'Supporting text' })).toBeVisible();
    await expect(this.page.locator('.components-page .text-field.outlined.error .supporting').filter({ hasText: 'Enter a valid email address.' })).toBeVisible();
    await expect(this.page.locator('.components-page .text-field.outlined.focused .floating-label').filter({ hasText: 'Focused state' })).toBeVisible();
    await expect(this.page.locator('.components-page .list-item .avatar').first()).toBeVisible();
    await expect(this.page.locator('.components-page .list-item .meta .headline').first()).toBeVisible();
    await expect(this.page.locator('.components-page .list-item .icon-wrap').first()).toBeVisible();
    await expect(this.page.locator('.display-small')).toBeVisible();
    await expect(this.page.locator('.headline-medium')).toBeVisible();
    await expect(this.page.locator('.text-field.outlined .field').first()).toBeVisible();
    await expect(this.page.locator('.switch .track .thumb').first()).toBeVisible();
    await expect(this.page.locator('.checkbox.checked')).toBeVisible();
    await expect(this.page.locator('.dialog-icon')).toBeVisible();
    await expect(this.page.locator('.dialog')).toBeVisible();
    await expect(this.page.locator('.dialog-actions')).toBeVisible();
    await expect(this.page.locator('.divider').first()).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Delete this board?' })).toBeVisible();
  }

  async expectExpandedBoardsContract(): Promise<void> {
    await this.page.setViewportSize({ width: 1440, height: 900 });
    await this.page.goto('/boards');
    await expect(this.page.getByRole('button', { name: 'Voice search' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Recent' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Mine' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Archived' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Create new board/ })).toBeVisible();
    await expect(this.page.locator('.snackbar')).toContainText('Board archived');
    await expect(this.page.locator('.board-grid').first()).toBeVisible();
    await expect(this.page.locator('.board-tile.bg-1, .board-tile.bg-2, .board-tile.bg-3, .board-tile.bg-4, .board-tile.bg-5').first()).toBeVisible();
  }

  async expectExpandedBoardContract(): Promise<void> {
    await this.page.locator('.boards-page__card a, .board-tile a').first().click();
    const toolbar = this.page.locator('.board-toolbar');
    await expect(toolbar.getByRole('button', { name: 'List', exact: true })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Calendar', exact: true })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: /Filter · 2/ })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Labels' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'More' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Invite' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add card' }).first()).toBeVisible();
    await expect(this.page.locator('.column-header').first()).toBeVisible();
  }

  async expectExpandedCardContract(): Promise<void> {
    await this.page.locator('.kanban-card a, .kanban-board__card a').first().click();
    await expect(this.page.locator('.card-page__title')).toBeVisible();
    await expect(this.page.locator('.card-page__title')).not.toHaveText('Card detail');
    await expect(this.page.getByRole('button', { name: 'Download' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'History' })).toBeVisible();
    await expect(this.page.locator('.card-page__meta-list dt').filter({ hasText: 'Assignee' })).toBeVisible();
    await expect(this.page.locator('.card-page__meta-list dt').filter({ hasText: 'Reporter' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Comment', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add assignee' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(this.page.locator('.progress').first()).toBeVisible();
  }

  async expectExpandedSettingsContract(): Promise<void> {
    await this.page.goto('/settings');
    await expect(this.page.getByRole('button', { name: 'Help' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Upload' })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: /upload\s*Upload/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: /save\s*Save changes/ })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(this.page.getByLabel('Bio')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Light' })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: /light_mode\s*Light/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Dark' })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: /dark_mode\s*Dark/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'System' })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: /contrast\s*System/ })).toBeVisible();
    await expect(this.page.locator('.settings-page__supporting').filter({ hasText: 'Engineer working on the Beacon kanban experience.' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Security' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Billing' })).toBeVisible();
  }

  async expectComponentsContract(): Promise<void> {
    await this.page.goto('/components');
    await expect(this.page.getByRole('heading', { name: 'Design system' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Color' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Typography' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Icon buttons' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'FABs' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Chips' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Text fields' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Switches' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Dialog' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Source palette' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'M3 roles' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Selection controls' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Cards' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Navigation' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Lists' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Code' })).toBeVisible();
    const exportTokensButton = this.page.getByRole('button', { name: 'Export tokens' });
    await expect(exportTokensButton.locator('.material-symbols-rounded')).toHaveText('download');
    const newButton = this.page.getByRole('button', { name: 'New', exact: true });
    await expect(newButton.locator('.material-symbols-rounded')).toHaveText('add');
    const filterButton = this.page.locator('.components-page .btn-outlined.with-icon').filter({ hasText: 'Filter' });
    await expect(filterButton.locator('.material-symbols-rounded')).toHaveText('filter_list');
    const newCardButton = this.page.getByRole('button', { name: 'New card' });
    await expect(newCardButton.locator('.material-symbols-rounded')).toHaveText('add');
    await expect(this.page.getByRole('button', { name: 'Edit' }).first()).toBeVisible();
    await expect(this.page.locator('.components-page button').filter({ hasText: /UNDO/ })).toBeVisible();
    await expect(this.page.locator('.components-page button').filter({ hasText: /chevron_right/ }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Disabled' }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Elevated' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Add', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Default' })).toBeVisible();
    await expect(this.page.locator('.snackbar').first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Export tokens' })).toBeVisible();
  }
}
