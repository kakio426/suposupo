# Week 1 Visual Audit

Date: 2026-05-10

## Summary

The current visual direction is warm, playful, and already aligned with a kid-friendly math world. The main gap is enterprise-grade consistency: colors, radii, shadows, type scale, and card hierarchy are mostly encoded as one-off Tailwind classes inside `app/page.jsx`.

## Findings

| Priority | Screen | Issue | Impact | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | All screens | No formal design tokens beyond `font-game` and `shadow-jelly`. | Visual consistency will degrade as more worlds are added. | Define semantic tokens for color, radius, shadow, typography, spacing, and motion before redesigning more screens. |
| P1 | Home | Full home is very long on mobile, with app dashboard and full curriculum catalog in one feed. | Scroll fatigue; student may not understand the single most important next action. | Split home into `Today`, `Progress`, and `World preview`; move deep world content to `/worlds`. |
| P1 | Tablet/desktop | Main content remains max-width mobile column with unused side space. | Feels like a stretched mobile prototype, not premium cross-device product. | Add responsive shells: mobile single-column, tablet split summary/map, desktop centered app frame plus contextual side panel. |
| P2 | Home/world cards | Many nested cards use similar white/glass treatment. | Hierarchy gets blurry; important CTA competes with containers. | Limit nested card depth and give each surface a clear role: command, status, content, or navigation. |
| P2 | All screens | Rounded values range from `rounded-2xl` to `rounded-[2rem]` ad hoc. | Inconsistent brand shape language. | Standardize radius scale: control, card, panel, hero, pill. |
| P2 | Quiz/result | Large display type creates strong energy but lacks a defined Korean/numeric type pairing. | Risk of fallback fonts and uneven polish. | Load/standardize Korean text font and numeric display font; avoid relying on generic cursive fallback. |
| P3 | Background | Decorative blurred color blobs are fixed globally. | Adds warmth, but may look repetitive and reduce mature premium feel. | Replace with world-specific illustrated/texture backgrounds with restrained opacity. |

## Design Direction

- Keep the playful tactile button language.
- Reduce home density and card stacking.
- Give each world a distinct palette, texture, and iconography while preserving shared controls.
- Treat quiz and result screens as the highest polish surfaces because they define the app's “hand feel.”

