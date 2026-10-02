<!-- /founder:competitor-matrix · 2026-10-03 · input: Daywell vs havenlimit.app, enoughtodayapp.netlify.app, somehow.olddognewflex.com -->

# Competitor matrix: Daywell

Assumption: Daywell is the calm daily app for medicine, body logs, habits and to-dos described in `PRODUCT.md`, now pitched to people living with a health condition (`founder/validate-idea.md`).
Assumption: the target customer is someone with daily medicine or symptoms to track who also runs a normal day of work and chores.
All pages were read on 2026-10-03. Apps were not installed or tried.

## 1. Market landscape

| App | What it is | Funding | Price (checked 2026-10-03) | Segment | Their pitch |
|---|---|---|---|---|---|
| **Enough Today** ([site](https://enoughtodayapp.netlify.app/)) | Gentle daily planner: energy check-in, values-based habits, tasks sorted Essential, Optional, Later | Not found. A solo maker, "Josh", launched it on Product Hunt with 0 upvotes ([hunted.space](https://hunted.space/product/enough-today)) | Free ([site](https://enoughtodayapp.netlify.app/)) | Consumer, ADHD, low energy | "A gentle daily planner that adapts to the day you actually have" |
| **Somehow** ([site](https://somehow.olddognewflex.com/)) | One tidying step at a time, by room. No list, no streaks | Not found. Made by Old Dog New Flex | Free, no ads, no paywall ([site](https://somehow.olddognewflex.com/)) | Consumer, overwhelmed by home chores | "You don't have to know how." |
| **Haven** ([site](https://havenlimit.app/)) | Blocks apps until you do squats on camera | Not found. LiveApp LLC | $6.99 a month, $49.99 a year, $299.99 lifetime ([site](https://havenlimit.app/)) | Consumer, phone overuse | "Move before you open" |
| **Bearable** ([site](https://bearable.app/)) | Symptom, mood, medicine and habit tracker with correlations | Not found | $34.99 a year or $6.99 a month ([pricing](https://bearable.app/our-pricing-and-principles/)) | People with a health condition | Find what affects your health |
| **Finch** ([App Store](https://apps.apple.com/app/id1528595748)) | Self-care goals that grow a pet bird | Bootstrapped, about $30M a year by a press estimate ([report](https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money)) | Plus $9.99 a month or $69.99 a year ([Bustle](https://www.bustle.com/wellness/finch-app-review-features-price)) | Consumer, mental health | Take care of your pet by taking care of yourself |
| **Tiimo** ([site](https://www.tiimoapp.com/)) | Visual planner for neurodivergent people | $4.8M total, last $1.6M in Aug 2024 ([BeBeez](https://bebeez.eu/2024/08/29/with-1-6m-in-new-funding-danish-startup-hits-4-8m-total-to-grow-user-base-and-launch-new-platforms/)) | Pro $11.99 a month or $45 a year ([startuphub](https://www.startuphub.ai/startups/tiimo.md)) | ADHD, autism | Visual daily planning; 50,000+ paying subscribers in 2024 (same source) |

Haven sits in a crowded "squat to scroll" niche (BootyBlock, SquatScroll, Tacet, Push2Unlock: [list](https://mwm.ai/apps/tacet-app-blocker-focus/6759857418)). It shares Daywell's users only by accident.

## 2. Feature comparison

Daywell column: "Yes" means live on kmlnths.github.io/Ritsu today.

| Feature | Daywell | Enough Today | Somehow | Haven | Bearable | Finch | Tiimo |
|---|---|---|---|---|---|---|---|
| To-dos and one-off tasks | Yes | Yes | Partial (chores only) | No | No | Partial (goals) | Yes |
| Flexible rhythm (some days, N times a week) | Yes | Partial (Quick, Standard, Extended) | No | No | Unknown | Unknown | Unknown |
| Medicine with stock and refill | Yes | No | No | No | Yes | Unknown | Unknown |
| Symptom and body logs | Yes | No | No | No | Yes | Partial (mood) | Unknown |
| Energy or capacity check-in | No | Yes | No | No | Yes | Partial (mood) | Unknown |
| No-guilt scoring (misses do not punish) | Yes (medicine and logs never count; free days never count) | Yes (milestones, not streaks) | Yes ("skip without penalty") | No (friction is the point) | Unknown | Partial | Unknown |
| Move a missed day | Yes (pick a free day) | Partial ("Later") | Partial (skip) | No | No | Unknown | Unknown |
| One thing at a time | Partial ("next" on the Home card) | Yes (Gentle Mode) | Yes | No | No | No | Unknown |
| Works offline, no account | Yes | Partial (local-first, with sync) | Yes | Yes | Unknown | Unknown | Unknown |
| Friends or group support | Planned (no numbers, "plan kept") | Unknown | No (stated) | No | Unknown | Partial (friends) | Unknown |
| Native iPhone app | No (web app) | Yes | Yes | Yes | Yes | Yes | Yes |
| Android | Partial (web app) | No | No | No | Yes | Yes | Yes |
| Paid tier | Planned (about $35 a year) | No | No | Yes | Yes | Yes | Yes |

## 3. Positioning gaps

**Gap 1: a gentle day that also holds your medicine.**
- Missing: the gentle planners (Enough Today, Somehow, Tiimo) do not track medicine or symptoms. The health trackers (Bearable) are not a calm daily to-do list.
- Why it matters: someone with a condition lives both lives at once. They take pills, log a symptom and also need to pay rent. Today that is two or three apps.
- Difficulty: low for Daywell, because it is already built.
- Head start, estimate: 3 to 6 months. A small team like Enough Today would need reminders, stock counts and careful no-medical-advice wording to catch up. That is weeks of building plus a review of the health wording.

**Gap 2: plans shaped like real life, and misses that move instead of failing.**
- Missing: nobody among these apps says "4 times a week, any days" or "move a missed session to a free day, never onto a day that has it".
- Why it matters: a 4-day plan kept is a full week. Streak apps call it 3 misses.
- Difficulty: low, and easy to copy.
- Head start, estimate: 1 to 3 months. It is a few screens of logic, so it protects you only while you are first to say it out loud.

**Gap 3: friends who cheer "plan kept" without comparing numbers.**
- Missing: the gentle apps avoid social features (Somehow says so outright). Finch has friends but is built around a pet, not a plan.
- Why it matters: it is the one feature that brings new users without ads, and the no-numbers rule keeps it calm.
- Difficulty: high. It needs accounts, a database, privacy for health data and moderation.
- Head start, estimate: 6 to 12 months. A backend with health-data privacy is the slow part for any solo maker.

## 4. Threat assessment

1. **Bearable: high.** It already owns "people with a health condition" and charges your planned price. Overlap is high on medicine, symptoms and habits. It is on both stores. Release speed: not found. If it adds a gentle to-do day, it covers most of your pitch.
2. **Enough Today: medium.** It is the closest in feel: no streaks, gentle, tasks plus habits, free and native on iPhone. Resources look tiny (solo maker, 0 Product Hunt upvotes). The risk is that it adds medicine. Release speed: not found.
3. **Finch: medium.** It has huge resources and an audience that wants gentle self-care, plus a friends feature. Its pet is the product, so it is unlikely to become a medicine-and-tasks day. Release speed: not found.

Somehow and Haven: low. Somehow is chores only. Haven is a different job (stop scrolling).

## 5. Strategic recommendations

- **Position to own:** the calm daily app for people on daily medicine. One home for their pills, symptoms, habits and to-dos, where a bad day never counts as failing. Win that before chasing general planners.
- **Feature to ship first:** friend groups that show only "plan kept", with medicine and logs kept private. It is both the clearest difference and the only built-in way to find users. It needs the backend, so the next step stays the same.
- **Competitor to watch:** Enough Today. Its users (low energy, ADHD) overlap with people living with a condition, and adding medicine reminders is a small step for it. Check its App Store page each month.

One more thing the table shows: all three apps you sent are native iPhone apps. Daywell is a web app. Being in the App Store matters more for trust with health users than any single feature.
