# Week 1 Baseline

Date: 2026-05-10

## Purpose

This baseline freezes the current student-app UX before the enterprise-grade redesign work begins. It covers the current screen inventory, screenshot baseline, and the core student flow that every later design iteration must preserve or improve.

## Screenshot Baseline

Screenshots are stored in `docs/ux-audit/week-1/screenshots/`.

| File | Viewport | Screen | Notes |
| --- | --- | --- | --- |
| `01-home-top-mobile-390.png` | 390x844 | Home top | First-visit logged-out state with Google save CTA and primary learning CTA. |
| `02-home-full-mobile-390.png` | 390xfull | Full home | Full vertical scroll baseline including world catalog and recent record. |
| `03-addition-skill-map-mobile-390.png` | 390x844 | Addition skill map | Current 30-node path view. |
| `04-quiz-question-mobile-390.png` | 390x844 | Quiz question | 4-choice touch-only quiz state. |
| `05-quiz-feedback-mobile-390.png` | 390x844 | Quiz feedback | Immediate selected-answer feedback state. |
| `06-result-mobile-390.png` | 390x844 | Result | Post-quiz feedback, score, next action state. |
| `07-home-mobile-430.png` | 430x932 | Home responsive | Large mobile check. |
| `08-home-tablet-768.png` | 768x1024 | Home responsive | Tablet check. |
| `09-home-desktop-1280.png` | 1280x720 | Home responsive | Desktop check. |

## Current Screen Inventory

| Screen | Route/state | Primary job | Current notes |
| --- | --- | --- | --- |
| Student home | `/`, `screen=home` | Continue learning, start placement, view progress, sign in | Strong first CTA, but home contains dashboard, auth, world catalog, and history in one long feed. |
| Auth panel | Home section | Explain local/server save and Google sign-in | Available, but label `Google 저장` can be interpreted as save-only rather than sign-in and sync. |
| World shelf | Home section | Preview all curriculum worlds | Good breadth, but too much dense text is shown on the home feed. |
| Addition skill map | `screen=map` | Select available addition level | Playful path, but only addition is represented and back button lacks explicit text/label. |
| Quiz | `screen=quiz` | Answer 5 touch-only questions | Meets no-typing requirement and has strong button affordance. |
| Placement result | `screen=placement-result` | Show recommended starting level | Positive and direct, but not represented in screenshot baseline yet. |
| Quiz result | `screen=result` | Explain score and next action | Encouraging tone, but feedback is generic and not yet mastery-model driven. |

## Core Student Flow

1. Student opens the app.
2. Student sees the current learning world, save state, and primary CTA.
3. New student can choose `1분 진단으로 맞춤 시작`; returning student can choose `이어서 시작하기`.
4. Student answers 5 questions using only large 4-choice buttons.
5. The app gives immediate answer feedback and automatically advances.
6. After the set, the result screen gives score, positive feedback, and next action.
7. If the score passes the advance threshold, the next level unlocks; otherwise the same level is recommended for retry.
8. Progress is saved locally and, when authenticated, synced to Supabase.

## Baseline Constraints To Preserve

- No grade labels in student-facing learning flow.
- No keyboard input for quiz answers.
- Mobile-first layout remains the primary experience.
- Positive failure language remains mandatory.
- Supabase/local progress fallback must not block learning.

