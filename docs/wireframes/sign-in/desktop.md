# Sign In - Desktop Wireframe

Source mock: `docs/mocks/login.html`  
Source screenshot: `docs/mocks/screenshots/login-desktop.png`  
Responsive state: desktop auth split layout, two columns.

## Layout

```text
FULL DESKTOP VIEWPORT
+-----------------------------------------+-----------------------------------------+
| LEFT HERO PANEL                          | RIGHT FORM AREA                         |
| blue/cyan gradient, full height          | pale cyan background, full height       |
|                                         |                                         |
|  [logo] Beacon                          |             +------------------------+  |
|                                         |             | AUTH CARD              |  |
|                                         |             | white, rounded, raised  |  |
|                                         |             |                        |  |
|                                         |             | [logo] Beacon           |  |
|                                         |             |                        |  |
|  Kanban that gets out                   |             | Welcome back            |  |
|  of your way.                           |             | Sign in to keep your    |  |
|                                         |             | team's work moving.     |  |
|  Beacon is a radically simple board     |             |                        |  |
|  for small project teams. No bloat.     |             | [Email address field]   |  |
|  No setup fatigue. Just the columns,    |             | alex@beacon.dev         |  |
|  cards, and clarity you actually        |             |                        |  |
|  need to ship.                          |             | [Password field]        |  |
|                                         |             | **********              |  |
|                                         |             | At least 8 characters.  |  |
|                                         |             |                        |  |
|  [bolt] Fast by default                 |             | [x] Remember me   Link  |  |
|         Drag, drop, done. Zero modal    |             |                        |  |
|         madness.                        |             | [Sign in full-width]    |  |
|                                         |             |                        |  |
|  [group] Built for small teams          |             | -- OR CONTINUE WITH --  |  |
|          Up to 10 collaborators per     |             |                        |  |
|          board, free forever.           |             | [Google]   [GitHub]    |  |
|                                         |             |                        |  |
|  [tools] Material 3 polish              |             | New to Beacon? Link     |  |
|          A calm, consistent interface   |             +------------------------+  |
|          across every device.           |                                         |
+-----------------------------------------+-----------------------------------------+
```

## Exact Content And Behavior

- The viewport is divided 50/50.
- Left hero is visible only on this wider layout.
- Hero brand is pinned near the upper-left, pitch text is vertically central, features are near the lower-left.
- Right form area centers the auth card horizontally and vertically.
- The auth card contents match mobile/tablet exactly.
