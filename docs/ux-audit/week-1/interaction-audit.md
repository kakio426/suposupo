# Week 1 Interaction Audit

Date: 2026-05-10

## Summary

The quiz interaction already satisfies the core product promise: no typing, large 4-choice buttons, immediate feedback, and fast progression. The next upgrade is to make feedback more instructive and to support slower learners without making the app feel heavy.

## Findings

| Priority | Screen | Issue | Impact | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | Quiz | Questions auto-advance after 1 second for both correct and incorrect answers. | Wrong answers may disappear before the student processes the repair clue. | Keep fast auto-advance for correct answers; require tap-to-continue or longer delay for wrong answers. |
| P1 | Quiz | Feedback says correct/incorrect but does not explain the mathematical reason. | Missed chance to repair misconceptions. | Use `mistakeType`, `focus`, and stage metadata to show one short repair hint. |
| P1 | Skill map | Icon-only back button has no visible label and no `aria-label`. | Accessibility and clarity issue. | Add `aria-label` and consider visible text on larger layouts. |
| P2 | Home/world cards | Locked worlds are visible but not interactive or explanatory beyond text. | Student may see many unavailable things without a sense of progress. | Add lock affordance, unlock progress preview, and clear “how to open” cue. |
| P2 | Result | Retry/next action is clear, but reward transition is minimal. | Less emotional payoff after effort. | Add level-up/retry animation and a small collectible/reward state. |
| P2 | Motion | Shake and bounce exist, but reduced-motion handling is absent. | Accessibility risk for motion-sensitive users. | Add CSS reduced-motion rules and avoid mandatory shake for error comprehension. |

## Interaction Patterns To Standardize

- Primary action: raised tactile button with clear pressed state.
- Answer feedback: correct, repair, reveal-correct, disabled.
- Progress feedback: level path, set progress, mastery progress.
- Failure language: narrative repair, not grade punishment.
- Transition timing: fast for success, slower and user-controlled for correction.

