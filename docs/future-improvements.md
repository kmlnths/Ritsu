# To be considered for future improvements

Ideas and small problems noticed while using Ritsu. Nothing here is decided or built yet. Look at this list when planning the next round of work.

## 1. Typing a time: the number is not next to "at"

Noticed: 2026-09-29, on the phone (live site, v5).

**What happened.** Typing "Call at venky 5" saved a task called "Call at venky 5" with no time. Expected: "Call venky", today, 5:00pm.

**Why.** The sentence reader (`parseTyped` in `index.html`) only reads a plain number as a time when "at" sits right before it ("at 5"). This is on purpose, so "buy 5 apples" and "read chapter 5" are not read as 5 o'clock.

| Typed | Result today |
|---|---|
| Call venky at 5 | works: "Call venky", 5:00pm |
| call venky 5pm | works: "call venky", 5:00pm |
| call at 5 venky | works: "call venky", 5:00pm |
| Call at venky 5 | no time, title unchanged |
| call venky 5 | no time, title unchanged |

**Options discussed (none chosen yet).**
- A) Safe fix: if the sentence has "at" anywhere and ends in a number from 1 to 12, that number is the time. Fixes "Call at venky 5"; "call venky 5" stays as typed.
- B) Bolder fix: also read a number at the very end as a time after words like call, meet, ring. "read chapter 5" and "buy 5 apples" stay safe.

If built: add these sentences to `docs/tools/test-parse.js` and check all the old cases still pass.

## 2. The green + button shows on the Welcome and setup screens

Noticed: 2026-09-29, in real screenshots of the first-run flow (`docs/mockups/flow-first-open.png`).

**What happens.** The floating + sits on top of the setup content. On step 2 it covers the "Keep the house tidy" tile, and on step 3 it sits over the "Finish setup" button. It also appears on the Welcome screen, where there is nothing to add yet.

**Fix idea.** Hide `#fab` (and the bottom menu) while the Welcome or setup screens are showing. Small change, worth doing with the new setup step.

## 3. Creative group uses a stand-in icon

Noticed: 2026-09-29. The new Creative group (Mind) reuses the "pulse" icon because the icon set has no pencil or palette. Add a proper one when convenient.

## 4. Laptop sidebar lists every group under "Areas"

Noticed: 2026-09-30. On a laptop the left sidebar shows all 11 groups in one long list and the old sample "Home" area sits among them. Group them under Body, Mind and To-do. Listed as Phase A item 4 in PRODUCT.md.

## Logo and brand follow-ups (added 2026-10-02)

- **Home card tick.** The tick of five tiles lights as the day's things are done; unlit tiles are a soft outline, never red. At 5 of 5 the card says "a fine day". The story is in `docs/brand/README.md`.
- **Welcome draw-in.** On first open the tick draws itself tile by tile in about two seconds. Respect reduced motion (show it complete).
- **Week tick on the back of the Home card.** Seven tiles, Monday to Sunday, lighting as the week goes. Missed days stay a soft outline; no counts, no streaks.
- **Icon tweaks.** A faint rim on the dark icon so it holds on dark home screens; a slightly deeper start colour on the light icon (about #6FDDB2).
- **Storage keys.** Every key still starts `ritsu_`. A one-time move to `hiyori_` needs a migration step so nobody loses data.
- **Dead styles.** `.dayscroll*` and other unused CSS, plus the old tag code paths, are still in `index.html`.
- **Tryout with friends.** Show 5 friends the icon and the name for 5 seconds and ask what the app does. Also ask them to say "Hiyori" out loud.
