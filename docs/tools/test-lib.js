/* checks the templates list: every entry has a group, country packs, sharing, the things that come back. Run: node docs/tools/test-lib.js */
const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../../index.html","utf8").replace(/\r\n/g,"\n");
const a=src.indexOf("  var LIBRARY=["),b=src.indexOf("  var LV={noted:1");
const L=new Function("var localStorage={getItem:function(){return null}},navigator={language:'en-US'};"+src.slice(a,b)+";return {LIBRARY,libFlat,libCB,guessCountry}")();
const GROUPS=["c_health","c_medicine","c_checkups","c_fitness","c_hygiene","c_sleepfood","c_reading","c_learning","c_calm","c_creative","todo:work","todo:home","todo:personal"];
let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log("FAIL",m)}};
const all=L.libFlat("XX",true).concat(L.libFlat("IN",true),L.libFlat("GB",true),L.libFlat("US",true));
all.forEach(x=>ok(GROUPS.includes(x.grp),x.t.t+" has group "+x.grp));
const names=cc=>L.libFlat(cc,false).map(x=>x.t.t),find=(cc,t)=>L.libFlat(cc,true).map(x=>x.t.t).includes(t);
ok(names("IN").includes("PUC certificate"),"PUC shows in India");ok(!names("GB").includes("PUC certificate"),"PUC hidden outside India");
ok(names("GB").includes("MOT")&&!names("US").includes("MOT"),"MOT only in the UK");
ok(!names("IN").includes("Dentist")&&find("IN","Dentist"),"dentist not up front in India, found by search");
ok(names("US").includes("Dentist")&&names("XX").includes("Dentist"),"dentist up front elsewhere");
const sh=t=>L.libFlat("XX",true).find(x=>x.t.t===t).shared;
ok(sh("Gym")&&sh("Reading")&&sh("Meditation"),"fitness, reading, calm are shared");
ok(!sh("Weight")&&!sh("Brush teeth")&&!sh("Dentist")&&!sh("Mood out of 5"),"health, hygiene, checkups, private ones are never shared");
const cb=L.libCB();ok(cb.map(d=>d.key).join()==="dentist,eye,insurance,taxes,subs,checkup","things that come back keep their order: "+cb.map(d=>d.key));
ok(cb[0].cat==="c_checkups"&&cb[2].list==="home"&&cb[3].list==="personal","come-back groups: "+[cb[0].cat,cb[2].list,cb[3].list]);
[["Asia/Kolkata","en-US","IN"],["Asia/Calcutta","en-IN","IN"],["Europe/London","en-GB","GB"],["America/New_York","en-US","US"],["America/Toronto","en-US","CA"],["America/Chicago","en-CA","CA"],
 ["Australia/Sydney","en-US","AU"],["Asia/Singapore","en-GB","SG"],["Europe/Paris","en-IE","IE"],["","",""]].forEach(([tz,l,w])=>ok(L.guessCountry(tz,l)===w,"country "+tz+" "+l+" -> "+L.guessCountry(tz,l)+" want "+w));
console.log(bad?bad+" failed":"all templates checks pass ("+L.libFlat("XX",true).length+" in the shared list)");process.exit(bad?1:0);
