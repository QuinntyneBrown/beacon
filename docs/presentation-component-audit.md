# Presentation Component Audit

> **Goal:** Identify all UI building blocks in the Beacon frontend that should be implemented as **reusable presentation components** — dumb / stateless components that take inputs, emit events, do not inject services or interact with the router.
>
> **Scope:** `frontend/projects/{main,domain,components}/src/**/*.{html,scss,ts}` and `frontend/projects/main/src/styles.scss`.
>
> **Date:** 2026-05-11

---

## Summary

| Metric | Value |
| --- | --- |
| Reusable presentation components identified | **35+** |
| Currently extracted as presentation components | **1** (`shell-header`) |
| Pages / smart components that mix presentation inline | **6** (`kanban-board`, `boards-page`, `card-page`, `board-page`, `sign-in-form`, `app`) |
| Estimated template-duplication reduction after full extraction | **40–50 %** |

The only presentation component that already lives in the dedicated `projects/components` library is `ShellHeaderComponent`. Every other UI primitive is currently inlined inside smart page or domain components.

---

## Inventory of Proposed Presentation Components

### Buttons

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-icon-button` | Icon-only button used in toolbars / cards | `styles.scss .icon-btn`, `boards-page.html`, `board-page.html`, `card-page.html` | `icon: string`, `ariaLabel: string`, `variant: 'standard' \| 'tonal'` | `clicked` | M3 icon button |
| `bcn-toolbar-buttons` | Segmented view-switcher button group | `board-page.html` (lines 27–44) | `options: { id; label; icon }[]`, `selectedId: string` | `selected: string` | M3 segmented button |

### App Shell & Navigation

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-nav-item` | Single nav row (icon + label + active state) used by drawer / rail / bottom nav | `app.html` | `icon`, `label`, `routerLink`, `active: boolean` | `selected` | M3 nav drawer / rail item |
| `bcn-nav-drawer` | Modal/standard navigation drawer wrapper | `app.html` | `items: NavItem[]`, `open: boolean` | `closed`, `itemSelected` | M3 navigation drawer |
| `bcn-nav-rail` | Vertical navigation rail for tablet/desktop | `app.html` | `items: NavItem[]`, `selectedId` | `itemSelected` | M3 navigation rail |
| `bcn-bottom-nav` | Mobile bottom navigation bar | `app.html` | `items: NavItem[]`, `selectedId` | `itemSelected` | M3 navigation bar |
| `bcn-page-header` | Title / kicker / subtitle / actions block | `boards-page.html`, `card-page.html`, `settings-page.ts` (template) | `kicker?: string`, `title: string`, `subtitle?: string`, `actions?: TemplateRef` | — | M3 large top app bar / headline block |
| `bcn-section-header` | Subsection heading with optional action | `card-page.html`, `kanban-board.html` | `title: string`, `actionLabel?: string` | `actionClicked` | M3 list subheader |
| `bcn-breadcrumb` | Trail of links above page header | `card-page.html` | `crumbs: { label; routerLink? }[]` | — | M3 navigation guidance |

### Cards & Surfaces

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-card-panel` | Outlined Material card wrapper for sections | `card-page.html`, `boards-page.html` (`.section-block`) | `title?: string`, `density: 'comfortable' \| 'compact'` | — | M3 outlined card |
| `bcn-board-tile` | Board summary tile (boards list) | `boards-page.html` | `board: BoardSummary`, `memberAvatars: string[]` | `openRequested`, `deleteRequested` | M3 elevated card |
| `bcn-create-board-card` | "+" tile that opens an inline create form | `boards-page.html` | `creating: boolean`, `pendingName: string` | `createRequested`, `cancelled` | M3 elevated card |
| `bcn-kanban-card` | Single kanban card (drag handle + chips) | `kanban-board.html` | `card: KanbanCard`, `dragging: boolean` | `openRequested`, `dragStarted`, `dragEnded` | M3 elevated card |
| `bcn-kanban-column` | Column header + count + card slot | `kanban-board.html` | `column: KanbanColumn`, `cardCount: number` | `cardDropped` | M3 surface container |
| `bcn-kanban-empty-state` | Empty placeholder for an empty column | `kanban-board.html` | `message: string` | — | M3 empty state |

### Typography Blocks

Listed under "App Shell & Navigation" above (`bcn-page-header`, `bcn-section-header`, `bcn-breadcrumb`). Additional helpers:

| Selector | Purpose | Currently inline in |
| --- | --- | --- |
| `bcn-page-kicker` *(optional, may merge into page-header)* | Small uppercase label above titles | `boards-page.html`, `card-page.html` |

### Badges, Chips, Avatars

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-label-pill` | Status / accent pill (`.label-pill`, `.label-pill--accent`) | `kanban-board.html`, `boards-page.html`, `card-page.html` | `label: string`, `tone: 'neutral' \| 'accent' \| 'warn'` | — | M3 assist chip |
| `bcn-chip` | Filter / selection chip (`.chip`, `.chip--active`) | `boards-page.html` | `label: string`, `selected: boolean`, `disabled?: boolean` | `toggled` | M3 filter chip |
| `bcn-avatar` | Single avatar (`.avatar`) | `boards-page.html`, `shell-header.html`, `profile-panel.html`, `card-page.html` | `initials: string`, `imageUrl?: string`, `size: 'sm' \| 'md' \| 'lg'` | — | M3 avatar |
| `bcn-avatar-stack` | Overlapped avatar group | `boards-page.html`, `card-page.html` | `members: { initials; imageUrl? }[]`, `max: number` | — | — |

### Forms

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-search-input` | Search bar with leading icon (`.search-bar`) | `boards-page.html` | `value: string`, `placeholder: string` | `valueChange`, `submitted` | M3 search bar |
| `bcn-form-panel` | Standard outlined card wrapping a form | `sign-in-form.html`, `profile-panel.html` | `title: string`, `description?: string` | — | M3 outlined card |
| `bcn-inline-form` | Inline "input + submit button" pattern | `card-page.html`, `kanban-board.html` (composer) | `placeholder: string`, `pendingValue: string`, `submitting: boolean` | `submitted` | M3 text field + filled button |
| `bcn-form-assist-row` | "Remember me + forgot password" row | `sign-in-form.html` | `rememberLabel: string`, `assistLabel: string`, `assistRouterLink: string`, `remembered: boolean` | `rememberToggled` | — |
| `bcn-card-composer` | Kanban card composition form (presentation half of current smart composer) | `kanban-board.html` | `draftTitle: string`, `draftDescription: string`, `submitting: boolean` | `submitted`, `draftChanged`, `cancelled` | M3 outlined text fields + filled button |

### Alerts & Status

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-error-alert` | Inline error message (e.g., form failures) | `sign-in-form.html`, `card-page.html`, `boards-page.html`, `profile-panel.html` | `message: string`, `severity: 'error' \| 'warning'` | `dismissed` | M3 banner / inline error |
| `bcn-helper-message` | Helper text under inputs | `sign-in-form.html`, `card-page.html` | `message: string` | — | M3 supporting text |
| `bcn-loading-state` | Skeleton / spinner for async sections | `boards-page.html`, `card-page.html` | `variant: 'spinner' \| 'skeleton'`, `label?: string` | — | M3 progress indicator |
| `bcn-empty-state` | Reusable empty-state block (icon + title + CTA) | `boards-page.html` (no boards), `card-page.html` (no comments) | `icon: string`, `title: string`, `description?: string`, `ctaLabel?: string` | `ctaClicked` | M3 empty state |

### Lists & List Items

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-checklist-item` | Checkbox + text + optional remove | `card-page.html` | `item: ChecklistItem` | `toggled`, `removed` | M3 checkbox list item |
| `bcn-comment-item` | Avatar + author + timestamp + body | `card-page.html` | `comment: CardComment` | — | M3 list item |
| `bcn-metadata-list` | dt/dd pair list for sidebar metadata | `card-page.html`, `profile-panel.html` | `entries: { label; value }[]` | — | M3 list |
| `bcn-activity-list` | Time-ordered activity feed | `card-page.html` | `entries: ActivityEntry[]` | — | M3 list |
| `bcn-dropzone` | Drag-and-drop file drop area | `card-page.html` | `accepts?: string[]`, `disabled?: boolean` | `filesDropped` | M3 surface container |

### Auth-specific

| Selector | Purpose | Currently inline in | Inputs | Outputs | M3 mapping |
| --- | --- | --- | --- | --- | --- |
| `bcn-tab-buttons` | Sign-in / Register / Reset mode switch | `sign-in-form.html` (lines 16–21) | `tabs: { id; label }[]`, `activeId: string` | `tabSelected` | M3 secondary tabs |
| `bcn-divider-with-text` | "or" divider between auth sections | `sign-in-form.html` (line 41) | `text: string` | — | — |
| `bcn-social-auth-buttons` | Social provider button row | `sign-in-form.html` (lines 42–50) | `providers: { id; label; icon }[]` | `providerSelected` | M3 outlined button |

---

## Smart Components That Should Delegate to Presentation Components

### 1. `KanbanBoardComponent` — `projects/domain/src/lib/kanban-board/`
**Status:** Smart. Injects `KANBAN_BOARD_STATE_SERVICE`, owns drag/drop, owns composer state.

**Should extract:**
- `bcn-kanban-column` (header + drop zone)
- `bcn-kanban-card` (drag handle + chips + click)
- `bcn-card-composer` (form ↔ drafts)
- `bcn-kanban-empty-state`

**Result:** `KanbanBoardComponent` becomes a thin orchestrator (state + drag-drop callbacks) and the render tree is composed of dumb children that can be unit-tested without DI.

### 2. `BoardsPageComponent` — `projects/main/src/app/pages/boards-page/`
**Status:** Smart. Injects `BOARDS_STATE_SERVICE`.

**Should extract:**
- `bcn-board-tile`
- `bcn-create-board-card`
- `bcn-page-header`
- `bcn-search-input`
- `bcn-chip` (× n filters)
- `bcn-avatar-stack`

### 3. `CardPageComponent` — `projects/main/src/app/pages/card-page/`
**Status:** Smart. Heaviest template (~170 lines).

**Should extract (high impact):**
- `bcn-breadcrumb`
- `bcn-page-header`
- `bcn-card-panel`
- `bcn-checklist-item` + `bcn-inline-form` (add checklist item)
- `bcn-comment-item` + `bcn-inline-form` (add comment)
- `bcn-metadata-list`
- `bcn-activity-list`
- `bcn-dropzone`

### 4. `BoardPageComponent` — `projects/main/src/app/pages/board-page/`
**Status:** Smart. Mostly clean, except for the toolbar.

**Should extract:**
- `bcn-toolbar-buttons` (lines 27–44)

### 5. `SignInFormComponent` — `projects/domain/src/lib/sign-in-form/`
**Status:** Smart (correctly — auth orchestration belongs here).

**Should extract presentational layers only:**
- `bcn-tab-buttons` (mode switch)
- `bcn-divider-with-text`
- `bcn-social-auth-buttons`
- `bcn-form-assist-row`
- `bcn-error-alert`

### 6. `AppComponent` — `projects/main/src/app/app.{ts,html}`
**Status:** Smart shell.

**Should extract:**
- `bcn-nav-item`, `bcn-nav-drawer`, `bcn-nav-rail`, `bcn-bottom-nav`

`ShellHeaderComponent` is already presentation-only and is the model for the rest of the library.

---

## CSS Utility Classes That Should Be Components

| CSS class (in `styles.scss`) | Replacement component |
| --- | --- |
| `.icon-btn` | `bcn-icon-button` |
| `.chip`, `.chip--active` | `bcn-chip` |
| `.search-bar` | `bcn-search-input` |
| `.page-header`, `.page-kicker`, `.page-title`, `.page-subtitle` | `bcn-page-header` |
| `.section-title` | `bcn-section-header` |
| `.section-block` | `bcn-card-panel` |
| `.avatar` | `bcn-avatar` |
| `.avatar-stack` | `bcn-avatar-stack` |
| `.label-pill`, `.label-pill--accent` | `bcn-label-pill` |

After extraction these utility classes can either be deleted or moved into their corresponding component stylesheet so the design tokens stay centralised but the markup is encapsulated.

---

## Recommended Library Layout

Target location: `frontend/projects/components/src/lib/`.

```text
components/
├── shell-header/                     ✓ already exists
├── navigation/
│   ├── nav-item/
│   ├── nav-drawer/
│   ├── nav-rail/
│   └── bottom-nav/
├── buttons/
│   ├── icon-button/
│   └── toolbar-buttons/
├── cards/
│   ├── card-panel/
│   ├── board-tile/
│   ├── create-board-card/
│   ├── kanban-card/
│   ├── kanban-column/
│   └── kanban-empty-state/
├── typography/
│   ├── page-header/
│   ├── section-header/
│   └── breadcrumb/
├── badges/
│   ├── avatar/
│   ├── avatar-stack/
│   ├── label-pill/
│   └── chip/
├── forms/
│   ├── search-input/
│   ├── form-panel/
│   ├── inline-form/
│   ├── form-assist-row/
│   └── card-composer/
├── alerts/
│   ├── error-alert/
│   ├── helper-message/
│   ├── loading-state/
│   └── empty-state/
├── lists/
│   ├── checklist-item/
│   ├── comment-item/
│   ├── metadata-list/
│   ├── activity-list/
│   └── dropzone/
└── auth/
    ├── tab-buttons/
    ├── divider-with-text/
    └── social-auth-buttons/
```

---

## Suggested Extraction Roadmap

### Phase 1 — Foundation (highest ROI)
`bcn-page-header`, `bcn-label-pill`, `bcn-avatar`, `bcn-avatar-stack`, `bcn-error-alert`, `bcn-empty-state`, `bcn-card-panel`, `bcn-section-header`, `bcn-icon-button`.

These remove the most duplication and create the design vocabulary every other extraction will depend on.

### Phase 2 — Forms & Input
`bcn-search-input`, `bcn-chip`, `bcn-form-assist-row`, `bcn-inline-form`, `bcn-divider-with-text`.

### Phase 3 — Navigation
`bcn-nav-item`, `bcn-nav-drawer`, `bcn-nav-rail`, `bcn-bottom-nav`.

### Phase 4 — Large component refactors
- Split `kanban-board` into `bcn-kanban-column` + `bcn-kanban-card` + `bcn-card-composer`.
- Split `card-page` into breadcrumb + checklist + comments + metadata + dropzone + activity.
- Split `boards-page` into board-tile + create-board-card.

### Phase 5 — Auth polish
`bcn-tab-buttons`, `bcn-social-auth-buttons`.

---

## Compliance Checklist

| Item | Status | Notes |
| --- | --- | --- |
| Navigation extracted as components | ❌ | Inline in `app.html`. |
| Button utilities componentised | ❌ | `.icon-btn`, `.chip` still inline CSS. |
| Card patterns extracted | ❌ | Tiles, kanban cards, panels duplicated across pages. |
| Typography blocks wrapped | ❌ | `page-header` / `section-title` repeated inline. |
| Avatar pattern consolidated | ❌ | 4 inline copies. |
| Form patterns extracted | ❌ | Inline forms in sign-in / card / kanban. |
| Alert / empty-state components | ❌ | Inline in 4+ places. |
| List item components | ❌ | Checklist, comments, metadata inline in `card-page.html`. |
| Large pages broken up | ❌ | `card-page.html` (~170 lines), `boards-page.html` (~140), `kanban-board.html` (~70) need splits. |
| `ShellHeader` is presentation-only | ✅ | Reference example for the rest of the library. |

---

## Key Take-aways

1. **One component is enough of a model.** `ShellHeaderComponent` already proves the pattern: pure inputs/outputs, no DI. Use it as the template for everything in the table above.
2. **The biggest single win is the kanban board refactor.** Splitting into `bcn-kanban-column` + `bcn-kanban-card` + `bcn-card-composer` removes the most coupled hand-written DOM in the app.
3. **Smart components stay smart.** Pages and domain orchestrators continue to inject services and own state — they should just *render* dumb children rather than render their own DOM.
4. **Design tokens already exist in `styles.scss`.** New presentation components should consume those CSS variables rather than duplicating colours/spacing, keeping the Material 3 palette consistent.
