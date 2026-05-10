# Week 1 Integrated UX Audit

Date: 2026-05-10

## Summary

The current MVP has a strong educational concept and a usable mobile quiz loop. The enterprise-grade gap is not the idea; it is systemization: design tokens, component contracts, responsive layout, student-first information architecture, accessible state semantics, and richer learning feedback.

## Priority Findings

| Priority | Area | Screen | Cause | Impact | Recommended direction |
| --- | --- | --- | --- | --- | --- |
| P0 | None | N/A | No issue currently blocks the app from being used for the basic student quiz loop. | MVP flow remains usable. | Continue redesign without emergency rewrite. |
| P1 | IA | Home | Too many jobs live on one long home feed. | Student's next action competes with curriculum browsing and status content. | Split home into focused daily launcher; move full catalog to worlds page. |
| P1 | Design system | All | Styles are one-off Tailwind class strings. | Scaling to 10 worlds will create inconsistent UI. | Establish tokens and reusable components before broad redesign. |
| P1 | Responsive | Tablet/desktop | Layout remains mobile max-width. | Larger screens feel unpolished and underused. | Add responsive shells and tablet/desktop compositions. |
| P1 | Interaction | Quiz | Wrong answers auto-advance too quickly and lack repair hints. | Students may repeat mistakes without understanding. | Add wrong-answer repair state using `mistakeType` and tap-to-continue. |
| P1 | Accessibility | Skill map | Icon-only back button lacks accessible label. | Navigation clarity/accessibility issue. | Add labels and a standard icon-button component. |
| P1 | State UX | Auth/sync | Save states are technically present but not confidence-building enough. | Users may worry about lost progress. | Rewrite save-state copy and add clear sync success/failure affordances. |
| P2 | Visual hierarchy | Home/world cards | Similar card styles and dense copy blur hierarchy. | Student has more to parse than needed. | Reduce nested cards, shorten copy, create surface roles. |
| P2 | Result | Result screen | Score is more concrete than mastery/repair guidance. | Feels closer to test feedback than growth feedback. | Lead with mastery state, next action, and one weak-skill repair cue. |
| P2 | Motion | Quiz/result | Motion has no reduced-motion alternative. | Accessibility risk. | Add reduced-motion CSS and non-motion feedback cues. |
| P3 | Content | World catalog | Curriculum explanations are useful but student-facing copy is long. | Younger learners may ignore it. | Keep detailed curriculum for docs/parent views; simplify student copy. |

## 2-Week Follow-On Recommendation

1. Week 2 should build the design system foundation before changing more feature logic.
2. First implementation target should be shared primitives: `Button`, `IconButton`, `Card`, `Badge`, `ProgressBar`, `FeedbackPanel`.
3. First product screen target should be home because it currently carries the most IA and visual load.

## Acceptance Criteria For Redesign Work

- Student can identify the next action within 3 seconds on home.
- Home does not require reading the full curriculum catalog to begin learning.
- Quiz wrong-answer state teaches one clue before moving on.
- Tablet and desktop layouts intentionally use available space.
- Auth/sync messaging always reassures that learning can continue.

