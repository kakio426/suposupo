# Week 7 QA - Ten Frame Learning UI v1

Date: 2026-05-10

## Scope

Week 7 added the first manipulative learning model inside the `/play` quiz surface.

In scope:

- `make_10` question `visualModel`
- Ten-frame and extended-frame rendering
- `/play/addition/6` through `/play/addition/10`
- Placement `make_10` reuse
- Type-specific repair hint for ten-frame mistakes

Out of scope:

- Drag/drop grading
- Supabase schema changes
- Non-addition playable worlds
- Placement route split

## Build

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| `git diff --check` | Pass |
| `/play/[worldId]/[level]` route still generated | Pass |

## Data Contract Checks

| Check | Result |
| --- | --- |
| `generateAdditionQuestions(6)` includes `visualModel.type="ten-frame"` | Pass |
| `generateAdditionQuestions(1)` has no `visualModel` | Pass |
| Placement `make_10` question includes ten-frame `visualModel` | Pass |
| UI reads `visualModel` instead of parsing question text | Pass |

## URL / Flow Checks

| Flow | Result |
| --- | --- |
| `/` | Pass |
| `/worlds/addition` | Pass |
| `/play/addition/1` | Pass, no ten-frame shown |
| `/play/addition/6` | Pass, ten-frame shown |
| `/play/addition/10` | Pass, ten-frame route stable |
| `/play/addition/999` | Pass, safe fallback |
| `make_10` incorrect answer shows specific repair hint | Pass |
| `make_10` result next action routes to `/play/addition/7` | Pass |
| Placement third question renders ten-frame | Pass |

## Responsive / Accessibility Smoke

Viewport checks were run for `/`, `/worlds/addition`, `/play/addition/1`, `/play/addition/6`, `/play/addition/10`, and `/play/addition/999`.

| Viewport | Result |
| --- | --- |
| 390x844 | Pass |
| 430x932 | Pass |
| 768x1024 | Pass |
| 1280x720 | Pass |

Additional checks:

- No horizontal overflow detected.
- Visible buttons remain at least 44px by 44px.
- Ten-frame model exposes an `aria-label` describing filled and missing slots.
- Filled and empty slots use symbols/text in addition to color.
- Student-facing route text does not expose `학년`.

## Regression Notes

- Four-choice answering remains the grading mechanism.
- Existing auto-advance timing remains unchanged.
- LocalStorage progress persistence remains unchanged.
- Supabase save helpers remain unchanged.
- `.env.local` is not part of the intended commit scope.

## Residual Risk

- The ten-frame is currently explanatory only; it does not support direct manipulation or drag/drop scoring.
- Extended targets 12 and 15 render as 10 base slots plus extension slots, but they are not yet animated.
