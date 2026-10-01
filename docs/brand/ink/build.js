// Builds the Hiyori ink icon (an ink 日 with a short green tick) as plain SVG paths.
// Run: node docs/brand/ink/build.js   (writes SVGs next to this file)
// Change the numbers in STROKES / TICK and run again. Seeded, so the same numbers give the same picture.
const fs = require('fs'), path = require('path');

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const lerp = (a, b, t) => a + (b - a) * t;

// Smooth centreline through points (Catmull-Rom), sampled N times.
function centre(pts, N) {
  const out = [], seg = pts.length - 1;
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * seg, k = Math.min(Math.floor(u), seg - 1), t = u - k;
    const p0 = pts[Math.max(k - 1, 0)], p1 = pts[k], p2 = pts[k + 1], p3 = pts[Math.min(k + 2, seg)];
    const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}

// A stroke = centreline + width at chosen spots (w: [[t,width],...]) + edge wobble.
function stroke({ pts, w, wobble = 2.2, N = 64, capRound = 0.5 }) {
  const c = centre(pts, N);
  const width = t => { for (let i = 0; i < w.length - 1; i++) if (t <= w[i + 1][0]) return lerp(w[i][1], w[i + 1][1], (t - w[i][0]) / (w[i + 1][0] - w[i][0])); return w[w.length - 1][1]; };
  const L = [], R = [];
  const nz = () => { const K = 9, k = []; for (let i = 0; i <= K; i++) k.push((rnd() - 0.5) * 2 * wobble); return Array.from({ length: N + 1 }, (_, i) => { const u = (i / N) * K, j = Math.min(Math.floor(u), K - 1); return lerp(k[j], k[j + 1], (u - j) * (u - j) * (3 - 2 * (u - j))); }); };
  const nl = nz(), nr = nz();
  for (let i = 0; i <= N; i++) {
    const a = c[Math.max(i - 1, 0)], b = c[Math.min(i + 1, N)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
    const h = width(i / N) / 2, nx = -dy, ny = dx;
    L.push([c[i][0] + nx * (h + nl[i]), c[i][1] + ny * (h + nl[i])]);
    R.push([c[i][0] - nx * (h + nr[i]), c[i][1] - ny * (h + nr[i])]);
  }
  // end caps: a small bulge so the ends are soft, not cut
  const cap = (p, q, dirx, diry) => { const mx = (p[0] + q[0]) / 2 + dirx * Math.hypot(p[0] - q[0], p[1] - q[1]) * capRound * 0.5, my = (p[1] + q[1]) / 2 + diry * Math.hypot(p[0] - q[0], p[1] - q[1]) * capRound * 0.5; return [mx, my]; };
  const d0 = [c[0][0] - c[1][0], c[0][1] - c[1][1]], dn = [c[N][0] - c[N - 1][0], c[N][1] - c[N - 1][1]];
  const n0 = Math.hypot(...d0), nn = Math.hypot(...dn);
  const tail = cap(L[N], R[N], dn[0] / nn, dn[1] / nn), head = cap(R[0], L[0], d0[0] / n0, d0[1] / n0);
  const ring = [...L, tail, ...R.slice().reverse(), head];
  // smooth closed path through midpoints
  const f = n => n.toFixed(1);
  let d = `M${f((ring[0][0] + ring[1][0]) / 2)} ${f((ring[0][1] + ring[1][1]) / 2)}`;
  for (let i = 1; i <= ring.length; i++) {
    const p = ring[i % ring.length], q = ring[(i + 1) % ring.length];
    d += `Q${f(p[0])} ${f(p[1])} ${f((p[0] + q[0]) / 2)} ${f((p[1] + q[1]) / 2)}`;
  }
  return d + 'Z';
}

// ---- The 日: four strokes on a 1024 canvas ----
const INK = [
  // left side, heavy press at the top
  { pts: [[312, 214], [304, 400], [300, 610], [290, 808]], w: [[0, 96], [0.12, 84], [0.7, 66], [1, 54]], wobble: 4 },
  // top bar turning down the right side
  { pts: [[306, 236], [520, 222], [716, 224], [738, 262], [734, 520], [722, 802]], w: [[0, 62], [0.4, 56], [0.58, 70], [0.8, 58], [1, 48]], wobble: 3.5 },
  // middle bar
  { pts: [[310, 516], [510, 504], [728, 506]], w: [[0, 50], [0.6, 44], [1, 40]], wobble: 3 },
  // bottom bar, ends flare
  { pts: [[258, 820], [500, 804], [774, 794]], w: [[0, 58], [0.5, 50], [1, 76]], wobble: 3.5 },
];

// ---- The tick: short, blunt, near-straight long arm (not a swoosh) ----
const TICK = { pts: [[376, 560], [440, 636], [480, 684], [514, 658], [584, 574], [676, 456], [782, 354]], w: [[0, 66], [0.3, 84], [0.42, 88], [0.8, 72], [1, 56]], wobble: 1.2, capRound: 0.7, N: 90 };

// squash the 日 a little (90% tall) so it reads as a character, not a window
INK.forEach(k => k.pts = k.pts.map(([x, y]) => [x, 250 + (y - 214) * 0.9]));
const inkPaths = INK.map(stroke).map(d => `<path d="${d}"/>`).join('');
const tickPath = `<path d="${stroke(TICK)}"/>`;

const SQ = 'M230 0H794C960 0 1024 64 1024 230V794C1024 960 960 1024 794 1024H230C64 1024 0 960 0 794V230C0 64 64 0 230 0Z'; // phone-style rounded square for previews

const make = ({ bg, ink, tick, round = true, scale = 1 }) => {
  const g = scale === 1 ? '' : ` transform="translate(512 512) scale(${scale}) translate(-512 -512)"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">` +
    (round ? `<path d="${SQ}" fill="${bg}"/>` : `<rect width="1024" height="1024" fill="${bg}"/>`) +
    `<g${g}><g fill="${ink}">${inkPaths}</g><g fill="${tick}">${tickPath}</g></g></svg>`;
};

const out = (n, s) => fs.writeFileSync(path.join(__dirname, n), s);
const LIGHT = { bg: '#F3EFE4', ink: '#17181B', tick: '#1A9A6E' };
const DARK = { bg: '#0A0B0D', ink: '#F3EFE4', tick: '#4ABD93' };
out('hiyori-ink-light.svg', make(LIGHT));
out('hiyori-ink-dark.svg', make(DARK));
out('hiyori-ink-light-full.svg', make({ ...LIGHT, round: false }));   // square corners, for the phone to round itself
out('hiyori-ink-dark-full.svg', make({ ...DARK, round: false }));
out('hiyori-ink-light-maskable.svg', make({ ...LIGHT, round: false, scale: 0.8 }));
console.log('done');
