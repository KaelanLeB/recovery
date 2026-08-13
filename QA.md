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

## Glass Redesign — "Glass" visual reskin of Home, Streak, Check-in, SOS

Presentation-layer redesign (frosted glass cards on a pastel mesh gradient). All existing JS logic, Supabase calls, auth guards, and element IDs preserved; only HTML structure and CSS changed, plus minimal ring/pulse bindings noted below. Verified live in browser 2026-08-12 against a real Supabase session (Sam, 46 days).

- ✅ Glass tokens are scoped to `body.glass-ui`, leaving onboarding.html (out of scope) on the original warm theme
  — theme.css — `body.glass-ui { --ink/--muted/--glass/--accent/--accent2 + mesh bg }`; `:root` untouched; verified onboarding uses 31 legacy token refs and has no `.glass-ui` class

- ✅ Floating glass bottom nav (pill + separate coral SOS circle) replaces the opaque bar on all 4 pages
  — theme.css `.glass-ui .bottom-nav/.nav-pill/.nav-tab/.nav-sos`; verified nav links resolve Home→index, Streak→streak, SOS→sos on every page

- ✅ Home: SVG progress ring replaces the progress bar; `progress-ring` stroke-dashoffset bound to the existing milestone percentage
  — index.html — RING_CIRCUMFERENCE=352; verified day 46 → offset 258.13 (pct between milestones 30→90); Space Grotesk ring number; status chips (46 / "Steady momentum") + avatar initial "S" populate from profile

- ✅ Streak: live SVG ring bound to `strokeDashoffset` (circumference 295, r=47) replaces the CSS progress bar; live ticker, milestones, timeline, stats all preserved
  — streak.html — verified day 46 → offset 216.33; 3/5 milestones done; 8/10 timeline items passed; hours regained 1,127; cost-input toggle works; live ticker running (hh updating)

- ✅ Check-in: 4-step state machine, milestone overlay, confirm modal, SOS nudge all preserved; mood icon-grid re-skinned as glass pill chips
  — checkin.html — verified step-1→2→3a→4a transitions; selected mood = accent gradient fill + white label + ✓; completion streak in Space Grotesk; milestone badge + personal-why line render

- ✅ Check-in SOS pulse retargeted from removed `.tab-sos` to the glass `.nav-sos`, with a coral pulse keyframe
  — checkin.html:1344 `.tab-sos`→`.nav-sos`; theme.css `pulse-fab-coral` + `.glass-ui .nav-sos.sos-pulse`; verified rough-mood selection sets `animationName: pulse-fab-coral` and reveals the nudge

- ✅ SOS: dark navy breathing hero with white-glow orb; breathing loop + grounding rotation preserved unchanged (no JS edits)
  — sos.html — verified hero 280px navy radial + emerald glow; orb `.inhale`/`.exhale` phase-synced (4s/4s/6s); live loop cycling ("Breathe out (5)"); Space Grotesk white phase text; coral primary button; SOS nav active glow ring

- ✅ Accessibility: `prefers-reduced-motion` guard added for all decorative animation on glass pages (closes the pre-existing gap flagged in the earlier reskin audit)
  — theme.css `@media (prefers-reduced-motion: reduce) .glass-ui *`

- ✅ No horizontal scroll on any page at 375px mobile width; no console errors on any page
  — verified via `document.documentElement.scrollWidth <= innerWidth` and error-only console read on all 4 pages

- ⚠️ Screenshots unavailable — the sandbox browser pane does not composite frames, so verification was done via computed styles, accessibility tree, and page text rather than visual capture. A human should eyeball the glass blur/mesh rendering on a real device.

- ⚠️ **Merge note (not a defect):** this branch (`redesign/glass-ui`, off `main`) predates PR #6, so streak.html here still uses the native `confirm()` for reset (checkin.html keeps its P6 custom modal, which was already on main). If PR #6 lands first, reconcile so the Streak reset uses the glass confirm modal too.

---

## Audit Summary

| Result | Count |
|---|---|
| ✅ PASS | 40 |
| ⚠️ CANNOT VERIFY | 6 |
| ❌ FAIL | 0 |

**No FAILs found.**

**Items requiring live browser verification:**
- P1 Fix: Day label and Next milestone label are readable on either side — index.html:237-240
- P1 Fix: Why text not visually competing with streak hero — index.html:207-211
- P2: Why text matches Supabase profiles.personal_why — checkin.html:1110-1125
- P3: Overlay does not fire a second time (localStorage guard) — checkin.html:1166-1167
- Glass Redesign: visual glass blur / mesh gradient rendering on a real device (sandbox pane could not screenshot)
- Glass Redesign: reconcile streak.html reset with PR #6's glass confirm modal on merge
