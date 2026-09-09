import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const OUT_DIR = join(process.cwd(), 'videos-mp4');
const W = 1080, H = 1920;

function frameStats(file, t) {
  const buf = spawnSync(ffmpegPath, [
    '-y', '-ss', String(t), '-i', file,
    '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-',
  ], { maxBuffer: 100 * 1024 * 1024 });
  if (buf.status !== 0) return null;
  const data = buf.stdout;
  const expected = W * H * 3;
  if (data.length !== expected) return { error: 'bad size ' + data.length + ' vs ' + expected };

  let green = 0, white = 0, midWhite = 0;
  let sampleOk = false;
  for (let y = 300; y < 1450; y += 3) {
    for (let x = 60; x < 1020; x += 3) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (g > r * 1.6 && g > b * 1.4 && g > 80) green++;
      if (r > 225 && g > 225 && b > 225) white++;
      if (r > 190 && g > 190 && b > 190) midWhite++;
    }
  }
  return { green, white, midWhite };
}

const videos = readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp4')).sort();
let allOk = true;
const rows = [];
for (const v of videos) {
  const file = join(OUT_DIR, v);
  const s2 = frameStats(file, 3);
  const s7 = frameStats(file, 7.5);

  const isComparar = v.includes('04-onp');
  const minGreen = isComparar ? 800 : 150;
  const minWhite = isComparar ? 220 : 400;

  const hasResult = s7 && s7.green >= minGreen;
  const hasText = s7 && s7.midWhite >= minWhite;
  const earlyNoResult = !s2 || s2.green < 60;
  const ok = hasResult && hasText && earlyNoResult;
  if (!ok) allOk = false;

  rows.push({
    video: v,
    green3s: s2 ? s2.green : 'ERR',
    green7s: s7 ? s7.green : 'ERR',
    white7s: s7 ? s7.midWhite : 'ERR',
    cardVerde: hasResult ? 'OK' : 'FALTA',
    texto: hasText ? 'OK' : 'FALTA',
    timing: earlyNoResult ? 'OK' : 'MUY TEMPRANO',
    estado: ok ? 'PASA' : 'REVISA',
  });
}
console.table(rows);
console.log(allOk ? '\nTODOS LOS VIDEOS BIEN' : '\nHAY VIDEOS POR CORREGIR');