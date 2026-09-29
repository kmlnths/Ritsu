/* checks the word list that files a typed item into its card and group. Run: node docs/tools/test-group.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8");
const a=src.indexOf("  var TY_GROUPS="),b=src.indexOf("  /* run on every keystroke in the add sheet");
const tyGroup=new Function(src.slice(a,b)+";return tyGroup")();
const cases=[
 ["dentist tomorrow 4pm",0,"Body, Checkups"],["book eye test",0,"Body, Checkups"],["buy vitamins",0,"Body, Medicine"],
 ["gym at 6pm",0,"Body, Fitness"],["brush teeth",0,"Body, Hygiene and care"],["drink water",0,"Body, Health"],["stomach pain",0,"Body, Health"],
 ["read 20 pages",0,"Mind, Reading"],["meditate 10 mins",0,"Mind, Calm"],["spanish lesson",0,"Mind, Learning"],["practise guitar",0,"Mind, Creative"],
 ["send the report friday",0,"To-do, Work"],["pay rent",0,"To-do, Home"],["renew car insurance",0,"To-do, Home"],["renew passport",0,"To-do, Personal"],
 ["call alex",0,null],["buy 5 apples",0,null],["Morning run",0,"Body, Fitness"],
 ["parents teacher meeting friday",0,"To-do, Work"],["parents teacher meeting friday",1,"To-do, Family"],["kid's vaccination",1,"To-do, Family"],["kid's vaccination",0,"Body, Checkups"]
];
let bad=0;for(const [t,f,want] of cases){const g=tyGroup(t,!!f),got=g?g.label:null;if(got!==want){bad++;console.log("FAIL",JSON.stringify(t),"family="+f,"got",got,"want",want)}}
console.log(bad?bad+" failed":"all "+cases.length+" pass");process.exit(bad?1:0);
