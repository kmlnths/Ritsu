# Hiyori brand notes (decided 2026-10-02)

> **UPDATE 2026-10-02 (later): the icon is now the ink 日 with a green tick, "1A" (section below). It replaces K5/K6 and is already in `icons/`.** K5/K6 stay in this folder as the fallback.

Read this first for anything about the name, the logo or the icon files. The long chat history is not kept; this is the summary.

## Name

**Hiyori** (日和), "a fine day", as in "a good day for laundry". Chosen 2026-10-01 over Meguri (巡) and Kurashi (暮らし). Old name Ritsu (律, discipline, rhythm) is dropped because another app has it. Not yet checked: trademark (US, India, WIPO), a domain (hiyori.app, hiyori.life, hiyoriapp.com looked free by DNS only; hiyori.com and hiyori.in are in use), Google Play. Lawyer search before anything paid.

The user's motto is **discipline, in a good way**, and the app is a to-do and life tracker. The logo has to feel like that at a glance.

## The story (decided)

日和 is a fine day. The five tiles are the small things in one day. Each one you finish lights up, and a day done well makes a tick: **a day done well is a hiyori.** Line for the lockup: "A fine day, one tile at a time."

Where the story shows up (to build, in this order):
1. Lockup: mark, "hiyori", 日和 small, the line above.
2. Home card: the tick sits on the card and lights as things are done. Unlit tiles are a soft outline, never red or empty. At 5 of 5 the card says "a fine day".
3. Welcome: the tick draws itself one tile at a time (about 2 seconds).
4. Later idea: a seven-tile week tick on the back of the Home card (Monday to Sunday). The icon itself cannot change (it is a still picture), so it always shows the full tick.

## The icon: ink 日 with a green tick (1A), chosen 2026-10-02

The user picked this from AI-made pictures: a black brush 日 ("day", the first half of 日和) on cream paper with a green brush tick across it. It also reads as a ticked box to anyone who cannot read Japanese. Story: a day, ticked off.

How it was made: my own redraw (`build.js`, clean strokes) was rejected as stiff. The accepted version is a **trace of the AI picture** (`trace.js`, needs puppeteer-core), put onto 1024 tiles by `compose.js`. Source numbers are in `trace.json`. Colours: paper #F4F0E5, ink #0E0F12, tick #17A072 (dark twin: ink cream, tick #4ABD93 on #0A0B0D).

Files, in `docs/brand/ink/`: `hiyori-ink-light.svg` (rounded, used in the app), `hiyori-ink-dark.svg`, `-full` (square corners), `-light-maskable.svg`, `renders/sheet.png` (picture of light, dark and small sizes). In the app: `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` are the light version.

Refined 2026-10-02: the tick tail is about 12% shorter and ends in a blunt brush lift (trace.js args `311 190 1.2`: tail cut point and simplify amount), so it no longer reads as a swoosh; the outline has 37% fewer points; compose.js keeps the mark at a fixed size (3.28). Before and after: `renders/before-after-tail.png`. Print-ready master still to make: repaint the 日 and the tick on two layers at 2048 px (Procreate, dry sumi brush), then trace that. Known weak spots: The paper grain and the see-through tick of the AI picture are gone. The source picture was small (about 235 px), so edges are soft; fine at phone sizes, blurry if printed large. Not yet tested on a real phone. Not yet tried: favicon cut for 16 px (the ink detail may mush), the dark twin in the app, the Home card tick and welcome draw-in (story below).

## The older icon: K5 (dark) and K6 (light)

Five rounded tiles on a diagonal that read as a tick. Deep emerald at the start, bright mint at the peak on dark (K5). On light the ramp is inverted, pale mint to deep emerald (K6), so the peak is always the strongest point. Only the app's emerald. No glow, no jelly, no amber, no sun.

Geometry rule: tile 180, gap 30 (units on a 1024 canvas). Consecutive tiles overlap sideways by 30 and are separated vertically by 30. Smallest gap is 30 units (1.8 px at 60 px). Mark is about 4% smaller than the first K5 so it has room inside the squircle.

Files, in `docs/brand/`:
- `hiyori-icon.svg`, `hiyori-icon-1024.png`, `icon-512.png`, `icon-192.png`, `apple-touch-icon.png` (180): dark icon.
- `hiyori-icon-maskable.svg`, `icon-maskable-512.png`: Android circle crop (mark scaled to 80%).
- `hiyori-small-colour.svg`, `hiyori-small-mono.svg`, `favicon-16/32/48.png`, `favicon.ico`: small cut for the browser tab, one-colour version.
- `light/`: the same set for the light tile.
- `explorations/`: a few earlier ideas kept for reference.

K5/K6 are NOT in the app (replaced by the ink icon above).

Known weak spots (be honest about them):
- On a dark home screen the near-black tile can vanish. A faint rim (white at 10%) fixes it; it was shown but is not the default yet.
- On light, the pale first tile is only about 1.5 to 1 against white, so the short arm of the tick nearly disappears at 29 px. A slightly deeper start colour (about #6FDDB2) is the fix.
- It feels cooler and more technical than the hand-made icon the user loves (Things Take Time). My honest score is about 8 out of 10. The user wants an 11. A real 10 needs real people (the 5-second test with friends) or a human designer.

## What the user likes

- **Things Take Time** (hand-inked tally and a full stop, black on white), especially its icon. Hand-made, one idea, the mark is the name. Also liked: a calendar with a hand-drawn circle around a date, and a glass-style calendar.
- Apple-like, calm, light or very dark tiles. Apple Reminders as a reference for familiarity.
- NOT: jelly objects, amber light, glow, a sun, a creature, anything that looks like a generic tick app.
- The vision board (`docs/vision-board.md`) shows they like dark screens, one warm light from the top and glowing hero objects inside the app. Read it before any visual work.

## Tried and dropped (do not redo without a new reason)

- Sunrise (half sun with three rays): user said ugly, "drop the sun".
- Jelly or flat blob as the icon: many creature icons already (Daylio, Tiimo, Finch, Headspace). The blob stays as the mascot inside the app.
- Letter H, and a rounded "hi": three apps already have a rounded "hi" icon; "hi" also reads as "high".
- Lit window (日 as a window): reads as a handheld device or a stand, even after three rounds.
- Tally gate (four bars and a stroke): clear, but Western "prison" association, and close in spirit to Things Take Time.
- Tick in a circle, brush tick: looks like a "verified" badge; the brush tick is too close to Nike's swoosh.
- 和 seal and 律 seal: bold, but only mean something to people who read Japanese. 律 pulls the brand back to Ritsu.
- Light capsule icons (three ticked bars, ring): fine, but microscopic ticks vanish at phone size.
- Four-box streak, day and night window, graph line, calendar grid: read as other things.

## Legal notes (not legal advice)

A plain tick belongs to nobody. Nike owns the swoosh, a curved tapering check, so avoid curved tapered ticks. The real risk is looking like another to-do tick icon in a coloured tile (Things, TickTick, Microsoft To Do). Avoid circles with lines on white (Apple Reminders) and a rainbow of rings (Apple Fitness). Get a proper trademark search before launch.

## Research

- Real shelf test: 16 real icons pulled from Apple's public App Store lookup (US store), with ratings. The table and findings are in `docs/competitors.md`. The icon files were only kept in a temporary folder.
- Things Take Time (by Chester How, free then $2.99 a month or $34.99 lifetime): notes in `docs/competitors.md`.
- A screenshot of about 100 to-do icons showed that three in four are a tick, a checkbox or lines; dark tiles built from steps are rare.
- Tools used: puppeteer-core with Chrome for pictures. A working Python is at `C:/Users/Admin/AppData/Local/Python/pythoncore-3.14-64/python.exe` (the plain `python` command is only a Windows stub). The logo-design skill is installed and its checking scripts run with that Python.

## Next steps, in order

1. (Done, unpushed) Ink icon copied into `icons/`, `sw.js` cache `hiyori-v44`. Test on a real phone after pushing. Maybe a favicon cut and `background_color` in the manifest.
3. Build the lit tick on the Home card and the welcome draw-in (the story above).
4. Trademark and domain checks by hand (US, India, WIPO), Google Play.
5. Rename the repo and the folder (changes the live address; installed copies break). Do the folder between chats.
6. Maybe a one-time move of the `ritsu_` storage keys to `hiyori_` (never just rename them, it wipes saved data).
