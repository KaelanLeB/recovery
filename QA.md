# QA.md — Recovery App

This file is updated after every feature ships. Each block contains testable assertions to verify before and after related changes. Check off items manually in the browser after each deploy.

---

## P1 — Home screen hero layout

- [ ] Day counter renders centred with no card border or background
- [ ] Day counter font is large (≥96px) and dark green
- [ ] Top-right SOS pill is absent from the header
- [ ] Bottom nav shows Home | SOS FAB | Streak — no other items
- [ ] Check-in card appears below the hero, Why card appears below check-in
- [ ] After completing a check-in, the card shows "You showed up today." with no button

## P1 Fix — Progress bar visibility

- [ ] Progress bar fill is visible in dark green (#2C5F5D)
- [ ] Fill is vertically centred within the track
- [ ] Track background remains unchanged (unfilled portion still faint)
- [ ] Day label and Next milestone label are readable on either side

## P1 Fix — Why card visual weight

- [ ] "YOUR WHY" label is small, muted, and letter-spaced
- [ ] Why card border-radius is visibly smaller than the check-in card
- [ ] No box-shadow on the Why card
- [ ] Why text is readable but not competing with the streak hero

## P2 — Personal why on completion and slip screens

- [ ] On sober completion screen (step-4a): why line appears between streak number and Done button
- [ ] Why line reads: "You started this for a reason — [their why]"
- [ ] On slip path (step-3b): why line appears directly below the compassion box
- [ ] If personal_why is null or empty, why line is hidden on both screens
- [ ] Why text matches what is stored in Supabase profiles.personal_why

## P3 — Milestone celebration overlay

- [ ] Day 1 overlay fires on first sober check-in with heading "You Started"
- [ ] Day 7 overlay fires with heading "Keep Going"
- [ ] Day 30 overlay fires with heading "A Month of Courage"
- [ ] Day 90 overlay fires with heading "You've Changed More Than You Think"
- [ ] Day 365 overlay fires with heading "This Year Belongs to You"
- [ ] Confetti appears and cleans up from DOM after animation ends
- [ ] Continue button dismisses overlay and shows step-4a normally
- [ ] Overlay does NOT fire a second time for an already-celebrated milestone
- [ ] Non-milestone days (e.g. Day 8, Day 47) go directly to step-4a with no overlay
- [ ] Overlay is full-screen and sits above all other content (z-index correct)

## P4 — Mood-sensitive SOS nudge

- [ ] Nudge is visible after selecting "rough" mood
- [ ] Nudge is visible after selecting "tough" mood
- [ ] Nudge is hidden after selecting "okay", "good", or "great" mood
- [ ] Nudge hides correctly when switching from rough/tough to a neutral mood
- [ ] SOS link inside nudge navigates to sos.html
- [ ] Nudge never blocks or replaces the Next button — flow continues normally
