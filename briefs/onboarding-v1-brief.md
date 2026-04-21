# Onboarding v1 — Technical Brief

**Prototype:** `prototypes/onboarding-v1.html`
**Date:** 2026-04-20
**Status:** Prototype — not production-ready

---

## What this is

A 4-step first-run onboarding flow that collects the minimum information needed to personalise the app experience. It appears once, on first open, and is never shown again once completed.

---

## How it works

### First-run detection

On load, `onboarding-v1.html` checks for `localStorage.getItem('onboardingComplete') === 'true'`. If found, it immediately redirects to `index.html` — the user never sees onboarding again.

`index.html` has the same guard in reverse: if `onboardingComplete` is not set, it redirects to `prototypes/onboarding-v1.html`. This means either URL is a safe entry point.

**To reset onboarding during testing:** open browser DevTools → Application → Local Storage → delete all keys, or run `localStorage.clear()` in the console.

### localStorage schema

On completion of Step 4, the following keys are written atomically (all at once, at the end):

| Key | Type | Required | Notes |
|---|---|---|---|
| `userName` | string | Yes | First name as entered |
| `addictionType` | string | Yes | One of: Alcohol, Drugs, Nicotine, Gambling, Social Media, Gaming, Other |
| `addictionSpecific` | string | No | Free text, empty string if skipped |
| `sobrietyStartDate` | ISO 8601 string | Yes | Converted from datetime-local input via `new Date().toISOString()` |
| `personalWhy` | string | No | Free text, empty string if skipped |
| `onboardingComplete` | `"true"` | — | Written last; acts as the completion flag |

**Note:** Data is written only when the user completes Step 4. If they close the browser mid-flow, nothing is saved and onboarding restarts from Step 1 next time.

### Greeting personalisation in index.html

`index.html` reads `localStorage.getItem('userName')` on load. If present, the greeting becomes e.g. `"Good morning, Sarah."` — the name is appended with a period. If absent (pre-onboarding or data cleared), it falls back to `"Good morning,"` with no trailing period, preserving the existing visual.

---

## Design decisions

### Progress bar (not dots)
The spec called for a progress bar filling left to right. The existing `index.html` uses progress dots — this onboarding uses a 4px bar at the very top of the viewport to feel more like a native onboarding flow and avoid visual confusion with the check-in dots. The bar uses `--sage-700` (the app's primary teal/green) and fills at 25% / 50% / 75% / 100% per step.

### Addiction type as cards, not a dropdown
Cards are more emotionally appropriate here. A dropdown requires the user to open a list and make a mechanical selection at a vulnerable moment. Cards feel warmer, more intentional, and are easier to tap on mobile. Single-select behaviour (selecting one deselects all others) is enforced via `aria-pressed` and JavaScript.

### datetime-local defaults to current time
Step 3 defaults the picker to the exact moment the user reaches that step. The `max` attribute is also set to now, preventing future dates from being selected — you can't claim a start date that hasn't happened yet. If the user clears the field and clicks Continue, it falls back to `new Date().toISOString()`.

### Data saved only on final completion
Nothing is written to localStorage until the user taps "Start my journey →" on Step 4. This is intentional: partial saves could create a state where `onboardingComplete` is false but some keys exist, which would require defensive reads throughout the app. Atomic save on completion is simpler and safer.

### Fade-out before redirect
After saving, the shell fades to opacity 0 over 400ms before `window.location.replace()` fires. This avoids a jarring white flash during the redirect and gives the transition a sense of completion.

### No back button
This prototype has no back navigation between steps. This is deliberate for v1 — it keeps the flow simple and reduces the chance of a confused state. A back button can be added in a future iteration if user testing shows it's needed.

---

## Assumptions made

1. **Single-device, no account.** All data lives in localStorage on the user's current browser. There is no sync, backup, or account system — consistent with the current app architecture.
2. **One addiction type per user.** The flow selects exactly one type. If a user has multiple, they should pick their primary one. This could be revisited in a future version.
3. **Start date cannot be in the future.** The `max` attribute on the datetime picker prevents this. The assumption is that users are logging an event that has already happened.
4. **No validation on the "why" field.** It is fully optional and accepts any text up to 500 characters.
5. **Redirect target is `../index.html`.** The prototype lives in `/prototypes/` one level below the app root. If the directory structure changes, the redirect paths will need updating.

---

## Open questions for engineering

- [ ] **What if localStorage is unavailable?** Some browsers in private/incognito mode block localStorage writes. Should the app detect this and show a warning, or fail silently?
- [ ] **Should onboarding data be editable?** There's currently no way for a user to change their name, addiction type, or start date after onboarding. A settings screen would address this.
- [ ] **Should the start date drive the streak counter in streak.html?** Currently `streak.html` uses static/placeholder data. Wiring `sobrietyStartDate` from localStorage to the streak calculation is the next integration step.
- [ ] **Accessibility of datetime-local on iOS Safari.** The `datetime-local` input renders as a native date/time picker on iOS, which looks different from the app's visual language. Consider a custom date picker if visual consistency matters.
- [ ] **Should userName be trimmed of leading/trailing whitespace?** The current implementation does `nameInput.value.trim()` — confirm this is the desired behaviour (it is, but worth noting for QA).

---

## Testing checklist

- [ ] **Continue button stays disabled until required fields are filled**
  - Step 1: type nothing → button is grey/disabled. Type any character → button activates.
  - Step 2: tap no card → button is grey/disabled. Tap a card → button activates.
  - Steps 3 & 4: buttons are always active (no required gate).

- [ ] **Selecting a card deselects others**
  - Tap Alcohol → Alcohol highlighted. Tap Drugs → Drugs highlighted, Alcohol deselected. Repeat for all 7 options.

- [ ] **localStorage saves correctly on completion**
  - Complete all 4 steps. Open DevTools → Application → Local Storage.
  - Confirm all 6 keys are present: `userName`, `addictionType`, `addictionSpecific`, `sobrietyStartDate`, `personalWhy`, `onboardingComplete`.
  - Confirm `onboardingComplete` is the string `"true"`.
  - Confirm `sobrietyStartDate` is a valid ISO 8601 string.

- [ ] **App skips onboarding on second visit**
  - Complete onboarding. Navigate back to `prototypes/onboarding-v1.html` manually.
  - Should immediately redirect to `index.html` without showing any onboarding UI.

- [ ] **index.html correctly reads and displays the user's name**
  - After onboarding, open `index.html`. The greeting should read e.g. "Good morning, Sarah." (with the name and a period).
  - Verify all three greeting variants (morning/afternoon/evening) display the name correctly.
  - Clear localStorage and reload `index.html` — greeting should fall back to "Good morning," (no name).

- [ ] **Date picker defaults to today correctly**
  - Open Step 3. Confirm the datetime-local input shows today's date and current time (within a minute of when the step loads).
  - Confirm a future date cannot be selected (picker blocks it).

- [ ] **Progress bar advances at each step**
  - Step 1: bar is at 25%.
  - Step 2: bar is at 50%.
  - Step 3: bar is at 75%.
  - Step 4: bar is at 100%.

- [ ] **Test on 375px mobile viewport**
  - Open DevTools → toggle device toolbar → set to 375px wide.
  - Verify addiction cards render as 3 columns with no overflow.
  - Verify all buttons are full-width and comfortably tappable (min 44px height).
  - Verify no horizontal scroll on any step.

---

## Potential shame/distress flags

- The addiction type cards use neutral icons and clinical-enough labels (no stigmatising language). The "Drugs" label is broad enough to be non-judgmental. No concern raised.
- The start date copy ("It's okay if this was just now. Every journey starts somewhere.") is intentionally warm — it anticipates the user who is starting at rock bottom today and needs immediate reassurance.
- No negative language is used at any point in the flow. The word "quit" appears only in the placeholder copy ("I want to quit because...") — this is appropriate as it echoes language many users would naturally use themselves.
