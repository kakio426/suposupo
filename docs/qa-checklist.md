# MVP QA Checklist

Date: 2026-05-09

## Environment

- `npm install`: pass
- `npm run build`: pass
- `npm run dev`: pass on `http://localhost:3000`
- Browser viewport used for visual QA: `390x844`

## Manual QA Results

- First visit home shows `더하기 숲`, `이어하기 Lv. 1`, `완료 0/30`, `열린 길 Lv.1`: pass
- World catalog shows number, shape/measurement, pattern/data worlds without grade labels: pass
- Skill map shows Lv.1 open and Lv.2+ locked on first visit: pass
- Lv.1 quiz can be completed with touch-style 4-choice buttons only: pass
- Correct answer feedback shows success state before moving to next question: pass
- Result screen appears after 5 questions and shows next-level action on `5/5`: pass
- After clearing Lv.1 and Lv.2, reload restores `이어하기 Lv. 3`, `완료 2/30`, and recent attempt text: pass
- Post-fix Lv.2 generated 5 unique question strings in one session: pass
- Local dev build compiles without runtime-blocking errors: pass

## Issue Log

- P1: Lv.1 random generation produced repeated identical questions in one 5-question set.
- Fix: `generateAdditionQuestions` now retries duplicate question strings within the same set.

## Follow-up Notes

- `npm install` reported 2 moderate vulnerabilities from dependency audit. Do not run `npm audit fix --force` automatically because it may introduce breaking dependency upgrades.
- Supabase, auth, parent/teacher reports, and additional playable worlds remain out of this stabilization sprint.

## Placement Sprint Addendum

- First-time progress now stores `placementCompleted` and `placementLevel`.
- First-time home shows a `1분 진단으로 맞춤 시작` path in addition to manual Lv.1 start.
- Placement quiz uses 8 mixed addition questions and maps students to Lv.1, Lv.6, Lv.11, or Lv.16.
- Placement result saves the recommended level into local progress before the student starts the matched level.
