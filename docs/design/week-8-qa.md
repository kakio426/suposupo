# Week 8 QA - Carry Blocks Learning UI v1

Date: 2026-05-10

## Scope

Week 8 added a carry-blocks learning model for Addition Forest `two_digit_with_carry` questions.

In scope:

- `two_digit_with_carry` question `visualModel`
- Carry-blocks rendering inside the existing quiz manipulative slot
- `/play/addition/16` through `/play/addition/22`
- Placement carry question reuse
- Carry-specific repair hint

Out of scope:

- Drag/drop grading
- Full vertical addition input
- Supabase schema changes
- Non-addition playable worlds

## Build

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| `git diff --check` | Pass |
| `/play/[worldId]/[level]` route still generated | Pass |

## Data Contract Checks

| Check | Result |
| --- | --- |
| `generateAdditionQuestions(16)` includes `visualModel.type="carry-blocks"` | Pass |
| Carry model ones/tens values compose to total | Pass |
| `generateAdditionQuestions(6)` still includes `ten-frame` | Pass |
| Placement Lv.16/Lv.22 carry questions include `carry-blocks` | Pass |
| UI reads `visualModel` instead of parsing question text | Pass |

## URL / Flow Checks

| Flow | Result |
| --- | --- |
| `/` | Pass |
| `/worlds/addition` | Pass |
| `/play/addition/6` | Pass, ten-frame regression ok |
| `/play/addition/16` | Pass, carry-blocks shown |
| `/play/addition/22` | Pass, carry route stable |
| `/play/addition/999` | Pass, safe fallback |
| Carry incorrect answer shows specific repair hint | Pass |
| Carry result next action routes to `/play/addition/17` | Pass |
| Placement carry question renders carry-blocks | Pass |

## Responsive / Accessibility Smoke

Viewport checks were run for `/`, `/worlds/addition`, `/play/addition/6`, `/play/addition/16`, `/play/addition/22`, and `/play/addition/999`.

| Viewport | Result |
| --- | --- |
| 390x844 | Pass |
| 430x932 | Pass |
| 768x1024 | Pass |
| 1280x720 | Pass |

Additional checks:

- No horizontal overflow detected.
- Visible buttons remain at least 44px by 44px.
- Carry-blocks model exposes an `aria-label` with ones-place and tens-place carry details.
- Carry state uses text, numbers, and icons in addition to color.
- Student-facing route text does not expose `학년`.

## Regression Notes

- Four-choice answering remains the grading mechanism.
- Existing auto-advance timing remains unchanged.
- Ten-frame model remains active for `make_10`.
- LocalStorage progress persistence remains unchanged.
- Supabase save helpers remain unchanged.
- `.env.local` is not part of the intended commit scope.

## Residual Risk

- The carry-blocks model is explanatory only; it does not support direct manipulation or drag/drop scoring.
- Full vertical addition and carry-queue animation are still future work.
