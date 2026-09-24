const fs=require("fs"),cp=require("child_process");
const s=fs.readFileSync("C:/Users/Admin/Downloads/Ritsu-main/Ritsu/index.html","utf8");
const m=[...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const big=m.sort((a,b)=>b.length-a.length)[0];fs.writeFileSync("main-check.js",big);
const r=cp.spawnSync("node",["--check","main-check.js"],{encoding:"utf8"});
console.log(r.status===0?"syntax ok ("+big.length+" chars)":r.stderr);
console.log("em dashes:",(s.match(/\u2014/g)||[]).length,"en dashes:",(s.match(/\u2013/g)||[]).length);
