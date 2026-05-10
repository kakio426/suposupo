# Week 1 Accessibility And Responsive Audit

Date: 2026-05-10

## Summary

The mobile touch targets are generally strong, but accessibility semantics and responsive layouts need system-level attention before the app scales. Current tablet and desktop views behave like enlarged mobile screens.

## Viewports Checked

| Viewport | Screenshot | Result |
| --- | --- | --- |
| 390x844 | `01-home-top-mobile-390.png` | Primary mobile target works, but home is long. |
| 430x932 | `07-home-mobile-430.png` | Larger mobile works with similar density. |
| 768x1024 | `08-home-tablet-768.png` | Content remains narrow, leaving unused space. |
| 1280x720 | `09-home-desktop-1280.png` | Desktop does not use available layout affordances. |

## Findings

| Priority | Screen | Issue | Impact | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | Tablet/desktop | App stays in a `max-w-md` column. | Product feels mobile-only and less enterprise-grade. | Add responsive layout shells and use side panels or split views above tablet width. |
| P1 | Skill map | Back control is icon-only without explicit accessible label. | Screen reader and keyboard users get weak navigation context. | Add `aria-label="홈으로 돌아가기"` and consistent nav labels. |
| P1 | All animated states | No `prefers-reduced-motion` handling. | Motion-sensitive users cannot opt out of shake/bounce. | Add reduced-motion CSS and avoid relying only on motion for feedback. |
| P2 | World cards | Long Korean explanations can create dense reading blocks. | Young learners may skip or misunderstand text-heavy areas. | Shorten student-facing copy; move explanatory curriculum detail to parent/teacher surfaces. |
| P2 | Buttons | Most primary touch targets are large enough. | Good baseline, but needs token enforcement. | Codify minimum 44px target and 8px spacing rule. |
| P2 | Contrast | Most text is readable; some muted gray text is close to low contrast on glass cards. | Secondary info can become hard to read. | Define accessible text tokens for muted, secondary, disabled, and inverse text. |

## Accessibility Rules For Redesign

- Minimum touch target: 44x44px.
- No icon-only navigation without `aria-label`.
- No feedback conveyed by color or motion alone.
- Long Korean copy should wrap cleanly inside all cards and buttons.
- Support `prefers-reduced-motion: reduce`.

