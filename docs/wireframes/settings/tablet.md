# Settings - Tablet Wireframe

Source mock: `docs/mocks/settings.html`  
Source screenshot: `docs/mocks/screenshots/settings-tablet.png`  
Responsive state: tablet app shell, navigation rail, settings content stacked.

## Layout

```text
STICKY TOP APP BAR
+--------------------------------------------------------------------------------+
| [menu] [logo] Beacon   Settings                                      [help] [AK] |
+--------------------------------------------------------------------------------+

+----------+---------------------------------------------------------------------+
| NAV RAIL | MAIN CONTENT                                                        |
|          |                                                                     |
| [+]      | Settings                                      [Save changes]          |
|          | Manage your profile, workspace, and notifications                     |
| Boards   |                                                                     |
| Inbox    | +---------------------------------------------------------------+     |
| Today    | | SETTINGS NAV CARD                                             |     |
| Team     | | [person] Profile          active full-width row                |     |
| Settings | | [bell]   Notifications                                      |     |
| active   | | [palette] Appearance                                       |     |
|          | | [nodes] Workspace                                         |     |
|          | | [key] Security                                            |     |
|          | | [card] Billing                                            |     |
|          | +---------------------------------------------------------------+     |
|          |                                                                     |
|          | Profile                                                             |
|          | [AK]  Alex Kim                                                       |
|          |       Product Engineer - alex@beacon.dev                             |
|          |       [Upload]  Remove                                               |
|          |                                                                     |
|          | +---------------------------+ +---------------------------+          |
|          | | Full name: Alex Kim       | | Username: @alexk          |          |
|          | +---------------------------+ +---------------------------+          |
|          | +---------------------------------------------------------------+     |
|          | | Email: alex@beacon.dev                                      |     |
|          | +---------------------------------------------------------------+     |
|          | +---------------------------------------------------------------+     |
|          | | Bio: Engineer working on the Beacon kanban experience...      |     |
|          | +---------------------------------------------------------------+     |
|          |                                                                     |
|          | Notifications                                                       |
|          | Email digest                                      [switch on]        |
|          | Mentions and assignments                          [switch on]        |
|          | Due-date reminders                                [switch off]       |
|          | Comment replies                                   [switch on]        |
|          |                                                                     |
|          | Appearance                                                          |
|          | [Light selected] [Dark] [System]                                    |
|          | Compact density                                  [switch off]        |
|          |                                                                     |
|          | Danger zone                                                         |
|          | Delete account                                  [Delete account]     |
+----------+---------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation rail is visible with Settings active.
- The in-page settings nav remains above the form because tablet width is below the inner 900px settings-grid breakpoint.
- Save changes is right-aligned in the page header.
- Main form fields use two columns for Full name and Username, then full-width Email and Bio.
- Notification rows have text left and switches right.
- No bottom navigation appears.
