# Settings - Mobile Wireframe

Source mock: `docs/mocks/settings.html`  
Source screenshot: `docs/mocks/screenshots/settings-mobile.png`  
Responsive state: mobile app shell, stacked settings content, bottom navigation fixed.

## Layout

```text
STICKY TOP APP BAR
+----------------------------------------------------------------+
| [menu] [logo] Beacon    Settings                      [help] [AK] |
+----------------------------------------------------------------+

MAIN CONTENT - single column

Settings
Manage your profile, workspace, and notifications

+----------------------+
| [save] Save changes  |
+----------------------+

+----------------------------------------------------------------+
| SETTINGS NAV CARD                                             |
| [person]       Profile             active                      |
| [bell]         Notifications                                   |
| [palette]      Appearance                                      |
| [workspaces]   Workspace                                       |
| [key]          Security                                        |
| [card]         Billing                                         |
+----------------------------------------------------------------+

SECTION: Profile

        Alex Kim
[AK]    Product Engineer - alex@beacon.dev
        [upload] Upload     Remove

+------------------------+ +------------------------+
| Full name              | | Username               |
| Alex Kim               | | @alexk                 |
+------------------------+ +------------------------+

STICKY OVERLAY WHILE SCROLLED
+----------------------------------------------------------------+
| bottom nav: [Boards] [Inbox badge 3] [Today] [Profile active]  |
+----------------------------------------------------------------+

+----------------------------------------------------------------+
| Email                                                          |
| alex@beacon.dev                                                |
+----------------------------------------------------------------+
Used for sign-in and notifications.

+----------------------------------------------------------------+
| Bio                                                            |
| Engineer working on the Beacon kanban experience. Coffee,      |
| kayaks, kanban.                                                |
+----------------------------------------------------------------+

SECTION: Notifications
[headline/supporting text] Email digest                 [switch on]
[headline/supporting text] Mentions and assignments     [switch on]
[headline/supporting text] Due-date reminders           [switch off]
[headline/supporting text] Comment replies              [switch on]

SECTION: Appearance
[Light selected] [Dark] [System]

Compact density
Show more cards per column on large screens.             [switch off]

SECTION: Danger zone
Delete account
Permanently delete your account and all data.
This cannot be undone.                         [Delete account]
```

## Exact Content And Behavior

- Navigation drawer and rail are hidden.
- Save changes button sits below the page subtitle on mobile.
- Settings navigation is a full-width outlined card above the editable form sections.
- Profile section content stacks, but the full-name and username fields still sit side by side in the mock and are partially obscured by the fixed bottom nav in the full-page screenshot.
- Bottom navigation has Profile active, not Settings.
- Danger zone delete button remains right-aligned within its row.
