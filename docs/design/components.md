# Component Contracts

Date: 2026-05-10

## `Button`

Props: `variant`, `size`, `tone`, `disabled`, `loading`, `iconLeft`, `iconRight`, `children`.

Variants: `primary`, `secondary`, `quiet`.

Tones: `brand`, `warm`, `neutral`, `danger`.

Use for full-width commands and repeated CTA buttons.

## `IconButton`

Props: `ariaLabel`, `variant`, `size`, `disabled`, `children`.

Rule: icon-only buttons must pass `ariaLabel`.

Use for close, back, map tools, and compact navigation.

## `Card`

Props: `variant`, `tone`, `interactive`, `padding`, `children`.

Variants: `plain`, `elevated`, `command`, `status`, `world`, `result`.

Use to standardize panel depth and card hierarchy.

## `Badge`

Props: `tone`, `children`.

Tones: `neutral`, `brand`, `success`, `warning`, `danger`, `locked`, `synced`.

Use for state labels, counts, and world tags.

## `ProgressBar`

Props: `value`, `max`, `tone`, `label`.

Use for quiz progress, level progress, and later mastery progress.

## `QuizChoice`

Props: `value`, `state`, `onSelect`.

States: `idle`, `selected`, `correct`, `incorrect`, `revealed-correct`, `disabled`.

Use for all touch-only 4-choice quiz answers.

## `FeedbackPanel`

Props: `tone`, `title`, `message`, `icon`.

Tones: `success`, `repair`, `hint`, `reward`, `sync-error`.

Use for quiz answer feedback, sync warnings, repair hints, and reward messages.

## Week 4 Layout Components

## `StudentShell`

Props: `title`, `eyebrow`, `badge`, `onBack`, `children`, `action`, `maxWidth`.

Use as the shared mobile-first frame for student home, map, level detail, quiz-adjacent screens, and result-adjacent screens. Icon-only back controls must keep an accessible label.

## `TodayPanel`

Props: `levelMeta`, `progress`, `primaryAction`, `secondaryActions`, `syncState`.

Use for the home top module. It owns the single recommended action and should remain the first decision point on the home screen.

## `WorldCard`

Props: `world`, `state`, `progressValue`, `onSelect`.

States: `current`, `open`, `completed`, `preview`, `locked`, `review`.

Use for home world preview and future full world map cards.

## `SkillNode`

Props: `level`, `state`, `label`, `onSelect`.

States: `current`, `open`, `complete`, `review`, `locked`.

Use for individual nodes inside a world map. Locked nodes are disabled and expose state in the accessible label.

## `LevelDetailPanel`

Props: `level`, `meta`, `state`, `onStart`, `onClose`.

Use as the pre-quiz confidence gate after selecting a world-map node.

## `QuizLayout`

Props: `progress`, `levelLabel`, `prompt`, `feedback`, `manipulative`, `onExit`, `children`, `choices`.

Use for the focused quiz loop: progress, prompt, problem area, feedback, and four-choice answer grid.

## `ResultLayout`

Props: `attempt`, `masteryState`, `title`, `message`, `actions`, `children`.

Use for result/reward screens. `masteryState` is `mastered`, `ready`, or `review`.

## Week 5 Navigation Interfaces

## `useLearningProgress`

Returns: `progress`, `setProgress`, `saveProgress`, `authUser`, `authStatus`, `syncStatus`, `authMessage`, `handleSignIn`, `handleSignOut`, `hasLoadedProgress`, `isSupabaseConfigured`.

Use for route-level screens that need the same localStorage and Supabase progress state.

## Route Pages

- `/`: student home plus existing quiz/result flow.
- `/worlds`: full world map overview.
- `/worlds/[worldId]`: world detail route. `addition` shows the Addition Forest map; other worlds show preview or locked detail.

## Week 6 Play Route Interfaces

## `AdditionPlaySession`

Props: `level`, `onExit`, `onMap`.

Use for the URL-addressable addition quiz loop. It owns level question generation, answer selection, 1-second feedback advance, attempt creation, progress update, localStorage persistence, and optional Supabase attempt/progress save.

## `/play/[worldId]/[level]`

Supported contract: `worldId="addition"` and numeric `level` from `1` to `30`.

Fallbacks: unknown worlds and non-addition worlds show a safe preparation screen with a CTA to `/worlds`; invalid addition levels show a safe CTA to `/worlds/addition`.

Navigation rule: home and world-detail start CTAs enter `/play/addition/{level}`; result CTAs route to the next level, the same level for review, `/worlds/addition`, or `/`.

## Week 7 Learning Models

## `question.visualModel`

Optional data contract for concrete learning models. The first supported type is `ten-frame` with `totalSlots`, `filledSlots`, and `missingSlots`.

Week 8 adds `carry-blocks` for two-digit addition with carrying. It includes addends, ones-place carry details, tens-place carried value, and final total.

## `TenFrameModel`

Props: `filledSlots`, `missingSlots`, `totalSlots`, `state`, `label`.

Use for `make_10` questions in addition levels and placement. It is a visual aid only; answer selection remains four-choice.

## `ManipulativeStage`

Props: `question`, `answered`, `isCorrect`.

Use as the quiz-level switchboard for optional concrete models. It renders nothing when a question has no `visualModel`.

## `CarryBlocksModel`

Props: `model`, `state`, `label`.

Use for `two_digit_with_carry` questions in addition levels and placement. It visualizes ones-place regrouping into a carried tens-place block while keeping answer selection four-choice.
