# Week 4 QA

Date: 2026-05-10

## Scope

Week 4 converted the Week 3 wireframes into reusable code structure for student home, Addition Forest map, level detail, quiz, and result screens.

## Verification

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| Home to quiz to feedback to result browser flow | Pass |
| Map opens with current level detail panel | Pass |
| Addition Forest shows 8 clusters and 30 level nodes | Pass |
| 390x844 viewport | Pass |
| 430x932 viewport | Pass |
| 768x1024 viewport | Pass |
| 1280x720 viewport | Pass |
| Horizontal overflow | Pass |
| Minimum button height 44px | Pass |
| Icon-only buttons have `aria-label` | Pass |
| Student-facing `학년` text | Pass, not present in rendered app |
| `.env.local` ignored | Pass |

## Notes

- Supabase schema and save contract were not changed.
- Routes were not split; `/worlds` and `/worlds/[worldId]` remain future work.
- Non-addition worlds remain preview or locked cards only.
- Quiz choices now include state in their accessible labels.
