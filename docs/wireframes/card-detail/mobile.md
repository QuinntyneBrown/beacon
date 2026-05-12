# Card Detail - Mobile Wireframe

Source mock: `docs/mocks/card.html`  
Source screenshot: `docs/mocks/screenshots/card-mobile.png`  
Responsive state: mobile app shell, content stacked, side metadata appears below activity, bottom navigation fixed.

## Layout

```text
STICKY TOP APP BAR
+----------------------------------------------------------------+
| [back] [logo] Beacon  Card - BWA-142      [share] [eye] [more] [AK] |
+----------------------------------------------------------------+

MAIN CONTENT - single column

Boards  >  Beacon Web App  >  In progress

Fix                         [Watch] [Move] [Mark done]
drag-
and-
drop
scroll
on long
boards
BWA-142 - created by Alex K. - 2 days ago

[Bug] [Feature] [Sprint 14] [High priority]

SECTION: Description
On boards with more than three columns, dragging a card near the
screen edges does not auto-scroll the column container.
Reproducible in Chrome 124 and Safari 17. Affects mouse and touch input.

Acceptance criteria: Drag from rightmost column to first column without
manual scrolling. Snapshot test added.

SECTION: Checklist  3 of 5
[progress 60%]

STICKY OVERLAY WHILE SCROLLED
+----------------------------------------------------------------+
| bottom nav: [Boards active] [Inbox badge 3] [Today] [Profile]  |
+----------------------------------------------------------------+

[x] Reproduce in staging
[x] Identify event handler regression
[x] Add failing playwright test
[ ] Implement fix using IntersectionObserver
[ ] Code review + ship behind flag

SECTION: Attachments
[image icon] drag-bug-recording.mp4       [download]
             2.4 MB - added by Jamie M.
[file icon]  repro-steps.md               [download]
             12 KB - added by Alex K.

SECTION: Activity
[AK] +----------------------------------------------------------+
     | Write a comment, @mention to notify                     |
     |                                                          |
     +----------------------------------------------------------+
                                             [Cancel] [Comment]

[JM] Jamie M.  2h ago
     Reproduced. The handler attaches before columns mount.
     Likely a regression from the virtualization PR.

[SR] Sam R.  1h ago
     Nice find. Want me to pair on the fix this afternoon?

[AK] Alex K.  12m ago
     Yes please - 3 PM works. I'll prep a branch.

SIDE META - stacked below main content on mobile

STATUS
[In progress]

ASSIGNEES
[AK][JM] [+]

DUE DATE
[calendar] Today, 5:00 PM

ESTIMATE
[timer] 4h

REPORTER
[AK] Alex K.

LINKED
PR #842
Issue #117

SECTION: History
Sam R. added a checklist item - 30m
Jamie M. moved card to In progress - 1h
Alex K. attached repro-steps.md - 2h
Alex K. created the card - 2d
```

## Exact Content And Behavior

- The long card title wraps into very narrow lines because action buttons occupy the same header row in the mobile mock.
- Action buttons remain horizontally grouped: Watch, Move, Mark done.
- Breadcrumb is visible above the title.
- Label tags sit directly under the title metadata.
- Side metadata is not a side column on mobile; it appears after activity comments.
- Bottom navigation is fixed and may overlay the long-page screenshot while scrolling.
