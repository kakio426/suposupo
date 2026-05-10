# Design QA

Date: 2026-05-10

## Week 2 Verification

| Check | Result | Notes |
| --- | --- | --- |
| Build | Pass | `npm run build` completed successfully after token and component changes. |
| Screenshot baseline | Pass | Week 2 screenshots saved in `docs/ux-audit/week-2/screenshots/`. |
| Mobile 390x844 | Pass | Home, skill map, quiz, feedback, and result captured. |
| Mobile 430x932 | Pass | Home captured. |
| Tablet 768x1024 | Pass | Home captured with responsive layout. |
| Desktop 1280x720 | Pass | Home captured with responsive layout. |
| Icon-only controls | Pass | Skill map and quiz close controls use `aria-label="홈으로 돌아가기"`. |
| Reduced motion | Pass | Global `prefers-reduced-motion: reduce` rule added. |
| Student grade labels | Pass | Student-facing app text no longer exposes `학년` labels. |
| Local/Supabase logic | Pass | No schema or persistence API changes were made. |

## Screenshot Set

| File | Viewport | Screen |
| --- | --- | --- |
| `01-home-top-mobile-390.png` | 390x844 | Home top |
| `02-home-full-mobile-390.png` | 390xfull | Full home |
| `03-addition-skill-map-mobile-390.png` | 390x844 | Addition skill map |
| `04-quiz-question-mobile-390.png` | 390x844 | Quiz question |
| `05-quiz-feedback-mobile-390.png` | 390x844 | Quiz feedback |
| `06-result-mobile-390.png` | 390x844 | Result |
| `07-home-mobile-430.png` | 430x932 | Large mobile home |
| `08-home-tablet-768.png` | 768x1024 | Tablet home |
| `09-home-desktop-1280.png` | 1280x720 | Desktop home |

## Ongoing QA Rules

- Every icon-only button needs an accessible label.
- Every quiz state needs color, icon, and text, not color alone.
- Motion may enrich feedback but cannot be required to understand state.
- New student-facing copy should not mention school grade labels.
- Large responsive layouts should not default to a lonely mobile column when the screen can support a split layout.

