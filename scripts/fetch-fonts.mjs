import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const OUT = join(process.cwd(), 'videos', 'fonts');
mkdirSync(OUT, { recursive: true });

const REQUESTS = [
  { family: 'Anton', url: 'https://fonts.googleapis.com/css2?family=Anton&display=swap' },
  { family: 'Inter', url: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap' },
];

function parseCss(cssText) {
  const blocks = [];
  const re = /@font-face\s*{([^}]+)}/g;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    const body = m[1];
    blocks.push({
      family: (body.match(/font-family:\s*'([^']+)'/) || [])[1],
      weight: (body.match(/font-weight:\s*([^;]+)/) || [])[1],
      src: (body.match(/src:\s*url\((https:[^)]+)\)/) || [])[1],
      unicode: (body.match(/unicode-range:\s*([^;}]+)/) || [])[1],
    });
  }
  return blocks;
}

const results = [];
for (const req of REQUESTS) {
  const css = await (await fetch(req.url, { headers: { 'user-agent': UA } })).text();
  const blocks = parseCss(css);
  const latin = blocks.find((b) => b.family === req.family && b.unicode && b.unicode.startsWith('U+0000-00FF'));
  if (!latin) throw new Error('no latin block for ' + req.family);
  const w = (latin.weight || '400').replace(/[\s;]/g, '').replace(/100900/, 'var');
  const name = `${req.family.toLowerCase()}-latin-${w}.woff2`;
  const ext = join(OUT, name);
  const buf = Buffer.from(await (await fetch(latin.src)).arrayBuffer());
  writeFileSync(ext, buf);
  results.push({ name, sizeKB: Math.round(buf.length / 1024) });
  console.log('saved ' + name + ' (' + Math.round(buf.length / 1024) + ' KB, weight=' + latin.weight + ')');
}

console.log('\nFONTS: ' + JSON.stringify(results));