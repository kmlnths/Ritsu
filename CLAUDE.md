# Ritsu: rules for Claude

Read this first in every chat. Rules only; history lives in `docs/history.md`.

## Where things are

| File | What it holds |
|---|---|
| `PRODUCT.md` | What Ritsu is, who it is for, principles, the feature list (built, planned in order with "done when", dropped) |
| `DESIGN.md` | Colours, type, shapes, main pieces, motion, access and word rules |
| `ARCHITECTURE.md` | How the code and data work, code map, the backend and phone app plan, how to test |
| `docs/future-improvements.md` | Small problems and ideas noticed along the way, not decided yet. When the user says "add it to future improvements", add it there |
| `docs/vision-board.md` | Outside apps the user liked, with pictures in `docs/mockups/vision/` |
| `docs/history.md` | The old long notes file: every past decision and build log. Search it when you need the why |
| `docs/mockups/` | Pictures of built screens and options tried |

## Current state

- Working branch `v5`. **GitHub Pages serves `v5`**, so pushing v5 changes the live site (kmlnths.github.io/Ritsu). `main`, `v2`, `v3`, `v4` are old.
- `sw.js` cache is `ritsu-v26`. Bump it on every push.
- Next work: the "Planned" list in `PRODUCT.md`, top to bottom.

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
3. Sentence reader: `node docs/tools/test-parse.js` (all cases must pass).
4. Screenshots: in a scratch folder, `npm install puppeteer-core`, drive `C:/Program Files/Google/Chrome/Application/chrome.exe`, fake the clock to 9:40, phone (~390px) and laptop (~1240px), both themes. Look at the pictures and check for page errors.

## How to commit

`git -c user.name="kmlnths" -c user.email="kmlnths@gmail.com" commit`, a plain message, ending with the Co-Authored-By line for the Claude model in use. No force pushes, no secrets.

## Agent skills

- Issues: GitHub Issues for kmlnths/Ritsu via `gh`. See `docs/agents/issue-tracker.md`.
- Triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.
- Domain docs: see `docs/agents/domain.md`.
