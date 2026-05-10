# Quiz Play Wireframe

Date: 2026-05-10

## Goal

Quiz play should stay fast, touch-first, and confidence-preserving. Students answer without typing, see immediate feedback, and get a repair hint when needed.

## Mobile Structure

```text
[QuizLayout]
  Header: back + level label + save badge
  ProgressBar
  Prompt card
  Manipulative area, optional by level
  2x2 QuizChoice grid
  FeedbackPanel after answer
```

## Tablet Structure

- Prompt and manipulative area can sit above choices with more breathing room.
- Choice grid remains 2x2.

## Desktop Structure

- Centered quiz canvas.
- Optional side panel can show level context, but not distract from the question.

## Required Content

| Area | Content | Primitive |
| --- | --- | --- |
| Progress | Question index and set length | `ProgressBar` |
| Prompt | Large problem or instruction | `Card` |
| Manipulative | Ten-frame, blocks, number line, or empty placeholder | Later learning component |
| Choices | Four stable touch targets | `QuizChoice` |
| Feedback | Success, repair, hint, sync-error as needed | `FeedbackPanel` |

## Answer States

| State | Behavior |
| --- | --- |
| Idle | All choices enabled. |
| Selected correct | Selected choice turns success, success copy appears. |
| Selected incorrect | Selected choice shows repair state, correct choice may be revealed. |
| Revealed correct | Correct choice gets distinct label/icon. |
| Auto-advance | Next question after a short pause. |
| Reduced motion | No shake/pop needed; text and icon remain. |

## Repair Hint Pattern

Incorrect feedback should say what to compare next:

- `10을 먼저 만들어볼까요?`
- `일의 자리끼리 다시 봐요.`
- `조각 수를 한 번 더 세어볼게요.`

## Primary CTA

Quiz question: the four choices are the primary actions.

Feedback state: no extra CTA unless auto-advance is paused or reduced-motion mode later requires manual next.

## Accessibility And Copy

- No typing requirement.
- No grade labels.
- Choices need accessible names that include value and state after selection.
- Feedback cannot rely only on red/green or shake.
- Minimum touch target is 44px, with stable dimensions.
