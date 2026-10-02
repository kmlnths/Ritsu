# Competitive brief: small calm apps (2026-10-03)

Decision this informs: which ideas to build into Daywell next. Daywell is a phone app on its way to the App Store and Play Store, for people on daily medicine who also run a normal day.
Sources: each app's website and App Store page, read 2026-10-03. Apps were not installed. Wider market (Bearable, Finch, Tiimo) is in `founder/competitor-matrix.md`.

## Competitor overview

| App | Maker | Out since | Ratings (US) | Price | What it says it is |
|---|---|---|---|---|---|
| [Rhythm](https://tryrhythm.app/) | Trevor Polidore, solo | Jan 2025, last update May 2025 ([App Store](https://apps.apple.com/us/app/rhythm-smart-routine-tracker/id6737943863)) | 5.0 from 3 | Free | "Build better habits, one day at a time". Routines, recurring tasks, streaks, reminders, charts |
| [Enough Today](https://enoughtodayapp.netlify.app/) | Joshua Jensen, solo | May 2025, version 4.4 Sept 2025 ([App Store](https://apps.apple.com/us/app/enough-today/id6761869652)) | 4.5 from 4 | Free | "A gentle daily planner that adapts to the day you actually have" |
| [Somehow](https://somehow.olddognewflex.com/) | Raymond Doran, solo | Not found ([App Store](https://apps.apple.com/us/app/somehow/id6797419233)) | Too few to show | Free, tip jar $3, $5, $10 | "You don't have to know how." One tidying step at a time |
| [Haven](https://havenlimit.app/) | Zachary Highley-Gergel, solo | Version 1.5.0, Sept 2024 ([App Store](https://apps.apple.com/us/app/id6759458256)) | 5.0 from 1 | $6.99 a month, $49.99 a year, $299.99 lifetime | "Move before you open." Blocks apps until you exercise |

All four are iPhone only, made by one person, and tiny. Estimate: each earns well under $1,000 a month (a handful of ratings usually means a few hundred downloads). None has enough reviews to mine for complaints. The one written wish found: a Rhythm reviewer said "the only thing that it's missing is a widget."

## Feature comparison

| Area | Daywell | Rhythm | Enough Today | Somehow | Haven |
|---|---|---|---|---|---|
| **Planning the day** | | | | | |
| To-dos and recurring tasks | Strong | Strong | Adequate | Weak (chores only) | Absent |
| Rhythm (some days, N a week, every few days) | Strong | Adequate (daily, weekly, monthly, custom) | Weak | Absent | Absent |
| A view of what is coming up this week | Weak | Strong ("Upcoming" list) | Unknown | Absent | Absent |
| Low-energy or bad-day mode | Absent | Absent | Strong (energy check-in) | Weak (skip) | Absent |
| Smaller version of a habit that still counts | Weak (half credit on number goals only) | Absent | Strong (Quick, Standard, Extended) | Absent | Absent |
| **Health** | | | | | |
| Medicine with stock and refill | Strong | Weak (a use case, no stock) | Absent | Absent | Absent |
| Symptom and body logs | Strong | Absent | Absent | Absent | Absent |
| **Progress and feeling** | | | | | |
| Fair scoring (misses never punish) | Strong | Absent (streaks) | Strong (totals, not streaks) | Strong | Absent |
| Streak-free progress | Weak (streak flame still shown) | Absent | Strong | Strong | Absent |
| Per-item history and heatmap | Adequate | Strong (added May 2025) | Unknown | Absent | Weak (weekly history) |
| Celebration | Adequate (one burst when the day is complete) | Adequate (animations) | Unknown | Weak | Absent |
| **Phone** | | | | | |
| Home screen widget | Absent | Absent (users ask) | Unknown | Absent | Absent |
| Offline, no account | Strong | Strong | Adequate (local-first with sync) | Strong | Strong |
| Friends | Absent (planned, "plan kept" only) | Absent | Absent | Absent (promised never) | Absent |

## Positioning

- **Rhythm:** for anyone building habits; a habit tracker; streaks and stats. Sits in the most crowded spot in the store.
- **Enough Today:** for people who feel behind before the day starts; a gentle planner; adapts to your energy.
- **Somehow:** for people frozen by mess; a one-step chore guide; no decisions.
- **Haven:** for people who scroll too much; an app blocker; movement as the toll.
- **Open spot:** "a calm day for people living with a health condition", with medicine, symptoms and a normal to-do list in one place. No one here claims it.

Crowded claims to avoid leading with: "build better habits", "streaks", "simple and intuitive".

## Strengths and weaknesses

| App | Strong at | Weak at |
|---|---|---|
| Rhythm | Clear Today screen (to complete, completed, upcoming), flexible repeats, per-task stats, Mac and Vision Pro too | Streaks can shame; no health depth; no widget; few updates since May 2025 |
| Enough Today | Energy check-in, three sizes of a habit, totals instead of streaks, frequent updates | No health; iPhone only; very small audience |
| Somehow | The calmest wording here; no backlog ever; honest "won't do" list; tip jar | One job only (chores) |
| Haven | Clear single promise; strong privacy wording; the "do something else instead" choice | Friction by design; narrow, crowded niche; high price for a tiny app |

## Opportunities

1. People with a condition need bad-day planning and medicine together. Enough Today has the first, Bearable has the second, nobody has both.
2. Streaks are the norm (Rhythm), and their reset feels bad. Totals that never go backwards are a calm, visible difference.
3. Rhythm users ask for a widget. The native Daywell app can launch with one.
4. Android: all four are iPhone only.

## Threats

- Rhythm already lists "medication tracking" and "health check-ups" as uses. A future update could push it toward health.
- Enough Today ships often (version 4.4 in four months). Adding medicine reminders is a small step for it.
- Nightmare case: a funded app (Finch, Tiimo) adds a gentle "bad day" mode and simple medicine reminders.
- Where Daywell is weakest: not in the stores yet, and no reviews or users to point to.

## Strategic implications: the list

Build next, best first. "Fit" is how well it suits people with a health condition.

| # | Idea | Taken from | What it looks like in Daywell | Effort | Fit |
|---|---|---|---|---|---|
| 1 | Low day | Enough Today | One tap on Home. Only "counts toward my day" items stay; the rest wait. Nothing counts against a low day. | Small | High |
| 2 | Small version | Enough Today, Haven | Gym gets "10 minute walk". On a low day, or when missed, doing the small one counts as done. | Medium | High |
| 3 | Totals, not streaks | Enough Today, Somehow | Replace the streak flame with "48 times". Missed days never wipe progress. | Small | High |
| 4 | Coming up this week | Rhythm | Under today's list, a short "Later this week" line for some-days items (for example "Wash towels, Sunday"). | Small | Medium |
| 5 | No pile-ups | Somehow | Old open to-dos do not stack on today; one gentle "a few from earlier" line instead. | Small | Medium |
| 6 | "Never do" list | Somehow, Haven | A short list on the store page and in Settings: no guilt alerts, no streak punishment, no ads, health data stays yours. | Tiny | High |
| 7 | Widget | Rhythm reviews | Home screen widget with the day's lights and next thing. Native app only. | Medium | Medium |
| 8 | Tip jar, then lifetime price | Somehow, Haven | A tip jar before the paid tier; later, a lifetime price next to the yearly one. | Small | Low |

Keep as is: fair scoring, rhythm choices, medicine and logs, offline with no account. These are where Daywell already leads.
Do not copy: app blocking, camera rep counting, one-task-only screens, streak counters.

Monitor every three months: version history and ratings of Rhythm and Enough Today, and whether either adds medicine.
