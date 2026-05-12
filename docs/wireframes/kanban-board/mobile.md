# Kanban Board - Mobile Wireframe

Source mock: `docs/mocks/board.html`  
Source screenshot: `docs/mocks/screenshots/board-mobile.png`  
Responsive state: mobile app shell, single-column kanban columns, bottom navigation, fixed card FAB.

## Layout

```text
STICKY TOP APP BAR
+----------------------------------------------------------------+
| [back] [logo] Beacon  Beacon Web App [star] [filter] [bell 3] [AK] |
+----------------------------------------------------------------+

MAIN CONTENT - single column

Beacon Web App                         [AK][JM][SR][+2] [Invite]
Sprint 14 - Closes Friday - 32 cards

[Board selected] [List] [Calendar]                     [Filter - 2]
[Labels] [more]

+----------------------------------------------------------------+
| COLUMN: TO DO                                           [5] [+] |
| dot gray                                                       |
|                                                                |
| +------------------------------------------------------------+ |
| | label bars: feature + design                               | |
| | Redesign onboarding flow with progressive disclosure        | |
| | [date May 18] [comments 4] [attachments 2]             [SR] | |
| +------------------------------------------------------------+ |
| +------------------------------------------------------------+ |
| | label: research                                            | |
| | User interviews - 5 sessions on activation                  | |
| | [date May 22] [checklist 2/6]                         [JM] | |
| +------------------------------------------------------------+ |
| +------------------------------------------------------------+ |
| | label: docs                                                | |
| | Write release notes for v1.4                                | |
| | [date May 19]                                         [AK] | |
| +------------------------------------------------------------+ |
| +------------------------------------------------------------+ |
| | label: feature                                             | |
| | Add keyboard shortcut overlay (?)                           | |
| | [comment 1]                                           [TL] | |
| +------------------------------------------------------------+ |
| [+] Add card                                                   |
+----------------------------------------------------------------+

STICKY OVERLAY WHILE SCROLLED
+----------------------------------------------------------------+
| bottom nav: [Boards active] [Inbox badge 3] [Today] [Profile]  |
| fixed FAB above/right: [+] Card                                |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| COLUMN: IN PROGRESS                                     [3] [+] |
| cards: drag-and-drop scroll, card detail page, email digest     |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| COLUMN: IN REVIEW                                       [2] [+] |
| cards: realtime presence, iOS Safari chip overflow              |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| COLUMN: DONE                                           [22] [+] |
| cards: Material 3 color tokens, Component library README,       |
|        Avatar overflow on small screens                         |
+----------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer and rail are hidden.
- Top app bar uses a back button, board title, star, filter, notifications badge `3`, and avatar `AK`.
- Page member stack and `Invite` button sit to the right of the board title area when space permits.
- Toolbar wraps across two rows: view chips first, then Labels and overflow if needed.
- Kanban columns are vertically stacked in order: To do, In progress, In review, Done.
- Cards use white raised surfaces inside light-gray rounded columns.
- Fixed `Card` FAB floats above the bottom nav.
- Bottom navigation has Boards active, Inbox badge `3`, Today, Profile.
