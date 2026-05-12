# Kanban Board - Tablet Wireframe

Source mock: `docs/mocks/board.html`  
Source screenshot: `docs/mocks/screenshots/board-tablet.png`  
Responsive state: tablet app shell, navigation rail, kanban columns in a two-column wrapping grid.

## Layout

```text
STICKY TOP APP BAR
+--------------------------------------------------------------------------------+
| [back] [logo] Beacon   Beacon Web App                  [star] [filter] [bell 3] [AK] |
+--------------------------------------------------------------------------------+

+----------+---------------------------------------------------------------------+
| NAV RAIL | MAIN CONTENT                                                        |
|          |                                                                     |
| [+]      | Beacon Web App                         [AK][JM][SR][+2] [Invite]      |
|          | Sprint 14 - Closes Friday - 32 cards                                  |
| Boards   |                                                                     |
| Inbox    | [Board selected] [List] [Calendar]           [Filter - 2] [Labels] [more] |
| Today    |                                                                     |
| Team     | +-------------------------------+ +-------------------------------+   |
| Settings | | TO DO                    5 + | | IN PROGRESS              3 + |   |
|          | | card: onboarding             | | card: drag-and-drop         |   |
|          | | card: interviews             | | card: card detail           |   |
|          | | card: release notes          | | card: email digest          |   |
|          | | card: shortcuts              | |                               |   |
|          | | [+] Add card                 | |                               |   |
|          | +-------------------------------+ +-------------------------------+   |
|          |                                                                     |
|          | +-------------------------------+ +-------------------------------+   |
|          | | IN REVIEW               2 + | | DONE                    22 + |   |
|          | | card: realtime presence      | | card: color tokens          |   |
|          | | card: Safari chip overflow   | | card: component README      |   |
|          | |                              | | card: avatar overflow       |   |
|          | +-------------------------------+ +-------------------------------+   |
|          |                                                     fixed FAB: Card   |
+----------+---------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation rail is visible with Boards active.
- No bottom navigation appears.
- Main content uses 24px padding.
- Header keeps board title/subtitle on the left and member stack plus Invite on the right.
- Toolbar keeps view chips on the left and filter/label/more controls on the right.
- Columns wrap into two columns because the tablet viewport is below the 900px horizontal-kanban breakpoint.
- Fixed `Card` FAB is bottom-right.
