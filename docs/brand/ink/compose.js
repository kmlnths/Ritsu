// Puts the traced ink + tick (trace.json) onto 1024 icon tiles. Run: node docs/brand/ink/compose.js
const fs = require('fs'), path = require('path');
const t = JSON.parse(fs.readFileSync(path.join(__dirname, 'trace.json')));
const [x0, y0, x1, y1] = [Math.min(t.inkBox[0], t.tickBox[0]), Math.min(t.inkBox[1], t.tickBox[1]), Math.max(t.inkBox[2], t.tickBox[2]), Math.max(t.inkBox[3], t.tickBox[3])];
const WIDTH = 640, s = WIDTH / (x1 - x0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
const SQ = 'M230 0H794C960 0 1024 64 1024 230V794C1024 960 960 1024 794 1024H230C64 1024 0 960 0 794V230C0 64 64 0 230 0Z';
const make = ({ bg, ink, tick, round = true, k = 1 }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">` +
  (round ? `<path d="${SQ}" fill="${bg}"/>` : `<rect width="1024" height="1024" fill="${bg}"/>`) +
  `<g transform="translate(512 512) scale(${(s * k).toFixed(4)}) translate(${-cx.toFixed(2)} ${-cy.toFixed(2)})">` +
  `<path d="${t.ink}" fill="${ink}" fill-rule="evenodd"/><path d="${t.tick}" fill="${tick}" fill-rule="evenodd"/></g></svg>`;
const LIGHT = { bg: '#F4F0E5', ink: '#0E0F12', tick: '#17A072' }, DARK = { bg: '#0A0B0D', ink: '#F4F0E5', tick: '#4ABD93' };
const out = (n, v) => fs.writeFileSync(path.join(__dirname, n), v);
out('hiyori-ink-light.svg', make(LIGHT)); out('hiyori-ink-dark.svg', make(DARK));
out('hiyori-ink-light-full.svg', make({ ...LIGHT, round: false })); out('hiyori-ink-dark-full.svg', make({ ...DARK, round: false }));
out('hiyori-ink-light-maskable.svg', make({ ...LIGHT, round: false, k: 0.8 }));
console.log('ok', s.toFixed(2));
