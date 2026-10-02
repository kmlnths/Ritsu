/* checks the rhythm rules: some days, times a week, moved days. Run: node docs/tools/test-rhythm.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const a=src.indexOf("  /* ===== rhythm (start)"),b=src.indexOf("  /* ===== rhythm (end)");
const TODAY="2026-10-07";   /* a Wednesday */
function fmt(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function today(){return TODAY}
function dCount(ds){return Math.round((new Date(ds+"T00:00:00")-new Date(TODAY+"T00:00:00"))/86400000)}
function addDaysStr(ds,n){const d=new Date(ds+"T00:00:00");d.setDate(d.getDate()+n);return fmt(d)}
function didOn(i,ds){return (i.counts||{})[ds]>0}
function repeatLabel(n){return n===1?"Daily":"Every "+n+" days"}
const R=new Function("addDaysStr","dCount","didOn","repeatLabel","today",src.slice(a,b)+";return {hasRhythm,planOn,planLabel,moveTargets}")(addDaysStr,dCount,didOn,repeatLabel,today);
const gym={days:[1,2,4,5],repeatEvery:1};                       /* Mon Tue Thu Fri */
const read={perWeek:2,repeatEvery:1,counts:{"2026-10-05":1}};    /* done Monday */
const eggs={repeatEvery:1,days:[1,3,5],moves:{"2026-10-07":"2026-10-08"}};   /* Wednesday moved to Thursday */
const cases=[
 ["gym on Wednesday is a rest day",R.planOn(gym,"2026-10-07"),false],
 ["gym on Thursday",R.planOn(gym,"2026-10-08"),true],
 ["reading shows today (1 of 2 done)",R.planOn(read,"2026-10-07"),true],
 ["a skipped past day never counts",R.planOn(read,"2026-10-06"),false],
 ["a done past day counts",R.planOn(read,"2026-10-05"),true],
 ["after 2 done it rests",R.planOn(Object.assign({},read,{counts:{"2026-10-05":1,"2026-10-06":1}}),"2026-10-08"),false],
 ["a new week starts fresh",R.planOn(Object.assign({},read,{counts:{"2026-10-05":1,"2026-10-06":1}}),"2026-10-12"),true],
 ["eggs moved off Wednesday",R.planOn(eggs,"2026-10-07"),false],
 ["eggs moved onto Thursday",R.planOn(eggs,"2026-10-08"),true],
 ["a daily item with a move has a rhythm",R.hasRhythm({repeatEvery:1,moves:{"2026-10-07":"2026-10-08"}}),true],
 ["a plain daily item has none",R.hasRhythm({repeatEvery:1}),false],
 ["label Mon Tue Thu Fri",R.planLabel(gym),"Mon, Tue, Thu, Fri"],
 ["label weekdays",R.planLabel({days:[5,1,2,3,4]}),"Weekdays"],
 ["gym Mon Tue Thu Fri, missed Wednesday? Wednesday is rest",JSON.stringify(R.moveTargets(gym)),"null"],
 ["weekdays, missed today: only the weekend is free",JSON.stringify(R.moveTargets({days:[1,2,3,4,5],repeatEvery:1})),JSON.stringify(["2026-10-10","2026-10-11"])],
 ["Wed and Fri: Thursday, Saturday to Tuesday, never Friday",JSON.stringify(R.moveTargets({days:[3,5],repeatEvery:1})),JSON.stringify(["2026-10-08","2026-10-10","2026-10-11","2026-10-12","2026-10-13"])],
 ["every day: tomorrow already has it",JSON.stringify(R.moveTargets({repeatEvery:1})),"[]"],
 ["done today, nothing to move",R.moveTargets({days:[3],repeatEvery:1,counts:{"2026-10-07":1}}),null],
 ["times a week never moves",R.moveTargets(read),null],
 ["every 3 days catches up by itself",R.moveTargets({repeatEvery:3}),null],
 ["a one-off task is not a plan",R.moveTargets({kind:"todo",repeatEvery:0}),null],
 ["label times a week",R.planLabel(read),"2 times a week"]
];
let bad=0;
/* a function here must not share its name with one elsewhere in the app (the later one would silently win) */
for(const m of src.slice(a,b).matchAll(/function (\w+)\(/g)){const n=src.split("function "+m[1]+"(").length-1;if(n!==1){bad++;console.log("FAIL",m[1],"is defined",n,"times in index.html")}}
for(const [t,got,want] of cases)if(got!==want){bad++;console.log("FAIL",t,"got",got,"want",want)}
console.log(bad?bad+" failed":"all "+cases.length+" pass");process.exit(bad?1:0);
