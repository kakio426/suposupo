# Week 3 Layout System

Date: 2026-05-10

## Purpose

These layout contracts prevent each screen from inventing a new structure. They sit above the Week 2 UI primitives and below future route/page implementation.

## `StudentShell`

Role: shared app frame for student screens.

Mobile:
- Single column.
- 16px screen padding.
- Sticky or top-anchored compact header only when a screen needs back/save context.
- Primary CTA stays within thumb reach when the screen has a final action.

Tablet:
- Center column max width around 720px for quiz/result.
- Two-column layout allowed for home/world overview.

Desktop:
- Constrained app canvas, not a sprawling dashboard.
- Secondary panels can sit beside the main task, but the next action remains obvious.

Required slots:
- `header`: title, save badge, back action when needed.
- `main`: screen-specific content.
- `support`: optional progress, recent activity, map preview, or explanation.
- `action`: primary CTA region.

## `TodayPanel`

Role: home top module.

Content order:
1. Recommended action title.
2. One-sentence confidence copy.
3. Primary CTA.
4. Micro progress indicator.

Rules:
- It must answer "what now?" in 3 seconds.
- It uses `Card` and `Button`.
- It must not become a marketing hero.

## `WorldMapLayout`

Role: visual exploration surface for full and single world maps.

Slots:
- `summary`: world/region title, progress, lock explanation.
- `map`: cards, clusters, and level nodes.
- `legend`: current, complete, locked, review.
- `next`: current recommended node.

Rules:
- Do not list 30 levels as a flat table.
- Clusters group levels into conceptual steps.
- Locked content can tease future worlds without showing grade labels.

## `QuizLayout`

Role: focused play loop.

Slots:
- `progress`: set progress and level label.
- `prompt`: large readable problem or instruction.
- `manipulative`: optional concrete model area.
- `choices`: 2x2 `QuizChoice` grid.
- `feedback`: `FeedbackPanel` appears after selection.

Rules:
- No typing.
- Choices must keep stable size before and after selection.
- Feedback must include icon/text, not only color or shake.
- The next question may auto-advance, but reduced motion must remain understandable.

## `ResultLayout`

Role: close a quiz set and select the next action.

Slots:
- `mastery`: success, ready, review, or repair state.
- `score`: correct count and set size.
- `strengths`: short list of what worked.
- `today`: today's sense or learning clue.
- `reward`: visual reward or unlock cue.
- `actions`: next level/review/home.

Rules:
- The result is not a report card.
- If the student did not advance, copy should frame the next repair action.
- Primary CTA changes by mastery state.
