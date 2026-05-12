import {
  AuthenticatedSession,
  BoardSummary,
  CardComment,
  CardDetail,
  ChecklistItem,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  Profile
} from 'api';

export type BoardFilterId = 'all' | 'starred' | 'recent' | 'mine' | 'shared' | 'archived' | string;
export type BoardViewId = 'board' | 'list' | 'calendar' | string;
export type SaveState = 'clean' | 'dirty' | 'invalid' | 'saving' | 'saved';
export type ThemePreference = 'light' | 'dark' | 'system' | string;

export interface DomainAvatar {
  readonly id: string;
  readonly label: string;
  readonly initials?: string;
  readonly imageUrl?: string | null;
  readonly colorToken?: string;
  readonly role?: string;
}

export interface BoardFilterOption {
  readonly id: BoardFilterId;
  readonly label: string;
  readonly count?: number;
  readonly disabled?: boolean;
}

export interface BoardTileModel extends BoardSummary {
  readonly workspaceName?: string;
  readonly sprintText?: string;
  readonly starred?: boolean;
  readonly archived?: boolean;
  readonly memberAvatars?: readonly DomainAvatar[];
  readonly updatedText?: string;
}

export interface BoardCollection {
  readonly id: string;
  readonly title: string;
  readonly boards: readonly BoardTileModel[];
  readonly emptyText?: string;
}

export interface BoardDashboardUser {
  readonly displayName: string;
  readonly email?: string;
  readonly roles?: readonly string[];
}

export interface BoardQuickCreateContext {
  readonly workspaceId?: string;
  readonly workspaceName?: string;
}

export interface BoardLabel {
  readonly id: string;
  readonly label: string;
  readonly colorToken?: string;
}

export interface BoardViewOption {
  readonly id: BoardViewId;
  readonly label: string;
  readonly icon: string;
  readonly disabled?: boolean;
}

export interface BoardHeaderModel {
  readonly boardId: string;
  readonly name: string;
  readonly sprintText?: string;
  readonly statusText?: string;
  readonly members?: readonly DomainAvatar[];
}

export interface KanbanCardModel extends KanbanCard {
  readonly labels?: readonly BoardLabel[];
  readonly assignee?: DomainAvatar | null;
  readonly priority?: string;
  readonly attachmentCount?: number;
  readonly done?: boolean;
  readonly overdue?: boolean;
  readonly selected?: boolean;
}

export interface KanbanColumnModel extends Omit<KanbanColumn, 'cards'> {
  readonly colorToken?: string;
  readonly cards: readonly KanbanCardModel[];
}

export interface KanbanBoardModel extends Omit<KanbanBoard, 'columns'> {
  readonly sprintText?: string;
  readonly statusText?: string;
  readonly members?: readonly DomainAvatar[];
  readonly labels?: readonly BoardLabel[];
  readonly columns: readonly KanbanColumnModel[];
}

export interface CardMoveEvent {
  readonly cardId: string;
  readonly sourceColumnId?: string;
  readonly destinationColumnId: string;
  readonly destinationSortOrder: number;
}

export interface CardCreateContext {
  readonly boardId: string;
  readonly columnId?: string;
}

export interface BoardInviteRequest {
  readonly boardId: string;
  readonly email: string;
  readonly role: string;
}

export interface CardLabel {
  readonly id: string;
  readonly label: string;
  readonly colorToken?: string;
}

export interface CardAttachment {
  readonly id: string;
  readonly title: string;
  readonly metadata: string;
  readonly icon?: string;
  readonly downloading?: boolean;
  readonly disabled?: boolean;
}

export interface CardActivityItem {
  readonly id: string;
  readonly icon?: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp?: string;
  readonly interactive?: boolean;
}

export interface CardMetaPanelModel {
  readonly status: string;
  readonly columnName: string;
  readonly dueDateUtc?: string | null;
  readonly estimate?: string;
  readonly reporter?: DomainAvatar | null;
  readonly assignees?: readonly DomainAvatar[];
  readonly relatedLinks?: readonly RelatedLink[];
}

export interface RelatedLink {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: string;
}

export interface CardPermissions {
  readonly canEdit?: boolean;
  readonly canMove?: boolean;
  readonly canComplete?: boolean;
  readonly canShare?: boolean;
  readonly canComment?: boolean;
  readonly canAttach?: boolean;
}

export interface CardDetailViewModel extends CardDetail {
  readonly labels?: readonly CardLabel[];
  readonly attachments?: readonly CardAttachment[];
  readonly metadata?: CardMetaPanelModel;
  readonly watched?: boolean;
  readonly completed?: boolean;
}

export interface SettingsNavSection {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly badgeCount?: number;
  readonly disabled?: boolean;
}

export interface ProfileSummaryModel extends Profile {
  readonly imageUrl?: string | null;
  readonly roleLabel?: string;
}

export interface ProfileFormModel {
  readonly displayName: string;
  readonly userName: string;
  readonly email: string;
  readonly bio?: string;
}

export interface NotificationPreferences {
  readonly emailDigest: boolean;
  readonly mentions: boolean;
  readonly dueDateReminders: boolean;
  readonly commentReplies: boolean;
}

export interface AppearancePreferences {
  readonly theme: ThemePreference;
  readonly compactDensity: boolean;
}

export interface SettingsPageModel {
  readonly currentUser: AuthenticatedSession | ProfileSummaryModel | null;
  readonly profile: ProfileFormModel;
  readonly notifications: NotificationPreferences;
  readonly appearance: AppearancePreferences;
  readonly workspaceName?: string;
}

export interface ExternalAuthProvider {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly enabled: boolean;
}

export interface AuthHeroFeature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface SignInCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe: boolean;
}

export type ApiCardComment = CardComment;
export type ApiChecklistItem = ChecklistItem;
