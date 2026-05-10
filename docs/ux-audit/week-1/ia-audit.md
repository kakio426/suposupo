# Week 1 Information Architecture Audit

Date: 2026-05-10

## Summary

The app has the right conceptual content, but too much of it lives on the home screen. The student’s next action is present, yet it competes with auth, diagnostic entry, map entry, stats, world catalog, and recent history.

## Findings

| Priority | Screen | Issue | Impact | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | Home | Primary start CTA and placement CTA appear together without a clear “recommended” hierarchy for first-time students. | Students may hesitate before the first action. | Mark one CTA as recommended based on `placementCompleted`; demote the other to secondary. |
| P1 | Home | Full curriculum catalog appears in the home feed. | Home becomes curriculum browser instead of daily learning launcher. | Move full catalog to `/worlds`; show only 2-3 relevant worlds on home. |
| P1 | World map | Skill map represents addition levels only; world-level navigation is separate in home catalog. | Future multi-world expansion can become confusing. | Create a two-level IA: global worlds map, then per-world skill path. |
| P2 | Auth panel | `Google 저장` label is short but ambiguous. | Some users may not know it signs in and syncs progress. | Use `Google로 저장하기` or `Google로 로그인` with a small sync explanation. |
| P2 | Result | Score is prominent; mastery meaning is secondary. | Students may read result as test grade. | Lead with mastery state and next action; keep score as supporting detail. |
| P2 | Recent record | Recent attempt is shown after the entire world catalog. | Returning students may not see useful context quickly. | Place recent record near the `Today` module or fold it into next-action reasoning. |

## Proposed Student IA

1. Home: today's next action, progress snapshot, short world preview.
2. Worlds: full curriculum world browser.
3. World detail: stage clusters and playable levels.
4. Quiz: one focused task at a time.
5. Result: mastery, next action, reward, optional detail.

