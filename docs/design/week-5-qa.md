# Week 5 QA

Date: 2026-05-10

## Scope

Week 5 moved the student map experience from internal screen state to route-based navigation.

## Verification

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| Route `/` | Pass |
| Route `/worlds` | Pass |
| Route `/worlds/addition` | Pass |
| Route `/worlds/shapes` | Pass |
| Home to Addition Forest route | Pass |
| `/worlds` to Addition Forest card | Pass |
| Quiz result map CTA to `/worlds/addition` | Pass |
| 390x844 viewport | Pass |
| 430x932 viewport | Pass |
| 768x1024 viewport | Pass |
| 1280x720 viewport | Pass |
| Horizontal overflow | Pass |
| Minimum button height 44px | Pass |
| Icon-only buttons have `aria-label` | Pass |
| Student-facing `학년` text | Pass, not present in rendered routes |
| `.env.local` ignored | Pass |

## Notes

- Supabase schema and save contract were not changed.
- Existing quiz and result flow remain inside `/`.
- `/play/[worldId]/[level]` remains future work.
- Non-addition worlds are route-addressable as preview or locked detail pages.
