# Boards Dashboard - Components

Reusable components expected on this screen, split by where they should live.

## Components library candidates

These are presentation-only components that can be reused across screens and domains. They should not depend on backend API services, Beacon models, routes, permissions, or board-specific business rules.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `AppShell` | Provides the responsive app frame with top bar, navigation, and main content slots. | Navigation items, active item id, toolbar content, projected page content, breakpoint mode. | Navigation item selected, menu toggled. | Mobile bottom navigation, tablet rail, desktop drawer. | It only arranges supplied content and emits UI events; board data stays outside the component. |
| `TopAppBar` | Displays leading menu, brand, page title, and action slots. | Title, leading icon, action items, avatar content, badge values. | Leading action clicked, toolbar action clicked, avatar clicked. | Sticky, dense, with or without badges. | It is a generic header pattern configured by inputs and slots. |
| `ResponsiveNavigation` | Renders bottom navigation, rail, or drawer navigation from the same item model. | Items, active item id, badges, expanded state, section labels. | Item selected, create action clicked. | Bottom nav, rail, expanded drawer, active/inactive rows. | It does not know what Boards or Inbox mean; it renders a provided navigation structure. |
| `FloatingActionButton` | Shows a fixed quick action. | Label, icon, color, position, visibility breakpoint. | Clicked. | Extended, icon-only, hidden on selected breakpoints. | It is a generic Material action component with no domain logic. |
| `PageHeader` | Presents title, subtitle, and right-aligned actions. | Title, subtitle, projected actions. | Action outputs from projected controls. | Compact mobile stack, desktop horizontal layout. | It handles layout only and can be reused for any page. |
| `Button` | Provides consistent command styling. | Label, icon, variant, disabled, loading, destructive flag. | Clicked. | Filled, tonal, outlined, text, disabled, loading. | It is a generic control primitive configured by presentation state. |
| `SearchBar` | Displays a search input with leading and trailing affordances. | Value, placeholder, trailing actions, avatar slot. | Value changed, submitted, trailing action clicked. | Focused, empty, populated, disabled. | It emits query text and does not perform board searches itself. |
| `FilterChip` | Provides selectable chip controls. | Label, selected, count, disabled. | Selection changed. | Selected, unselected, disabled. | It represents a generic selection affordance, not a board filter rule. |
| `Avatar` / `AvatarStack` | Shows user initials, images, and overflow count. | Avatar list, max visible count, size, color tokens. | Avatar clicked, overflow clicked. | Single avatar, stacked avatars, overflow count. | It renders provided people-like data without fetching members or interpreting roles. |
| `Badge` | Displays notification or count markers. | Count, label, severity, hidden. | None. | Dot, numeric, capped count, hidden. | It is a generic visual indicator. |
| `Snackbar` | Shows transient feedback with an optional action. | Message, action label, duration, open state. | Action clicked, dismissed. | Informational, success, warning, error. | It displays supplied feedback and does not own the operation that produced it. |

## Domain library candidates

These components are suitable for the domain projects/libraries because they represent Beacon board workflows or API-backed compositions. They may depend on API library models or services, own data loading or mutation flows, or encode board-specific behavior.

| Component | Purpose | Inputs | Outputs | States / variants | Placement reason |
| --- | --- | --- | --- | --- | --- |
| `BoardsDashboardView` | Composes the complete dashboard with starred boards, all boards, filters, search, and quick-create actions. | Current user, board collections, selected filter, search query, loading/error flags. | Board selected, filter changed, search submitted, create requested, sort requested. | Loading, empty, populated, error, mobile/tablet/desktop layout. | It is the screen-level board workflow and coordinates board-specific data and actions. |
| `BoardFilterBar` | Applies board-specific filters such as All, Starred, Recent, Mine, Shared, and Archived. | Available filters, selected filter, board counts. | Filter selected. | Selected filter, disabled filters, count badges. | The filter meanings are tied to board ownership, membership, and archive state. |
| `BoardTile` | Summarizes a board with title, workspace/sprint text, members, and metrics. | Board summary model, member avatars, card counts, favorite/starred state. | Open board, favorite toggled, context menu opened. | Starred, normal, archived, hover/focus, loading skeleton. | It displays Beacon board data and actions that only make sense for boards. |
| `CreateBoardTile` | Presents the dashed create-new-board affordance inside the board grid. | Creation availability, disabled reason, optional template hints. | Create board requested. | Enabled, disabled, loading. | It starts a board creation workflow rather than only rendering a generic empty tile. |
| `BoardGridSection` | Groups board tiles under headings such as Starred and All boards. | Section title, board list, empty text, grid density. | Board selected, board action selected. | Empty section, populated section, responsive column counts. | The grouping is based on board categories and board models. |
| `BoardQuickCreateAction` | Wires the page header, drawer action, and FAB to the same new-board workflow. | User permissions, workspace context, busy state. | Create board requested. | Enabled, hidden, permission-disabled, saving. | It needs board creation permissions and workspace/domain context. |
