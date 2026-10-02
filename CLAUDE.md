# Daywell (was Hiyori, was Ritsu): rules for Claude

Read this first in every chat. Rules only; history lives in `docs/history.md`.

## Where things are

| File | What it holds |
|---|---|
| `PRODUCT.md` | What Hiyori is, who it is for, principles, the feature list (built, planned in order with "done when", dropped) |
| `DESIGN.md` | Colours, type, shapes, main pieces, motion, access and word rules |
| `ARCHITECTURE.md` | How the code and data work, code map, the backend and phone app plan, how to test |
| `docs/future-improvements.md` | Small problems and ideas noticed along the way, not decided yet. When the user says "add it to future improvements", add it there |
| `docs/competitors.md` | The other app called Ritsu, ideas worth borrowing, the naming risk |
| `docs/vision-board.md` | Outside apps the user liked, with pictures in `docs/mockups/vision/` |
| `docs/history.md` | The old long notes file: every past decision and build log. Search it when you need the why |
| `docs/mockups/` | Pictures of built screens and options tried |
| `docs/brand/README.md` | The name, the logo, the icon files, the story, what was tried and dropped, next steps. Read before any logo or icon work |

## Current state

- **NEXT SESSION ORDER (user chose 2026-10-02):** (1) polish quick wins, one session: every button shrinks slightly on press (like `.wl-c` press), numbers roll when they change (Home card "3 of 5" to "4 of 5"), ONE celebration only when the day is complete ("a fine day", short burst in the three light colours, respects reduced motion), no dark flash on opening in light mode (manifest `background_color` is dark; match the theme), check every screen at 200% text size. (2) Rhythm choices for every item: some days of the week, N times a week, alternate days, weekly, monthly (`docs/backend-plan.md`). (3) Backend. Later, native app only: haptics on iPhone, Face ID, dark/tinted/alternate icons; with the backend: skeleton placeholders. Skipped: moving water shader. Source: a list the user pasted, judged in chat.
- **Done and pushed 2026-10-03:** polish quick wins (1). Buttons already shrank on press. New: Home number rolls, one "A fine day." burst when today completes (lives outside the card so redraws cannot cut it), status bar colour follows the app theme (manifest splash stays dark: it can only have one colour), big-text rules for pages under 300px wide (200% zoom on a phone). (2) Rhythm choices BUILT and pushed 2026-10-03: every activity, medicine and measure has Every day / Some days (`days`, 0 Sunday) / Times a week (`perWeek`, any days, week from Monday) / Every few days (`repeatEvery`). Rest days are hidden and never count; a skipped day of a times-a-week item never counts. Missed planned days move to a free day you pick in the coming week, never onto a day that already has it (`moves` {from:to}), from the item page or the 8pm wrap-up; every-day items say "already part of tomorrow". Rules live between the "rhythm (start)" and "rhythm (end)" comments (`hasRhythm`, `planOn`, `moveTargets`). "Counts toward my day" switch = `count`. Note: the app sends no phone alerts; reminder times only show on the list. Next: (3) backend.
- **START HERE (2026-10-02, end of session):** next is the backend and friend groups. The plan, in plain words with a full example, is `docs/backend-plan.md` (picture: `docs/mockups/friends-groups-mock.png`). The user read the explanation and wants to continue in a new session. First step is theirs: create a Supabase account and project "daywell" (region Mumbai), then paste the Project URL and anon key. Decided in the plan: no numbers between friends, two scores, weekly plan lock, no floor; rhythm choices (some days, N times a week) must be built first. Then build in the plan's order: sign-in and friends test, groups and invite, ticks and lights, dares, WhatsApp companion last (paid). Open questions are at the end of the plan. Everything up to here is **pushed** (2026-10-02, cache `daywell-v47`, the live site says Daywell). Since then: polish and rhythm choices pushed 2026-10-03 (cache `daywell-v48`).
- **Done 2026-10-02 and pushed:** ink 日 icon (traced from the user's chosen AI picture, tail shortened), phone mockups, Your areas as wallet stacks with the one-time tidy of old areas, richer light mode, tap recordings (`docs/mockups/areas-tap-*.mp4`). Idea review: 15/35, pivot the pitch to "the calm daily app for people living with a health condition" (`founder/validate-idea.md`).
- **Renamed to Daywell on 2026-10-02** (from Hiyori, chosen 2026-10-01; Hiyori had several small same-name apps on the App Store, Daywell had none). App, manifest, README and cache (`daywell-v47`) say Daywell. The ink 日 icon stays: 日 means "day", the tick means "done well". Earlier: **renamed to Hiyori (日和) on 2026-10-01**, in the app, manifest, README and cache (`hiyori-v43`). NOT renamed yet, on purpose: the stored-data keys that start `ritsu_` and the backup marker `app:"ritsu"` (changing them would wipe saved data and break old backups), the repo `kmlnths/Ritsu` and live address (`kmlnths.github.io/Ritsu`, installed copies would break), the project folder (rename it between chats), and the app icon (still the old three rings in `icons/`). Trademark and domain checks are still open (`docs/competitors.md`). Older notes below still say Ritsu.
- **Logo decided 2026-10-02:** the ink 日 with a green brush tick ("1A", traced from an AI picture the user chose), files in `docs/brand/ink/`, and **now wired into `icons/`** (unpushed, `sw.js` cache `daywell-v47`). It replaced K5/K6 (still in `docs/brand/` as fallback). Details and weak spots in `docs/brand/README.md`. Story: a day done well is a hiyori. Full notes, tried-and-dropped list and next steps in `docs/brand/README.md`. The user wants an "11 out of 10"; my honest score is about 8; a human designer or friends' feedback is the way up. Do not redo the dropped ideas (sun, jelly, H, hi, window, tally gate, seals). Do not redraw the 1A icon by hand: the user rejected that as stiff.
- Working branch `v5`. **GitHub Pages serves `v5`**, so pushing v5 changes the live site (kmlnths.github.io/Ritsu). `main`, `v2`, `v3`, `v4` are old.
- `sw.js` cache is `daywell-v50` (pushed 2026-10-03: From earlier on Home, the swipe tidy, planLabel fix). Bump it on every push (next: `daywell-v51`).
- Everything up to 2026-09-30 is pushed (cache `ritsu-v40`, 2026-10-01), including the clash warning, the templates list, the life tiles, typing suggestions and the posh-friend voice with Apple-style capitals. Built: groups and no tags, setup with "Who is this for?", typing files into groups, @name on this phone, Full day pop-up, evening wrap-up, amounts that count with a kind line, floating side panel with a rail, laptop nav pill after scrolling, white-card night-mode fix.
- Pushed 2026-10-01 (cache `ritsu-v42`, also the iPhone-style switch and Reminders grouped by topic): voice sweep of Settings and edit screens, Templates page (search at the bottom on phones, top on wide screens), Your Country, Custom rhythm on every reminder, Plan the week, Import a Calendar. Where we stopped, in order: (1) remove dead code (done, unpushed; the unused styles `.dayscroll*` and old tag code paths remain), (2) choose the app name (done: Hiyori), (2b) icons into the app and the Home card tick (next, see `docs/brand/README.md`), (3) birthdays for the Family tile. Loose ends: ask the friend to re-check the finished Home card on iPhone Brave; check the new side panel in light theme; "Call at venky 5" dropped by the user 2026-10-02; "medication" for amounts was meditation (confirmed 2026-10-02); Family tiles (birthdays) can wait (user, 2026-10-02); sidebar search box skipped. Then Phase B onwards in `PRODUCT.md` (accounts, friend gangs).

## How to talk with the user

- Not a techie. Plain everyday words, one short example. Explain any technical word in one simple sentence.
- Ask before anything big or hard to undo. Show a picture before building anything visual.
- When a decision is needed, ask ONE question with a concrete example and A or B choices.
- They say "push it" when they want a commit pushed. Never push without that. Commit locally when a piece of work is done.
- They have Claude usage limits and can run out mid-work: finish in small, saved steps.
- After a task, 2 or 3 plain sentences: what changed, what to do next.

## Product rules that are easy to break

- No em dashes or en dashes anywhere in UI text. Check before shipping.
- No nagging copy, no "overdue", no red pile-ups, no focus timers, nothing that looks AI-made.
- Trackers, limits and medicine never count toward the day. One item, one card, one group (Card, Group, Item, never deeper). No tags. Sort by topic, never by kind.
- Every addition must take under five seconds and be fine if ignored for a week.
- Never give medical advice. Health gaps are starting points: "ask your doctor for yours".
- Keep the MIT credits for feral-blob and pullcord in Settings.
- Keep new logic apart from screen code and new data plain (dates "YYYY-MM-DD", times "HH:MM", `duration` in minutes). A backend comes later.

## How to edit

- `index.html` uses CRLF line endings. Edit it with small Node patch scripts written with the Write tool (bash heredocs and `node -e` drop backslashes and choke on apostrophes): read, turn CRLF into LF, replace exact strings asserting each is found exactly once, turn LF back into CRLF.
- The file has real unicode characters (× …); plain string tools can miss them.

## How to check (before saying anything is done)

1. Syntax: `node docs/tools/chk.js` (it writes `main-check.js` in the current folder; delete it after).
2. Run: `node docs/tools/serve-repo.js`, open `http://127.0.0.1:8766/index.html`. The service worker error there is a test server quirk.
3. Sentence reader: `node docs/tools/test-parse.js` and group word list: `node docs/tools/test-group.js` and templates list: `node docs/tools/test-lib.js` and words: `node docs/tools/test-copy.js` and calendar files: `node docs/tools/test-cal.js` and rhythm: `node docs/tools/test-rhythm.js` (all cases must pass).
4. Screenshots: in a scratch folder, `npm install puppeteer-core`, drive `C:/Program Files/Google/Chrome/Application/chrome.exe`, fake the clock to 9:40, phone (~390px) and laptop (~1240px), both themes. Look at the pictures and check for page errors.

## How to commit

`git -c user.name="kmlnths" -c user.email="kmlnths@gmail.com" commit`, a plain message, ending with the Co-Authored-By line for the Claude model in use. No force pushes, no secrets.

## Agent skills

- Issues: GitHub Issues for kmlnths/Ritsu via `gh`. See `docs/agents/issue-tracker.md`.
- Triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.
- Domain docs: see `docs/agents/domain.md`.
