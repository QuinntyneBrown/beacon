# Settings - Desktop Wireframe

Source mock: `docs/mocks/settings.html`  
Source screenshot: `docs/mocks/screenshots/settings-desktop.png`  
Responsive state: desktop app shell, expanded navigation drawer, in-page settings nav column.

## Layout

```text
STICKY TOP APP BAR
+------------------------------------------------------------------------------------------------------+
| [menu] [logo] Beacon    Settings                                                     [help] [AK]     |
+------------------------------------------------------------------------------------------------------+

+-----------------------------+------------------------------------------------------------------------+
| NAV DRAWER                  | MAIN CONTENT                                                           |
|                             |                                                                        |
| +-------------------------+ | Settings                                      [Save changes]           |
| | [+] New board           | | Manage your profile, workspace, and notifications                      |
| +-------------------------+ |                                                                        |
|                             | +----------------------+ +---------------------------------------------+ |
| WORKSPACE                   | | SETTINGS NAV         | | Profile                                     | |
| [Boards]               5    | | [Profile active]     | |                                             | |
| [Inbox]                3    | | [Notifications]      | |        Alex Kim                             | |
| [Today]                     | | [Appearance]         | | [AK]   Product Engineer - alex@beacon.dev   | |
|                             | | [Workspace]          | |        [Upload]  Remove                     | |
| TEAM                        | | [Security]           | |                                             | |
| [Members]                   | | [Billing]            | | +----------------+ +----------------+       | |
|                             | |                      | | | Full name      | | Username       |       | |
| ACCOUNT                     | |                      | | | Alex Kim       | | @alexk         |       | |
| [Settings active]           | |                      | | +----------------+ +----------------+       | |
| [Help & feedback]           | |                      | | +-------------------------------------+     | |
|                             | |                      | | | Email: alex@beacon.dev              |     | |
|                             | |                      | | +-------------------------------------+     | |
|                             | |                      | | Used for sign-in and notifications.         | |
|                             | |                      | | +-------------------------------------+     | |
|                             | |                      | | | Bio textarea                         |     | |
|                             | |                      | | +-------------------------------------+     | |
|                             | |                      | |                                             | |
|                             | |                      | | Notifications                                | |
|                             | |                      | | Email digest                     [on]        | |
|                             | |                      | | Mentions and assignments         [on]        | |
|                             | |                      | | Due-date reminders               [off]       | |
|                             | |                      | | Comment replies                  [on]        | |
|                             | |                      | |                                             | |
|                             | |                      | | Appearance                                  | |
|                             | |                      | | [Light selected] [Dark] [System]            | |
|                             | |                      | | Compact density                 [off]       | |
|                             | |                      | |                                             | |
|                             | |                      | | Danger zone                                | |
|                             | |                      | | Delete account      [Delete account]        | |
|                             | +----------------------+ +---------------------------------------------+ |
+-----------------------------+------------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer is visible and rail is hidden.
- Drawer active item is Settings under Account.
- Main content uses a two-column settings grid: 220px in-page nav plus flexible form content.
- In-page nav is an outlined card with Profile active.
- Profile header lays out avatar left and user details/actions to the right.
- Full name and Username are side by side; Email and Bio are full width.
- Notification, appearance, compact density, and danger-zone sections continue below profile.
