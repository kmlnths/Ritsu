# Ritsu

> 律 — rhythm, order, discipline.

A shared to‑do, habit and health tracker for a small group of friends. Mobile‑first, installable to the home screen, and offline‑capable.

Ritsu's one idea: **not everything you track deserves to be scored the same way.** Brushing your teeth, a bowel movement, and a cigarette are three different kinds of thing, and treating them identically is what makes most habit trackers feel wrong.

---

## The model

Every item has a **stance**, which decides how it's scored.

| Stance | For | Success is | Streak |
|---|---|---|---|
| **Routine** | Things you mean to do — meds, gym, brushing | Hitting the target | Consecutive days met |
| **Body** | Things that just happen — bowel, urination, sleep | Being in the usual range | **None.** A bowel movement is not an achievement |
| **Limit** | Things you're cutting down — smoking, drinking | The empty day | Consecutive days **without** |
| **Episode** | Things that run for days — a cold, back pain | Not applicable | Ritsu records how long it lasted |
| **Fasting** | A timed eating window | Reaching the target | Not applicable |

Only **Routine** items feed the daily completion number. A skipped workout and a drink no longer dent the same score.

### Markers

A marker is a flag attached to **one log entry**, not to a day and not to a separate item. "Blood in stool" lives on the bowel log; "Gums bled" lives on brushing. A standalone *Bleeding* item would give you a column of identical marks with no context — this way the weekly report can say *which* one, at what time, on a day you also went three times.

Markers are opt‑in per item, named specifically, and you can write your own.

### Anomalies and escalation

Five rules run over every logged item:

- **marker** — something was flagged
- **high** — more than usual that day
- **low** — fewer than usual
- **gap** — too long since the last one (body items only)
- **time** — logged well outside its expected time

A single odd day stays off the report on purpose. Two or three become **Recurring**; three in a week, two weeks running, or an urgent marker twice becomes **Persistent** and leads the weekly report with a plain "worth mentioning to a doctor".

When a pattern sets in, Ritsu asks *once* why — and at most once a day. A prompt every day is a nag, and nagging apps get deleted.

### Consistency

The headline number is **not** a streak. Each day scores *how much of that day's daily routine you finished*, with partial credit (50 pages of a 100‑page goal is half a tick, not zero). Consistency is the 30‑day average of that, and the calendar draws every square it's made of.

A broken streak never shows as **0** — it shows as *"Best run was 12 days. It starts again today."*

---

## Features

- **Activity rings** — Routine, Body, Holding off, in one glyph
- **Consistency calendar** — 18 weeks, one square per day
- **Today, in order** — a timeline built from expected times, with a live *now* line
- **Fasting timer** — 12:12 through 20:4, OMAD, and extended fasts, with stages
- **Library** — 190+ presets across 18 groups, so nobody has to ask for "reading" to be added
- **Weekly report** — patterns ordered by persistence, not by date
- **Export** — everything as JSON, or a plain doctor‑ready summary
- **Two themes**, light and dark
- **Offline** — installs to the home screen and works with no connection

---

## Running it

It's one file. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

### Deploying

Pushing to `main` deploys to GitHub Pages automatically via `.github/workflows/pages.yml`.

One‑time setup: **Settings → Pages → Source → GitHub Actions**.

### Installing on a phone

Open the deployed URL, then:

- **Android / Chrome** — menu → *Install app*
- **iPhone / Safari** — share → *Add to Home Screen*

It then runs full‑screen with its own icon.

---

## Where your data lives

**In your browser, on the device you used.** There is no server, no account, and nothing is sent anywhere.

Items marked **Only this device** are stored separately and are the one genuinely private option — because with no logins, "Just me" is a curtain, not a lock. This is stated plainly in the app rather than buried.

Clearing your browser data deletes everything. Use **Settings → Export** for a copy.

---

## Status

This is a working prototype. It is deliberately local‑only. The planned next step is a real backend — SvelteKit + Supabase, with accounts, shared boards via invite link, and end‑to‑end encryption for private items so that not even whoever runs the server can read them.

Until that exists, don't put anything on a shared board that you'd mind a friend seeing.

---

## Not a medical device

Ritsu records what you log. It does not interpret symptoms, diagnose anything, or give medical advice. Fasting stage names describe elapsed time, not health claims — and Ritsu deliberately doesn't chart autophagy, because when it peaks in humans isn't settled.

If you're pregnant, diabetic, on medication, under 18, or have a history of disordered eating, talk to a doctor before fasting — especially anything past a day.

---

## Licence

MIT. See [LICENSE](LICENSE).
