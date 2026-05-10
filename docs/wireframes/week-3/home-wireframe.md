# Student Home Wireframe

Date: 2026-05-10

## Goal

The home screen should make the next learning action obvious within 3 seconds while keeping save state and progress reassuring but secondary.

## Mobile Structure

```text
[StudentShell]
  Header: 수포수포 + save badge
  TodayPanel
    Recommended action
    Confidence copy
    Primary CTA
    Mini progress
  Progress summary
  Recent activity
  World preview rail
  Secondary actions
```

## Tablet Structure

- Left column: `TodayPanel`, recent activity.
- Right column: progress summary, world preview.
- Keep the primary CTA in the first viewport.

## Desktop Structure

- Centered app canvas with two columns.
- `TodayPanel` remains visually dominant.
- Avoid dense admin dashboard treatment.

## Required Content

| Area | Content | Primitive |
| --- | --- | --- |
| Save badge | local, synced, syncing, sync-error | `Badge`, `FeedbackPanel` for errors |
| Recommended action | continue current level or start first level | `Card`, `Button` |
| Progress summary | current level, unlocked level, completed count | `Card`, `ProgressBar` |
| Recent activity | last attempt result or empty state | `Card`, `Badge` |
| World preview | 3 to 5 world cards, current world first | `Card`, `Badge`, later `WorldCard` |

## Primary CTA

Default: `Lv.1부터 시작하기`

Returning student: `이어서 풀기`

After failed attempt: `비슷한 문제 다시 풀기`

## States

| State | Home behavior |
| --- | --- |
| First visit | Start CTA points to the first open addition level. |
| Local save only | Show `이 기기에 안전하게 저장 중`. |
| Logged out | Mention Google as optional portability, not a blocker. |
| Syncing | Keep play CTA enabled. |
| Synced | Show quiet confirmation. |
| Sync error | Reassure that local progress is safe. |
| No recent activity | Replace the recent card with one friendly starter clue. |

## Accessibility And Copy

- No student-facing grade labels.
- Save state cannot rely on icon alone.
- Touch targets must be at least 44px.
- Primary CTA should be reachable before long scrolling on 390px width.
