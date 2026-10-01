# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

(A single-file installable web app, a PWA: added to the phone home screen, works offline. Phones are the main device; laptops get a two-column layout. No native iOS or Android app.)

## Users

The general public, eventually as a paid product. Today the builder is the main user while the app is shaped; a small friends test is the planned next step before strangers.

A typical user wants one place for their day: medicine, body logs, habits and everyday tasks. They open it briefly, many times a day, on a phone, to see what is left and tick things off. They are not techies and should never need to learn how the app thinks.

## Product Purpose

Ritsu keeps health and to-dos in one place: medication, body logs (bowel, sleep, water), habits for body and mind, and Work, Personal and Home tasks. Success is a user who opens it every day because it is calm, fast and fair, and who can see how their days are going without being made to feel bad.

## Positioning

Health and to-dos in one place, instead of a pill app, a habit app, a body log and a to-do list. Underneath that, each kind of thing is treated the way it deserves: a missed dose or a bowel movement never counts against the day the way a skipped workout would, and things that are only tracked (water, bowel, sleep, smoking) are logged, not scored as tasks.

## Operating Context

- Used in short visits across the day, mostly one-handed on a phone; Home shows today, the Day list shows everything.
- Three areas on Home: Body, Mind, To-do. To-do has three lists: Work, Personal, Home and errands.
- A companion blob lives on Home and reacts to the day with short, capped, kind lines.
- Data stays in the browser (localStorage). Backup is a downloaded file. No accounts.
- Deployed with GitHub Pages from a single `index.html`; `sw.js` caches it for offline use.

## Capabilities and Constraints

- Item kinds: tasks, habits (normal, avoid, amount), medication with adherence report, body logs and trackers, episodes, fasting timer, things that come back (dentist, insurance, taxes).
- Typing a sentence fills in date, time and length ("call alex tom at 5 in the evening").
- Consistency is a 30-day average of daily completion with partial credit, never a streak shown as zero.
- Trackers (water, bowel movement, urination, bedtime, smoking, sleep hours) are logs, not to-dos: they should not sit in the to-do list or count toward the day. Decided in design review; the exact rule per item (a Tracker or To do switch) is not built yet.
- Technical: vanilla HTML, CSS and JS in one file, no framework, no build step. Keep new logic separate from screen code and new data plain (dates "YYYY-MM-DD", times "HH:MM", lengths in minutes) because a backend (Supabase or similar) is planned.
- Open decisions: pricing and the paid part (a WhatsApp companion was discussed, about $35 a year); push notifications wait for the backend; the final name for "things that come back".

## Brand Commitments

- Name: CHOSEN 2026-10-01: **Hiyori** (日和, the feel of a day, as in "a good day for laundry"). Tagline idea: "Whatever kind of day it is." The app, manifest and README say Hiyori since 2026-10-01; stored-data keys, the repo, live address and icon still say Ritsu or have no name. Still to do before using it publicly: trademark search, domain, Play Store check (`docs/competitors.md`).
- Voice: plain, warm, short. Real numbers only. Never nagging, never "overdue", never "too much", no guilt when nothing got done, no red pile-ups; red is reserved for genuine health misses.
- No em dashes or en dashes anywhere in the interface.
- It must look posh and considered, never like a generic AI-made app. Apple is the stated inspiration for the level of restraint and finish.
- The companion blob is the one playful element and stays; credits for feral-blob and pullcord (MIT) must remain in Settings.

## Evidence on Hand

- Sample data built into the app ("Show me around") for demos and screenshots.
- Design mocks in `docs/mockups/` and the working Home mock `mock-posh.html`.
- No users, testimonials, reviews, usage numbers or press exist yet. Do not invent any.

## Product Principles

1. One place for the whole day: health and tasks side by side, each counted once, where it belongs.
2. Fair by design: only things you mean to do count toward the day; logs and medicine never punish.
3. Calm over clever: show what is next and how the day is going, then get out of the way.
4. Every addition must take under five seconds and be fine if ignored for a week.
5. Private by default: nothing leaves the device unless the user chooses.

## Accessibility & Inclusion

- Easy to read is a hard requirement: no text under 11px, text contrast at least 4.5:1 in both light and dark.
- Tap targets reach 44px (small controls get an invisible larger hit area).
- Reduced motion, reduced transparency and higher contrast settings are respected.
- Private items (bowel and similar logs) never appear on share cards or anywhere shown to others.

## Features

What exists, what is planned, what was dropped. Update this list whenever something ships or a decision changes. Small problems and loose ideas go in `docs/future-improvements.md`.

### Built (v5, live)

- Home card with Body, Mind, To-do lights, the day's list, card back with this week, "all done" state.
- Date strip with three small lights per day; soft top light that follows the time of day.
- Add sheet for everything; typing a sentence fills in date, time and length ("call alex tom at 5 in the evening").
- Log or add sheet for trackers; press and hold the + for quick logs.
- Habits (normal, avoid, amount), medication with adherence report, body logs and trackers, episodes.
- Fasting row on Home and a Fasting page (arc, stages, ranges, "When you fast" grid, records).
- Things that come back (dentist, insurance, taxes) with the one minute setup.
- Patterns: stacked Body, Mind, To-do cards, glass calendar, Your numbers.
- This week's one thing; Light colours in Settings; companion blob; undo on every one-tap change; backup and restore.

### Done 2026-09-29: the new structure

Cards and groups, no tags (Body: Health, Medicine, Checkups, Fitness, Hygiene and care, Sleep and food; Mind: Reading, Learning, Calm, Creative; To-do lists Work, Home, Personal, and Family when chosen). The Home list is split by card then group, all visible, nothing to open (the user found group pages too many clicks). Setup starts with "Who is this for?" and files its choices into the groups. Typing files an item into its group (word list, `docs/tools/test-group.js`). "@name" assigns on this phone only. Full map: the "Ritsu app structure" doc.

### Done 2026-09-30

Full day pop-up and evening wrap-up; sidebar grouped under Body, Mind, To-do; Family on or off in Settings; amounts under the goal count as done with one of ten kind lines; floating side panel that collapses to a rail; laptop quick-nav pill that appears only after scrolling; fix for the finished Home card turning white in phone browsers with night mode.

### Planned, in this order

Each has a "done when" line. It is not finished until that is true.

**Phase A: finish the personal app (no accounts needed)**

1. **Full day helper and evening wrap-up.** BUILT 2026-09-30 (`fdCheck`, `wrapHtml`).
   Done when: adding the 8th open one-off task on a day shows the Full day pop-up once per day per date (Move to tomorrow, Pick another day, Keep all), and from 8pm Home shows leftover tasks each set to Tomorrow. Never red, never "overdue".
2. **Clash warning** for items with a length. BUILT 2026-09-30 (`clashesOn`, `clPaint`): amber, never red; checked when adding, and when a saved to-do's date, time or length changes in the full form ("Save anyway"); looks across midnight.
   Done when: adding "meeting at 12 for an hour" over an existing 12 to 1 item shows the day strip with the clash and three buttons (Pick another time, See the day, Add anyway). Items with only a time never clash.
3. **Templates library** (one list of ready-made items, no tags).
   Done when: one list of entries drives the usual gap and the Templates page, each entry sits in a card and group, and each carries a fixed shared or private flag (see Phase C). Health gaps say "ask your doctor for yours".
   Step 1 BUILT 2026-09-30: one list (`LIBRARY` with `G`, `in`, `hide`, `cb`; `libFlat`, `tplShared`, `userCountry`), `CB_LIB` is built from it, India/UK/US packs, setup and Library follow the country. Next: step 2 typed gap suggestion, step 3 Templates page (picture first), country choice in Settings.
   Templates page and Your Country BUILT 2026-10-01 (`openLibrary`, `tpPaint`, `tplSheet`, `openCountry`): sorted by topic, All/Body/Mind/To-do, search at the bottom as on iOS 26, reminders ask the rhythm (choices plus Custom: days, weeks, months or years; `cb.days`), other templates open ready-made in their own group. Settings has Templates and Your Country rows under Reminders.
   Typed gap suggestion BUILT 2026-09-30: typing a known thing with no date or time (dentist, PUC, passport, bike insurance) shows "Usually every 6 months." with "Remind me every 6 months" or No (`TPL_WORDS`, `tplGuess`, `qaSg`). Yes makes the thing that comes back and asks its date on Home right away. Health ones add "Ask your dentist/doctor/vet for yours."
   Life tiles BUILT 2026-09-30 (decided with the user after research, `docs/research/Ritsu life tiles research.md`): setup step 3 is ten tiles (Health, My home, Money, Work or studies, Family, Car or bike, Kids, Pets, Travel, Faith; `LIFE_TILES`). Nothing is pre-ticked. A tile quietly makes its things that come back for this country; tiles with a pick (Health, Work or studies, Family, Faith) ask "which ones?" on Home instead. Home then asks one question a day (`lqHtml`, queue in `ritsu_lq`): dates first for fixed-date things, then picks, then "when did you last". Later is always fine. Faith starts empty, no religion assumed, sunrise icon, and its habits never count toward the day ("Also today"). The dentist is no longer hidden in India: setup asks instead of guessing.
   Country plan (decided 2026-09-30, English-speaking countries, West and Asia):
   - One shared list that works everywhere (water, sleep, bills, call family, car insurance), plus small country packs only for what differs. Packs first for India, US, UK; then Canada, Australia, New Zealand, Ireland, Singapore, Philippines, Malaysia. A country with no pack just gets the shared list.
   - Pack examples. India: PUC certificate, gas cylinder booking, water filter change, AC service before summer, Diwali cleaning. UK: MOT, Self Assessment tax return. US: taxes, state car inspection.
   - Ask, don't state: health and money entries ask "When did you last go?" / "When is it due?" and "How often does your dentist want you back?" instead of a fixed gap. No stored deadline dates (they move).
   - Do not guess what is usual locally (dropped 2026-09-30, the user: health is taken seriously in India too). Setup asks instead, the same for every country. `hide` still exists on entries but nothing uses it now.
   - The country comes from the phone's region setting, changeable in Settings. No extra setup question.
   - Why: dentist every 6 months is not universal. UK guidance is 3 to 24 months per person (NICE CG19); in India about 8% of dental visits are routine. Japan (yearly work health check by law) and Korea (national check-up every 2 years) wait until the app can be translated.
   - Test: give the app to 3 or 4 friends in different countries and see what they add in week one.
4. **Tidy what the new structure left behind.** BUILT 2026-09-30 except "Call at venky 5", which the user parked (no option chosen).
   Done when: the laptop sidebar lists the groups under their card instead of one long "Areas" list (the old sample "Home" area is gone), a Settings switch turns Family on or off, Creative has a proper icon, "Call at venky 5" is read as a time (`docs/future-improvements.md`), and light and dark themes are checked on phone and laptop.
5. **Plan the week and calendar import** (ideas borrowed from the other Ritsu, `docs/competitors.md`). BUILT 2026-10-01: on Sundays Home shows the next 7 days as bars; Even It Out moves only tasks with no time or priority from busy days to quiet ones, with Undo; Looks Good hides it for the day (`pwHtml`, `pwPlan`). Import a Calendar (end of setup, and Settings under Reminders) reads .ics or .csv on the phone: one-offs in the next 3 months become tasks, weekly and daily ones habits, monthly and yearly ones reminders; each is ticked by default and filed by the group word list (`icsParse`, `csvParse`, `calPlan`, check `node docs/tools/test-cal.js`).
   Done when: on Sundays Home shows a calm Plan the week card (spread tasks that have no day; skipping is safe), and a small link in setup step 3 reads a .ics or .csv file into cards and groups with each item tickable.
6. **Remove dead code** (list in `ARCHITECTURE.md`, plus the old tag code paths). PARTLY DONE 2026-10-01: 35 unused functions removed (350 lines); unused styles and the old tag code paths remain.
   Done when: the file is smaller, the syntax check passes and every screen looks the same as before.
7. **Choose the app name** before any store listing or paid launch (`docs/competitors.md`: another app called Ritsu exists). CHOSEN 2026-10-01: Hiyori. DONE 2026-10-01: sidebar, manifest, README, titles say Hiyori. Icon chosen 2026-10-02 (K5, `docs/brand/`). Still to do: put the icons into the app and the Home card tick, trademark and domain checks, rename the repo and folder (`docs/brand/README.md` has the order).

**Phase B: accounts and a backend (Supabase or similar)**

Sign-in, sync between devices, cloud backup, and real Family sharing (an "@Priya" task appears on her phone). Everything social needs this first. Keep the existing Store API so screens do not change.

**Phase C: friend gangs (decided 2026-09-30, friends first)**

One app, not two. The social side is off until you join a gang, and Home shows one small row for it, so the personal app stays calm.
- **Gang:** 3 to 10 friends, joined by an invite link. Family uses the same idea but shares assigned tasks instead of scores.
- **What is shared is fixed by the library, with no switch.** Shared: Fitness, Reading, Learning, Calm (meditation and journal), Creative, and Sleep and food habits. Never shared: Health (water, bowel, urine, symptoms), Medicine, Checkups, Hygiene and care, mood, weight, and anything the user creates themselves. Only items chosen from the library can be shared, which also makes "workout" mean the same for everyone.
- **Together goal:** one weekly goal for the whole gang, scored as each person's percent of their OWN target, never raw totals, so a beginner counts the same as an athlete. A daily cap per person keeps one fake entry from swinging the week.
- **Sunday recap** for the gang ("your group did 23 workouts").
- **Friendly dare:** one friend challenges another ("run 10 km"), proof by photo or screenshot, a teammate taps "I saw it" to vouch.
- **Reactions are fixed** (a clap, a flame). No chat, no free text.
- **Cheating:** no perfect answer yet. Team scoring, the daily cap and friends vouching are the defences for now.
Done when: two phones join one gang by link, see each other's Body and Mind lights and only shared-library items, and complete one Together goal and one dare with a vouch.

**Phase D: the phone app**

Native app with widgets and iCloud or Google backup. Apple Health and Health Connect give a "verified" badge on workouts. Strava cannot be used to show a user's data to other people (its rules since November 2024; recheck before building). Google Fit is closing (supported to the end of 2026).

**Phase E: gang against gang, worldwide (only after moderation and verified data exist)**

Anonymous names, weekly matches between gangs of similar size and level, "Find a gang" for people who are alone. Needs report and block, fixed reactions only, and a privacy policy for fitness data.

**Later, not scheduled:** glass + and day ring on the +, bottom menu redesign, Shelf under Mind, fasting plan, share card.

### Dropped (do not bring back)

- Orbit / solar system tile; ring charts on Home; sun and moon slider on Home.
- Focus timer, PIN lock, cover images, serif italic titles.
- Monthly tidy of old saved Shelf items (an unread pile is not a debt).
- Weight or fat estimates on the Fasting page.
