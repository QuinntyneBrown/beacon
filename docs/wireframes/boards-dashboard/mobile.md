# Boards Dashboard - Mobile Wireframe

Source mock: `docs/mocks/boards.html`  
Source screenshot: `docs/mocks/screenshots/boards-mobile.png`  
Responsive state: mobile app shell, top app bar, bottom navigation, floating action button.

## Layout

```text
STICKY TOP APP BAR
+----------------------------------------------------------------+
| [menu] [logo] Beacon    Boards        [search] [bell 3] [AK]   |
+----------------------------------------------------------------+

MAIN CONTENT - single column, 16px gutters

Boards
5 active boards across your team

+------------+  +------------+  +-------------------------------+
| [filter]   |  | [sort]     |  | [+] New board                 |
+------------+  +------------+  +-------------------------------+

+----------------------------------------------------------------+
| [search]  Search boards, cards, memb...      [mic] [AK]        |
+----------------------------------------------------------------+

[x All] [Starred] [Recent] [Mine]
[Shared] [Archived]

Starred

+----------------------------------------------------------------+
| BOARD TILE - Beacon Web App                                    |
| Sprint 14 - Q2 release                                         |
|                                                                |
| [AK][JM][+3]                           [columns] 4  [done] 32  |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| BOARD TILE - Mobile App v2                                     |
| Design sprint                                                  |
|                                                                |
| [SR][TL]                                  [columns] 3 [done] 18 |
+----------------------------------------------------------------+

STICKY OVERLAY WHILE SCROLLED
+----------------------------------------------------------------+
| bottom nav: [Boards active] [Inbox badge 3] [Today] [Profile]  |
| fixed FAB above/right: [+] New                                 |
+----------------------------------------------------------------+

All boards

+----------------------------------------------------------------+
| BOARD TILE - Marketing Q3                                      |
| Campaign planning                                              |
| [MD][PL][+1]                                      [done] 11     |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| BOARD TILE - Onboarding Revamp                                 |
| Research -> handoff                                            |
| [SR][JM]                                           [done] 7      |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| BOARD TILE - Internal Tools                                    |
| Tech debt + DX                                                 |
| [AK]                                               [done] 4      |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| CREATE TILE - dashed outline                                   |
|                               +                                |
|                       Create new board                         |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| SNACKBAR: Board "Mobile App v2" was duplicated.        UNDO    |
+----------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer and rail are hidden.
- The top app bar title is `Boards`; action icons are search, notifications with badge `3`, and avatar `AK`.
- Page actions stack in one row: outlined `Filter`, tonal `Sort`, filled `New board`.
- Search bar appears below actions and before chips.
- Chips wrap to two rows on the screenshot.
- Board tiles are one column and keep fixed card height.
- The mobile FAB says `New` and floats above the bottom navigation.
- Bottom navigation has four items: Boards active, Inbox with badge `3`, Today, Profile.
- Snackbar appears after the board grid content.
