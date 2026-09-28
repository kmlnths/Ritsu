# Ritsu architecture

How Ritsu works on the inside, and how it should grow into a backend and a phone app without losing anyone's data. Technical file: the user does not need to read it.

## 1. Today in one picture

```
Phone or laptop browser
 ├─ index.html   the whole app: HTML + CSS + one big JS function (~860 KB)
 ├─ sw.js        service worker: keeps a copy so it opens offline
 ├─ manifest     lets it install to the home screen (PWA)
 └─ localStorage all the user's data, on this device only
        ↑
GitHub Pages serves the files (kmlnths.github.io/Ritsu, branch v5)
```

- No framework, no build step, no package.json, no server, no accounts.
- Deploy = push `index.html` (and `sw.js`) to the branch GitHub Pages serves. Pages currently serves **v5**.
- Every deploy must bump `CACHE` in `sw.js` (now `ritsu-v26`), or phones keep the old copy.

## 2. Inside index.html

One `<script>` holds everything inside one function (an IIFE). Rough order from top to bottom:

1. CSS, in layers. Later blocks refine earlier ones (some `!important`). The first `:root` block near the top is dead legacy colour.
2. Helpers: dates (`today()`, `fmt()`, `addDaysStr()`), icons (`PHI`, `phicon`, `PI`), escaping (`esc`).
3. Item logic: `isRoutine`, `isRepeat`, `isLimit`, `isTracker`, `stanceOf`, `schedToday`, `doneT2`, `dueOnDate`, `dailyRoutine(ds)`, `dayScore(ds)`, `consistency(days)`.
4. `Store`: the data layer (see 3).
5. Sample data: `seedLocal`, `seedItems`.
6. Views: `render()` switches on `state.view`: `home`, `day`, `area`, `item`, `fasting`, `reports` (Patterns), `medreport`, `people`, `settings`.
7. v5 Home block starting at `var DOW_LONG`: `hmBody`, `hmHeroHtml`, `qcBar`, `qcSay`, `qcBackWeek`, `qcTurn`, `qcLogHtml`, fasting row `qfStrip` / `fastHomeCard` / `qfEndSheet`, `qcGlassCal`.
8. Sentence reader: `TY_DOW` ... `parseTyped(text, now)`, `tyTitle(...)`. Pure: reads only the text and the clock it is given.
9. Add sheet: `openAdd`, `renderAdd`, `qaEff`, `paintActs`, `saveAdd` (saves through the older `saveItem`). Picker layer `#qlayer`.
10. Things that come back: block starting `CB_LIB` (`cbAskHtml`, `cbRowExtra`, `cbBookSheet`, `cbPanel`), first-run setup (`setupHtml`, `setupFinish`).
11. Companion blob (`var Buddy`) and pull cord (`Pull`), both adapted from MIT code, credits in Settings.
12. Bottom menu `renderNav` (`.fnav`), `#fab`, `#fabMenu`.

Dead code to remove later: `hmCardsHtml`, `hmArc`, `hmSpark`, `hmNextHtml`, `progressCard`, `todayTimeline`, `last7bars`, `buildDays` / `dayscroll*`, hero banner art, `hmThemeHtml`.

## 3. Data

### Store

`Store` keeps five collections in memory: `cats`, `items`, `people`, `tags`, `markers`. API: `Store.all(c)`, `Store.get(c,id)`, `Store.add(c,data)`, `Store.update(c,id,data)`, `Store.del(c,id)`. Every change calls `onChange`, which redraws.

- **Local mode (what runs today):** the whole cache is one JSON string in `localStorage["ritsu_local"]`.
- **Private items** (`localOnly`) live apart in `ritsu_private_items` so they never reach shared storage.
- There is an old second path (`window.claude.use("db")`, a Firestore-like cloud from when the app ran as a chat artifact). It is not used on GitHub Pages. It is the natural place to plug in a real backend.

### Other device keys (settings, not data)

`ritsu_theme`, `ritsu_lights`, `ritsu_todolist`, `ritsu_me`, `ritsu_rings`, `ritsu_caldates`, `ritsu_week1`, `ritsu_winline`, `ritsu_buddy*`, `ritsu_first_seen`, `ritsu_last_backup`, `ritsu_backup_snooze`, `ritsu_prev_backup`, `ritsu_probe_day`, `ritsu_ext_ack`.

### Shapes

- Dates are `"YYYY-MM-DD"` (local time), times `"HH:MM"`, lengths `duration` in minutes. Keep it that way.
- An **item** has `id`, `catId` (its area; the area's `domain` puts it on Body, Mind or To-do), `kind` (`todo`, `med`, `measure`, `upkeep`, `episode`), `stance`, `title`, `dueDate`, `reminder` (time), `duration`, `repeatEvery`, `priority` (`high`, `med`, `low`, `none`), `list` (`work`, `personal`), `tags`, `private`, `done`, `completedAt`, per-day `counts` / `values` / `events`, and for things that come back a `cb` object (`kind`, `every`, `rule`, `stage`, `next`, `booked`, `at`, `snooze`, `last`).
- `normalizeItem` fills missing fields on load, so old data keeps working.
- **Backup file:** `{app:"ritsu", version:1, exportedAt, me, cache:{cats,items,people,tags,markers}, priv}`. This is also the migration format for the backend.

### Rules that must agree everywhere

- Trackers (`isTracker`), limits (`isLimit`) and medicine never count toward the day. `dailyRoutine` skips them, so the Home card, the card back and Patterns all show the same number.
- One item, one card, one group. No tags (removed 2026-09-29); old `tags` data can stay in storage but is not shown.

## 4. Where it is going

### Step 1: backend (Supabase or similar)

Why: accounts, sync between devices, safe cloud backup, 8pm reminders and push notifications.

- Put the backend behind the same `Store` API (`all`, `get`, `add`, `update`, `del`, `onChange`). Screens should not change.
- Keep localStorage as the offline copy; sync when online. Last change wins per item to start with.
- First sign-in: upload the local cache using the backup file shape. Keep `ritsu_prev_backup` as a safety net.
- Private items stay on the device unless the user chooses otherwise.
- Reminders (8pm wrap-up, "book the dentist") run on the server, not in the page.

### Step 2: phone app

The user chose polish first, then a native app with home screen widgets and iCloud / Google backup, sharing code with the web app.

- Code that must be shared, so keep it free of screen code: the sentence reader (`parseTyped`), scoring (`dayScore`, `dailyRoutine`, `consistency`), things that come back (`CB_LIB` rules), item rules (`isTracker`, `isLimit`, ...).
- Good first move: pull those into a separate plain JS file (`core.js`) with tests, loaded by `index.html`. The phone app and the server reuse it.

## 5. How to check a change

- Syntax: `node docs/tools/chk.js` (writes `main-check.js`; delete it after).
- Run: `node docs/tools/serve-repo.js`, open `http://127.0.0.1:8766/index.html`. The service worker error there is a test server quirk.
- Sentence reader: `node docs/tools/test-parse.js` (31 cases, all must pass).
- Screenshots: puppeteer-core driving the system Chrome, clock faked to 9:40, phone and laptop widths. Look at the pictures before calling a visual change done.
