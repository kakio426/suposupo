# Full Worlds Wireframe

Date: 2026-05-10

## Goal

The full worlds screen shows the breadth of the curriculum as an inviting map while keeping the current open path clear. It must feel large, but not overwhelming.

## Mobile Structure

```text
[StudentShell]
  Header: 전체 지도 + back/home
  Current recommendation card
  Region section: 수와 연산
  Region section: 도형과 측정
  Region section: 변화와 관계
  Region section: 자료와 가능성
  Legend
```

## Tablet Structure

- Two-column region grid.
- Current recommendation spans the top.
- Locked/preview cards remain visible but quieter.

## Desktop Structure

- Four region bands or a 2x2 region grid inside a constrained canvas.
- Optional side legend.
- Do not convert to an enterprise dashboard table.

## Regions And Worlds

| Region | Worlds | Opening behavior |
| --- | --- | --- |
| 수와 연산 | 더하기 숲, 빼기 사막, 곱하기 바다, 나누기 우주, 분수/소수 화산 | Addition starts open. Others unlock or preview by progress. |
| 도형과 측정 | 모양 섬, 시간의 탑, 측정 광산 | Early preview can appear as reward after addition progress. |
| 변화와 관계 | 규칙의 동굴 | Preview first, unlock later. |
| 자료와 가능성 | 차트 은하수 | Preview first, unlock later. |

## World Card States

| State | Visual rule | CTA |
| --- | --- | --- |
| Current | Strong border, progress bar, warm CTA. | `이어하기` |
| Open | Normal card with clear action. | `시작하기` |
| Completed | Success badge, softer action. | `복습하기` |
| Preview | Desaturated but readable. | `맛보기` |
| Locked | Lock badge and unlock clue. | Disabled or `조건 보기` |

## Primary CTA

The current world card owns the primary CTA. If no progress exists, it is `더하기 숲 시작하기`.

## Accessibility And Copy

- No grade labels anywhere on student-facing cards.
- Locked cards need text explanation, not only opacity.
- Region headings should be scannable and not oversized.
- Cards must not depend on color alone to communicate state.
