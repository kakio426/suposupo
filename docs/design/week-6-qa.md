# Week 6 QA - `/play` Route Split

Date: 2026-05-10

## Scope

Week 6 moved the level quiz/result loop from the home screen state machine into `/play/[worldId]/[level]`.

In scope:

- `/play/addition/1` through `/play/addition/30`
- Unsupported play route fallback
- Home start CTA routing
- Addition world detail start CTA routing
- Result next/review/map/home actions
- Existing placement flow remains on `/`

Out of scope:

- Supabase schema changes
- Non-addition playable worlds
- Placement route split
- Manipulative ten-frame UI

## Build

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| Dynamic route generated | Pass: `/play/[worldId]/[level]` |
| Existing `/`, `/worlds`, `/worlds/[worldId]` routes | Pass |

## URL Checks

| URL | Expected | Result |
| --- | --- | --- |
| `/` | Student home | Pass |
| `/worlds` | Full world map | Pass |
| `/worlds/addition` | Addition Forest map | Pass |
| `/play/addition/1` | Playable level route | Pass |
| `/play/addition/30` | Playable final supported level | Pass |
| `/play/addition/999` | Safe fallback to Addition Forest map | Pass |
| `/play/shapes/1` | Safe "preparing" fallback to worlds | Pass |

## Flow Checks

| Flow | Result |
| --- | --- |
| Home start CTA -> `/play/addition/1` | Pass |
| `/worlds/addition` start CTA -> `/play/addition/{level}` | Pass |
| Play five questions -> result | Pass |
| Result next level -> `/play/addition/2` | Pass |
| Result map CTA -> `/worlds/addition` | Pass |
| Legacy `/?startLevel=1` fallback -> `/play/addition/1` | Pass by code path |

## Responsive / Accessibility Smoke

Viewport checks were run for `/`, `/worlds`, `/worlds/addition`, `/play/addition/1`, `/play/addition/999`, and `/play/shapes/1`.

| Viewport | Result |
| --- | --- |
| 390x844 | Pass |
| 430x932 | Pass |
| 768x1024 | Pass |
| 1280x720 | Pass |

Additional checks:

- No horizontal overflow detected.
- Visible buttons remain at least 44px by 44px.
- Icon-only controls keep `aria-label` through existing primitives.
- Student-facing route text does not expose `학년`.
- Correct/incorrect states still include text/icon feedback, not motion alone.

## Regression Notes

- `useLearningProgress` remains the progress/auth/sync contract.
- LocalStorage persistence remains active through `setProgress` in the shared hook.
- Supabase save helpers are reused for addition attempts and progress.
- `.env.local` is not part of the intended commit scope.

## Residual Risk

- The placement flow still lives inside `/` by design for Week 6.
- Route-level progress state is still hook-based per route; a shared provider can be considered later if cross-route auth/sync state flicker becomes visible.
