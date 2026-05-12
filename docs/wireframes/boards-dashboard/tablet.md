# Boards Dashboard - Tablet Wireframe

Source mock: `docs/mocks/boards.html`  
Source screenshot: `docs/mocks/screenshots/boards-tablet.png`  
Responsive state: tablet app shell, top app bar plus 80px navigation rail.

## Layout

```text
STICKY TOP APP BAR
+----------------------------------------------------------------------------------+
| [menu] [logo] Beacon   Boards                               [search] [bell 3] [AK] |
+----------------------------------------------------------------------------------+

+----------+-----------------------------------------------------------------------+
| NAV RAIL | MAIN CONTENT                                                          |
|          |                                                                       |
| [+]      | Boards                                      [Filter] [Sort] [New board] |
|          | 5 active boards across your team                                      |
| [Boards] |                                                                       |
| Inbox    | +-------------------------------------------------------------------+ |
| Today    | | [search] Search boards, cards, members...       [mic] [AK]       | |
| Team     | +-------------------------------------------------------------------+ |
| Settings |                                                                       |
|          | [x All] [Starred] [Recent] [Mine] [Shared] [Archived]                 |
|          |                                                                       |
|          | Starred                                                               |
|          | +------------------------------+ +------------------------------+     |
|          | | Beacon Web App               | | Mobile App v2                |     |
|          | | Sprint 14 - Q2 release       | | Design sprint                |     |
|          | | [AK][JM][+3]       4  32     | | [SR][TL]           3  18     |     |
|          | +------------------------------+ +------------------------------+     |
|          |                                                                       |
|          | All boards                                                            |
|          | +------------------------------+ +------------------------------+     |
|          | | Marketing Q3                 | | Onboarding Revamp            |     |
|          | | Campaign planning            | | Research -> handoff          |     |
|          | | [MD][PL][+1]          11     | | [SR][JM]              7      |     |
|          | +------------------------------+ +------------------------------+     |
|          | +------------------------------+ +------------------------------+     |
|          | | Internal Tools               | | dashed Create new board      |     |
|          | | Tech debt + DX               | | +                            |     |
|          | | [AK]                   4     | | Create new board             |     |
|          | +------------------------------+ +------------------------------+     |
|          |                                                                       |
|          |                  [Snackbar: duplicated board] [UNDO]                   |
|          |                                             fixed FAB: [+] New         |
+----------+-----------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation rail is visible and drawer is hidden.
- Rail includes create FAB, Boards active, Inbox, Today, Team, Settings.
- Main content has 24px padding and a two-column board grid.
- Page actions are right-aligned in the page header.
- Search bar stretches across most of the content width.
- Snackbar is centered beneath the grid.
- A fixed `New` FAB remains at the bottom-right of the viewport.
