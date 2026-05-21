---
description: Apply Recovery App UI/UX patterns to a component
argument-hint: <path/to/component>
---

# Apply Recovery App UI/UX Pattern

Apply the Recovery App's established UI/UX patterns to the component at: $ARGUMENTS

## Steps

1. Read the component file at `$ARGUMENTS`.
2. Load the full research context: @docs/recovery-app-uiux-research.md
3. Identify which of the synthesized patterns from CLAUDE.md apply to this component:
   - Calm visual language (muted palette, rounded shapes, soft typography)
   - One-tap craving / "I need help" action
   - Daily pledge + evening reflection ritual
   - Frictionless / anonymous onboarding
   - Nurturing companion or growth-collection motivation
   - Stage-grouped community surfaces
   - Nudges over scolds (never loss-based streak language)
   - Adaptive home screen (surface only what matters now)
4. Cross-check against the foundational principles (timing, calm, nudges, friction, privacy, adaptivity).
5. Propose concrete changes:
   - Specific color, typography, and spacing adjustments
   - Copy rewrites with before/after
   - Layout / interaction changes
   - Accessibility considerations
6. Show the modified code (or a unified diff) when changes are clear and uncontroversial. For larger restructures, propose the plan first and wait for confirmation.
7. Cite which app / pattern each suggestion comes from (e.g., "Borrowed from I Am Sober's daily pledge pattern").

If `$ARGUMENTS` is empty, ask the user which component to review.
