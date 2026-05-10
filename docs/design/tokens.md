# Design Tokens

Date: 2026-05-10

## CSS Variables

Tokens live in `app/globals.css` and are exposed to Tailwind through `tailwind.config.js`.

## Color

| Token family | Purpose |
| --- | --- |
| `surface` | App background, panels, raised cards. |
| `ink` | Strong, base, and muted text. |
| `brand` | Primary Suposupo green actions and highlights. |
| `success` | Correct answers and successful sync. |
| `warning` | Placement, hints, retry, sync waiting. |
| `danger` | Incorrect answer repair states. |
| `neutral` | Secondary surfaces, borders, disabled states. |

## Typography

| Token | Use |
| --- | --- |
| `font-body` | Korean body copy and general UI. |
| `font-display` | Large level, score, world title, playful labels. |
| `font-game` | Compatibility alias for existing playful UI. |

## Radius

| Token | Use |
| --- | --- |
| `radius-control` | Small controls and icon buttons. |
| `radius-button` | Large tactile command buttons. |
| `radius-card` | Standard content cards. |
| `radius-panel` | Hero/result panels. |
| `radius-choice` | Quiz answer choices. |
| `radius-pill` | Badges and progress bars. |

## Shadow

| Token | Use |
| --- | --- |
| `shadow-soft` | Cards and secondary controls. |
| `shadow-control` | Tactile buttons and quiz choices. |
| `shadow-jelly` | Existing premium raised panels. |
| `shadow-panel` | Future modal/large panel depth. |

## Motion

| Token | Use |
| --- | --- |
| `duration-fast` | Button press and hover. |
| `duration-base` | Normal UI transitions. |
| `duration-slow` | Progress bar and reward movement. |

Reduced motion is handled globally with `prefers-reduced-motion: reduce`.

