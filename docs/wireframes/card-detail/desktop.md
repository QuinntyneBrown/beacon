# Card Detail - Desktop Wireframe

Source mock: `docs/mocks/card.html`  
Source screenshot: `docs/mocks/screenshots/card-desktop.png`  
Responsive state: desktop app shell, expanded drawer, two-column card-detail content.

## Layout

```text
STICKY TOP APP BAR
+------------------------------------------------------------------------------------------------------+
| [back] [logo] Beacon   Card - BWA-142                                      [share] [watch] [more] [AK] |
+------------------------------------------------------------------------------------------------------+

+-----------------------------+------------------------------------------------------------------------+
| NAV DRAWER                  | MAIN CONTENT                                                           |
|                             |                                                                        |
| +-------------------------+ | Boards > Beacon Web App > In progress                                  |
| | [+] New card            | |                                                                        |
| +-------------------------+ | Fix drag-and-drop scroll on long boards     [Watch] [Move] [Mark done] |
|                             | BWA-142 - created by Alex K. - 2 days ago                               |
| WORKSPACE                   |                                                                        |
| [Boards active]        5    | [Bug] [Feature] [Sprint 14] [High priority]                             |
| [Inbox]                3    |                                                                        |
| [Today]                     | +------------------------------------------------------+ +-------------+ |
|                             | | MAIN COLUMN                                          | | META COLUMN | |
| THIS BOARD                  | |                                                      | |             | |
| [Board view]                | | Description                                          | | STATUS      | |
| [List view]                 | | long bug summary and acceptance criteria             | | In progress | |
| [Reports]                   | |                                                      | |             | |
|                             | | Checklist 3 of 5                                     | | ASSIGNEES   | |
|                             | | [progress 60%]                                       | | AK JM +     | |
|                             | | [x] Reproduce in staging                             | |             | |
|                             | | [x] Identify event handler regression                | | DUE DATE    | |
|                             | | [x] Add failing playwright test                      | | Today 5 PM  | |
|                             | | [ ] Implement fix using IntersectionObserver         | |             | |
|                             | | [ ] Code review + ship behind flag                   | | ESTIMATE    | |
|                             | |                                                      | | 4h          | |
|                             | | Attachments                                          | |             | |
|                             | | [image] drag-bug-recording.mp4       [download]      | | REPORTER    | |
|                             | | [file]  repro-steps.md               [download]      | | AK Alex K.  | |
|                             | |                                                      | |             | |
|                             | | Activity                                             | | LINKED      | |
|                             | | [AK] comment textarea                                | | PR #842     | |
|                             | | [Cancel] [Comment]                                   | | Issue #117  | |
|                             | | [JM] [SR] [AK] comments                              | |             | |
|                             | |                                                      | | History     | |
|                             | +------------------------------------------------------+ | four lines  | |
|                             |                                                          +-------------+ |
+-----------------------------+------------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation drawer is visible and rail is hidden.
- Main content starts with breadcrumb, then page header, then label tags.
- Card-detail grid is two columns: flexible main column plus 280px metadata column.
- Metadata column begins high beside the description/checklist area.
- History is in the metadata column on desktop.
- Activity composer includes avatar, outlined textarea, and right-aligned Cancel/Comment actions.
