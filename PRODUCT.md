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
