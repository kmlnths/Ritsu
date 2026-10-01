// Builds an HTML mock of the Daywell ink icon on iPhone and Android home screens, every theme.
const fs = require('fs');
const t = JSON.parse(fs.readFileSync('C:/Users/Admin/Downloads/Ritsu-main/Ritsu/docs/brand/ink/trace.json'));
const [x0, y0, x1, y1] = [Math.min(t.inkBox[0], t.tickBox[0]), Math.min(t.inkBox[1], t.tickBox[1]), Math.max(t.inkBox[2], t.tickBox[2]), Math.max(t.inkBox[3], t.tickBox[3])];
const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
// glyph svg (transparent), k = size of mark inside the tile
let uid = 0;
// knock: one-colour modes cut a thin gap in the ink around the tick so the two shapes stay apart
const glyph = (ink, tick, k = 1, inkOp = 1, tickOp = 1, knock = ink === tick || tickOp < 1) => { const id = 'm' + (uid++); return `<svg viewBox="0 0 1024 1024" style="position:absolute;inset:0;width:100%;height:100%"><g transform="translate(512 512) scale(${(3.28 * k).toFixed(3)}) translate(${-cx} ${-cy})">${knock ? `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600"><rect width="600" height="600" fill="#fff"/><path d="${t.tick}" fill="#000" stroke="#000" stroke-width="7" stroke-linejoin="round"/></mask>` : ''}<path d="${t.ink}" fill="${ink}" fill-opacity="${inkOp}" fill-rule="evenodd"${knock ? ` mask="url(#${id})"` : ''}/><path d="${t.tick}" fill="${tick}" fill-opacity="${tickOp}" fill-rule="evenodd"/></g></svg>`; };

const MODES = {
  light: { bg: '#F4F0E5', g: () => glyph('#0E0F12', '#17A072') },
  dark: { bg: '#0A0B0D', g: () => glyph('#F4F0E5', '#4ABD93') },
  tinted: { bg: 'linear-gradient(180deg,#2a2416,#14110a)', g: () => glyph('#F2CF7A', '#F2CF7A', 1, 1, 0.62) },
  clear: { bg: 'glass', g: () => glyph('#fff', '#fff', 1, 0.95, 0.7) },
};
const tile = (mode, size, radius = '22.5%', k = 1, extra = '') => {
  const m = MODES[mode];
  const glass = m.bg === 'glass';
  const style = glass
    ? `background:linear-gradient(160deg,rgba(255,255,255,.34),rgba(255,255,255,.10));backdrop-filter:blur(14px) saturate(170%);-webkit-backdrop-filter:blur(14px) saturate(170%);box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 0 0 1px rgba(255,255,255,.28),0 6px 18px rgba(0,0,0,.18)`
    : `background:${m.bg};box-shadow:0 4px 14px rgba(0,0,0,.18)`;
  const g = k === 1 ? m.g() : m.g().replace(/scale\(([\d.]+)\)/, (_, s) => `scale(${(s * k).toFixed(3)})`);
  return `<div style="position:relative;width:${size}px;height:${size}px;border-radius:${radius};overflow:hidden;${style};${extra}">${g}</div>`;
};

// placeholder apps: plain tiles with simple shapes, no real brands
const PH = ['#5B8DEF', '#F2A65A', '#7BC67E', '#E06C75', '#A78BFA', '#4FC3F7', '#F6D365', '#90A4AE'];
const shapes = ['<circle cx="50" cy="50" r="20"/>', '<rect x="30" y="30" width="40" height="40" rx="8"/>', '<path d="M50 28 74 70H26Z"/>', '<rect x="26" y="44" width="48" height="12" rx="6"/>'];
const ph = (mode, i, size, radius = '22.5%') => {
  const c = PH[i % PH.length], s = shapes[i % shapes.length];
  let bg, fill, op = 1, glass = false;
  if (mode === 'light') { bg = c; fill = '#fff'; }
  else if (mode === 'dark') { bg = '#16171a'; fill = c; }
  else if (mode === 'tinted') { bg = 'linear-gradient(180deg,#2a2416,#14110a)'; fill = '#F2CF7A'; }
  else if (mode === 'clear') { glass = true; fill = '#fff'; op = .9; }
  else if (mode === 'mlight') { bg = '#D9E6D2'; fill = '#24402a'; }
  else if (mode === 'mdark') { bg = '#1f2b22'; fill = '#BFE3C4'; }
  const st = glass ? 'background:linear-gradient(160deg,rgba(255,255,255,.34),rgba(255,255,255,.10));backdrop-filter:blur(14px) saturate(170%);box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 0 0 1px rgba(255,255,255,.28)' : `background:${bg}`;
  return `<div style="width:${size}px;height:${size}px;border-radius:${radius};${st};display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="${fill}" fill-opacity="${op}">${s}</svg></div>`;
};
const NAMES = ['Weather', 'Notes', 'Music', 'Maps', 'Camera', 'Clock', 'Wallet', 'Files', 'Podcasts', 'Books', 'Health', 'Mail', 'Fitness', 'News', 'Calendar', 'Photos'];

const iphone = (mode, label, wall, txt) => {
  const S = 62, cells = [];
  for (let i = 0; i < 16; i++) {
    const icon = i === 5 ? tile(mode, S) : ph(mode, i, S);
    const name = i === 5 ? 'Daywell' : NAMES[i];
    cells.push(`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${icon}<div style="font-size:11.5px;color:${txt};text-shadow:0 1px 2px rgba(0,0,0,.25)">${name}</div></div>`);
  }
  const dock = [0, 1, 2, 3].map(i => i === 1 ? tile(mode, S) : ph(mode, i + 8, S)).join('');
  return `<div style="text-align:center"><div style="width:360px;height:740px;border-radius:56px;padding:12px;background:#1b1b1d;box-shadow:0 20px 50px rgba(0,0,0,.35)">
  <div style="position:relative;width:100%;height:100%;border-radius:46px;overflow:hidden;background:${wall}">
   <div style="position:absolute;top:11px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:20px;background:#000"></div>
   <div style="position:absolute;top:18px;left:34px;font:600 15px system-ui;color:${txt}">9:41</div>
   <div style="position:absolute;top:78px;left:0;right:0;display:grid;grid-template-columns:repeat(4,1fr);row-gap:20px;padding:0 14px">${cells.join('')}</div>
   <div style="position:absolute;bottom:14px;left:12px;right:12px;height:92px;border-radius:34px;background:rgba(255,255,255,.18);backdrop-filter:blur(20px) saturate(160%);box-shadow:inset 0 1px 0 rgba(255,255,255,.4);display:flex;justify-content:space-around;align-items:center">${dock}</div>
  </div></div><div style="margin-top:14px;font:600 16px system-ui">${label}</div></div>`;
};

// Android: adaptive icon in a launcher shape. Mark sits in the 66% safe zone.
const SHAPES = { Circle: '50%', Squircle: '32%', 'Rounded square': '18%', Teardrop: '50% 50% 50% 14%' };
const aTile = (mode, size, radius) => {
  if (mode === 'mlight') return `<div style="position:relative;width:${size}px;height:${size}px;border-radius:${radius};background:#D9E6D2;overflow:hidden">${glyph('#24402a', '#24402a', 0.72)}</div>`;
  if (mode === 'mdark') return `<div style="position:relative;width:${size}px;height:${size}px;border-radius:${radius};background:#1f2b22;overflow:hidden">${glyph('#BFE3C4', '#BFE3C4', 0.72)}</div>`;
  return tile(mode, size, radius, 0.8);
};
const android = (mode, label, wall, txt, shape = '50%') => {
  const S = 58, cells = [];
  for (let i = 0; i < 12; i++) {
    const icon = i === 6 ? aTile(mode, S, shape) : ph(mode === 'light' ? 'light' : mode === 'dark' ? 'dark' : mode, i + 3, S, shape);
    const name = i === 6 ? 'Daywell' : NAMES[i + 3];
    cells.push(`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${icon}<div style="font:12px Roboto,system-ui;color:${txt}">${name}</div></div>`);
  }
  const dock = [0, 1, 2, 3].map(i => i === 2 ? aTile(mode, S, shape) : ph(mode === 'light' ? 'light' : mode === 'dark' ? 'dark' : mode, i, S, shape)).join('');
  const dark = mode === 'dark' || mode === 'mdark';
  return `<div style="text-align:center"><div style="width:350px;height:740px;border-radius:40px;padding:10px;background:#202124;box-shadow:0 20px 50px rgba(0,0,0,.35)">
  <div style="position:relative;width:100%;height:100%;border-radius:32px;overflow:hidden;background:${wall}">
   <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:14px;height:14px;border-radius:50%;background:#000"></div>
   <div style="position:absolute;top:12px;left:24px;font:500 14px Roboto,system-ui;color:${txt}">9:41</div>
   <div style="position:absolute;top:56px;left:18px;right:18px;font:400 44px Roboto,system-ui;color:${txt};text-align:left">Thu, Oct 2</div>
   <div style="position:absolute;top:290px;left:0;right:0;display:grid;grid-template-columns:repeat(4,1fr);row-gap:22px;padding:0 10px">${cells.join('')}</div>
   <div style="position:absolute;bottom:84px;left:18px;right:18px;display:flex;justify-content:space-around">${dock}</div>
   <div style="position:absolute;bottom:18px;left:18px;right:18px;height:50px;border-radius:25px;background:${dark ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.75)'}"></div>
  </div></div><div style="margin-top:14px;font:600 16px system-ui">${label}</div></div>`;
};

const shapeRow = (mode, title) => `<div><div style="font:600 15px system-ui;margin:0 0 10px">${title}</div><div style="display:flex;gap:22px">${Object.entries(SHAPES).map(([n, r]) => `<div style="text-align:center">${aTile(mode, 96, r)}<div style="font:12px system-ui;margin-top:6px;color:#555">${n}</div></div>`).join('')}</div></div>`;

const WL = 'radial-gradient(120% 80% at 20% 10%,#f6d9c4 0%,#d9e4f2 45%,#b8c9e6 100%)';
const WD = 'radial-gradient(120% 80% at 70% 0%,#2b3a55 0%,#121826 55%,#07090e 100%)';
const WT = 'radial-gradient(120% 80% at 50% 0%,#3b3220 0%,#16120b 70%)';
const WC = 'linear-gradient(160deg,#4a7bd8 0%,#8a5bd6 45%,#e0799b 100%)';
const AW = 'linear-gradient(170deg,#e8efe3,#cfdccb)';
const AWD = 'linear-gradient(170deg,#1a221c,#0c100d)';

const html = `<body style="margin:0;padding:40px 48px;background:#ececef;font-family:system-ui;width:1840px;box-sizing:border-box;color:#111">
<h1 style="margin:0;font-size:30px">Daywell icon on phones</h1>
<div style="color:#666;margin:6px 0 30px">Mockups only: the phones, wallpapers and other apps are drawn for illustration. Other app tiles are placeholders, not real apps.</div>
<h2 style="font-size:20px;margin:0 0 18px">iPhone (iOS 26): the four icon looks you can choose in Settings</h2>
<div style="display:flex;gap:44px">
${iphone('light', 'Default (light)', WL, '#111')}
${iphone('dark', 'Dark', WD, '#fff')}
${iphone('tinted', 'Tinted (one colour)', WT, '#fff')}
${iphone('clear', 'Clear (glass)', WC, '#fff')}
</div>
<h2 style="font-size:20px;margin:48px 0 18px">Android: normal icons and Themed icons (Material You)</h2>
<div style="display:flex;gap:40px;align-items:flex-start">
${android('light', 'Default, circle', AW, '#1b1b1b', '50%')}
${android('mlight', 'Themed icons, light', AW, '#1b1b1b', '50%')}
${android('mdark', 'Themed icons, dark', AWD, '#e8f0e8', '50%')}
<div style="display:flex;flex-direction:column;gap:34px;padding-top:8px">
${shapeRow('light', 'Phone makers cut the icon into different shapes')}
${shapeRow('dark', 'Dark version in the same shapes')}
${shapeRow('mlight', 'Themed (takes the colour of the wallpaper)')}
${shapeRow('mdark', 'Themed, dark mode')}
</div></div>
</body>`;
fs.writeFileSync(__dirname + '/renders/mockups.html', html); // then screenshot it with render_png.py
console.log('ok');
