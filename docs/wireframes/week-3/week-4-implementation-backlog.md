# Week 4 Implementation Backlog

Date: 2026-05-10

## Goal

Week 4 should turn the Week 3 wireframes into code without changing Supabase schema or implementing every world play mode.

## P0 Code Tasks

| Task | Type | Depends on | Notes |
| --- | --- | --- | --- |
| Build `StudentShell` | Code change | Week 2 primitives | Shared mobile-first frame for home/map/quiz/result. |
| Extract `TodayPanel` | Code change | `StudentShell` | Home top section with one recommended action. |
| Add `WorldCard` | Code change | `Card`, `Badge`, `ProgressBar` | Used by home preview and future `/worlds`. |
| Add `SkillNode` | Code change | `Button`, `Badge` | Current/complete/open/review/locked states. |
| Refactor home into wireframe order | Code change | `TodayPanel`, `WorldCard` | Keep existing behavior and data. |
| Refactor addition map into clusters | Code change | `SkillNode` | Use 8 clusters and 30-level path structure. |

## P1 Code Tasks

| Task | Type | Depends on | Notes |
| --- | --- | --- | --- |
| Add `LevelDetailPanel` | Code change | `SkillNode` | Can start as in-page panel before route split. |
| Add `QuizLayout` | Code change | Existing quiz state | Preserve 4-choice flow and saving. |
| Add `ResultLayout` | Code change | Existing result view | Use mastery/review/repair states. |
| Add state copy map | Code change | `FeedbackPanel` | Standardize local/synced/sync-error copy. |
| Add accessible quiz choice labels | Code change | `QuizChoice` | Include state after selection. |

## P2 Code Tasks

| Task | Type | Depends on | Notes |
| --- | --- | --- | --- |
| Prototype `/worlds` route | Code change | `WorldCard` | Can stay read-only first. |
| Prototype `/worlds/[worldId]` route | Code change | `SkillNode` | Addition Forest first. |
| Add unlock preview rules | Code change | Curriculum/progress decision | No schema change required initially. |
| Add reduced-motion manual-next option | Code change | Quiz behavior decision | If testing shows auto-advance is hard to follow. |

## Documentation-Only Follow-Ups

| Task | Type | Notes |
| --- | --- | --- |
| Add route split decision record | Docs only | Capture when `/worlds` becomes real. |
| Add world unlock policy | Docs only | Define addition-to-shape reward timing. |
| Add mastery scoring policy | Docs only | Define thresholds for mastered/ready/review/repair. |
| Add non-addition manipulation specs | Docs only | Fraction, geometry, time, measurement later. |

## Week 4 Validation

- `npm run build`
- Mobile browser check at 390x844 and 430x932.
- Tablet check at 768x1024.
- Desktop check at 1280x720.
- Core flow: home, start level, choose answer, feedback, result, home.
- No student-facing grade labels.
- LocalStorage progress still works.
- Supabase login/save logic unchanged.

## Suggested Implementation Order

1. Build layout components with no behavior change.
2. Move home sections into `StudentShell` and `TodayPanel`.
3. Add `WorldCard` and `SkillNode`.
4. Rebuild Addition Forest map as clusters.
5. Add level detail panel.
6. Refactor quiz/result layouts.
7. Run responsive and accessibility QA.
