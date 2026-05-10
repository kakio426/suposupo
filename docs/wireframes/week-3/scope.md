# Week 3 Scope

Date: 2026-05-10

## Goal

Week 3 fixes the core student app wireframes before another large implementation pass. The output should be specific enough that Week 4 can build screens without re-deciding navigation, hierarchy, CTA priority, or core states.

## Inputs

- Week 1 UX audit: `docs/ux-audit/week-1/`
- Week 2 design system contracts: `docs/design/`
- Current app behavior: home, addition world map, quiz, feedback, result, local/Supabase save states
- Product rule: student-facing screens follow `학년명 노출 금지`. Use worlds, levels, skills, and quests instead.

## Included Screens

| Screen | Week 3 output |
| --- | --- |
| Student home | Today-first wireframe with progress, save state, recent activity, and world preview. |
| Full world map | Four curriculum regions with playable, preview, locked, and current states. |
| Single world map | Addition Forest stage clusters and 30-level path specification. |
| Level detail | Objective, confidence framing, problem count, interaction mode, start/review/locked states. |
| Quiz play | Progress, problem, optional manipulative zone, four choices, answer feedback. |
| Correct/incorrect feedback | Success and repair states that do not rely only on color or motion. |
| Result/reward | Mastery state, score, strengths, today's sense, reward, next action. |

## Excluded

- Parent or teacher dashboard.
- Full play implementation for non-addition worlds.
- Supabase schema changes.
- Route implementation or app router split.
- New analytics pipeline.
- Figma or Storybook automation.

## Decisions For This Week

- `/` remains the current student home.
- `/worlds`, `/worlds/[worldId]`, and `/play/[worldId]/[level]` are route candidates for later implementation, not Week 3 code tasks.
- The student app keeps a touch-first, typing-free default.
- Four-choice quizzes remain the fastest playable loop, while manipulation zones are specified as progressive enhancements.
- Failure copy must preserve safety: local progress is safe even when sync fails, and quiz mistakes trigger repair guidance.

## Done Criteria

- Every included screen has mobile, tablet, and desktop framing.
- Every included screen has a primary CTA.
- Every included screen lists required states.
- Wireframes specify which Week 2 primitives should be used.
- No student-facing wireframe uses grade labels, and the `학년명 노출 금지` rule is visible in the spec.
- Week 4 backlog separates documentation-only decisions from code changes.
