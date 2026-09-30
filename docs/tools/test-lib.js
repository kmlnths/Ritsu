/* checks the templates list: every entry has a group, country packs, sharing, the things that come back. Run: node docs/tools/test-lib.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const a=src.indexOf("  var LIBRARY=["),b=src.indexOf("  var LV={noted:1");
const L=new Function("var localStorage={getItem:function(){return null}},navigator={language:'en-US'};"+src.slice(a,b)+";return {LIBRARY,libFlat,libCB,guessCountry,tplGuess,TPL_WORDS}")();
const GROUPS=["c_health","c_medicine","c_checkups","c_fitness","c_hygiene","c_sleepfood","c_reading","c_learning","c_calm","c_creative","todo:work","todo:home","todo:personal"];
let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log("FAIL",m)}};
const all=L.libFlat("XX",true).concat(L.libFlat("IN",true),L.libFlat("GB",true),L.libFlat("US",true));
all.forEach(x=>ok(GROUPS.includes(x.grp),x.t.t+" has group "+x.grp));
const names=cc=>L.libFlat(cc,false).map(x=>x.t.t),find=(cc,t)=>L.libFlat(cc,true).map(x=>x.t.t).includes(t);
ok(names("IN").includes("PUC certificate"),"PUC shows in India");ok(!names("GB").includes("PUC certificate"),"PUC hidden outside India");
ok(names("GB").includes("MOT")&&!names("US").includes("MOT"),"MOT only in the UK");
ok(names("IN").includes("Dentist"),"dentist offered in India too (setup asks instead of guessing)");
ok(names("US").includes("Dentist")&&names("XX").includes("Dentist"),"dentist up front elsewhere");
const sh=t=>L.libFlat("XX",true).find(x=>x.t.t===t).shared;
ok(sh("Gym")&&sh("Reading")&&sh("Meditation"),"fitness, reading, calm are shared");
ok(!sh("Weight")&&!sh("Brush teeth")&&!sh("Dentist")&&!sh("Mood out of 5"),"health, hygiene, checkups, private ones are never shared");
const cb=L.libCB();ok(cb.slice(0,6).map(d=>d.key).join()==="dentist,eye,insurance,taxes,subs,checkup","the first six things that come back keep their order: "+cb.map(d=>d.key));
ok(new Set(cb.map(d=>d.key)).size===cb.length,"come-back keys are unique");
cb.forEach(d=>ok(d.every>0&&(d.rule==="fixed"||d.rule==="since")&&(d.kind==="visit"?d.book:d.act),d.key+" is a complete come-back entry"));
/* life tiles: every key and pick points at a real come-back entry (or a habit), country specs parse */
const la=src.indexOf("  var LIFE_TILES=["),lb=src.indexOf("  function lifeTile(");
const LT=new Function(src.slice(la,lb)+";return {LIFE_TILES,lifeFits,lifeKey}")();
const keys=new Set(cb.map(d=>d.key));
ok(LT.LIFE_TILES.length===10,"ten life tiles");
LT.LIFE_TILES.forEach(x=>{const specs=(x.keys||[]).concat((x.pick||[]).map(p=>p[0]));ok(specs.length>0,x.k+" has something inside");
  specs.forEach(sp=>{const k=LT.lifeKey(sp);ok(k.startsWith("h:")?/^h:[^:]+:\d+$/.test(k):keys.has(k),x.k+": "+sp+" exists")})});
ok(LT.lifeFits("puc@IN","IN")&&!LT.lifeFits("puc@IN","GB")&&LT.lifeFits("homeins@!IN","GB")&&!LT.lifeFits("homeins@!IN","IN")&&LT.lifeFits("taxes","XX"),"country specs");
ok(cb[0].cat==="c_checkups"&&cb[2].list==="home"&&cb[3].list==="personal","come-back groups: "+[cb[0].cat,cb[2].list,cb[3].list]);
[["Asia/Kolkata","en-US","IN"],["Asia/Calcutta","en-IN","IN"],["Europe/London","en-GB","GB"],["America/New_York","en-US","US"],["America/Toronto","en-US","CA"],["America/Chicago","en-CA","CA"],
 ["Australia/Sydney","en-US","AU"],["Asia/Singapore","en-GB","SG"],["Europe/Paris","en-IE","IE"],["","",""]].forEach(([tz,l,w])=>ok(L.guessCountry(tz,l)===w,"country "+tz+" "+l+" -> "+L.guessCountry(tz,l)+" want "+w));
/* typing suggestions: [text, country, expected key or null] */
[["dentist","IN","dentist"],["book dentist","US","dentist"],["kids dentist","GB","kdent"],["son's dentist","IN","kdent"],["eye test","US","eye"],["optician","GB","eye"],
 ["blood test","IN","blood"],["annual check-up","US","checkup"],["mum's checkup","GB","pcheck"],["renew car insurance","IN","insurance"],["bike insurance","IN","insurance"],
 ["health insurance","IN","premium"],["home insurance","GB","homeins"],["puc","IN","puc"],["puc","GB",null],["MOT","GB","mot"],["mot","US",null],["book gas","IN","gas"],
 ["file taxes","US","taxes"],["advance tax","IN","qtax"],["school fees","IN","sfees"],["tuition fees","IN","fees"],["passport","IN","passport"],["take dog to vet","AU","vet"],
 ["life certificate","IN","lifecert"],["call alex","IN",null],["buy milk","GB",null],["dental floss","US",null]
].forEach(([tx,cc,want])=>{const d=L.tplGuess(tx,cc,cb),got=d?d.key:null;ok(got===want,"typing "+JSON.stringify(tx)+" in "+cc+" -> "+got+" want "+want)});
L.TPL_WORDS.forEach(w=>ok(keys.has(w[0]),"word list key "+w[0]+" exists"));
console.log(bad?bad+" failed":"all templates checks pass ("+L.libFlat("XX",true).length+" in the shared list)");process.exit(bad?1:0);
