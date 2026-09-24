# Ritsu — project instructions for Claude Code

Drop this file at the ROOT of your Ritsu git repo (same folder as `index.html`), named exactly `CLAUDE.md`. Claude Code reads it automatically at the start of every session in that folder — you will not need to paste context or re-explain the project again.

## START HERE (read this first in a new chat)

**Where we are.** Branch `v4` on GitHub, last commit `eceb171` (batch 1 wrong numbers and polish, batch 2 slimmer Home). Since `b80b0c9`: Home shows only today (cards say "N to go", tap turns over, tap again turns back, hold opens the list, "Open list" strip on the back); the calendar, insights and fasting card moved to Patterns (was Reports); areas, People and Fasting links moved to Settings; four-button menu with the plus beside it; Welcome has one primary choice. Design audit results and pictures: `docs/mockups/mock-home2.png`, `mock-setup.png`, `mock-comesback.png`, `mock-light-laptop.png`. NOT built yet from the plan: the 1-minute setup, tasks that come back (dentist), full-day pop-up, clash warning, Year view whole-year score, a working state on the Welcome buttons, vague Back/Save/Done labels and heading order. sw.js cache is `ritsu-v19`. Old line follows: Branch `v4` on GitHub, last commit `b80b0c9`. The live site still serves `v2`; `main`, `v2`, `v3` are untouched. v4 has: compact cards, pill nav, the companion blob, the pull cord, undoable deletes, the add sheet (Date, Time wheel, Priority, Repeat, Tags, Note, Length), and typing a sentence ("call alex tom at 5 in the evening"). This file and `docs/` exist only on the user's computer, not on GitHub.

**How the user works (important).** Not a techie. Plain everyday words, one short example when explaining. Ask before anything big or hard to undo. Show a picture before building. When you need a decision, ask ONE question with a concrete example and A or B choices (abstract questions confused them twice). They say "push it" when they want a commit pushed; do not push without that. No em dashes or en dashes anywhere in UI text. They dislike nagging copy, red pile-ups, focus timers, and anything that looks AI-made.

**Build next, in this order (all agreed, none built yet):**
1. Default list becomes **Personal** (today it is the last list used). Add default To-do tags **Money, Home, Car, Admin** and start Body tags **Health, Care, Fitness, Sleep, Food**. A small word list suggests a tag while typing (dentist, doctor, checkup gives Health; gym, run gives Fitness; rent, bill, tax, insurance gives Money). It is shown in the green "Read as" line and one tap removes it.
2. **Tasks that come back** (working name, not final). A To-do task that returns after it is done. Two counting rules, chosen by the item and never by the user: counted from when you did it (check-ups) or a fixed date each year (insurance, taxes, passport, licence). Simple shape: Quiet, Shows up, Done, Quiet again. Appointment shape adds a step: Quiet, **Book it** (shows 2 weeks before it is due), **Booked** (a fixed day and time, typed like "friday 10am"), **Did you go?**, Quiet again. After a test or visit offer one optional tap, "Get the results" a few days later. The engine already exists: repeating to-dos compute `nextDue` as last done plus `repeatEvery`, and `upkeep` items do replace and rebuy. Typing should understand "every 6 months" (makes one that comes back) and "book dentist" (a plain task).
3. **Full day pop-up and evening wrap-up** (details in section 5e, "Decided but NOT built").
4. **Clash warning** for items that have a length (section 5e). Warning with Add anyway, never a block.
5. **The library** (timeline left open by the user). One library, three jobs: recognise words while typing to suggest a tag, offer the usual gap ("every 6 months?"), and fill the Templates page. Entries so far: dentist check-up 6 months, eye test 12, annual health check 12, flu shot 12, replace toothbrush 3, service the car 6, change the water filter 3, clean the AC filter 3, renew car insurance 12, file taxes 12, review subscriptions 3. Health gaps are typical starting points, always editable, labelled "ask your doctor for yours", and Ritsu never gives medical advice.
Then the rest of the v4.0 list (section 5e, "Still to build for v4.0").

**Rules agreed in the last brainstorm.**
- One item, one home card. A tag is a window: tapping Health shows meds and the sleep log (Body) and the dentist visit (To-do). It is not copied and it counts once, on its home card. Rule of thumb: do it often is a habit on Body or Mind; do it once is a task on To-do; do it every few months is a task that comes back on To-do.
- Money, insurance, taxes, subscriptions, home and car admin need NO new card: they are To-do tasks in Personal or Home and errands with tags Money, Home, Car, Admin.
- Every recurring thing follows the same four beats: quiet, shows up, done, quiet again. Meds (refill), Gear (replace after N days or uses), tasks that come back, and the Shelf all follow it, so the app behaves one way.
- Setup budget: the user must never spend an hour setting up. First run offers ONE screen of switches for six common ones (dentist, eye test, car insurance, taxes, subscriptions review, annual check), under a minute. Every later item is one typed line (about five seconds). At most one question per item ("last visit?", "when does it expire?", each with a Not sure).
- The user has NOT yet said whether the eight flows in `docs/mockups/board-flows.png` fit. Ask them what feels wrong, too heavy or missing before building step 2. Also still open: the final name for "comes back".
- The user plans a proper backend later (Supabase or similar). Keep new logic separate from screen code and new data plain (date "YYYY-MM-DD", time "HH:MM", `duration` in minutes). Push or 8pm notifications wait for that backend.

**Pictures made in earlier chats** live in `docs/mockups/`: `board-map.png` (where everything lives), `board-flows.png` (the eight flows), `mock-day.png` (Full day pop-up and wrap-up), `mockup-add.png` and `mockup-type.png` (add sheet and typing), `mockup-app.png` and `mockup-site.png` (v4 phone and site), plus the older `mock-v4.html`, `mock-v5.html`, `mock-blob7.html`, `mock-home.html`.

**How to test.** (1) Syntax check: `node docs/tools/chk.js` (it writes `main-check.js` in the current folder; delete it after). (2) Run the site: `node docs/tools/serve-repo.js` then open `http://127.0.0.1:8766/index.html`. (3) Sentence reader: `node docs/tools/test-parse.js` (31 cases, all should pass). (4) Real screenshots: in a scratch folder run `npm install puppeteer-core` and drive the system Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`; fake the clock to 9:40 so screens are stable; look at the PNGs before saying a visual change is done. The preview test server serves `sw.js` with a wrong type, so the service worker error in the console is a test quirk, not an app bug.

**Working method.** `index.html` uses CRLF line endings. Edit it with small Node patch scripts: read, turn CRLF into LF, replace exact strings while asserting each is found exactly once, turn LF back into CRLF. Write those scripts with the Write tool (bash heredocs and `node -e` drop backslashes and choke on apostrophes). Commit with a one-off identity: `git -c user.name="kmlnths" -c user.email="kmlnths@gmail.com" commit`, and end the message with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`. Bump the `CACHE` name in `sw.js` on every push (now `ritsu-v18`).

## 0. What Ritsu is

- A personal habit / health / to-do tracker. Single-file **vanilla HTML + CSS + JS**, one big IIFE, no framework, no build step, no package.json needed.
- Storage is **localStorage only** (per browser). No backend, no accounts.
- Deployed to **GitHub Pages** (kmlnths.github.io/Ritsu), served straight from `index.html` at the repo root.

## 1. How to work on it here

This used to run entirely in a cloud chat with no repo access: every change came back as a downloaded file you re-uploaded to GitHub by hand. That's gone now. You have git.

- Edit `index.html` in place with your normal file tools.
- **Syntax-check before every commit**: the main script is one large `<script>` block (~670k chars). Extract the biggest `<script>...</script>` and run `node --check` on it. A one-liner:
  ```
  python3 -c "import re; s=open('index.html',encoding='utf-8').read(); scripts=re.findall(r'<script>(.*?)</script>',s,re.S); open('/tmp/main.js','w',encoding='utf-8').write(max(scripts,key=len))"
  node --check /tmp/main.js
  ```
- **Verify visually with Playwright** before calling a visual change done. Install chromium if you don't already have it (`npx playwright install chromium` or similar). Launch headless, screenshot desktop (~1240px wide) and mobile (~390px wide), and actually look at the PNGs — don't just trust that the code "should" render right. Also check `page.on('pageerror', ...)` for JS errors.
- The file stores real unicode characters (× … etc.) — byte-exact edits sometimes need Python instead of a plain string-replace tool.
- **Commit and push yourself.** There's no CI/build step — pushing `index.html` to the branch GitHub Pages serves from is the entire deploy. Use normal git hygiene: meaningful commit messages, don't force-push, don't commit secrets.
- No test suite exists. The syntax check + Playwright screenshot pass is the verification loop. Don't skip it before telling the user something is done.

## 2. User preferences (important)

- Strongly dislikes anything that "looks AI-written / AI-designed." **Zero em-dashes or en-dashes anywhere** in UI text — check `s.count('—')` / `s.count('–')` are both 0 before shipping.
- Sensitive to generic "AI dashboard" tells: decorative gradients used purely as color decoration (chart fills, glow-behind-the-page, panel background blends), a rainbow of one-color-per-card icons/tiles, identical-weight stat cards with no hierarchy (one should read as the hero, others secondary), a wide scatter of arbitrary `border-radius` values instead of a small consistent set, drop shadows on every static panel instead of reserving them for things that truly float above the page, and placeholder copy or invented percentage deltas instead of real numbers with real shape (e.g. a sparkline). Watch for these on any new UI, but nothing has been changed in the current file to address them yet — that's still open work, not done.
- **Updated by the user during the home redesign:** they now explicitly asked for "a bit more on the gradient side" and "more interesting fonts". Gradients on the new Home (card faces, hero glow, Up next, active day chip, arc dots, page glow) are intentional, stay inside the emerald / gray / amber palette, and are built with `color-mix()` on the tokens so they work in both themes. Do not flatten them as part of the old gradient audit unless the user asks.
- Iterative worker: wants to see a screenshot before committing to a direction, reacts to what's actually rendered rather than a description of it. Give plain-language explanations, not jargon.

## 3. Current visual system (locked)

- **Palette: 60-30-10, three colours.** Neutral canvas (60), **Emerald** primary (30), **Amber** accent (10), plus a **restrained red/rust reserved only for genuine misses** (missed meds, hard overdue). Blue and violet were removed everywhere.
  - Dark is default `:root`; light is `:root[data-theme="warm"]`.
  - Key tokens (dark): `--bg #0D0E11`, `--panel #16181D`, `--panel-2 #1E2128`, `--ink #F4F5F7`, `--muted #9CA3AF`, `--faint #828A95`, `--line #282C34`, `--accent #34D399` (emerald), `--gold #FBBF24` (amber), `--rust #F87171`.
  - There is a second, unused legacy `:root` / `:root[data-theme="warm"]` block near the top of the `<style>` (an old amber/brown palette). It's fully overridden by the real one further down, so it has zero visual effect, but it's dead code. Low-risk cleanup candidate.
- **Fonts:** `Bricolage Grotesque` (display / headings / big numbers, exposed through the `--serif` token so every heading follows it; it replaced Fraunces at the user's request), `Instrument Sans` (all UI text). Loaded via a non-blocking Google Fonts `<link>`. No Inter, no IBM Plex Mono.
- **Icons: Phosphor, inlined as SVG paths** (not the CDN font, it never rendered for this user). `PHI`, `phicon(name,cls)`, `CAT_ICONS`, `CAT_ICON_DEFAULT`, `catIcon(cat)`. People avatars still use emoji, not yet switched.
- Touch/press polish already shipped: instant press feedback, touch hardening, a reduced-motion block that keeps color/opacity fades but drops transforms, drag-to-flick date rail with momentum on desktop.
- Layout: desktop 2-column home (`.home-grid` 1.55fr / 1fr at ≥940px), single column on mobile. Bottom nav on mobile, left sidebar on desktop.

## 4. The information architecture (approved, current build target)

Three top-level **domains**, shown as the three Progress rings: **Body / Mind / To-do.**
- **Body** = Physical, Hygiene, Vitals, Medication. (Areas Health + Hygiene roll up here.)
- **Mind** = Learning, Reading, Meditation. Learning and Reading are meant to **nest** (topics/books under a parent, each a daily continuous activity).
- **To-do** = three lists: **Work / Home / Personal.**

**Tagging model:** every item belongs to a domain via its **area's `domain` field**. Items inherit their area's domain.

**Consistency rule:** each item has a **`count` switch**. New non-med items default **ON**. **Medication defaults OFF** — a missed dose never hurts consistency (you can't retake it); it stays a reminder + feeds the adherence report.

## 5. What is already built (current state, unchanged from before this session)

- Rings are **Body / Mind / To-do**, aggregated by domain: `AREA_DOMAIN_DEFAULT`, `areaDomain(catId)`, `schedToday(i)`, `doneT2(i)`, `domainMetrics(dom)`, `homeMetrics()`. `progressCard()` still draws the **three-ring SVG on the Home page** (concentric circles, `ringCfg`, `RING_PAL`, "Edit rings" button) — this has NOT been replaced with cards. `ringCfg` default `[body #34D399, mind #8E97A3, todo #FBBF24]`.
- Home page order (main column, top to bottom): orbit tile (solar-system "days to catch up" widget) → Progress card (rings) → Fasting card → Today timeline → To-do. The orbit tile is still first, not last.
- To-do tabs Work / Home / Personal, per-item consistency toggle, area editor Ring/domain picker, medication adherence report — all as before.
- Medication & Routine are still shown under the rings as **dot-bar rows**, not cards.

## 5b. Home redesign (branch `home-redesign`, supersedes the Home bullets in section 5)

Built from the user's paper sketch and approved mocks. Home is now, top to bottom (main column): greeting, month + year header with a "Today" pill, **day scroller** (snaps one day at a time, ticks between days, week arrows), **Up next** card (next timed med / task / running fast, hidden when nothing is timed, today only), three small **Body / Mind / To-do** cards, a big **Done today** card, then (side column on desktop, below on mobile) the **Consistency** calendar, then what used to live on Home: fasting card, reflection, probe, Your areas, orbit tile.
- Card behaviour: each card is a two-faced flip card (`.hm-card` > `.hm-flip` > `.hm-front` / `.hm-back`, CSS 3D `rotateY`). Tap once and it turns over in place (`hmFlip(dom)` toggles `.flip`, no rebuild, so it animates) and the back lists up to 3 pending items, highest priority first (`hmPrio`). Tap the same card again and it opens the Day view filtered to that domain (`state.dayDomain`, set by `openDayList`), a flat list sorted by `hmListSort` (done last, then priority, then soonest due). A tap anywhere else turns the card back. The big card opens the unfiltered Day view. Reduced motion swaps the flip for a crossfade.
- The big card also shows the 30-day consistency score with a 14-day bar sparkline (`hmSpark`), so the number is not buried under the calendar. Up next is a compact one-row card; a running fast only appears there in its last 3 hours.
- Sun / moon switch beside the greeting (`hmThemeHtml`, `data-hmtheme`): flips `theme` between `dark` and `warm` via `applyTheme` without re-rendering, so the knob animates.
- `schedToday` no longer counts a one-off task finished on an earlier day as "left today".
- Speed rule for the day strip: while it moves, only `hmHead()` (month, Today pill) and the highlighted chip update; `hmBodySoon()` redraws the cards and big card 90ms after it settles. The 30-day score and 14-day bars are cached in `_hmCons` once per full draw (they do not depend on the chosen day). Do not call `consistency()` or `hmSpark()` from anything that runs per scroll tick.
- Mouse: the wheel suspends snap while turning then settles on a day; dragging tracks 1:1 and throws by release velocity (exponential-decay projection, capped at 1400px). Touch uses native scroll and snap. Do NOT add `scroll-snap-stop: always` (it makes a flick move only one day).
- Theme switch uses `document.startViewTransition` for a soft cross-fade, falling back to an instant swap (and skipped under reduced motion). Small tap targets get an invisible 8px halo (`::after{inset:-8px}`) instead of bigger visuals. The dock respects `prefers-reduced-transparency` and `prefers-contrast`. The strip marks today with a small dot so you can always find it.
- Header: no banner and no brand text. `greeting()` gives a plain "Good morning / afternoon / evening / night" (it already escapes the name, do not `esc()` it again), and under it sits the quote of the day from `HM_QUOTES` (31 lines, one per day via `hmQuote()`, cycles monthly, "Discipline today. Freedom tomorrow." is in the pool, no dashes in any quote). The phone `.topbar` ("Ritsu" strip) is hidden on every page because it rendered as an off-colour slab over the page glow; `.main` keeps safe-area top spacing instead. The user offered to supply a header image later; the old time-of-day photos (`heroArt`, `HERO_*`) are still in the file if wanted.
- The page glow is a single emerald radial gradient. A second amber glow was removed because green plus amber blends to a muddy olive.
- Known layout quirk: the floating "+" button (phones) can sit on top of right-aligned controls near the bottom of the screen (for example "Show dates"). Left as is because it is the app's established add button; moving "+ Add task" into the Home header on phones would remove the overlap.
- Code map: `viewHome()`, `homeMount()`, `hmRefresh()` (redraws only day-dependent parts so scrolling stays smooth), `hmItems/hmDone/hmStat(dom, ds)` (today uses `schedToday/doneT2`; past days use `dailyRoutine(ds)` + `creditOn`; future days use `dueOnDate`), `hmNextPick()`, `hmArc()`. State: `state.homeDay`, `state.homeOpen`, `state.dayDomain`.
- Calendar is the existing `calendarPanel(months, big)`; odd months are now gray (`.calcell.cb`), even months emerald.
- **Magnifying dock** replaces the pill bottom nav on phones (<=820px): `.gdock`, `--d` set per item by script, cos() falloff over 3 items. Desktop keeps the left sidebar.
- Fonts load non-blocking (`media="print"` swap) so a slow font host can never leave the app half-drawn. `sw.js` cache is now `ritsu-v15`; bump it again on every deploy.
- `completedAt` is now written in local time; `completedLocal(i)` converts older UTC (`Z`) stamps. This fixed "done today" not counting ticks made when the UTC date differs from the local date.
- Dead code left in place (safe to delete later): `progressCard`, `todayTimeline`, `last7bars`, `buildDays/dayscroll*`, hero-banner art and CSS.

## 5c. Polish batches 1 to 3 (branch `home-redesign`), things to keep true

Batch 1, readability and access:
- Light tokens are deliberately stronger: `--muted #4B5563`, `--faint #5B6470`, `--accent #047857`, `--accent-ink #065F46`. Small warning text uses `--gold-ink` / `--rust-ink` (darker in light mode, same as `--gold` / `--rust` in dark). Use them for TEXT; keep `--gold` / `--rust` for fills and borders. Every screen was measured with no text under 4.5:1 in both themes.
- Nothing under 11px. Small tap targets keep their look and get an invisible `::after` halo (inset -9 to -14px) so the real target reaches 44px. Do not set `overflow:hidden` on those buttons.
- Task titles in rows are real buttons (`.rtb`); every tick has an `aria-label` from `tickLabel(i)`; one focus ring for `button`, `[role=button]`, `a`.
- `toast(message, undoFn)` shows an Undo bar for 5.5s. Used for ticking a task, taking a medication, upkeep "Done", and ending a fast (`undoEndFast`). Add it to any new one-tap change of data.
- Calendar squares are buttons (`data-daysheet`); `openDaySheet(ds)` lists what happened that day.
- Area names on the Day page are ink text with a colour dot (`.adot`), never coloured text.

Batch 2, one look:
- Every `.card`, `.panel`, `.statbox`, `.tile`, `.schip` shares one soft gradient face and no shadow. The solar-system tile is exempt (`.card:not(.orbit-card)`) because it is intentionally dark in both themes.
- Corner radii were collapsed to 10 / 16 / pill (plus tiny ones under 6). Keep it that way.
- Symbols and emoji in rows became line icons via `PI("flame" | "target" | "repeat" | "bell" | "pill")`. Tags are snapped to emerald / amber / gray by `snapTag()`.
- Reports leads with the same dotted consistency gauge as Home (`.rep-hero`).
- Moments of delight: `.tick.pop` (set by `_justDone`), dots fill in order (`--i`), a finished day glows and says "Day complete". Screens slide with `withTransition(fn, "nav" | "back")`; the dock has its own `view-transition-name`.
- Appearance is Light / Dark / Auto (`effTheme()`); a tiny head script applies it before first paint.

Batch 3, helpful:
- Quick add: a NEW task shows only the title and When chips; the rest sits under "More options" (`#q-more`, `ms.qOpen`). `parseQuick()` turns a trailing "tomorrow", "in 3 days", "next week", "monday" into the date on save unless a chip or the date field was used (`ms.dateTouched`). Enter saves. Editing an existing task shows the full form as before.
- Data safety: Settings has "Your data" (download a backup file, restore from a file with a one-step undo kept in `ritsu_prev_backup`, and a storage-protection row). Home shows a monthly nudge (`backupNudge`, keys `ritsu_first_seen`, `ritsu_last_backup`, `ritsu_backup_snooze`). Backup file shape: `{app:"ritsu", version:1, exportedAt, me, cache:{cats,items,people,tags,markers}, priv}`.
- First launch: with no `ritsu_local`, `Store.welcome` shows a Welcome screen (Start clean, Show me around with the sample data, or Restore a backup) instead of silently seeding sample data. "Start fresh" in Settings now leads there.
- Not built yet: the weekly Sunday note.

How to re-check: run a script in the page that measures tap targets under 44px, text under 11px, and contrast per view in both themes (turn CSS transitions off first, the light theme fades and will read wrong mid-fade). The audit cannot see gradient or canvas backgrounds, so buttons on emerald gradients and the orbit tile need a visual check.

## 5d. v4 master sheet (agreed with the user, NOT built yet, branch will be `v4`)

Mocks for all of this were built in the session scratchpad (mock-v4.html: compact cards, pill nav, share card, steps and icons; mock-v5.html: add sheet, templates with gear, new habit form, gear on a habit, fasting plan). They are not in the repo.

**Only three cards on Home: Body, Mind, To-do.** Every thing has three labels:
- **Card**: where it lives on Home (Body, Mind, To-do).
- **Type**: what it is (Task, Habit, Medication, Log, Fasting, Gear, Shelf item). Habit has three variants: Normal (tick it), Avoid (replaces "Limit"), Amount (hit a number).
- **Tag**: the topic, used to find things across cards (tap "Health" and see meds, logs and the dentist visit together). Tags are editable.

Nothing in stored data changes: `stance` and `kind` stay as they are, only the words and the order of questions change. "Body log" is renamed **Log** (it also sits on Mind: mood, a low patch). The preset "library" is renamed **Templates** (bundles of a habit plus its gear).

| Type | Body | Mind | To-do | In the daily score? |
|---|---|---|---|---|
| Habit (Normal, Amount) | brush teeth, water | read 50 pages, meditate | chores, work routines | yes |
| Avoid | smoking, sugar | doomscrolling | rare | no, own trend, a slip is data |
| Medication | yes | | | no, own adherence report, a missed dose never hurts the score |
| Log | bowel, sleep, a cold | mood, a low patch | | no, private by default |
| Fasting | yes | | | no unless switched on |
| Gear | follows its habit | follows its habit | | no |
| Shelf item | | books, videos, courses, topics | | no, only through its habit |
| Task | | | Work, Personal, Home and errands | yes, when due |

Default tags. Body: Health, Care, Fitness, Sleep, Food. Mind: Learning, Reading, Mindfulness, Creative, Focus. To-do has three lists: **Work, Personal, Home and errands** (chores that repeat and errands live in the third). Tasks always live on the To-do card but can carry any tag. Medication is tagged Health. "Read 50 pages" is a Habit tagged Reading; a book is a Shelf item, also tagged Reading.

Add sheet ("What are you adding?"): Templates on top, then Everyday (Task, Habit, Save for later) and Health and care (Medication, Log, Gear).

Decisions already accepted:
- Compact cards (about 112px, title 16, number 32, sub line 14, slim bar instead of the dotted arc). Pill nav bar: the active tab shows icon plus name, the rest are icons, magnify kept.
- Share card: the user's NAME on it (from People, editable in Settings), the WHOLE score (same as Done today), not one routine; private items never appear. Week/Month/Year, emerald/gray/amber/photo, saved or shared as an image made on device.
- Icons: full Phosphor set (about 1,500, same look as the rest of the app), loaded from its own file only when the picker opens, with category tabs and search. Streak uses Lucide, kept as an option only.
- Steps are a question ("Break it into steps?", off by default), Normal habits done once a day only.
- Gear: Replace, Rebuy, Recharge or Clean, counted in days, uses, or both (whichever comes first). Uses come from ticks on the habit. One habit can have many gear; gear can also stand alone; if the habit is deleted the gear stays; private habit means private gear. Name can be "Gear" or "Supplies".
- Fasting plan: every day 16h, once a week a longer fast (36h) on a day the user picks. A running long fast covers the daily one. A skipped long fast offers "Move to tomorrow" or "Skip this week", never red. Stopping early still counts, start time is editable. The plan never raises a target by itself; keep the care note and add "if you take medication with food, check with your doctor first". No food diary: "Finished eating" / "Started eating" with an editable time is the light log.
- The user does not like: serif italic titles, nagging copy ("Keep the streak alive"), a focus timer, cover images, PIN lock.

PROPOSED, not yet confirmed by the user: the **Shelf** under Mind. Kinds Book, Article, Video, Course, Topic; states Saved, Learning, Done (plus Paused); progress counted in pages, minutes, lessons or steps, and for a Topic a four-level "how well I know it" (Just started, Getting it, Comfortable, Solid) instead of a made-up percent. Sessions are logged once on the item and feed the matching Amount habit (no double entry). Home "Keep going" row, "I have 20 minutes" filter, plan an item for a day, monthly tidy of old Saved items, soft limit of 3 in Learning. Android share target from YouTube (installed app only). Version plan: v4.0 cards, nav, add sheet, habit types, steps, templates with gear, icons; v4.1 Shelf; v4.2 fasting plan and share card; later a Shopping list fed by gear and low medication.

## 5e. v4 build log (branch `v4`, started from `v3`)

Done and committed on `v4`:
- **Compact cards** (`hmCardsHtml`, CSS block "v4: compact cards and the pill nav"): 112px, number first, slim bar, back lists two items on one line each. The dotted arc is now only on the big Done today card.
- **Pill nav** (phones): the active tab shows icon plus name in a soft pill, the rest are icons. `renderNav` toggles `.on` in place (does not rebuild) so the pill slides. Magnify still works.
- **Orbit tile removed**: its code, textures, setting and CSS are gone (file went from 811 KB to about 612 KB). Do not bring it back.
- **Companion blob** (`var Buddy`, search "the companion"): shape, face, mouths and wobble adapted from feral-blob (MIT, mortspace); the MIT notice sits above the code and Settings has a credit line. Keep both. Emerald skin via `--jb-*` vars on `.blob-host`. One persistent instance is MOVED into the Home header slot (`#buddySlot`) on every render so its state and bubble survive re-renders; Welcome and the wipe screen use short-lived instances (`Buddy.temp`). One rAF loop that sleeps when no blob is on screen; reduced motion holds a still frame.
  - Placement (revised after an Apple-design review): the blob is a RESIDENT in the top right corner of Home, under the light/dark switch (`#buddySlot` inside `.hm-side-r` inside `.hm-top`). It adds no height of its own and covers nothing. When it speaks, its bubble grows out of the blob to the left and takes the place of the greeting and quote for a few seconds (`.hm-top.talk .hm-hello{visibility:hidden}`), then the greeting returns. It is also a VISITOR in the Undo bar: `toast(msg,undo,mood)` with mood `happy`, `joy` (the tick finished the day, `dayFinished()`) or `love` puts a small decorative blob beside the words, because most ticks happen on the Day list where the corner blob is not on screen. Also Welcome (waves, large) and the wipe screen (Serious). Not on reports, settings, or the share card. An earlier version put it in a row between the cards and the Done today card; that added about 80px and sat apart from what it reacts to, so it was dropped.
  - Header (later change): the sun/moon slider is GONE from Home (`hmThemeHtml` and `.hm-theme` are dead code). The blob is 92px in the top right corner (`.hm-top .blob-host`, `.hm-side-r` keeps 22px free for the cord) and the theme now changes with a pull cord (below). Keep the blob at 92px unless the user asks otherwise.
  - The blob has two SKINS driven by CSS variables on `.blob-host`: emerald in dark, warm amber in light (`:root[data-theme="warm"] .blob-host`). Every colour of the face (ink, gold accents, stars, hearts, heart eyes, cheeks, eyes) comes from `--jb-*` variables, never hard-coded, so the whole blob re-tints with the theme. Add any new blob colour as a variable in BOTH skins.
  - **Pull cord** (`pullHtml`, `Pull`, `flipTheme`): a real verlet rope (points joined by fixed-length links, gravity, damping, 20 solver passes) hanging from the top edge of the screen right beside the blob. Physics numbers, rope proportions and the "clicks mid-pull, not on release" rule come from pullcord (MIT, iisac); the MIT notice sits above the code and Settings has a credit line. Pull past 20px and the theme flips once; a tap or Enter gives a quick flick and flips; it needs no React. On phones it is `position:fixed` at the top of the viewport and steps aside (`.away`, faded and non-interactive) once you scroll past 90px so it can never catch a stray tap over a card; on desktop it is absolute inside the header. It is Home only. `role="switch"` with `aria-checked` = dark; the tooltip says what a pull will do. Reduced motion: no drag, a click still flips. Tried and rejected by the user: at the very end of Home, and hanging under the Consistency box. APPROVED by the user: the amber blob in light mode, and the cord fading while scrolling (keep both).
  - Moods on Home follow the day: sleepy from 22:00 to 05:00, curious with nothing due, happy when all done, otherwise idle. `Buddy.sync` is called from `hmBody`.
  - Reactions (`Buddy.react`): `done` (tick), `complete` (celebrate, once a day, only when the day BECOMES complete while Home is open), `love` (backup saved), `restored`, `shy` (logging a private item), `sad` (an episode begins), morning wave once a day, sleepy line after 22:00. Hooks are one-liners in `addEvent`, `tapTodo`, `toggleItem`, `startEpisode`, `downloadBackup`, `restoreBackup`.
  - Speech rules: fixed short lines, at most 4 bubbles a day in total, per-kind caps (`CAP`), "done" bubbles need 45 minutes between them, never about a missed habit or a low score. Prefs in localStorage: `ritsu_buddy_show`, `ritsu_buddy_say`, `ritsu_buddy_mode` ("quiet" keeps only the wave and a finished day), daily counters in `ritsu_buddy`. Settings has a "Companion" panel (`buddyPanel`).
  - Not wired yet (engine supports them): `surprised` for records, `hmm` for restoring or searching, `sideeye` for soft limits (Shelf later), empty-state blobs.
- **Deletes are undoable**: `gone(msg)` snapshots the store and shows the Undo bar; used by deleting an item, area, person, tag and flag. No more native confirm dialogs for those.
- **Wipe** ("Start over" in Settings) opens `openWipe()` with the blob looking serious. `wipeGo()` keeps the data in `ritsu_prev_backup`; the Welcome screen then offers "Bring back what was here" (`bringBack()`).
- Service worker cache is `ritsu-v16`. The local test server serves sw.js with a wrong type, so the service worker cannot register in the preview pane. That is a test-server quirk, not an app bug.

- **One add sheet for everything** (search `openAdd`, `renderAdd`, `saveAdd`; CSS block "v4: the add sheet"). The phone plus button, the desktop "+ Add" (now a solid emerald pill) and every "+ add" open it. It starts as a To-do task, or as the card of the area or filtered Day view it was opened from. A three-way switch, To-do, Body, Mind, moves it; below that sit list chips (Work, Personal) or the areas of that card. Date, Time, Priority, Repeat, Tags and Note are chips that show their value. Date, Priority and Repeat open small option sheets (check on the current one, like Streak); Pick a date opens a Monday-first month calendar; Time opens a scroll wheel (hour, minute, AM/PM, presets Morning, Noon, Evening, Night) that a mouse can also drag. The button says "Add task" or "Add habit" (a repeat makes it a habit). Body or Mind with no repeat is a one-off in that area. A trailing "tomorrow" in the title still sets the date (`parseQuick`). "More details" opens the old full form, filled in with what was typed. It saves through the old `saveItem` (fields are set on `ms.data`; every id in the sheet starts with `q-` so `syncItem` ignores them). Priority now has a fourth level, "none" (sorts last); items without one still count as "med".
- **No more round clock dial**: every time field in the app (task form, reminders, "Usually at") uses `timeField(id,val)`, a button that opens the same wheel (`qpTime`) and keeps the value in a hidden input, so `syncItem` is unchanged. The task form has a Time field now. Not done: the full-form Date is still the browser date input.
- The picker layer is `#qlayer` (outside `#modal`, z-index 70, Escape closes it first). `openModal` now resets the modal class, so `.qa` styles never leak into other modals. sw.js cache is `ritsu-v17`.

### BUILT (uncommitted until the user says push): typing a sentence, and one day per task
- `parseTyped(text,now)` and `tyTitle(text,parts,use)` sit at the top of the add sheet block. They are plain code: they read only the text and the clock they are given, no page and no storage, so they can move to a server later. The user plans a proper backend (Supabase or similar) after GitHub Pages, so keep new logic like this separate from the screen code and keep new data as plain values: date "YYYY-MM-DD", time "HH:MM", `duration` in minutes.
- The add sheet reads the title on every keystroke (`qaEff`, `paintActs`): the Date, Time and Length chips fill in, and a green line says "Read as: Tomorrow, 5:00pm". The typed words are only cut out of the title on Add. A tapped chip always wins over what was typed: a chosen value replaces the words, a cleared value ("No time") leaves the words in the title. A length with no time is ignored. Date words are ignored while a repeat is set.
- Words understood: tomorrow, tmrw, tmr, "tom" next to on/for/by/at/within/till/until/before/after or a time word, day after tomorrow, today, tonight, in N days or weeks, next week, weekdays (abbreviations sun, mon, wed, sat only after on, next or this), on the 25th, 25 sep, sep 25, at 5, 5pm, 5:30pm, 17:30, noon, in 2 hours, in half an hour, for an hour, for 30 min, and morning, afternoon, evening, night only after in the, this or at, or straight after a day word (so "Morning run" stays a title). A bare hour with nothing to go on: 7 to 11 is morning, 1 to 6 is afternoon, and today never picks a time already past. Word defaults: morning 9am, afternoon 3pm, evening 6pm, night 9pm. `test-parse.js` in the session scratchpad holds 31 cases; re-create similar tests if the reader is touched.
- The date list no longer has "No date" (an undated task showed on no list). `saveItem` now gives every one-off To-do task a day (today if empty). Items carry an optional `duration` (minutes); rows show "12:00pm to 1:00pm" (`fmtSpan`).
- Decided but NOT built: the Full day pop-up (more than 7 open one-off tasks on a day, asked once per day per date after adding; Ritsu pre-ticks the tasks with no time and no priority, newest first, enough to get back to 5; buttons Move to tomorrow, Pick another day, Keep all; habits and meds are not counted) and the evening wrap-up card on Home from 8pm (leftover tasks each with Tomorrow chosen; tick if done; tap the day to change; the next morning it is still there; skipping is safe because unfinished tasks already show on the next day). Tone: real numbers only, no numbers when nothing got done, never "overdue", never "too much", no red. Lines: "Full day today. Spread a few over tomorrow, or take them one at a time. Both work.", "Let's do it. One at a time.", "5 of 8 done. That counts.", "Some days go like that. Want to try these again tomorrow?". Ritsu cannot notify at 8pm without a server (parked until the backend exists).

### Decided with the user, NOT built yet: clash warnings
- **Type it, Ritsu fills it in.** Rule-based (no AI, no network, works offline, same sentence gives the same result). Extends `parseQuick`. Examples: "call alex tom at 5 in the evening" gives title "call alex", tomorrow, 5:00pm; "meeting at 12pm for an hour" gives today, 12:00 to 1:00pm, length 1 hour; "gym in 2 hours". The Date, Time and Length chips in the add sheet fill in live while typing, so nothing is guessed silently, and tapping a chip undoes it (the words go back into the title). Nothing typed about a date means the item goes to Later, not today.
- **"tom" means tomorrow** when it sits next to on, for, by, at, within, till, until, before or after, or next to a time phrase ("tom at 5", "tom evening"). "day after tom" and "day after tomorrow" mean +2 days. Also tomorrow, tmrw, tmr. A person named Tom is a known clash, deliberately deferred by the user (nobody named Tom uses the app for now). Revisit if that changes.
- **Bare hours:** "at 5" picks the next 5 that has not passed; morning, afternoon, evening, night and pm override that. Defaults for a word with no hour: morning 9am, noon 12pm, afternoon 3pm, evening 6pm, night 9pm.
- **Length:** new optional field on items (minutes). A Length chip appears once a time is set (30 min, 1 hour, custom). Only items WITH a length can clash. Items with just a time (a med at 8, brushing teeth at 8) are reminders and never block each other.
- **Clash = warning, not a block (user chose this):** a small pop-up shows that day's schedule as a strip, the existing item (for example Team sync 12 to 1pm) and the new one drawn over it in red, with three buttons: Pick another time, See the day, Add anyway. Idea: the blob gives a side eye. Draw this pop-up as a mock before building it.
- **Build order:** the parser and the Length chip are done; still to build: the Full day pop-up and evening wrap-up, then the clash pop-up.
- **Parked from the productivity-thread brainstorm:** Today's five with a Later list, a bad-week report (which habits survived your worst week), your own saved lines as the quote of the day, a smallest version of a habit, a 30-day trial label, a phone-free hour template. Also: drop the planned monthly tidy of old Saved Shelf items (an unread pile is not a debt). Test for every v4 idea: it must take under five seconds to add and must be fine if ignored for a week.

Still to build for v4.0 (in this order): the type choice inside the add sheet (Templates on top, then Habit, Medication, Log, Gear, Save for later; today Body and Mind add a habit and "More details" reaches the rest); Normal / Avoid / Amount in the habit form and the Body log rename to Log; the steps question; Templates (the LIBRARY) with gear bundles and the Gear type with days-or-uses rules; the icon pack (Phosphor, lazy loaded). Then v4.1 the Shelf, v4.2 the fasting plan and the share card.

## 6. What is PENDING (roadmap / next asks — items 2 and 6 were done by the home redesign)

1. **Learning / Reading nesting** — parent topic with sub-topics/books. Not built; items are still flat.
2. **Ring tap → domain-filtered view** — tapping a ring row currently navigates to the general Day view; should open that domain filtered.
3. **Home-area item migration** — legacy items in the old "Home" wellness area should move into To-do → Home list.
4. **Radius scale unification** — an audit flagged ~20 different `border-radius` values scattered through the CSS. Collapsing to a small token set (something like 6 / 10 / 16 / pill) is a scoped, low-risk cleanup, not yet done.
5. **Decorative-gradient audit** — a few gradients in the CSS are purely decorative (two-tone chart/bar fills, a background glow, a panel-background blend) rather than doing real visual work. Worth flattening to flat color where they're not load-bearing (keep the ones that are: photo scrims, scroll-edge fade masks, the fasting conic-gradient ring).
6. **Progress-card hierarchy pass** — if you want to explore replacing the three-ring SVG with cards (one hero metric + smaller secondary cards for Body/Mind/To-do/Medication/Routine) instead of four-plus identical rings, that was discussed but never implemented in this file. Open question, not a locked decision.
7. Optional: snap remaining off-palette area colors to the 3-color set; switch people-avatar emoji to Phosphor icons.

## 7. Key function / storage map (quick reference)

- Views: `render()` switches on `state.view`; `viewHome()`, `viewArea(c)`, `viewDay`, `viewFasting()`, etc.
- Items: `Store.all("items")`, `Store.get/add/update`. Kinds: `todo`, `med`, `measure`, `upkeep`, `episode`; stance via `stanceOf(i)`. Helpers: `isRoutine`, `isRepeat`, `onToday`, `doneForNow`, `trackable`, `dCount(ds)`, `today()`, `fmt(date)`.
- Areas/categories: `Store.all("cats")`, `TODO_CAT="c_todo"`, `itemsOf(catId)`, `catToday(catId)`, `cats()`. Per-cat fields: `icon` (Phosphor name), `domain` (body/mind/todo).
- Scoring: `dayScore(ds)` → `{met, of, r}` (weighted done, total, ratio); `consistency(days)`; `scoreClass(s)`.
- Rings: `ringCfg`, `loadRings/saveRings/moveRing/colorRing`, `homeMetrics()`, `progressCard()`.
- localStorage keys: `ritsu_theme`, `ritsu_rings`, `ritsu_todolist`, plus the store's own item/cat data.

## 8. Also shipped earlier (so you don't redo it)

- Full "Fokus"-style redesign: real photo hero that swaps by time of day, compact hero, date rail with month-per-chip.
- Solar-system orbit tile (canvas, NASA texture data URIs, rAF loop, reduced-motion gated), beam recoloured emerald.
- De-AI pass against the user's own "AI tells" checklist (removed em-dashes, serif-italic accent words, colored left-border card, Inter, IBM Plex Mono).
- Medication report anchored to first log / course start (fixed false "missed" days).

## Agent skills

### Issue tracker

Issues live in GitHub Issues for kmlnths/Ritsu (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
