# Streak Tracker v2 — Technical Brief

**Prototype:** `prototypes/streak-tracker-v2.html`
**Builds on:** `prototypes/streak-tracker-v1.html`
**Date:** 2026-04-20
**Status:** Prototype — not production-ready

---

## What changed from v1

v1 displayed a static day count (hardcoded "47") with no live behaviour. v2 replaces the static display with a live counter that reads the user's real sobriety start date from `localStorage` and counts up in real time — days as the hero number, and hours / minutes / seconds ticking below it.

Everything else is unchanged: milestones, reset section, start-date editor, bottom navigation, page structure.

---

## How it works

### Data source

On load, v2 reads `localStorage.getItem('sobrietyStartDate')`. This key is written by the onboarding flow (`prototypes/onboarding-v1.html`) when the user completes Step 4. Its value is a date string in `YYYY-MM-DD` format (from an `<input type="date">`).

### Time calculation

```
totalSeconds = Math.max(0, Math.floor((Date.now() - startTimestamp) / 1000))

days  = Math.floor(totalSeconds / 86400)
hours = Math.floor((totalSeconds % 86400) / 3600)
mins  = Math.floor((totalSeconds % 3600) / 60)
secs  = totalSeconds % 60
```

`Math.max(0, ...)` ensures the display never goes negative if `sobrietyStartDate` is set to a future time.

Date-only strings (e.g. `"2026-04-18"`) are normalised to `"2026-04-18T00:00:00"` before parsing so that `new Date()` treats them as local midnight rather than UTC midnight — avoiding a timezone-driven off-by-one on the day count.

### Live ticker

`setInterval(tick, 1000)` runs every second. It recalculates elapsed time from `localStorage` on each tick rather than incrementing a counter, so it stays accurate across tab suspensions and device sleep.

### Placeholder mode

If `sobrietyStartDate` is absent from `localStorage` (user hasn't completed onboarding), the display freezes at Day 47 / 11:23:04 and shows an italic note: *"Complete onboarding to track your real streak"*. The ticker does not run in placeholder mode — the seconds stay fixed so it's visually obvious that this is a demo state.

### Count-up animation

On the first page visit per browser session, the day number animates from 0 to its real value using a cubic ease-out over 800 ms. Subsequent visits within the same session (e.g. tab reload) skip the animation. This uses `sessionStorage` to track whether the animation has already fired.

### Reset behaviour

Clicking "Reset streak with compassion" sets `sobrietyStartDate` to `new Date().toISOString()` (the exact current moment), so the ticker immediately restarts from 0d 00:00:00 and counts up from there.

---

## Visual design decisions

| Element | Treatment | Reasoning |
|---|---|---|
| Day number | 108px Fraunces serif, sage-700 | Unchanged from v1 — remains the dominant, celebratory element |
| HH:MM:SS | 26px Inter, sage-700 at 60% opacity | Secondary but satisfying — clearly readable, clearly subordinate |
| HRS/MIN/SEC labels | 9px uppercase, ink-300 | Minimal — enough to orient, not competing for attention |
| Separators `:` | sage-700 at 35% opacity | Recede further so the digits are the focus |
| Placeholder note | 12px italic, ink-300 | Gentle, not alarming — frames the demo state without shame |

The reduced opacity on the time counter (vs. the day number) creates a visual hierarchy: **what you've achieved** (days) sits above **the proof it's real** (seconds ticking). Seeing seconds tick should feel rewarding, not clinical — the warm sage palette helps with this.

---

## localStorage schema (relevant keys)

| Key | Written by | Format | Notes |
|---|---|---|---|
| `sobrietyStartDate` | Onboarding v1 (Step 4) or streak Edit panel | `YYYY-MM-DD` or full ISO string | v2 handles both formats |
| `onboardingComplete` | Onboarding v1 | `"true"` | Not read by streak tracker, but relevant context |

---

## Testing checklist

Run these manually with DevTools open (Application → Local Storage).

### 1. Does the counter tick every second visibly?
- Clear localStorage, load the page → placeholder mode, seconds frozen at 04 ✓
- Set `sobrietyStartDate` to a past date, reload → seconds should increment every second ✓

### 2. Set sobrietyStartDate to 2 days ago — correct hours?
```js
localStorage.setItem('sobrietyStartDate', '2026-04-18');
location.reload();
```
Expected: day count = 2 (or 1, depending on local time vs. midnight boundary), hours = remaining hours since midnight on that date, minutes and seconds ticking.

### 3. Set sobrietyStartDate to 1 minute ago — shows 0 days 00:01:xx?
```js
localStorage.setItem('sobrietyStartDate', new Date(Date.now() - 65000).toISOString());
location.reload();
```
Expected: Day 0, 00:01:05 (or similar) and counting up ✓

### 4. Set sobrietyStartDate to a future time — shows 0 without going negative?
```js
localStorage.setItem('sobrietyStartDate', new Date(Date.now() + 600000).toISOString());
location.reload();
```
Expected: Day 0, 00:00:00, no negative numbers ✓

### 5. Does it fall back gracefully with no localStorage data?
```js
localStorage.clear();
location.reload();
```
Expected: Day 47, 11:23:04 frozen, placeholder note visible ✓

### 6. Test on 375px mobile viewport
Open DevTools → toggle device toolbar → set to 375px wide. Verify:
- Day number doesn't overflow the card
- HH:MM:SS fits on one line without wrapping
- All tap targets (Edit start date, Update, Reset) are at least 44px tall

---

## Open questions for engineering

- **Accuracy on app resume:** `setInterval` drifts slightly when the tab is backgrounded on mobile. For a recovery app where exact seconds matter emotionally, consider resetting the interval on `visibilitychange` (when the tab regains focus) rather than trusting the accumulated ticks.

- **Timezone handling:** The current prototype parses `YYYY-MM-DD` as local midnight. If the backend ever stores UTC ISO strings, the start-of-day calculation needs to account for the user's offset — otherwise users in negative-offset timezones may show one fewer day near midnight.

- **Streak definition question (open from v1):** Does "Day 1" begin the moment the user sets their date, or at midnight? The current implementation treats the start as midnight of the chosen date. If the product intent is that "today counts as Day 1 from the moment you set it," the calculation should use `new Date().toISOString()` (exact moment) rather than midnight. This is a product decision, not a technical one.

- **Accessibility:** `aria-live="off"` is set on the time counter intentionally. Announcing every second to screen readers would be unusable. A future improvement could announce the day count once on load, and suppress the HH:MM:SS entirely from the a11y tree.

- **Persistence across devices:** localStorage is browser/device-scoped. A user who sets their date on mobile will see placeholder mode on desktop. This is an expected limitation for the current prototype phase.
