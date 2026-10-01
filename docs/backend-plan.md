# Backend and friend groups: the plan (written 2026-10-02)

Status: **plan only, nothing built.** The user asked for this in plain words with examples before any building. Picture of the screens: `docs/mockups/friends-groups-mock.png`. Next session starts here.

## The idea in one picture

Think of the app on each phone as **your own diary**, and the backend as a **noticeboard in a shared hallway**.

- Your diary stays at home (on your phone): medicine, body logs, mood, weight, every to-do. Nobody else can read it, and today it never leaves the phone.
- The noticeboard only holds the few things you choose to pin up for your group, like "Workout: done today" or "Read: 20 pages". Your friends see the noticeboard, never the diary.

The backend is that noticeboard, plus a front door with a lock (sign-in) so only your group can see your part of it.

## Words we use

| Word | Means |
|---|---|
| **Group** | 3 to 10 friends who joined by an invite link. Example: "Sunday crew". |
| **Shared list** | The fixed list of things that can be shared: Fitness, Reading, Learning, Calm (meditation, journal), Creative, Sleep and food habits. Chosen from Templates, so "Workout" means the same for everyone. |
| **Never shared** | Health (water, bowel, urine, symptoms), Medicine, Checkups, Hygiene and care, mood, weight, and anything you typed yourself. No switch can change this. |
| **Your target** | How often *you* plan to do a shared thing. You might plan Workout 4 times a week; a fitter friend plans 6. |
| **Lights** | The Body and Mind lights on the group page: on when you did your shared Body or Mind things that day. |
| **Together goal** | One weekly goal for the whole group, counted as each person's percent of their **own** target. |
| **Dare** | One friend challenges another ("run 5 km by Sunday"). Proof by photo; a third friend taps "I saw it". |
| **Reactions** | Only 👏 and 🔥. No chat, no free text. |

## A full example: Sunday crew

**The people.** You, Priya, Arjun, Rhea and Meera. You start the group, call it "Sunday crew", and set the goal "everyone hits 80% of their own plan".

**Inviting.** You tap **Invite on WhatsApp**. WhatsApp opens with a ready message and a link like `kmlnths.github.io/Ritsu/?join=7FQ2` (no domain to buy; it works on the current site). The link works for 7 days. Priya taps it, the app opens, she taps **Join with Google**, and she is in. Sign-in is only needed for groups; the app keeps working without it.

**What each person shares.** When joining, each person picks which of their items from the shared list go on the noticeboard, with their own target:

| Person | Shares | Their target per week |
|---|---|---|
| You | Workout, Reading | Workout 4, Reading 7 |
| Priya | Workout, Meditation | Workout 3, Meditation 5 |
| Arjun | Workout, Reading | Workout 6, Reading 3 |

**Wednesday morning, your phone.** You tick "Morning meds" and "Workout".
- "Morning meds" is Medicine: it stays in your diary. **Nothing is sent.**
- "Workout" is shared: the phone pins one tiny note on the noticeboard: `You · 2026-10-08 · Workout · done`. That is the whole message. No time of day, no notes, no other items.

**What Priya sees on the group page.** Your Body light is on (you did your shared Body thing today). Your Mind light is off (no reading yet). She taps 🔥 next to your name. You get "Priya sent 🔥".

**The together goal on Sunday night.**

| Person | Did | Of their target | Percent (capped at 100) |
|---|---|---|---|
| You | Workout 3, Reading 6 | 4 + 7 = 11 | 9 of 11 = 82% |
| Priya | Workout 3, Meditation 3 | 3 + 5 = 8 | 6 of 8 = 75% |
| Arjun | Workout 4, Reading 3 | 6 + 3 = 9 | 7 of 9 = 78% |

Group: (82 + 75 + 78) / 3 = **78%**. Goal was 80%, so "So close. 78% together." Arjun did 7 things and you did 9, but nobody wins by doing more: a beginner counts the same as an athlete. Each thing counts at most once a day, so a fake burst of 10 ticks cannot swing the week.

**Sunday recap**, on the group page: "Your group did 10 workouts, 9 reading sessions and 3 meditations this week."

**A dare.** Arjun dares you: "Run 5 km before Sunday." You tap **I'm in**, run, and add a photo. Priya taps **I saw it**. The dare is done. (Dares come last in the build order.)

**Leaving.** Anyone can leave a group at any time. Their notes are removed from the noticeboard.

## The friends test runs on the same noticeboard

Before groups, the first use is the 10-friend test from `founder/validate-idea.md`.

- Each friend is asked once: "Share that you opened the app today, for the test?" Yes or no.
- If yes, each day they open the app, one note goes up: `Priya · 2026-10-08 · opened`. Only the date. No items, no health.
- You see the dashboard in the mockup (days opened, Monday to Sunday). Pass mark: 5 of 10 friends open it on 5 or more days in week one.
- They can turn it off in Settings at any time.

## What is stored on the server (the whole list)

| Table | One row is | Example |
|---|---|---|
| `profiles` | a person who signed in | name "Priya", a colour |
| `groups` | a group | "Sunday crew", goal 80%, made by you |
| `invites` | an invite link | code 7FQ2, group Sunday crew, ends 9 Oct |
| `members` | a person in a group | Priya in Sunday crew, joined 2 Oct |
| `shares` | what a person shares, with target | Priya, Meditation, 5 a week |
| `ticks` | one shared thing done on one day | You, 8 Oct, Workout |
| `reactions` | a 👏 or 🔥 | Priya to You, 8 Oct, 🔥 |
| `dares` (later) | a dare | Arjun to You, "run 5 km", until 12 Oct, photo, seen by Priya |
| `test_opens` | a friends test day | Priya, 8 Oct |

Not on this list, so never on the server: medicine, health logs, mood, weight, checkups, notes, times, private items, to-dos.

**Locks (row-level security).** The database itself refuses to show a row to anyone outside that group. Even a bug in the app cannot leak Priya's ticks to a stranger, because the server checks "is this person a member of this group?" on every read.

## The pieces (technical, you do not need to understand this part)

- **Supabase**: hosted Postgres, sign-in (Google and email link), row-level security, realtime updates. Free plan is plenty for 10 to 100 people. Free projects can pause after a week without use; one click wakes them.
- The app talks to it from `index.html` with the Supabase JS client (one script from a CDN). No server code of our own for stages 1 to 3.
- The Supabase project URL and the public "anon" key go in the page; that is normal and safe because the locks above do the protecting. The secret "service" key is never put in the app or the repo.
- Local data stays exactly as it is (`ritsu_local`). Groups are an extra layer: when a shared item is ticked, the app also writes a `ticks` row. Offline ticks queue and send later.
- Keep this separate from screen code (`groups.js`-style functions: `gJoin`, `gTick`, `gWeek`), per the rules in `CLAUDE.md`.
- Full sync of the diary between devices (cloud backup) is a **separate, later, opt-in** step, already described in `ARCHITECTURE.md`. It is not needed for groups.

## Build order (small saved steps)

1. **Account setup (the user, about 5 minutes).** Sign up at supabase.com, make a project called "daywell", choose a region near India (Mumbai). Claude cannot create accounts or handle passwords. Then copy the Project URL and the anon public key from Project Settings, API, and paste them in chat.
2. **Sign-in and the friends test** (Claude). Tables `profiles`, `test_opens`; the yes/no question; the dashboard for you. Test with two phones.
3. **Groups, invite, join** (Claude). Tables `groups`, `invites`, `members`, `shares`; Invite on WhatsApp (a `wa.me` link, free); the join screen.
4. **Ticks, lights, together goal, reactions, Sunday recap** (Claude). Tables `ticks`, `reactions`.
5. **Dares with a photo and "I saw it"** (Claude). Table `dares` plus photo storage.
6. **WhatsApp companion** (later, paid tier). Needs a WhatsApp Business account from Meta, business verification, a phone number just for Daywell, approved message templates, a small server, and a fee per message (check Meta's current price list). Reminders and "reply Taken" ticking as in the mockup.

Each step: show a picture first, build, check on phone and laptop, commit, ask before pushing.

## Open questions for the user

- Sign-in: Google and email link (free) to start? Phone number by SMS costs money per message, so not at first.
- Group name word: "group" (used here) or something warmer like "crew" or "circle"?
- Should the friends test dashboard be visible only to the user (yes, assumed), and should friends see a thank-you note at the end of the week?
