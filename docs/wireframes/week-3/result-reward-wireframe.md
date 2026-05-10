# Result And Reward Wireframe

Date: 2026-05-10

## Goal

The result screen closes the learning loop with a clear next action. It should feel rewarding when the student advances and safe when the student needs review.

## Mobile Structure

```text
[ResultLayout]
  Mastery state headline
  Score card
  Strengths card
  Today's sense card
  Reward or repair cue
  Primary CTA
  Secondary CTA
```

## Tablet Structure

- Mastery and score stay together.
- Strengths and today's sense can sit in two columns.

## Desktop Structure

- Result content is constrained like the quiz.
- Reward can sit beside the summary, but primary action stays below the mastery message.

## Mastery States

| State | Trigger | Primary CTA | Copy direction |
| --- | --- | --- | --- |
| Mastered | Strong score and no major repair need | `다음 레벨 도전하기` | Celebrate progress. |
| Ready | Passing but with minor misses | `다음 레벨 도전하기` | Mention one thing to keep watching. |
| Review | Mixed performance | `비슷한 문제 다시 풀기` | Frame review as strengthening. |
| Repair | Low score or repeated mistake | `조각으로 다시 맞춰보기` | Give a tiny next repair target. |

## Required Content

| Area | Content |
| --- | --- |
| Score | Correct count out of total. |
| Strengths | 1 to 2 short observations, not a long report. |
| Today's sense | One math intuition gained, for example `10을 먼저 만들면 쉬워져요`. |
| Reward | XP, badge, unlock clue, or level-up effect. |
| Next action | One primary CTA and one secondary return. |

## States

| State | Behavior |
| --- | --- |
| Saving | CTA remains available if local progress is saved. |
| Synced | Quiet saved badge. |
| Sync error | Use reassurance: server save failed but device record is safe. |
| Unlock earned | Show new world or level preview. |
| No advance | Show repair CTA as the primary action. |

## Accessibility And Copy

- No grade labels.
- Avoid shame copy and score-loss framing.
- Reward animation must have a reduced-motion equivalent.
- Primary and secondary actions must be distinguishable by text, not only color.
