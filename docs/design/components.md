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

