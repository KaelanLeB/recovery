# CLAUDE.md — Recovery App (Working Title: TBD)
 
## What This File Is
This file is read by Claude Code at the start of every session. It provides the full product context for this project so that every prototype, feature, and document Claude Code produces is grounded in the right user, problem, and principles — without needing to re-explain from scratch each time.
 
---
 
## The Product
 
A browser-based web app for people in active recovery from addiction — including substance addictions (alcohol, drugs) and behavioural addictions (gambling, etc.). The app serves as a trusted daily companion: part accountability partner, part safety net, part progress tracker.
 
### Working Title
TBD — name has not been decided yet. Do not invent a name. Use "the app" or "Recovery App" as a placeholder until instructed otherwise.
 
---
 
## The User
 
**Primary user:** A person actively in recovery from addiction of any kind.
 
### Who they are
- They are trying to stay sober or free from their addictive behaviour, one day at a time
- They may be early in recovery (days or weeks) or further along (months or years)
- They experience cravings — sometimes predictably, sometimes out of nowhere
- They want to feel proud of their progress, not ashamed of their past
- They may be doing this with professional support, peer support, or largely alone
- They are likely reaching for their phone or browser in a moment of stress or temptation
### What they need from this app
1. **Accountability** — a place to track their sobriety and feel the weight of their streak
2. **A craving lifeline** — something to navigate to immediately when a craving hits, that helps them get through the moment
3. **Daily check-in** — a low-friction, emotionally safe way to log how they're feeling each day
4. **Progress visibility** — to see how far they've come, not just how far they have to go
### What they do NOT need
- Judgment, shame, or clinical coldness
- Overwhelming complexity or too many choices when they're vulnerable
- To feel like they're using a medical tool or filling out a form
- Lectures or unsolicited advice
---
 
## The Core Problem
 
Recovery is hard to sustain in isolation. The moments that break streaks are often short — a craving that peaks and passes in minutes. The app's job is to be present in those moments, and to make the daily habit of accountability feel worth keeping.
 
---
 
## Design Principles
 
These principles apply to every screen, interaction, copy decision, and prototype Claude Code produces.
 
1. **Warm, not clinical.** The tone is like a trusted friend checking in — never a doctor, never a form. Use plain, human language.
2. **Never shame.** If a user resets their streak, the app responds with compassion, not disappointment. Relapse is part of recovery for many people.
3. **Speed when it counts.** The craving SOS feature must be reachable in as few taps as possible. When someone is in crisis, every second of friction is a risk.
4. **Celebrate small wins.** One day sober is worth celebrating. The app should make users feel the weight of their progress at every milestone.
5. **Get out of the way.** Especially on high-stress flows (craving SOS, daily check-in), keep the UI minimal. No clutter. No decisions they don't need to make.
6. **Inclusive by default.** The app supports all addiction types — never assume the user's addiction is alcohol or drugs. Language should work for any addiction.
---
 
## Core Features (MVP)
 
These three features are the heart of the MVP. All prototypes and specs should prioritise these before anything else.
 
### 1. Sobriety Streak Tracker
- Displays the user's current streak (days clean/sober)
- Allows the user to set their sobriety start date
- Provides a way to reset the streak with compassion (no punitive language)
- Shows meaningful milestones (e.g. 1 day, 1 week, 30 days, 90 days, 1 year)
### 2. Craving SOS
- A prominent, always-accessible button or navigation element
- When activated, immediately presents calming, grounding content to help the user ride out the craving
- May include: breathing exercises, a grounding prompt, a short distraction, or a motivational message tied to their streak
- Must load fast and require zero decision-making to activate
- Copy must be warm, non-judgmental, and human
### 3. Daily Check-In
- A simple, low-friction daily prompt (mood, how they're feeling, one word or a scale)
- Should feel like a brief, caring conversation — not a form
- Optionally allows a short journal note
- Confirms the day as sober (or not) as part of the check-in
- Should take under 60 seconds to complete
---
 
## What We Learned from the Previous Prototype (Replit)
 
A prior version of this app was built in Replit. Claude Code should be aware of this context when making design and architecture decisions:
 
- The streak tracker, craving SOS, and daily check-in were the features that felt most essential
- This is a fresh rebuild — do not attempt to recreate the Replit prototype exactly; use it as context only
- Specific learnings from the Replit version should be added here as the project progresses
---
 
## Technical Context
 
- **Platform:** Web app (browser-based), deployed on GitHub Pages at `https://kaelanleb.github.io/recovery/`
- **Stage:** Working prototype with live backend — Supabase is wired up, auth is live, data is persisted
- **Stack:** Vanilla HTML/CSS/JS (no build step), Supabase JS SDK v2 (ES module from CDN), Google Fonts
- **Auth/Backend:** Supabase anonymous auth is live. `profileId` in localStorage = `auth.user.id`. See Technical State section below.
- **Accessibility:** Aim for WCAG AA compliance in all pages — this user group may include people in distress
---
 
## Prototyping Guidelines
 
When building prototypes in this project:
 
- Always build for mobile-first (even though it's a web app — the user is likely on their phone)
- Use placeholder data that feels real (e.g. "Day 47 sober" not "Day X sober")
- Include emotional copy in prototypes — do not use lorem ipsum
- After building any prototype, also generate a companion technical brief documenting: design decisions made, assumptions, and open questions for engineering
- Flag any moment where the design could inadvertently shame or distress the user
---
 
## Open Questions
 
These are product decisions not yet made. Claude Code should flag these when relevant rather than making assumptions.
 
- [ ] App name
- [x] Whether the app requires user accounts / login — **resolved:** Supabase anonymous auth (no email/password required, session persists across visits)
- [ ] Whether to include community/peer features in a future phase
- [ ] Monetisation model (free, freemium, subscription)
- [ ] Whether to integrate with professional support or 12-step programs
- [ ] Notification/reminder strategy (daily check-in prompts, milestone alerts)
- [ ] How to handle relapse data sensitively (privacy implications)
- [x] How the app should store and track sobriety dates — **resolved:** Supabase `profiles` table with `sobriety_start_date` (timestamptz), tied to anonymous auth session
---
 
## How to Work With Me (The PM)
 
- I am a non-technical product manager learning Claude Code
- Explain technical decisions in plain language when they matter for product decisions
- When you make a design assumption, say so explicitly
- When you build a prototype, also produce the companion technical brief
- Ask me before making major structural decisions not covered in this file
- Prioritise the three MVP features above all else until instructed otherwise

Competitive UI/UX Patterns (from research)
The following patterns come from research on the leading apps in this space (I Am Sober, Sunnyside, Reframe, Loosid, Finch, Headspace, Calm, Habitica). They translate the design principles above into specific, borrowable patterns. When designing or modifying any screen, prefer these:
For the Sobriety Streak Tracker

Day-counter as home-screen hero (I Am Sober pattern). Make the count big, warm, and the first thing users see.
Reframable resets, never "lost streaks" (industry-wide 2026 shift). Use cumulative-days language alongside current streak ("80 days sober across your journey, 12 in this stretch").
Milestone celebrations at 1 day, 1 week, 30 days, 90 days, 1 year (I Am Sober) — match the milestones already in your MVP spec.
Optional growth-collection or nurturing visual (Finch, Habitica) — e.g., a plant or garden that grows alongside the streak. Reframes self-care as caring for something. Avoid loss mechanics.

For Craving SOS

One-tap from anywhere (Calm's "press play" pattern). No menu, no choice — straight into a guided 90-second exercise.
Bridge the 20-minute craving window. Cravings typically peak and pass within ~20 minutes; the SOS flow's job is to bridge that gap with breathing, grounding, or urge-surfing.
Calm visual language (Headspace) — rounded shapes, soft pillows, muted warm palette. The SOS screen should look like a deep breath.

For Daily Check-In

Morning pledge + evening reflection bookends (I Am Sober). Two micro-moments, not one big form.
Conversational tone, not a form (Sunnyside). Short prompts that feel like a friend asking, not a questionnaire.
Adaptive surface — if the user is steady, surface less. If they missed yesterday, lead with a gentle re-engagement (never a scold).

Onboarding (when we build it)

3-minute anonymous intake, account deferred (Sunnyside). Get the user to value before requiring identity.
Tone choice during onboarding (warm-companion vs. empowering-coach) — different users in recovery want different relationships with the app.

Future community phase (open question in this file)

Lifestyle-feed depth (Loosid) — community as a core surface, not a side tab.
Stage-grouped groupings (I Am Sober) — newcomers shouldn't be sitting next to 10-year veterans.


Reference
Full competitive research with rationale, screenshots-by-description, and sources:
@./docs/recovery-app-uiux-research.md
When working on a UI/UX change, you can either let CLAUDE.md guide you (above) or invoke /apply-recovery-pattern <component-path> to load the full research and propose concrete changes against a specific component.

---

## Technical State (as of 2026-05-31)

### Page routing

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` (root) | **Home screen** — streak hero, today's check-in status, personal why card. Authenticated entry point. |
| `checkin.html` | `/checkin.html` | Daily check-in form — 4-step flow (mood → sober/slip → journal → complete). Reached via the home screen CTA. |
| `streak.html` | `/streak.html` | Full streak tracker — live timer, milestones, recovery timeline, stats, reset. |
| `sos.html` | `/sos.html` | Craving SOS — breathing circle, grounding prompts. Reachable one tap from any page. |
| `onboarding.html` | `/onboarding.html` | First-time setup — 4-step intake (name, addiction type, sobriety start date, personal why). |
| `supabase.js` | — | Supabase client init (shared by all pages via ES module import). |
| `theme.css` | — | Design tokens, shell layout, bottom nav. Shared by all pages. |

**Bottom nav:** Home (`index.html`) | SOS FAB (`sos.html`) | Streak (`streak.html`)

**Auth guard pattern** on `index.html`, `checkin.html`, `streak.html`: top-level `await supabase.auth.getSession()` — if no session, redirect to `onboarding.html` and halt. Nothing renders until auth is known (no flash of wrong content).

**Onboarding inverse guard:** if session already exists on load of `onboarding.html`, redirect to `index.html` immediately.

### Personal why

`profiles.personal_why` (text, nullable) is fetched on home screen load and displayed in a warm amber card below the streak hero. If null, the card is hidden. This is currently display-only — no edit UI exists yet.

### Database — Supabase project `asjgudrxgyrsydntqrak`

**`profiles` table** — created in an earlier session. Columns: `id` (uuid PK), `name` (text), `addiction_type` (text), `addiction_specific` (text, nullable), `sobriety_start_date` (timestamptz), `personal_why` (text, nullable), `daily_cost` (numeric, nullable).

**`checkins` table** — created 2026-05-24. Columns: `id` (uuid PK, gen_random_uuid()), `profile_id` (uuid NOT NULL, FK → profiles.id), `checked_in_at` (date NOT NULL, default CURRENT_DATE), `sober` (boolean NOT NULL), `mood` (text, nullable), `note` (text, nullable), `created_at` (timestamptz NOT NULL, default now()). Unique constraint on `(profile_id, checked_in_at)` — enforces one check-in per user per day at the database level.

### Authentication

Supabase Anonymous Auth is wired through `onboarding.html`. On onboarding completion, `supabase.auth.signInAnonymously()` is called first; the returned `user.id` is used as the profile's primary key and stored in `localStorage` as `profileId`. Every new user gets a real Supabase auth session without needing an email or password.

**`profileId` in localStorage** now equals `auth.user.id` (the anonymous auth UUID) — not a client-generated `crypto.randomUUID()`. Existing profiles created before this change (using `crypto.randomUUID()`) are legacy and will not have a matching auth session.

`index.html`, `checkin.html`, and `streak.html` call `supabase.auth.getSession()` on page load and redirect to `onboarding.html` if no session is found.

### Row Level Security (RLS)

⚠️ **RLS is not yet enabled.** The code is fully wired for auth-based RLS but the dashboard step has not been completed. To enable RLS, run the following SQL in the Supabase SQL Editor and confirm Anonymous Auth is enabled under Authentication → Providers:

```sql
-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own"  ON profiles FOR SELECT USING       (auth.uid() = id);
CREATE POLICY "profiles_insert_own"  ON profiles FOR INSERT WITH CHECK  (auth.uid() = id);
CREATE POLICY "profiles_update_own"  ON profiles FOR UPDATE USING       (auth.uid() = id);

-- checkins
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "checkins_select_own"  ON checkins FOR SELECT USING       (auth.uid() = profile_id);
CREATE POLICY "checkins_insert_own"  ON checkins FOR INSERT WITH CHECK  (auth.uid() = profile_id);
```

Once applied, update this section to reflect RLS is live. Existing test rows inserted before auth was wired up will become inaccessible (their `id`/`profile_id` won't match any `auth.uid()`).

### Date handling

All date comparisons and inserts use `new Date().toLocaleDateString('en-CA')` which produces `"YYYY-MM-DD"` in the user's local timezone. This prevents off-by-one errors for users in UTC-offset timezones (e.g. Vancouver at UTC-7/8) checking in after ~4–5 pm.