# QA.md — Recovery App

This file is updated after every feature ships. Each block contains testable assertions to verify before and after related changes. Results from static code audit conducted 2026-06-03.

**Legend:** ✅ PASS — confirmed by code | ⚠️ CANNOT VERIFY — requires live browser | ❌ FAIL — code confirms broken or missing

---

## P1 — Home screen hero layout

- ✅ Day counter renders centred with no card border or background
  — index.html:59-71 — `.streak-hero-block` has `text-align:center`, no background/border; `.hero-num` has no card wrapper

- ✅ Day counter font is large (≥96px) and dark green
  — index.html:64,69 — `font-size: 108px; color: var(--sage-700)` (#2f5550 per theme.css:17)

- ✅ Top-right SOS pill is absent from the header
  — index.html:224-229 — header contains only greeting and date elements; no `.sos-pill` or SOS link

- ✅ Bottom nav shows Home | SOS FAB | Streak — no other items
  — index.html:278-290 — exactly 3 nav items: Home, SOS FAB (.tab-sos), Streak

- ✅ Check-in card appears below the hero, Why card appears below check-in
  — index.html:232,248,271 — DOM order: streak-hero-block → check-in card → why-card

- ✅ After completing a check-in, the card shows "You showed up today." with no button
  — index.html:264-267 — `checkin-done` div contains "You showed up today." and "Come back tomorrow" with no button; JS at line 395-396 reveals it

## P1 Fix — Progress bar visibility

- ✅ Progress bar fill is visible in dark green (#2C5F5D)
  — index.html:108 — `.progress-bar-fill { background: #2C5F5D }`

- ✅ Fill is vertically centred within the track
  — index.html:99,104-105 — 5px track with `display:flex; align-items:center`; 3px fill is centred as a flex child

- ✅ Track background remains unchanged (unfilled portion still faint)
  — index.html:100 — `.progress-bar-track { background: var(--sage-50) }` (#edf3f1 per theme.css:19)

- ⚠️ Day label and Next milestone label are readable on either side
  — index.html:237-240, 351-357 — both spans exist and are populated by JS; visual readability requires browser

## P1 Fix — Why card visual weight

- ✅ "YOUR WHY" label is small, muted, and letter-spaced
  — index.html:198-203 — `.why-card .card-eyebrow { font-size: 10px; letter-spacing: 0.12em; color: #aaa }`

- ✅ Why card border-radius is visibly smaller than the check-in card
  — index.html:192 vs 115-116 — why-card is 12px; check-in card is `var(--radius-lg)` = 24px (theme.css:31)

- ✅ No box-shadow on the Why card
  — index.html:195 — `.why-card { box-shadow: none }`

- ⚠️ Why text is readable but not competing with the streak hero
  — index.html:207-211 — why-text is 15px / ink-900; whether it visually competes with the 108px hero requires browser

## P2 — Personal why on completion and slip screens

- ✅ On sober completion screen (step-4a): why line appears between streak number and Done button
  — checkin.html:913-918 — `completion-why-text` is in DOM before `btn-done-sober`

- ✅ Why line reads: "You started this for a reason — [their why]"
  — checkin.html:913-914 — exact copy: "You started this for a reason — <span id="completion-why-span"></span>"

- ✅ On slip path (step-3b): why line appears directly below the compassion box
  — checkin.html:863-869 — `slip-why-text` element directly follows `.compassion-box` in DOM

- ✅ If personal_why is null or empty, why line is hidden on both screens
  — checkin.html:913,867 — both elements have `hidden` attribute by default; checkin.html:1126 only reveals if `why` is truthy

- ⚠️ Why text matches what is stored in Supabase profiles.personal_why
  — checkin.html:1110-1125 — `personal_why` is fetched from Supabase and set on spans; data match requires runtime

## P3 — Milestone celebration overlay

- ✅ Day 1 overlay fires on first sober check-in with heading "You Started"
  — checkin.html:1140 — `1: { heading: 'You Started' }`; `finishSober()` calls `checkAndShowMilestone` at line 1299

- ✅ Day 7 overlay fires with heading "Keep Going"
  — checkin.html:1141 — `7: { heading: 'Keep Going' }`

- ✅ Day 30 overlay fires with heading "A Month of Courage"
  — checkin.html:1142 — `30: { heading: 'A Month of Courage' }`

- ✅ Day 90 overlay fires with heading "You've Changed More Than You Think"
  — checkin.html:1143 — `90: { heading: 'You\'ve Changed More Than You Think' }`

- ✅ Day 365 overlay fires with heading "This Year Belongs to You"
  — checkin.html:1144 — `365: { heading: 'This Year Belongs to You' }`

- ✅ Confetti appears and cleans up from DOM after animation ends
  — checkin.html:1158 — each confetti piece has `animationend` listener calling `el.remove()`

- ✅ Continue button dismisses overlay and shows step-4a normally
  — checkin.html:1178-1182 — click removes `.active` class and calls `onDismiss` → `showStep('step-4a', 3)` (line 1299)

- ⚠️ Overlay does NOT fire a second time for an already-celebrated milestone
  — checkin.html:1166-1167 — localStorage guard `milestone_celebrated_N` logic is correct; runtime verification needed

- ✅ Non-milestone days (e.g. Day 8, Day 47) go directly to step-4a with no overlay
  — checkin.html:1163-1164 — `if (!moment) { onDismiss(); return; }` bypasses overlay for days not in MILESTONE_MOMENTS

- ✅ Overlay is full-screen and sits above all other content (z-index correct)
  — checkin.html:632-636 — `position:fixed; inset:0; z-index:100`; above bottom nav (z-index:40, theme.css:143)

## P4 — Mood-sensitive SOS nudge

- ✅ Nudge is visible after selecting "rough" mood
  — checkin.html:1224-1227 — `roughMoods.includes('rough')` = true → `nudge.classList.add('visible')`; `.sos-nudge.visible { display: block }` at line 691

- ✅ Nudge is visible after selecting "tough" mood
  — checkin.html:1224-1227 — `roughMoods.includes('tough')` = true → `nudge.classList.add('visible')`

- ✅ Nudge is hidden after selecting "okay", "good", or "great" mood
  — checkin.html:1228-1230 — else branch calls `nudge.classList.remove('visible')` for all non-rough/tough moods

- ✅ Nudge hides correctly when switching from rough/tough to a neutral mood
  — checkin.html:1228-1230 — handler runs on every click and always re-evaluates; switching to neutral removes `visible`

- ✅ SOS link inside nudge navigates to sos.html
  — checkin.html:810 — `<a href="sos.html">1-minute reset</a>`

- ✅ Nudge never blocks or replaces the Next button — flow continues normally
  — checkin.html:809-818 — nudge div precedes `.spacer` (line 813); Next and skip buttons remain in DOM; JS only modifies nudge classes

## P6 — Custom confirm modal for streak reset (slip path)

- ✅ Confirm modal replaces native `confirm()` on the check-in slip-reset path
  — checkin.html:1453-1454 — `btn-reset-streak` click handler now calls `showConfirm(async () => {...})` instead of an inline `async () =>` with no gate

- ✅ Modal heading reads "Is this a fresh start?" with compassionate subtext
  — checkin.html:1015-1019 — "Slipping doesn't erase your progress — it's part of the journey. Only reset if you're starting from today."

- ✅ Modal is a proper dialog for assistive tech (role, aria-modal, labelled heading)
  — checkin.html:1011-1012 — `role="dialog" aria-modal="true" aria-labelledby="confirm-heading-text"`

- ✅ Confirm button runs the actual reset logic; Cancel closes with no side effects
  — checkin.html:1296-1309 — `confirm-btn-confirm` click invokes `onConfirm()` (the reset flow); `confirm-btn-cancel` only removes `.active`

- ✅ Verified live: clicking the slip-path reset button in the running app opens the modal in place of a native browser confirm popup (browser-tested 2026-08-11)

- ✅ **FIXED — streak.html now matches.** The "Reset streak with compassion" button on the Streak page previously called the native `confirm()`; it now opens the same `.confirm-overlay` component ported from checkin.html, reusing the exact same CSS classes and `showConfirm()` pattern. Heading/subheading carry over the original confirm copy ("Reset your streak to Day 0?" / "This is a fresh start, not a failure.") split across the two-line layout.
  — streak.html: modal CSS added after `.reset-error.visible`; markup added inside `.reset-card`'s section; `showConfirm()` + reset handler rewired at the bottom of the `<script>` block
  — Verified live: Cancel closes the modal with the day count untouched; Confirm resets to Day 0, persists to Supabase (survives reload), and shows "Streak reset with care. Your clock starts now." with no console errors

## Reskin — Mid-level display size + contextual SOS pulse (commit 470fbff)

- ✅ Completion-screen streak number is mid-sized (44px, down from 96px)
  — checkin.html:461 — `.complete-streak { font-size: 44px; }`; verified live, rendered "7" at 44px on the Day 7 completion screen

- ✅ SOS bottom-nav tab pulses when mood is "rough" or "tough"
  — checkin.html:1330-1335, theme.css:238-246 — `.sos-pulse` class toggled on `.tab-sos` alongside the existing SOS nudge; `pulse-fab` keyframe animates box-shadow; verified live via computed `animationName: "pulse-fab"` after selecting "Rough"

- ✅ Pulse clears when mood is switched back to a neutral option
  — checkin.html:1330-1335 — same handler removes `.sos-pulse` in the `else` branch, mirroring the nudge visibility logic

- ⚠️ No `prefers-reduced-motion` guard on the new `pulse-fab` animation, or on the pre-existing `fadeUp` step transition — this is a pre-existing gap in the codebase (not introduced by this commit), flagged per accessibility principle in CLAUDE.md, not fixed

## Reskin — Mood grid tint + slip path warm background (commit d0f7d1e, Reskin C + D)

- ✅ Step 1 background tints per selected mood (5 distinct warm/cool tones)
  — checkin.html:147-151 — `[data-mood="great|good|okay|rough|tough"]` each map to a distinct background-color; `data-mood` attribute is set/cleared correctly on mood select and on "Skip mood" (checkin.html:1340, 1384); verified live by disabling the CSS transition and re-reading computed style (rgb(245,247,250) for "rough" as expected) — the sandboxed preview tab doesn't composite frames, so the 0.4s transition itself couldn't be observed directly, only its resolved end state
- ✅ Slip-path steps (step-3b, step-4b) get a warm background tint
  — checkin.html:349-353 — `#step-3b, #step-4b { background-color: #fdf8f4; }`

---

## Audit Summary

| Result | Count |
|---|---|
| ✅ PASS | 40 |
| ⚠️ CANNOT VERIFY / PARTIAL | 6 |
| ❌ FAIL | 0 |

**No FAILs found.** (streak.html's native `confirm()` inconsistency, found during this audit, was fixed same-session — see P6 above.)

**Items requiring live browser verification:**
- P1 Fix: Day label and Next milestone label are readable on either side — index.html:237-240
- P1 Fix: Why text not visually competing with streak hero — index.html:207-211
- P2: Why text matches Supabase profiles.personal_why — checkin.html:1110-1125
- P3: Overlay does not fire a second time (localStorage guard) — checkin.html:1166-1167
- Reskin: `prefers-reduced-motion` handling absent app-wide (pre-existing gap)
