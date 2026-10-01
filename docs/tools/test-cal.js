/* checks the calendar file reader. Run: node docs/tools/test-cal.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const a=src.indexOf("  function calD(d){"),b=src.indexOf("  var _cal=null;");
const C=new Function(src.slice(a,b)+";return {icsParse,csvParse,calPlan}")();
let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log("FAIL",m)}};
const T0="2026-10-01";
const ics=["BEGIN:VCALENDAR",
 "BEGIN:VEVENT","SUMMARY:Team sync","DTSTART:20260105T100000","DTEND:20260105T110000","RRULE:FREQ=WEEKLY;BYDAY=MO","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Mum's birthday","DTSTART;VALUE=DATE:19601114","RRULE:FREQ=YEARLY","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Dentist","DTSTART:20261009T160000","DTEND:20261009T163000","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Old thing","DTSTART:20250101T090000","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Far away","DTSTART:20270601T090000","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Long title that is","  folded onto two lines","DTSTART:20261020","END:VEVENT",
 "BEGIN:VEVENT","SUMMARY:Ended series","DTSTART:20250101T090000","RRULE:FREQ=WEEKLY;UNTIL=20250301T000000Z","END:VEVENT",
 "END:VCALENDAR"].join("\r\n");
const P=C.calPlan(C.icsParse(ics),T0),by=t=>P.find(p=>p.title===t);
ok(by("Team sync")&&by("Team sync").freq==="weekly"&&by("Team sync").date==="2026-10-05"&&by("Team sync").time==="10:00"&&by("Team sync").dur===60,"weekly meeting moves to the next Monday with time and length: "+JSON.stringify(by("Team sync")));
ok(by("Mum's birthday")&&by("Mum's birthday").freq==="yearly"&&by("Mum's birthday").date==="2026-11-14","birthday becomes yearly, next 14 Nov: "+JSON.stringify(by("Mum's birthday")));
ok(by("Dentist")&&!by("Dentist").freq&&by("Dentist").date==="2026-10-09"&&by("Dentist").dur===30,"one-off appointment kept");
ok(!by("Old thing")&&!by("Far away")&&!by("Ended series"),"past, too far and finished series left out");
ok(by("Long title that is folded onto two lines"),"folded lines joined");
const csv='Subject,Start Date,Start Time,End Time\n"Call bank, quickly",10/02/2026,4:00 PM,4:30 PM\nPTA meeting,2026-10-15,18:00,19:00\nPast,01/01/2020,9:00 AM,\nDiwali,25/10/2026,,\n';
const Q=C.calPlan(C.csvParse(csv),T0),cq=t=>Q.find(p=>p.title===t);
ok(cq("Call bank, quickly")&&cq("Call bank, quickly").date==="2026-10-02"&&cq("Call bank, quickly").time==="16:00"&&cq("Call bank, quickly").dur===30,"csv with quotes and 12-hour time: "+JSON.stringify(cq("Call bank, quickly")));
ok(cq("PTA meeting")&&cq("PTA meeting").time==="18:00","csv with ISO date and 24-hour time");
ok(cq("Diwali")&&cq("Diwali").date==="2026-10-25"&&!cq("Diwali").time,"day-first date when the day is over 12");
ok(!cq("Past"),"old csv row left out");
console.log(bad?bad+" failed":"all calendar checks pass");process.exit(bad?1:0);
