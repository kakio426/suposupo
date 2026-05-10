# Week 1 Design System Backlog

Date: 2026-05-10

## Goal

This backlog turns the Week 1 audit into Week 2 design-system work. The goal is to make future UI work faster, more consistent, and easier to QA.

## P1 Tokens

| Token group | Needed decisions | Why now |
| --- | --- | --- |
| Color | Semantic colors for `surface`, `text`, `muted`, `primary`, `success`, `warning`, `danger`, `disabled`; world palettes for addition/subtraction/etc. | Current colors are repeated directly in Tailwind classes. |
| Typography | Korean body font, display/number font, scale for hero/title/body/caption/button. | Current fallback stack risks inconsistent rendering. |
| Radius | Control, card, panel, pill, circular icon. | Current arbitrary radii create inconsistent surfaces. |
| Shadow | Raised control, card, modal, pressed state. | Tactile UI depends on consistent depth. |
| Spacing | Screen padding, section gap, card padding, grid gap. | Home density and card nesting need a common rhythm. |
| Motion | Press, correct, repair, reward, reduced-motion alternatives. | Quiz interaction and accessibility depend on motion standards. |

## P1 Components

| Component | Required states |
| --- | --- |
| `Button` | primary, secondary, quiet, danger; loading, disabled, pressed; icon-left/right. |
| `IconButton` | default, selected, disabled; required `aria-label`. |
| `Card` | plain, elevated, command, status, world, result. |
| `Badge` | neutral, success, warning, locked, synced. |
| `ProgressBar` | set progress, level progress, mastery progress. |
| `QuizChoice` | idle, selected, correct, incorrect, revealed-correct, disabled. |
| `FeedbackPanel` | success, repair, hint, reward, sync-error. |
| `WorldCard` | playable, current, preview, locked, completed. |
| `SkillNode` | locked, open, current, completed, review. |

## P2 Screen Templates

| Template | Purpose |
| --- | --- |
| `StudentShell` | Mobile-first layout with tablet/desktop responsive slots. |
| `TodayPanel` | Home top module with the one recommended action. |
| `WorldPreviewRail` | Short home preview of relevant worlds. |
| `WorldMapLayout` | Stage clusters and level path for a single world. |
| `QuizLayout` | Header progress, prompt, manipulative area, answer grid, feedback. |
| `ResultLayout` | Mastery state, repair clue, reward, next action. |

## P2 Documentation

- `docs/design/principles.md`: premium kids tone, no-grade policy, failure language.
- `docs/design/tokens.md`: token names and examples.
- `docs/design/components.md`: component contracts and states.
- `docs/design/qa.md`: viewport, accessibility, motion, copy checks.

## Implementation Order

1. Add design docs scaffold and token naming.
2. Move repeated button/card/progress styles into UI primitives.
3. Replace home buttons/cards with primitives without changing behavior.
4. Replace quiz choice buttons and feedback panels.
5. Add reduced-motion CSS.
6. Rework home IA using `TodayPanel` and `WorldPreviewRail`.

## Week 2 Done Criteria

- New UI primitives exist and are used by home and quiz.
- Token names are documented and reflected in Tailwind/CSS.
- Icon-only buttons require accessible labels.
- `npm run build` passes.
- Updated screenshots show no regression in 390px mobile layout.

