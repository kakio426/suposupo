# Week 1 State And Data UX Audit

Date: 2026-05-10

## Summary

The app now has local progress and Supabase sync foundations. The UI communicates save state, but it needs clearer user-facing states for first login, sync, failure, retry, and multi-device continuation.

## Findings

| Priority | Screen/state | Issue | Impact | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | Logged-out home | `Google 저장` can sound like a one-time save action rather than sign-in and sync. | Users may not understand account connection. | Rename to `Google로 저장하기` and add a short “기기 바꿔도 이어하기” explanation. |
| P1 | First sync | Local-to-remote merge happens silently. | If progress changes after login, user may not understand why. | Add a temporary success message: “이 기기의 진도를 계정에 연결했어요.” |
| P1 | Sync failure | Error message appears, but no retry action or persistence details. | User may worry progress is lost. | Always say local progress is safe and provide retry or passive next-sync copy. |
| P2 | Auth loading | `checking` status is internal; visible state can appear as logged-out before session resolves. | Flicker can reduce trust. | Add explicit loading/skeleton state for save panel. |
| P2 | Multi-world progress | Current persistence is path-based but UI only plays addition. | Future worlds need consistent state shape. | Keep current schema for now; design UI states to support per-world progress later. |
| P3 | Recent attempts | Remote attempts load without answer details. | Result detail/history may be limited later. | Document future history view needs before expanding reports. |

## Required State Copy

| State | Recommended copy |
| --- | --- |
| Local only | `이 기기에 안전하게 저장 중` |
| Logged out with Supabase ready | `Google로 연결하면 다른 기기에서도 이어할 수 있어요` |
| Syncing | `진도를 계정에 연결하는 중` |
| Synced | `계정에 저장 완료` |
| Error | `서버 저장은 잠시 실패했지만, 이 기기 기록은 안전해요` |

