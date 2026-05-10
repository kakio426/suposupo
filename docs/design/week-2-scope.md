# Week 2 Scope

Date: 2026-05-10

## Goal

Build the first reusable design-system layer for the student app without changing learning logic, routing, Supabase schema, or curriculum scope.

## Included

- Design token contract for color, typography, radius, shadow, spacing, and motion.
- UI primitives for buttons, icon buttons, cards, badges, progress bars, quiz choices, and feedback panels.
- First application pass on home, auth/status card, stat cards, quiz choices, and quiz feedback.
- Reduced-motion CSS and non-motion answer feedback.
- Accessible labels for icon-only navigation.

## Excluded

- Supabase schema changes.
- Full App Router route split.
- Parent or teacher dashboard.
- Playable non-addition worlds.
- Storybook, Figma token export, visual regression automation.

## Done Criteria

- `npm run build` passes.
- Home and quiz use shared primitives for the main repeated controls.
- Design token names are documented and reflected in CSS/Tailwind.
- Week 2 screenshots cover 390, 430, 768, and 1280 viewports.
- No grade labels are introduced.

