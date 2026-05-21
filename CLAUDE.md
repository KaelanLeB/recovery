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
 
- **Platform:** Web app (browser-based)
- **Stage:** Early prototype / pre-engineering
- **Stack:** Not yet decided — Claude Code should default to simple HTML/CSS/JS for prototypes unless instructed otherwise
- **Auth/Backend:** Not in scope for current prototyping phase — use placeholder data and static states
- **Accessibility:** Aim for WCAG AA compliance in all prototypes — this user group may include people in distress
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
- [ ] Whether the app requires user accounts / login (vs. anonymous local storage)
- [ ] Whether to include community/peer features in a future phase
- [ ] Monetisation model (free, freemium, subscription)
- [ ] Whether to integrate with professional support or 12-step programs
- [ ] Notification/reminder strategy (daily check-in prompts, milestone alerts)
- [ ] How to handle relapse data sensitively (privacy implications)
- [ ] How the app should store and track sobriety dates (local browser storage with no login, user account with database, or a hybrid approach)
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