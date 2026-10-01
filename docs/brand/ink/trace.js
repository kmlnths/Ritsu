// Traces the chosen AI picture (icon 1A) into clean SVG paths: black ink and green tick, kept as two layers.
// Run: node docs/brand/ink/trace.js <source.png> <cropX> <cropY> <cropW> <cropH>
// Needs puppeteer-core (npm install puppeteer-core in a scratch folder, then run with NODE_PATH pointing at it).
// Writes trace.json next to this file: { ink, tick, bbox, colours } in source-picture pixels.
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const [src, cx, cy, cw, ch, tailX, tailY, eps = '1.2'] = process.argv.slice(2); // tailX/tailY: where the tick's tail should end (source px)

(async () => {
  const b64 = fs.readFileSync(src).toString('base64');
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage();
  const res = await page.evaluate(async (b64, cx, cy, cw, ch, tailX, tailY, eps) => {
    const S = 4, img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const W = cw * S, H = ch * S, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(img, cx, cy, cw, ch, 0, 0, W, H);
    const px = g.getImageData(0, 0, W, H).data, N = W * H;
    const cl = (v, a, b) => Math.max(a, Math.min(b, v));
    // fields, 1 = inside the shape
    const green = new Float32Array(N), ink = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = px[i * 4], gg = px[i * 4 + 1], b = px[i * 4 + 2], l = 0.3 * r + 0.59 * gg + 0.11 * b;
      green[i] = cl((gg - r) / 120, 0, 1);
      ink[i] = cl((190 - l) / 120, 0, 1);
    }
    // under the tick we do not know the ink: fill it from the nearest known pixels so there is no seam
    const unk = new Uint8Array(N); for (let i = 0; i < N; i++) unk[i] = green[i] > 0.25 ? 1 : 0;
    for (let k = 0; k < 3; k++) { const c = unk.slice(); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!unk[i] && (unk[i - 1] || unk[i + 1] || unk[i - W] || unk[i + W])) c[i] = 1; } unk.set(c); }
    let left = 0; for (let i = 0; i < N; i++) if (unk[i]) left++;
    while (left > 0) {
      const add = [];
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!unk[i]) continue; let s = 0, n = 0; for (const d of [-1, 1, -W, W, -W - 1, -W + 1, W - 1, W + 1]) if (!unk[i + d]) { s += ink[i + d]; n++; } if (n) add.push([i, s / n]); }
      if (!add.length) break;
      for (const [i, v] of add) { ink[i] = v; unk[i] = 0; left--; }
    }
    // trim the tick tail: cut across the stroke at (tailX, tailY), then soften the cut into a blunt brush lift
    if (tailX) {
      const dx = 126 / 160.9, dy = -100 / 160.9, R = 10 * S;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const u = (x / S + cx - tailX) * dx + (y / S + cy - tailY) * dy; if (u > 0) green[y * W + x] = Math.min(green[y * W + x], cl(0.5 - u * S / 6, 0, 1)); }
      const x0 = Math.max(0, Math.round((tailX - cx - 14) * S)), x1 = Math.min(W - 1, Math.round((tailX - cx + 6) * S)), y0 = Math.max(0, Math.round((tailY - cy - 14) * S)), y1 = Math.min(H - 1, Math.round((tailY - cy + 14) * S));
      for (let pass = 0; pass < 3; pass++) { const c = green.slice(); for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { let t = 0, n = 0; for (let j = -R / 2; j <= R / 2; j += 2) for (let i = -R / 2; i <= R / 2; i += 2) { const yy = y + j, xx = x + i; if (yy >= 0 && yy < H && xx >= 0 && xx < W) { t += c[yy * W + xx]; n++; } } green[y * W + x] = t / n; } }
    }
    // colours
    const at = (x, y) => { const i = (Math.round((y - +cy) * S) * W + Math.round((x - +cx) * S)) * 4; return [px[i], px[i + 1], px[i + 2]]; };
    // marching squares at 0.5
    const contours = (f) => {
      const segs = new Map(), key = (t, x, y) => t + x + ',' + y, pts = new Map();
      const P = (t, x, y, a, b) => { const k = key(t, x, y); if (!pts.has(k)) pts.set(k, t === 'h' ? [x + (0.5 - a) / (b - a), y] : [x, y + (0.5 - a) / (b - a)]); return k; };
      const link = (a, b) => { (segs.get(a) || segs.set(a, []).get(a)).push(b); (segs.get(b) || segs.set(b, []).get(b)).push(a); };
      for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) {
        const a = f[y * W + x], b = f[y * W + x + 1], c = f[(y + 1) * W + x + 1], d = f[(y + 1) * W + x];
        const m = (a > 0.5 ? 8 : 0) | (b > 0.5 ? 4 : 0) | (c > 0.5 ? 2 : 0) | (d > 0.5 ? 1 : 0);
        if (m === 0 || m === 15) continue;
        const T = () => P('h', x, y, a, b), R = () => P('v', x + 1, y, b, c), B = () => P('h', x, y + 1, d, c), L = () => P('v', x, y, a, d);
        const tab = { 1: [[L, B]], 2: [[B, R]], 3: [[L, R]], 4: [[T, R]], 5: [[L, T], [B, R]], 6: [[T, B]], 7: [[L, T]], 8: [[L, T]], 9: [[T, B]], 10: [[L, B], [T, R]], 11: [[T, R]], 12: [[L, R]], 13: [[B, R]], 14: [[L, B]] };
        for (const [p, q] of tab[m]) link(p(), q());
      }
      const seen = new Set(), loops = [];
      for (const [k0] of segs) {
        if (seen.has(k0)) continue;
        const loop = []; let prev = null, cur = k0;
        while (cur && !seen.has(cur)) { seen.add(cur); loop.push(pts.get(cur)); const nb = segs.get(cur); const nx = nb.find(n => n !== prev && !seen.has(n)); prev = cur; cur = nx; }
        if (loop.length > 8) loops.push(loop);
      }
      return loops;
    };
    const area = l => { let s = 0; for (let i = 0; i < l.length; i++) { const p = l[i], q = l[(i + 1) % l.length]; s += p[0] * q[1] - q[0] * p[1]; } return Math.abs(s / 2); };
    const dp = (p, e) => { if (p.length < 3) return p; const a = p[0], b = p[p.length - 1]; let md = 0, mi = 0; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; for (let i = 1; i < p.length - 1; i++) { const d = Math.abs(dy * p[i][0] - dx * p[i][1] + b[0] * a[1] - b[1] * a[0]) / L; if (d > md) { md = d; mi = i; } } if (md > e) return [...dp(p.slice(0, mi + 1), e).slice(0, -1), ...dp(p.slice(mi), e)]; return [a, b]; };
    const toPath = (loops, minArea) => loops.filter(l => area(l) > minArea).map(l => {
      const h = Math.floor(l.length / 2), s = [...dp([...l.slice(0, h + 1)], eps).slice(0, -1), ...dp([...l.slice(h), l[0]], eps).slice(0, -1)];
      const f = ([x, y]) => ((x / S + +cx).toFixed(2) + ' ' + (y / S + +cy).toFixed(2));
      let d = 'M' + f([(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2]);
      for (let i = 1; i <= s.length; i++) { const p = s[i % s.length], q = s[(i + 1) % s.length]; d += 'Q' + f(p) + ' ' + f([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]); }
      return d + 'Z';
    }).join('');
    const bbox = loops => { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const l of loops) for (const [x, y] of l) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a / S + +cx, b / S + +cy, c / S + +cx, d / S + +cy]; };
    const inkL = contours(ink).filter(l => area(l) > 200), tickL = contours(green).filter(l => area(l) > 200);
    return { ink: toPath(inkL, 200), tick: toPath(tickL, 200), inkBox: bbox(inkL), tickBox: bbox(tickL), paper: at(100, 150), inkCol: at(158, 190), tickCol: at(190, 245) };
  }, b64, +cx, +cy, +cw, +ch, +tailX || 0, +tailY || 0, +eps);
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'trace.json'), JSON.stringify(res));
  console.log(JSON.stringify({ inkBox: res.inkBox, tickBox: res.tickBox, paper: res.paper, inkCol: res.inkCol, tickCol: res.tickCol, inkLen: res.ink.length, tickLen: res.tick.length }));
})();
