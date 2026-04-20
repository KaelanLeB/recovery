# Craving SOS Prototype — Technical Brief

## Design Decisions
- Built as a standalone, mobile-first `sos.html` page with no dependencies so it opens instantly in browser.
- Prioritized zero-friction activation: calming copy and guided content are visible immediately on load.
- Included a simple breathing loop (`4-4-6`) with one-second updates to provide immediate grounding without requiring user setup.
- Added a sequential grounding prompt flow (`5-4-3-2-1`) with a single "Next prompt" control to reduce cognitive load.
- Kept tone warm and non-judgmental, with inclusive language that does not assume addiction type.
- Added return path to `index.html` and linked into SOS from the check-in page with a prominent top action.

## Assumptions
- Prototype is client-only and uses no backend/auth during this phase.
- A simple timed breathing loop is sufficient for MVP validation before introducing richer SOS options.
- Users benefit from seeing guidance immediately rather than selecting from multiple interventions first.
- Linking from `index.html` meets "always-accessible" intent for this prototype stage.

## Open Questions For Engineering
- Should SOS be globally persistent (fixed footer/nav) across all future screens beyond check-in?
- Should SOS usage events be stored locally, in account data, or both (privacy + analytics implications)?
- Should the breathing loop support haptics/sound cues for accessibility and low-vision use cases?
- Should users be able to customize grounding options, or should defaults stay fixed to avoid decision fatigue?
- What offline behavior is required if the app is used during poor/no connectivity?

## Potential Distress/Shame Risks Flagged
- Asking users to return to check-in too quickly could feel pressuring during a high-craving moment.
- A single SOS pattern may not work for everyone; some users may need alternate pathways (call support contact, distraction tasks, longer guided mode).
