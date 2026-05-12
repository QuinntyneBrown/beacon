# Boards Dashboard - Desktop Wireframe

Source mock: `docs/mocks/boards.html`  
Source screenshot: `docs/mocks/screenshots/boards-desktop.png`  
Responsive state: desktop app shell, top app bar plus expanded navigation drawer.

## Layout

```text
STICKY TOP APP BAR
+------------------------------------------------------------------------------------------------------+
| [menu] [logo] Beacon    Boards                                             [search] [bell 3] [AK]    |
+------------------------------------------------------------------------------------------------------+

+-----------------------------+------------------------------------------------------------------------+
| NAV DRAWER                  | MAIN CONTENT                                                           |
|                             |                                                                        |
| +-------------------------+ | Boards                                      [Filter] [Sort] [New board] |
| | [+] New board           | | 5 active boards across your team                                       |
| +-------------------------+ |                                                                        |
|                             | +----------------------------------------------------------+             |
| WORKSPACE                   | | [search] Search boards, cards, members... [mic] [AK]     |             |
| [Boards active]        5    | +----------------------------------------------------------+             |
| [Inbox]                3    |                                                                        |
| [Today]                     | [x All] [Starred] [Recent] [Mine] [Shared] [Archived]                   |
| [Calendar]                  |                                                                        |
|                             | Starred                                                                |
| TEAM                        | +----------------------+ +----------------------+                       |
| [Members]                   | | Beacon Web App       | | Mobile App v2        |                       |
| [Labels]                    | | Sprint 14 - Q2       | | Design sprint        |                       |
|                             | | [AK][JM][+3] 4 32    | | [SR][TL]     3 18    |                       |
| ACCOUNT                     | +----------------------+ +----------------------+                       |
| [Settings]                  |                                                                        |
| [Help & feedback]           | All boards                                                             |
|                             | +----------------------+ +----------------------+ +----------------------+ +-------------------+ |
|                             | | Marketing Q3         | | Onboarding Revamp    | | Internal Tools       | | dashed create     | |
|                             | | Campaign planning    | | Research -> handoff  | | Tech debt + DX       | | + Create new      | |
|                             | | [MD][PL][+1] 11      | | [SR][JM] 7           | | [AK] 4               | | board             | |
|                             | +----------------------+ +----------------------+ +----------------------+ +-------------------+ |
|                             |                                                                        |
|                             |                     [Snackbar: Board duplicated] [UNDO]                 |
|                             |                                                fixed FAB: [+] New        |
+-----------------------------+------------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer is visible and rail is hidden.
- Drawer is grouped into Workspace, Team, and Account sections.
- Drawer active item is Boards with badge `5`; Inbox has badge `3`.
- Main board grid fits two Starred tiles, then four All boards tiles across.
- Search bar remains capped rather than full desktop width.
- Both the page header `New board` button and fixed `New` FAB are present in the mock.
- Snackbar is centered near the bottom of content.
