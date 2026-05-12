# Card Detail - Components

Reusable components expected on this screen, split by where they should live.

## Components library candidates

These are presentation-only components that can be reused across screens and domains. They should not depend on backend API services, Beacon models, routes, permissions, or card-specific business rules.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `AppShell` | Provides the responsive app frame with top bar, navigation, and main content slots. | Navigation items, active item id, toolbar content, projected page content, breakpoint mode. | Navigation item selected, menu toggled. | Mobile bottom navigation, tablet rail, desktop drawer. | It only arranges supplied content and emits UI events; card data stays outside the component. |
| `TopAppBar` | Displays back navigation, brand, title, and action slots. | Title, leading icon, action items, avatar content. | Back clicked, action clicked, avatar clicked. | Sticky, dense, with action overflow. | It is a generic toolbar configured by inputs and projected actions. |
| `ResponsiveNavigation` | Renders bottom navigation, rail, or drawer navigation from the same item model. | Items, active item id, badges, expanded state, section labels. | Item selected, create action clicked. | Bottom nav, rail, expanded drawer, active/inactive rows. | It renders a provided navigation structure without owning board routing or data. |
| `Breadcrumb` | Shows a compact path above the page title. | Breadcrumb items, active item id, max visible count. | Item selected. | Full path, truncated path, mobile collapsed. | It renders supplied path items and does not know the board hierarchy. |
| `PageHeader` | Presents a title, subtitle, and action group. | Title, subtitle, projected metadata, projected actions. | Action outputs from projected controls. | Compact mobile stack, desktop horizontal layout. | It handles reusable header layout only. |
| `Button` | Provides consistent command styling. | Label, icon, variant, disabled, loading, destructive flag. | Clicked. | Filled, tonal, outlined, text, disabled, loading. | It is a generic control primitive. |
| `Chip` | Displays short status or metadata tags. | Label, icon, color token, selected, disabled. | Selection changed when interactive. | Static, selected, interactive, disabled. | It renders supplied labels without interpreting card status or priority. |
| `SectionBlock` | Provides consistent section spacing and layout. | Heading, projected content, density. | None. | Default, compact, divided. | It is a generic layout wrapper. |
| `SectionHeading` | Displays an icon, heading, and optional count or action. | Icon, title, count, action slot. | Action output from projected control. | With count, with action, compact. | It is a reusable heading pattern. |
| `ProgressBar` | Shows checklist completion progress. | Value, max, label, color. | None. | Determinate, indeterminate, compact. | It is a generic visual indicator. |
| `AttachmentListItem` | Displays a file-like list row with trailing action. | Icon, title, metadata, action label, disabled. | Action clicked, row clicked. | Image file, document file, downloading, disabled. | It renders supplied attachment display data without downloading or mutating files itself. |
| `CommentComposer` | Captures comment text with avatar and actions. | Avatar, value, placeholder, disabled, submitting. | Value changed, submitted, canceled. | Empty, focused, submitting, validation error. | It is a reusable input pattern when it does not call comment APIs directly. |
| `CommentItem` | Displays a comment with avatar, author, timestamp, and body. | Author display, avatar, timestamp, body, actions. | Action selected. | Normal, edited, highlighted, loading. | It renders supplied comment content without owning card activity data. |
| `Avatar` / `AvatarStack` | Shows assignees, reporter, and comment authors. | Avatar list, max visible count, size, color tokens. | Avatar clicked, overflow clicked. | Single avatar, stacked avatars, overflow count. | It renders provided people-like data without fetching users. |
| `HistoryList` | Displays compact chronological activity rows. | Activity display items, density, empty text. | Item selected when interactive. | Empty, populated, compact. | It is a generic timeline/list renderer when supplied preformatted items. |

## Domain library candidates

These components are suitable for the domain projects/libraries because they represent Beacon card workflows or API-backed compositions. They may depend on API library models or services, own data loading or mutation flows, or encode card-specific behavior.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `CardDetailView` | Composes the complete card detail page with title, labels, description, checklist, attachments, activity, metadata, and actions. | Card id, card detail model, board context, permissions, loading/error flags. | Card updated, card moved, card completed, watch toggled, comment added, attachment downloaded. | Loading, loaded, saving, permission-limited, error, mobile/tablet/desktop. | It owns the card workflow and coordinates card-specific models, permissions, and API operations. |
| `CardWorkflowActions` | Provides Watch, Move, Mark done, Share, and More actions for a card. | Card status, watched flag, permissions, busy action id. | Watch toggled, move requested, mark done requested, share requested, menu action selected. | Enabled, disabled, saving, completed, overflow. | The commands mutate or act on a Beacon card and require card permissions/state. |
| `CardLabelList` | Displays the card labels such as Bug, Feature, Sprint 14, and High priority. | Card labels, editable flag, color tokens. | Label selected, label removed, edit requested. | Read-only, editable, empty. | Labels are part of the card domain and may map to API label models. |
| `CardChecklist` | Displays checklist progress and checklist items for the card. | Checklist model, completion count, editable flag, busy item ids. | Item toggled, item added, item edited, item removed. | Read-only, editable, partially complete, complete, saving. | It represents card checklist data and mutation behavior. |
| `CardAttachmentList` | Displays card attachments and download controls. | Attachment models, permissions, download states. | Attachment opened, download requested, attachment removed. | Empty, populated, downloading, permission-disabled. | It depends on card attachment models and file actions. |
| `CardActivityThread` | Combines comment composer, comments, and activity history for the card. | Activity items, comments, current user, permissions, submitting state. | Comment submitted, comment action selected, history item selected. | Empty, populated, submitting, permission-disabled. | It represents card-specific collaboration history and comment mutation. |
| `CardMetaPanel` | Shows status, assignees, due date, estimate, reporter, linked items, and history placement. | Card metadata model, related links, assignees, reporter, permissions. | Status changed, assignee changed, due date changed, linked item opened. | Read-only, editable, compact, desktop side panel. | The fields and actions are Beacon card domain concepts. |
