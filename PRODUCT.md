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

- Name: Ritsu (律, rhythm, order, discipline).
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

### Planned, in this order

Each has a "done when" line. It is not finished until that is true.

1. **Default list and starter tags.** New tasks go to Personal. Starter tags Money, Home, Car, Admin (To-do) and Health, Care, Fitness, Sleep, Food (Body). Typing suggests a tag.
   Done when: typing "dentist" shows Health in the green "Read as" line, one tap removes it, and a new task with no list lands in Personal.
2. **Full day helper and evening wrap-up.**
   Done when: adding the 8th open one-off task on a day shows the Full day pop-up once per day per date (Move to tomorrow, Pick another day, Keep all), and from 8pm Home shows leftover tasks each set to Tomorrow. Never red, never "overdue".
3. **Clash warning** for items with a length.
   Done when: adding "meeting at 12 for an hour" over an existing 12 to 1 item shows the day strip with the clash and three buttons (Pick another time, See the day, Add anyway). Items with only a time never clash.
4. **Templates library.**
   Done when: one list of entries (dentist check-up 6 months, eye test 12, car service 6, ...) drives tag suggestions, the usual gap ("every 6 months?") and the Templates page. Health gaps say "ask your doctor for yours".
5. **Remove dead code** (list in `ARCHITECTURE.md`).
   Done when: the file is smaller, the syntax check passes and every screen looks the same as before.
6. **Later:** glass + and day ring on the +, bottom menu redesign, Shelf under Mind, fasting plan, share card, backend, native phone app.

### Dropped (do not bring back)

- Orbit / solar system tile; ring charts on Home; sun and moon slider on Home.
- Focus timer, PIN lock, cover images, serif italic titles.
- Monthly tidy of old saved Shelf items (an unread pile is not a debt).
- Weight or fat estimates on the Fasting page.
