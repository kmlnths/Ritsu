/* checks the words people see against the voice rules in DESIGN.md (section 9). Run: node docs/tools/test-copy.js
   Fails on banned words; lists overlong lines as a to-do (messages should be about 12 words). */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const BANNED=/\b(whatever|stuff|gonna|kinda|super|actually|discipline|must|danger|overdue|comes? back|oopsie)\b/i;
const lit=/"((?:[^"\\\n]|\\.){6,})"|'((?:[^'\\\n]|\\.){6,})'|>([^<>{}\n]{6,})</g;
let bad=0,long=0;
src.split("\n").forEach((ln,ix)=>{
  if(/^\s*(\/\/|\/\*|\*)/.test(ln))return;
  const code=ln.replace(/\/\*.*?\*\//g,"");let m;
  while((m=lit.exec(code))){
    const t=(m[1]||m[2]||m[3]||"").trim();
    if(!/[a-z]{3,}\s+[a-z]{2,}/i.test(t)||/[<>{}=;]|function|https?:|\\b|\(\?/.test(t))continue;   /* sentences only, not code or regexes */
    if(BANNED.test(t)){bad++;console.log("BANNED  line "+(ix+1)+": "+t.slice(0,110))}
    else if(t.length>110){long++;if(process.argv[2]==="-v")console.log("LONG    line "+(ix+1)+": "+t.slice(0,110)+"...")}
  }
});
/* the deck: 200 deals from each rotating deck; every round uses each line once, never the same line twice in a row */
const da=src.indexOf("  function deck(name,lines){"),db=src.indexOf("  function winLine(");
const mem={},D=new Function("localStorage",src.slice(da,db)+";return {deck,DONE_LINES,ALLDONE_LINES,REMIND_LINES,BACK_LINES}")({getItem:k=>mem[k]||null,setItem:(k,v)=>{mem[k]=v}});
const la=src.indexOf("  var LOW_LINES=["),LOW=new Function(src.slice(la,src.indexOf("\n",la))+";return LOW_LINES")();
[["done",D.DONE_LINES],["alldone",D.ALLDONE_LINES],["remind",D.REMIND_LINES],["back",D.BACK_LINES],["under",LOW]].forEach(([nm,L])=>{
  if(L.length<15){bad++;console.log("DECK    "+nm+" has "+L.length+" lines, needs 15 or more")}
  const seen=[];for(let i=0;i<L.length*6;i++)seen.push(D.deck("t_"+nm,L));
  for(let r=0;r<6;r++){const round=seen.slice(r*L.length,(r+1)*L.length);if(new Set(round).size!==L.length){bad++;console.log("DECK    "+nm+" round "+r+" repeats a line")}}
  for(let i=1;i<seen.length;i++)if(seen[i]===seen[i-1]){bad++;console.log("DECK    "+nm+" shows the same line twice in a row");break}
});
console.log(bad?bad+" banned word(s)":"no banned words"+(long?" ("+long+" long lines to shorten, -v to list)":""));
process.exit(bad?1:0);
