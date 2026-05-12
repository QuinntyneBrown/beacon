# Card Detail - Tablet Wireframe

Source mock: `docs/mocks/card.html`  
Source screenshot: `docs/mocks/screenshots/card-tablet.png`  
Responsive state: tablet app shell, navigation rail, content stacked because inner card-detail grid has not reached desktop breakpoint.

## Layout

```text
STICKY TOP APP BAR
+--------------------------------------------------------------------------------+
| [back] [logo] Beacon   Card - BWA-142                         [share] [eye] [more] [AK] |
+--------------------------------------------------------------------------------+

+----------+---------------------------------------------------------------------+
| NAV RAIL | MAIN CONTENT                                                        |
|          |                                                                     |
| [+]      | Boards > Beacon Web App > In progress                                |
|          |                                                                     |
| Boards   | Fix drag-and-drop scroll on long boards      [Watch] [Move] [Mark done] |
| Inbox    | BWA-142 - created by Alex K. - 2 days ago                             |
| Today    |                                                                     |
| Team     | [Bug] [Feature] [Sprint 14] [High priority]                           |
| Settings |                                                                     |
|          | Description                                                          |
|          | On boards with more than three columns, dragging a card near the      |
|          | screen edges does not auto-scroll the column container...             |
|          | Acceptance criteria: Drag from rightmost column to first column...    |
|          |                                                                     |
|          | Checklist  3 of 5                                                     |
|          | [progress 60%]                                                        |
|          | [x] Reproduce in staging                                              |
|          | [x] Identify event handler regression                                 |
|          | [x] Add failing playwright test                                       |
|          | [ ] Implement fix using IntersectionObserver                          |
|          | [ ] Code review + ship behind flag                                    |
|          |                                                                     |
|          | Attachments                                                          |
|          | [image] drag-bug-recording.mp4                      [download]        |
|          | [file]  repro-steps.md                              [download]        |
|          |                                                                     |
|          | Activity                                                             |
|          | [AK] [comment textarea]                                               |
|          |                                      [Cancel] [Comment]              |
|          | [JM] Jamie M. comment                                                 |
|          | [SR] Sam R. comment                                                   |
|          | [AK] Alex K. comment                                                  |
|          |                                                                     |
|          | STATUS [In progress]                                                  |
|          | ASSIGNEES [AK][JM] [+]                                                |
|          | DUE DATE [Today, 5:00 PM]                                             |
|          | ESTIMATE [4h]                                                         |
|          | REPORTER [AK] Alex K.                                                 |
|          | LINKED PR #842 / Issue #117                                           |
|          |                                                                     |
|          | History                                                               |
|          | four chronological activity lines                                     |
+----------+---------------------------------------------------------------------+
```

## Exact Content And Behavior

- Navigation rail is visible; bottom navigation is hidden.
- The page header title uses normal wrapping, not the narrow mobile title wrap.
- Action buttons remain on the right of the title row.
- Main content and metadata are stacked vertically at tablet width.
- Activity comments are separated by horizontal rules.
- Side metadata block appears before History but below Activity.
