# States And Accessibility Specification

Date: 2026-05-10

## Global State Rules

| State | Required UX |
| --- | --- |
| Loading | Preserve layout shape with skeletons or reserved space. Avoid spinner-only screens. |
| Empty | Offer one concrete starter action. |
| Locked | Explain what opens it. Do not hide all context. |
| Local save | Reassure: `이 기기에 안전하게 저장 중`. |
| Syncing | Keep learning actions available. |
| Synced | Quiet confirmation: `계정에 저장 완료`. |
| Sync error | Reassure local safety and allow play to continue. |
| Offline-like failure | Show local-safe copy and retry later path. |

## Motion Rules

- `press`: brief scale or shadow change for controls.
- `success`: small pop or glow.
- `repair`: mild shake only when motion is allowed.
- `reward`: celebratory motion with static badge fallback.
- `prefers-reduced-motion: reduce` must remove non-essential animation.

Motion cannot be the only way to understand state.

## Color And Status Rules

| Status | Must include |
| --- | --- |
| Correct | Success color, icon, and text. |
| Incorrect | Repair color, icon, and hint text. |
| Locked | Lock icon and unlock explanation. |
| Synced | Sync/check icon and text. |
| Sync error | Warning icon, explanation, local-safe reassurance. |

## ARIA And Labels

- Icon-only buttons must have `aria-label`.
- Back buttons use labels like `홈으로 돌아가기` or `지도 화면으로 돌아가기`.
- Quiz choices expose selected/correct/incorrect state in accessible text after selection.
- Progress bars include a human-readable label.
- Disabled controls have nearby text explaining why.

## Touch And Layout

- Minimum touch target: 44px by 44px.
- Choice buttons keep stable dimensions after feedback.
- Text must wrap without clipping at 390px width.
- Avoid nested cards that create unclear hierarchy.
- Cards should use 8px radius or the tokenized local equivalent unless a primitive defines another value.

## Student-Facing Language

- Do not expose grade labels.
- Use level, world, skill, quest, and repair language.
- Avoid `틀렸어요` as the primary message.
- Prefer `한 번 더 맞춰볼게요`, `비교해볼까요`, `조각을 다시 세어봐요`.
