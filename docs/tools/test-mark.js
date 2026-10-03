/* checks "How to mark it" (markOf): what older items read as. Run: node docs/tools/test-mark.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const line=n=>{const m=src.match(new RegExp("  function "+n+"\\(.*\\n"));if(!m)throw new Error("missing "+n);return m[0]};
function usesOz(){return false}
function isTracker(i){return i.body===true}   /* stand-in: a measure in a Body area */
const M=new Function("isTracker","usesOz",line("tapAmount")+line("tapCount")+line("markOf")+"return {markOf,tapAmount}")(isTracker,usesOz);
const cases=[
 ["a plain activity is Done",M.markOf({kind:"todo",repeatEvery:1,perDay:1}),"done"],
 ["brushing twice a day is still Done",M.markOf({kind:"todo",repeatEvery:1,perDay:2}),"done"],
 ["water in glasses is Goal",M.markOf({kind:"measure",unit:"glasses",target:8,body:true}),"goal"],
 ["water with one tap adds is Goal",M.markOf({kind:"measure",unit:"L",glass:0.25,target:2,body:true}),"goal"],
 ["weight in a Body area is Number",M.markOf({kind:"measure",unit:"kg",body:true}),"number"],
 ["pages read that counts is Goal",M.markOf({kind:"measure",unit:"pages",target:20}),"goal"],
 ["pages read, switched off, is Number",M.markOf({kind:"measure",unit:"pages",target:20,count:false}),"number"],
 ["a chosen mark wins",M.markOf({kind:"todo",repeatEvery:1,mark:"count"}),"count"],
 ["Number never taps, even in glasses",M.tapAmount({kind:"measure",unit:"glasses",mark:"number"}),0]
];
let bad=0;
for(const [t,got,want] of cases)if(got!==want){bad++;console.log("FAIL",t,"got",got,"want",want)}
console.log(bad?bad+" failed":"all "+cases.length+" pass");process.exit(bad?1:0);
