const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8");
const a=src.indexOf("  var TY_DOW"),b=src.indexOf("  /* ===== v4: one add sheet");
const {parseTyped,tyTitle}=new Function(src.slice(a,b)+";return {parseTyped,tyTitle}")();
const now=new Date(2026,8,21,9,40,0); /* Monday 21 Sep 2026, 9:40am */
const cases=[
 ["call alex tom at 5 in the evening","call alex","2026-09-22","17:00",null],
 ["meeting at 12pm for an hour","meeting",null,"12:00",60],
 ["dentist friday 10am","dentist","2026-09-25","10:00",null],
 ["gym in 2 hours","gym","2026-09-21","11:40",null],
 ["read 20 pages","read 20 pages",null,null,null],
 ["Morning run","Morning run",null,null,null],
 ["run in the morning","run",null,"09:00",null],
 ["pay rent on the 1st","pay rent","2026-10-01",null,null],
 ["lunch with priya at 1","lunch with priya",null,"13:00",null],
 ["call at 9","call",null,"21:00",null],
 ["buy stamps tomorrow","buy stamps","2026-09-22",null,null],
 ["submit report by friday 5pm","submit report","2026-09-25","17:00",null],
 ["day after tom at 3pm meeting","meeting","2026-09-23","15:00",null],
 ["meet at 5th street tomorrow","meet at 5th street","2026-09-22",null,null],
 ["yoga on sat","yoga","2026-09-26",null,null],
 ["buy 5 apples","buy 5 apples",null,null,null],
 ["dinner 7:30pm tonight","dinner","2026-09-21","19:30",null],
 ["call mom at 5 pm tomorrow","call mom","2026-09-22","17:00",null],
 ["sept 25 dentist","dentist","2026-09-25",null,null],
 ["standup tomorrow at 9:30 for 15 min","standup","2026-09-22","09:30",15],
 ["tom morning gym","gym","2026-09-22","09:00",null],
 ["wait for 5 minutes","wait for 5 minutes",null,null,5],
 ["read 5 marketing books","read 5 marketing books",null,null,null],
 ["call plumber","call plumber",null,null,null],
 ["Call the plumber tomorrow","Call the plumber","2026-09-22",null,null],
 ["gift for tom","gift","2026-09-22",null,null],
 ["walk on tom","walk","2026-09-22",null,null],
 ["dentist next friday at 4pm","dentist","2026-09-25","16:00",null],
 ["team sync at noon for 30 min","team sync",null,"12:00",30],
 ["review in 3 days","review","2026-09-24",null,null],
 ["review 25th march","review","2027-03-25",null,null],
];
let bad=0;
for(const [t,title,date,time,dur] of cases){
  const r=parseTyped(t,now);const use={date:1,time:1,dur:!!r.time};
  const got={title:tyTitle(t,r.parts,use),date:r.date,time:r.time,dur:r.dur};
  const ok=got.title===title&&got.date===date&&got.time===time&&got.dur===dur;
  if(!ok){bad++;console.log("FAIL",JSON.stringify(t),"\n   want",JSON.stringify({title,date,time,dur}),"\n   got ",JSON.stringify(got))}
}
console.log(bad?bad+" failing of "+cases.length:"all "+cases.length+" pass");
