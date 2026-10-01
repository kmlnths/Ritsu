<!-- /founder:validate-idea · 2026-10-02 · input: this app idea (Hiyori, health and to-dos in one calm app; PRODUCT.md) -->

# Validate the idea: Hiyori

Assumption: the idea is what `PRODUCT.md` describes. One calm phone app for medicine, body logs, habits and to-dos, with "fair scoring" (missed medicine and logs never count against the day), later friend gangs and family sharing, and a paid tier around $35 a year.
Assumption: the founder is a solo, non-technical builder who has built the app with Claude, and there are no users yet (both from `PRODUCT.md` and the project notes).

## The 30-second assessment

This is a real annoyance, but a mild one. People who juggle a pill app, a habit app and a to-do list are mildly irritated, not in pain, and the app has no single person it is clearly for. The product is well made and calm, but "everything in one place" is something people praise and rarely pay for.

## The five fatal questions

**Q1: Who is the customer, and would they pay today?**
Right now the customer is "anyone with a day", which means nobody in particular. The strongest real person in the notes is someone **living with a health condition**: daily medicine, symptoms to log, and a normal life of work and chores on top. Habit apps make that person feel like a failure on a bad day, and fair scoring is built for them.
Will they pay? Bearable, the closest health tracker, charges $34.99 a year or $6.99 a month and often discounts the year to $18.99 ([Bearable pricing](https://bearable.app/our-pricing-and-principles/), [review](https://www.choosingtherapy.com/bearable-app-review/)). So $35 a year is a proven price for this kind of user. For a general to-do and habits user, it's a maybe, and a maybe counts as a no.

**Q2: Why hasn't someone built this already?**
Many have built the parts. [Todoist](https://apps.apple.com/us/app/todoist-to-do-list-planner/id572688855) and [Structured](https://apps.apple.com/us/app/structured-day-planner/id1499198946) do tasks. [Medisafe](https://apps.apple.com/us/app/medisafe-medication-management/id573916946) does medicine. [Bearable](https://apps.apple.com/us/app/bearable-symptom-tracker/id1482581097) does symptoms and habits. [Finch](https://apps.apple.com/us/app/finch-self-care-pet/id1528595748) does gentle self-care. Rating counts for each are in `docs/competitors.md`.
All-in-one apps tend to stay small because each part competes with a specialist that does it better. The exception is Finch. It won with one emotional hook (a pet you care for), not by doing everything, and is reported at about $30M a year without investors ([report](https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money); this is a press estimate, not audited).
What is new now: nothing big in timing. Your real difference is the rule that **logs and medicine never punish**, and none of the 16 apps on your shelf say that.

**Q3: What is the distribution advantage?**
Today there is none. It is a web app with no App Store listing, no accounts and no sharing, so every user has to be found by hand. The friend gangs (Phase C) would be a real growth loop, because inviting friends is the point. They need accounts and a backend first, which is months away.
Retention is the second problem. Median day-30 retention for health and fitness apps is about 5% ([Business of Apps](https://www.businessofapps.com/data/health-fitness-app-benchmarks/), [UXCam](https://uxcam.com/blog/mobile-app-retention-benchmarks/)). A calm app with no nagging and no push notifications will struggle to beat that unless people open it out of real need.

**Q4: Can this be a big business, or is it a feature?**
As "everything in one place", it is close to a feature. Apple Reminders, Apple Health medications and Google already cover each part for free.
As "the daily app for people living with a condition", it can be a real small business.
Estimate: $1M a year at $35 needs about 28,600 paying users ($1,000,000 ÷ $35). At a typical 2% to 5% of free users paying (an estimate, not sourced for this exact category), that means 570,000 to 1.4 million installs. That is reachable only with a store app and a growth loop.
A realistic first goal for a solo builder is $1,000 to $5,000 a month.

**Q5: Can the founder actually build this?**
The personal app, yes. You have already shipped a lot with Claude. The hard parts ahead are different:
- accounts, sync and a database (Phase B)
- a privacy policy for health data, which is sensitive data under most countries' rules
- a native phone app (Phase D)
- moderation for the friend gangs

These are a "first hire" problem. The backend and health-data privacy are where a non-technical founder working with AI is most likely to make a mistake that hurts users. Budget for one experienced developer to review that work before strangers use it.

## Idea scorecard

| Dimension | Score | Notes |
|---|---|---|
| Problem severity | 2 | Juggling apps is annoying, not painful. It's higher (3 to 4) for people with a health condition. |
| Market size | 4 | Almost everyone has a day. People with daily medicine are a very large group. |
| Willingness to pay | 2 | Proven at $35 a year for health trackers (Bearable). Weak for general to-dos and habits. |
| Competition gap | 2 | Very crowded. Fair scoring is a real gap, but a small one. |
| Distribution | 1 | No store listing, no accounts, no growth loop yet. |
| Timing | 2 | No new change that favours you right now. |
| Founder fit | 2 | Strong taste and you are your own user. Weak on backend, privacy and growth. |
| **Total** | **15/35** | **Significant concerns. Needs a sharper angle.** |

## Validation experiments

**1. Do people come back without being asked?**
- Test: whether the app earns a daily habit.
- How: give the live app to 10 friends who take daily medicine or manage a health issue. Ask them to add it to their home screen and give no reminders for 7 days. On day 8, ask each person "how many days did you open it?" and "what would you miss if it vanished?"
- Success: 5 or more of the 10 opened it on at least 5 of the 7 days.
- Time and cost: 8 days, $0.

**2. Is juggling apps a real pain for people with a condition?**
- Test: whether the pain is strong enough to switch apps.
- How: post one honest question in 2 communities, for example r/ChronicIllness and r/IBS. Ask "What apps do you use for meds, symptoms and your to-do list, and what annoys you about them?" Read every reply, then message 10 people for a 15-minute call.
- Success: 6 of 10 use 3 or more apps, and at least 4 name feeling judged or punished by streaks as a problem.
- Time and cost: 7 days, $0.

**3. Will anyone pay $35 a year?**
- Test: willingness to pay, before building accounts.
- How: build a one-page site, for example on Carrd at about $19 a year. Use one line, "Your medicine, body and to-dos in one calm place. Missed doses never count against your day.", plus a "Reserve the founding price, $35 a year, pay later" email form. Share it in the threads from experiment 2.
- Success: 200 visitors, and at least 20 leave an email for the paid tier (10%).
- Time and cost: 10 days, under $50.

## The honest verdict

**Pivot it.** Stop selling "everything in one place" and sell one sharp promise to one group: **the calm daily app for people living with a health condition, where a bad day is never a failed day.** Your fair-scoring rule, medicine reports and gentle voice already serve this group. Bearable shows they pay about $35 a year, and condition communities give you a free first 100 users. Keep the to-do list as the reason they never need a second app.

The single most important thing this week: run experiment 1 with 10 friends. Stop work on the name and the logo until you see the results, because neither matters if people don't come back.
