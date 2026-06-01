# Recovery App

A browser-based daily companion for people in active recovery from addiction of any kind — substance, behavioural, or otherwise.

**Live:** https://kaelanleb.github.io/recovery/

---

## What it is

The app focuses on three core needs:

1. **Sobriety streak tracker** — displays the current streak as the hero element, with milestones, a live recovery timeline, and compassionate reset support
2. **Daily check-in** — a short, conversational flow (mood → sober/slip → journal) that saves each day to a database
3. **Craving SOS** — one-tap breathing and grounding exercises to bridge the ~20-minute craving window

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript — no build step, no framework |
| Backend | [Supabase](https://supabase.com) — PostgreSQL + anonymous auth |
| Hosting | GitHub Pages (auto-deploys on push to `main`) |
| Fonts | Google Fonts — Fraunces (display), Inter (body) |

No npm, no bundler. Every file runs directly in the browser.

---

## Running locally

```bash
npx serve -l 3400 .
# Open http://localhost:3400
```

No environment setup required — the Supabase client is initialised in `supabase.js` and loaded as an ES module.

---

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | **Home screen** — streak hero, today's check-in status, personal why |
| `checkin.html` | `/checkin.html` | Daily check-in form — 4-step flow (mood → sober/slip → journal → done) |
| `streak.html` | `/streak.html` | Full streak view — live timer, milestones, recovery timeline, stats, money saved |
| `sos.html` | `/sos.html` | Craving SOS — breathing circle, grounding prompts |
| `onboarding.html` | `/onboarding.html` | First-time setup — name, addiction type, sobriety start date, personal why |
| `supabase.js` | — | Supabase client (shared via ES module import) |
| `theme.css` | — | Design tokens, shell layout, bottom nav |

**Navigation:** Home · SOS (FAB) · Streak

---

## Auth

The app uses Supabase Anonymous Auth — no email or password required. On onboarding completion, `signInAnonymously()` creates a real Supabase session. The returned `user.id` is used as the profile primary key and stored in `localStorage` as `profileId`.

Sessions persist across visits. All pages call `supabase.auth.getSession()` on load and redirect to onboarding if no session exists.

---

## Database

Supabase project: `asjgudrxgyrsydntqrak`

**`profiles`**
```
id                  uuid PK  (= auth.user.id)
name                text
addiction_type      text
addiction_specific  text (nullable)
sobriety_start_date timestamptz
personal_why        text (nullable)
daily_cost          numeric (nullable)
```

**`checkins`**
```
id               uuid PK  (gen_random_uuid())
profile_id       uuid FK → profiles.id
checked_in_at    date  (local YYYY-MM-DD)
sober            boolean
mood             text (nullable)
note             text (nullable)
created_at       timestamptz
UNIQUE(profile_id, checked_in_at)
```

> ⚠️ **RLS not yet enabled.** SQL to apply is in `CLAUDE.md` under Technical State.

---

## Design principles

- **Warm, not clinical** — tone of a trusted friend, not a doctor or a form
- **Never shame** — relapse is part of recovery; resets are compassionate, not punitive
- **Speed when it counts** — SOS is one tap from anywhere, always
- **Inclusive** — language works for any addiction type, never assumes alcohol or drugs

---

## Changelog

Updates are logged here when features ship.

### 2026-05-31
- **Home screen** — `index.html` is now the authenticated entry point (was the check-in form). Shows streak hero, today's check-in CTA or done-state, and personal why card.
- **Personal why surfacing** — `profiles.personal_why` displayed on home screen in a warm amber card; hidden if not set.
- **Check-in form moved** to `checkin.html` (was `index.html`).
- **Bottom nav** updated to Home | SOS | Streak across all pages.

### 2026-05-24
- **App-init overlay** — neutral loading screen on all pages blocks render until `supabase.auth.getSession()` resolves; no flash of wrong content.
- **Anonymous auth wired** — `onboarding.html` calls `signInAnonymously()` on completion; `profileId` now equals `auth.user.id`.
- **Check-in data persisted** — `saveCheckin()` inserts to `checkins` table; duplicate check-ins caught by UNIQUE constraint (error code 23505).
- **Today-guard** — home screen and check-in page query `checkins` on load; shows "already checked in" state if a row exists for today.
- **`checkins` table created** in Supabase with schema above.
- **Streak reset** wired inline from the slip complete screen.
- **Date handling** standardised to `new Date().toLocaleDateString('en-CA')` for timezone-safe `YYYY-MM-DD` strings.

### Earlier
- Onboarding 4-step flow (name, addiction type, start date, personal why) — saves to `profiles`
- Streak tracker with live timer, milestones, recovery timeline by addiction type, money saved calculator
- Craving SOS with 4–4–6 breathing and grounding prompts
- Daily check-in UI (mood, sober/slip, journal) — 4-step card flow
- Shared design system in `theme.css` (tokens, shell, bottom nav)
