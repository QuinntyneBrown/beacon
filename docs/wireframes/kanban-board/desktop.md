# Kanban Board - Desktop Wireframe

Source mock: `docs/mocks/board.html`  
Source screenshot: `docs/mocks/screenshots/board-desktop.png`  
Responsive state: desktop app shell, expanded navigation drawer, horizontal kanban columns.

## Layout

```text
STICKY TOP APP BAR
+------------------------------------------------------------------------------------------------------+
| [back] [logo] Beacon   Beacon Web App                                  [star] [filter] [bell 3] [AK] |
+------------------------------------------------------------------------------------------------------+

+-----------------------------+------------------------------------------------------------------------+
| NAV DRAWER                  | MAIN CONTENT                                                           |
|                             |                                                                        |
| +-------------------------+ | Beacon Web App                            [AK][JM][SR][+2] [Invite]    |
| | [+] New card            | | Sprint 14 - Closes Friday - 32 cards                                  |
| +-------------------------+ |                                                                        |
|                             | [Board selected] [List] [Calendar]          [Filter - 2] [Labels] [more] |
| WORKSPACE                   |                                                                        |
| [Boards active]        5    | HORIZONTAL KANBAN SCROLLER                                             |
| [Inbox]                3    | +-------------------+ +-------------------+ +-------------------+ +-------------------+
| [Today]                     | | TO DO        5 +  | | IN PROGRESS  3 +  | | IN REVIEW    2 +  | | DONE       22 + |
|                             | | gray dot          | | blue dot          | | cyan dot          | | green dot        |
| THIS BOARD                  | |                   | |                   | |                   | |                 |
| [Board view]                | | onboarding card   | | drag/drop card    | | presence card     | | color tokens    |
| [List view]                 | | interviews card   | | card detail card  | | Safari card       | | README card      |
| [Calendar]                  | | release card      | | email digest card | |                   | | avatar card      |
| [Reports]                   | | shortcut card     | |                   | |                   | |                 |
|                             | | [+] Add card      | |                   | |                   | |                 |
|                             | +-------------------+ +-------------------+ +-------------------+ +-------------------+
|                             |                                                                        |
|                             |                                                fixed FAB: [+] Card       |
+-----------------------------+------------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer is visible and rail is hidden.
- Drawer primary action says `New card`.
- Drawer sections are Workspace and This board.
- This board drawer links are Board view, List view, Calendar, Reports.
- Board columns are a horizontal scroller with fixed-width columns.
- Each column header has a colored dot, uppercase title, count badge, and add icon.
- Done cards are visually lower-emphasis in the mock.
- Fixed `Card` FAB remains at the bottom-right.
