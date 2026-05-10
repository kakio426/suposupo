# Design Principles

Date: 2026-05-10

## Product Tone

Suposupo should feel like a premium kids learning app: playful enough to reduce math anxiety, but structured enough that parents and educators trust the system.

## Student-Facing Rules

- Never expose grade labels in the student learning flow.
- Prefer one obvious next action over a dense dashboard.
- Keep quiz input touch-first and typing-free.
- Show progress as exploration, not as school ranking.
- Use short Korean copy with concrete action language.

## Failure Language

- Avoid shame, punishment, or score-loss framing.
- Use repair language: `다시 비교해볼 보기`, `조각을 한 번 더 맞춰볼게요`.
- Preserve effort: even a retry should feel like progress.
- When server sync fails, always reassure that local progress is safe.

## Motion And Feedback

- Motion should make state changes feel tactile, not distract from math.
- Correct answers may move quickly.
- Incorrect answers should remain understandable without shake or color.
- Always pair color with icon and text.
- Respect `prefers-reduced-motion`.

## Accessibility

- Minimum touch target is 44x44px.
- Icon-only controls require accessible labels.
- Text must wrap inside cards and buttons.
- Muted text must remain readable on glass/white surfaces.

