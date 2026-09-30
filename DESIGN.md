# Ritsu design system

The look and feel rules for Ritsu. If a screen breaks one of these, the screen is wrong, not the rule. When a rule changes, change it here first.

Pictures: `docs/mockups/` (built screens and options tried) and `docs/mockups/vision/` (outside apps the user liked, notes in `docs/vision-board.md`).

## 1. Feel

- Calm, posh, considered. Apple is the level of restraint and finish we aim for.
- It must never look AI-made. Watch for: a rainbow of one colour per card, identical stat cards with no hero, a scatter of corner sizes, shadows on every panel, glow for decoration, invented numbers, placeholder copy.
- Gradients are allowed where the user asked for them (the Home card faces, the soft top light, the active day chip), built from the palette tokens with `color-mix()` so they work in both themes. No gradient headline text, no purple AI glow.
- One playful element only: the companion blob.

## 2. Colour

Three colours plus a neutral canvas, in a 60 / 30 / 10 split: neutral canvas (60), emerald (30), amber (10). Red is only for genuine misses (a missed dose, something hard overdue). Blue and violet are not used for chrome.

| Token | Dark (default) | Light (`data-theme="warm"`) | Use |
|---|---|---|---|
| `--bg` | #0D0E11 | #F1F1EE | page |
| `--panel` | #16181D | #FFFFFF | surfaces |
| `--panel-2` | #1E2128 | #F6F6F3 | inner surfaces |
| `--ink` | #F4F5F7 | #15161A | main text |
| `--muted` | #9CA3AF | #55585E | second text |
| `--faint` | #828A95 | #686B72 | third text (still 4.5:1) |
| `--line` | #282C34 | #E4E3DF | hairlines |
| `--accent` | #34D399 | #047857 | emerald: buttons, done |
| `--gold` | #FBBF24 | #D97706 | amber: fills and borders |
| `--rust` | #F87171 | #DC5B4E | real misses only |

- For small TEXT in amber or red use `--gold-ink` / `--rust-ink` (darker in light mode). Keep `--gold` / `--rust` for fills and borders.
- The three lights (Body, Mind, To-do) have their own colours, `--c-body`, `--c-mind`, `--c-todo`, chosen in Settings > Light colours from five sets (`LIGHT_SETS`: Classic green, violet, amber; Ocean; Sunset; Forest; Easy to tell apart). Light mode uses the deeper solid version, dark mode lets them glow.
- A pale sky wash at the top of the page follows the time of day (`--sky1`, `--sky2` on `data-amb`). Top of the page only.
- Light theme: no beige. White surfaces on a soft grey page.

## 3. Type

- One font: **Space Grotesk**, for text, headings and numbers. Big thin numbers use weight 300. Loaded without blocking the page, falls back to the system font.
- One size scale. Every size under 21px is one of: **12, 13, 14, 15 (body), 17, 20**. Bigger sizes are for hero numbers only (the Home card number, fasting timer).
- Nothing under 11px, ever.
- Numbers that change use tabular figures so they do not jump.
- No serif italics, no handwriting fonts.

## 4. Shape and surfaces

- Corners: **10** (small things), **16** (cards and sheets), **pill** (buttons, chips). Tiny ones under 6 for LEDs and bars. Nothing else.
- Fewer boxes: surfaces are separated by tone, not by borders. Only the Home card keeps a hairline.
- Shadows only on things that truly float: the add sheet, the bottom menu, the + button, the Undo bar, pop-ups.

## 5. Icons and pictures

- Phosphor line icons, inlined as SVG (`PHI`, `phicon`, `PI(...)`). Never the icon font, never emoji in rows (people avatars are the one leftover).
- No stock photos, no 3D emoji icons, no cover images.

## 6. Main pieces

- **Home card**: date on top, big number (done of total) left, three LED lights right (Body, Mind, To-do) that brighten as things get done and glow when an area is complete, one kind sentence at the bottom. Tap a light to filter the list; tap elsewhere to turn the card. Back: this week as three strips of seven LEDs, days fully lit, the blob saying one line. When everything is done the card "switches on".
- **Date strip**: one day per chip, three small lights under each day.
- **Bottom menu (phones)**: a floating pill with five pages (Home, Patterns, Day, Fasting, Settings); only the open page shows its name. A separate round green + floats above it on the right. Tap + to add; press and hold for quick logs. The user wants to redesign this later.
- **Add sheet**: rises from the bottom. Title box on top with a green "Read as" line, To-do / Body / Mind switch, then chips (Date, Time, Length, Priority, Repeat, Note) that show their value. No Tags chip: tags were removed on 2026-09-29. Picker sheets for each chip; a scroll wheel for time.
- **Undo bar**: every one-tap change of data (tick, take a med, delete, end a fast) shows it for 5.5s, with a kind second line for finished tasks.
- **Fasting**: an arc with a live timer and a sun or moon.
- **Patterns**: Body, Mind, To-do as stacked cards that lift open; frosted glass month tiles.
- **Companion blob**: lives in the top right of Home, emerald in dark, amber in light. Every face colour comes from `--jb-*` variables. Short, capped, kind lines, never about a miss.

## 7. Motion

- Instant press feedback. Rows glide after a tick. Sheets rise from the bottom on phones. Theme change cross-fades.
- Reduced motion: keep colour and fade changes, drop movement.
- No focus timers, no confetti storms.

## 8. Access (hard rules)

- Text contrast at least 4.5:1 in both themes. Measure with transitions turned off.
- Tap targets reach 44px. Small controls keep their look and get an invisible halo (`::after` with a negative inset). Do not put `overflow:hidden` on those.
- Every tick has a spoken label. One focus ring for buttons and links.
- Respect reduced motion, reduced transparency and higher contrast.

## 9. Words

- Warm, polished, short. Real numbers only.
- **No em dashes or en dashes anywhere** in the interface. Check before shipping.
- Never: "overdue", "too much", "keep the streak alive", nagging, guilt, red pile-ups.
- Good examples: "5 of 8 done. That counts." / "Some days go like that. Want to try these again tomorrow?"
### The voice: a posh friend who checks on you (decided 2026-10-01)

Ritsu is a refined, warm friend: quietly confident, polite, gently enthusiastic, caring, and a little concerned when you have been away. Never loud, never slangy, never cold, never fearful.

- **Speaks as "I"**: "I'll remind you in March." Never "Ritsu will".
- **Short**: messages about 12 words or fewer, one sentence where possible. Buttons one to three words. People do not read long text.
- **Polished words**: "Splendid", "Lovely", "Do rest well", "Shall I", "Quite alright". Banned: whatever, stuff, gonna, kinda, super, actually, discipline, must, danger, overdue, comes back, oopsie.
- **Polite, not pushy**: "please" only when asking the person to act; "thank you" when they share something. At most one exclamation mark.
- **Calm about health**: no fear words. The doctor is a friend on their side ("keep your doctor in the loop"), never a disclaimer.
- **Faith**: short, neutral, private, optional. No religion assumed.
- **Things on a cycle are reminders**: "Remind me every 6 months", "Reminder every 6 months", the Settings section "Reminders". In code they are still `cb`, which the person never sees.
- **Rotating lines use a deck of 15 or more** (`deck(name, lines)`): shuffled, each line once before any repeats, never the same line twice in a row. Decks: task done (`DONE_LINES`), day complete (`ALLDONE_LINES`), reminder set (`REMIND_LINES`), welcome back (`BACK_LINES`), under the goal (`LOW_LINES`).
- Examples: "Beautifully done." / "I've got you. Scheduled for March." / "Heads-up: Team sync is already at 12 to 1pm." / "Welcome back. Lovely to see you."
- The check `node docs/tools/test-copy.js` fails on a banned word or a deck under 15, and lists lines that are too long.

## Open design questions

- Bottom menu redesign (the user finds it a bit cheap).
- Glass green + and a day-progress ring on the + (`docs/mockups/plus-glass.png`, `plus-ring.html`).
- Final light colour sets (the user will revisit).

## Laptop navigation and amounts (added 2026-09-30)

- **Laptop**: the same floating pill as the phone (Home, Patterns, Day, Fasting, Settings) sits at the bottom centre of the content area, so Home is one click away on every page. The left sidebar keeps Home and Day, then Body, Mind, To-do and More as drop-downs. They start closed (the group you are in opens itself), show how many are left while closed, remember what you opened, and open with a staggered slide (items ease in one after another; reduced motion turns it off).
- **Amounts** (reading pages, sleep hours, meditation minutes, water): any number above zero is accepted and, by default, counts as done for the day (the tick box can be turned off). When it is under the goal, the Undo bar shows a kind line from ten (`LOW_LINES`, never the same one twice in a row). The real number is always kept.

## Laptop side panel (replaces the sidebar notes above, 2026-09-30)

Shaped after a reference video the user supplied: a rounded floating panel inset from the window edge, not a full-height bar.
- Top: the name and a small round button on the panel's edge that collapses it to a slim rail (律 mark, icons only). Then a "Main" label: Home, Day, then Body, Mind and To-do as parent items with an icon. A parent opens to its groups under a thin tree line (staggered slide, chevron flips). Then "More": Fasting, Patterns, People, Settings as plain items. Bottom: a soft "who you are" card.
- In the rail a parent opens as a small flyout beside it; only one at a time, closes on any outside click. The choice (wide or rail) is remembered.
- The floating quick-nav pill on a laptop appears only after you scroll away from the top of the page, and hides again at the top. On phones it stays always visible.
- No search box yet (the reference had one); add when there is something worth searching.
