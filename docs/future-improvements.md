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
