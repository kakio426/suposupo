# World Detail Wireframe: Addition Forest

Date: 2026-05-10

## Goal

The Addition Forest map turns 30 levels into 8 conceptual clusters so the student sees a journey, not a flat list.

## Mobile Structure

```text
[StudentShell]
  Header: 더하기 숲 + progress badge
  Current level card
  Cluster path
    Cluster 1 nodes
    Cluster 2 nodes
    ...
  Legend
```

## Tablet Structure

- Current level card pinned near top.
- Cluster path uses wider rows with 3 to 5 nodes per row.
- Legend can sit beside the path.

## Desktop Structure

- Map canvas sits left or center.
- Current/review panel sits right.
- Keep node labels short to avoid visual clutter.

## 8 Clusters And 30 Levels

| Cluster | Levels | Skill focus | Map treatment |
| --- | --- | --- | --- |
| 1. 작은 수 모으기 | 1-3 | 1 to 9, composing and decomposing | Apple/acorn collection path. |
| 2. 10 만들기 | 4-6 | Complements of 10 | Ten-frame clearing with glow reward. |
| 3. 한 자리 덧셈 | 7-9 | Addition without carry | Number-line stepping path. |
| 4. 받아올림 입구 | 10-13 | Crossing 10 with concrete blocks | Unit blocks merge into one ten block. |
| 5. 두 자리와 한 자리 | 14-17 | Place value separation | Ones and tens color channels. |
| 6. 받아올림 한 번 | 18-22 | Vertical addition with one carry | Carry queue above tens place. |
| 7. 큰 수 덧셈 | 23-27 | Hundreds and repeated carry | Expanded forest canopy with repeating pattern. |
| 8. 세 수 더하기 | 28-30 | Multi-step addition and grouping | Bubble merge interaction. |

## Node States

| State | Meaning | Visual rule | Action |
| --- | --- | --- | --- |
| Current | Recommended next level | Largest node, warm ring | `도전하기` |
| Complete | Cleared with enough mastery | Filled node, success badge | `다시 풀기` |
| Open | Available but not recommended | Normal node | `보기` |
| Review | Needs repair or recent miss pattern | Small repair badge | `복습하기` |
| Locked | Prerequisite missing | Lock icon plus unlock clue | Disabled detail or preview |

## Primary CTA

The current level card owns the primary CTA: `현재 레벨 도전하기`.

## Accessibility And Copy

- No grade labels.
- Each node needs an accessible name like `더하기 숲 Lv.10, 현재 레벨`.
- Locked state requires a text clue.
- Reduced motion mode replaces path animation with static rings and badges.
