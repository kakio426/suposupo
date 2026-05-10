# Level Detail Wireframe

Date: 2026-05-10

## Goal

The level detail screen should make the student feel "I can try this" before play starts.

## Mobile Structure

```text
[StudentShell]
  Header: back + world/level label
  Level card
    Skill objective
    Tiny example or visual model
    Problem count
    Interaction mode
  Confidence copy
  Primary CTA
  Secondary action if available
```

## Tablet Structure

- Objective and example sit side by side.
- CTA remains below the level card.

## Desktop Structure

- Detail panel on one side, mini map context on the other.
- The primary CTA remains the strongest element.

## Required Content

| Area | Content |
| --- | --- |
| Level label | `더하기 숲 Lv.10` format. No grade label. |
| Objective | One concrete learning target, for example `10을 넘는 덧셈을 조각으로 맞춰요`. |
| Problem count | Small set size, usually 5 to 8 questions. |
| Interaction mode | `4지선다`, `조각 맞추기`, `수직선`, or `텐 프레임`. |
| Confidence copy | One supportive sentence. |
| Start CTA | `시작하기`, `다시 도전하기`, or `복습하기`. |

## States

| State | Behavior |
| --- | --- |
| Open | Show objective and start CTA. |
| Current | Add recommended badge and stronger CTA. |
| Review | Explain the repair target without shame. |
| Complete | Offer review and next level. |
| Locked | Show unlock clue and disabled CTA. |
| Loading | Use skeleton layout, not a spinner-only page. |

## Primary CTA

Open/current: `시작하기`

Review: `비슷한 문제로 복습하기`

Complete: `다음 레벨 보기`

Locked: disabled `아직 잠겨 있어요`

## Accessibility And Copy

- No grade labels.
- Problem count and interaction mode should be text, not icon-only.
- Disabled CTA requires an unlock explanation nearby.
- The page must be understandable without animation.
