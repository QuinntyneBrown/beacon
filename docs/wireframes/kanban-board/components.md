# Kanban Board - Components

Reusable components expected on this screen, split by where they should live.

## Components library candidates

These are presentation-only components that can be reused across screens and domains. They should not depend on backend API services, Beacon models, routes, permissions, or board-specific business rules.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `AppShell` | Provides the responsive app frame with top bar, navigation, and main content slots. | Navigation items, active item id, toolbar content, projected page content, breakpoint mode. | Navigation item selected, menu toggled. | Mobile bottom navigation, tablet rail, desktop drawer. | It only arranges supplied content and emits UI events; board data stays outside the component. |
| `TopAppBar` | Displays back navigation, brand, title, and board action slots. | Title, leading icon, action items, avatar content, badge values. | Back clicked, action clicked, avatar clicked. | Sticky, dense, with notification badge. | It is a generic toolbar configured by inputs and projected actions. |
| `ResponsiveNavigation` | Renders bottom navigation, rail, or drawer navigation from the same item model. | Items, active item id, badges, expanded state, section labels. | Item selected, create action clicked. | Bottom nav, rail, expanded drawer, active/inactive rows. | It renders a provided navigation structure without owning board routing or data. |
| `FloatingActionButton` | Shows the fixed quick action used for card creation. | Label, icon, color, position, visibility breakpoint. | Clicked. | Extended, icon-only, hidden on selected breakpoints. | It is a generic Material action component. |
| `PageHeader` | Presents a page title, subtitle, member slot, and actions. | Title, subtitle, projected metadata, projected actions. | Action outputs from projected controls. | Compact mobile stack, desktop horizontal layout. | It handles reusable header layout only. |
| `Avatar` / `AvatarStack` | Shows member and assignee initials, images, and overflow count. | Avatar list, max visible count, size, color tokens. | Avatar clicked, overflow clicked. | Single avatar, stacked avatars, overflow count. | It renders provided people-like data without fetching board members. |
| `Button` | Provides consistent command styling. | Label, icon, variant, disabled, loading. | Clicked. | Filled, tonal, outlined, text, disabled, loading. | It is a generic control primitive. |
| `ChipGroup` | Displays view and filter chips. | Chip list, selected ids, multi-select flag. | Selection changed. | Single select, multi select, selected, disabled. | It controls UI selection state and leaves board filtering rules to domain components. |
| `IconButton` | Renders compact icon actions. | Icon, label, disabled, active. | Clicked. | Default, active, disabled, loading. | It is a reusable Material action primitive. |
| `LabelPill` | Displays compact colored labels. | Label, color token, size. | None. | Small, normal, muted. | It renders supplied label text and color without interpreting board labels. |
| `ProgressBar` | Shows numeric completion progress. | Value, max, label, color. | None. | Determinate, indeterminate, compact. | It is a generic visual indicator. |
| `CardMetaItem` | Displays an icon plus short metadata text. | Icon, label, value, tone. | Clicked when interactive. | Static, interactive, muted. | It is a layout primitive for metadata and does not know card semantics. |

## Domain library candidates

These components are suitable for the domain projects/libraries because they represent Beacon board workflows or API-backed compositions. They may depend on API library models or services, own data loading or mutation flows, or encode board-specific behavior.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `KanbanBoardView` | Composes the full board screen, including board header, view controls, filters, columns, cards, and create-card actions. | Board model, columns, cards, members, active filters, loading/error flags, permissions. | Card opened, card moved, card created, filter changed, view changed, invite requested. | Loading, empty board, populated board, filtered board, error, mobile/tablet/desktop. | It owns the board workflow and coordinates board-specific models, permissions, and mutations. |
| `BoardHeader` | Displays the board name, sprint metadata, member stack, and invite action. | Board summary, sprint/status metadata, members, invite permission. | Invite clicked, member overflow clicked. | Compact mobile, full desktop, invite disabled. | It represents Beacon board identity and team membership. |
| `BoardViewControls` | Switches between Board, List, and Calendar views and exposes board filters/labels. | Active view, filter count, available labels, permission flags. | View changed, filter clicked, labels clicked, more clicked. | Selected view, filters active, disabled view. | The view choices and filter counts are board-specific. |
| `KanbanColumn` | Displays a workflow column with status color, count, cards, and add-card affordance. | Column model, cards, card count, color, add permission, drop state. | Card dropped, add card clicked, column menu clicked. | Empty, populated, drag-over, disabled, compact. | It represents board workflow state and usually participates in drag/drop persistence. |
| `KanbanCard` | Displays a task card with labels, title, metadata, checklist progress, and assignee. | Card summary model, labels, assignee, due date, comments, attachments, checklist progress, priority. | Card opened, card action selected, drag started. | Normal, done, overdue, selected, dragging, loading. | It is tied to Beacon card models and card-specific actions. |
| `CardQuickCreateAction` | Connects drawer and FAB create-card commands to the current board/column context. | Board id, optional column id, permissions, busy state. | Create card requested. | Enabled, hidden, permission-disabled, saving. | It needs board context and card creation permissions. |
| `BoardMemberInvite` | Starts the invite flow from the board header. | Board id, current members, invite permission. | Invite submitted, invite canceled. | Closed, open, submitting, validation error. | It depends on board membership rules and API-backed invite behavior. |
