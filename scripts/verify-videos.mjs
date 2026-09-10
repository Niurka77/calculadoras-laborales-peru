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
  if (data.length !== expected) return null;

  // Resultado (zona band ~ y 880-1070, x 300-780): deben abundar verdes
  let greenBand = 0;
  for (let y = 890; y < 1060; y += 2) {
    for (let x = 320; x < 760; x += 2) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (g > r * 1.6 && g > b * 1.4 && g > 80) greenBand++;
    }
  }
  // Texto blanco grande en pantalla completa
  let white = 0, midWhite = 0;
  for (let y = 200; y < 1400; y += 3) {
    for (let x = 40; x < 1040; x += 3) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 225 && g > 225 && b > 225) white++;
      if (r > 190 && g > 190 && b > 190) midWhite++;
    }
  }
  // Barra de progreso (y ~ 428)
  let greenBar = 0;
  for (let y = 420; y < 450; y += 2) {
    for (let x = 280; x < 800; x += 2) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (g > r * 1.6 && g > b * 1.4 && g > 80) greenBar++;
    }
  }
  return { greenBand, greenBar, white, midWhite };
}

const videos = readdirSync(OUT_DIR).filter((f) => f.endsWith('.mp4')).sort();
let allOk = true;
const rows = [];
for (const v of videos) {
  const file = join(OUT_DIR, v);
  const s1 = frameStats(file, 1.1);
  const s2p = frameStats(file, 2.2);
  const s3 = frameStats(file, 2.4);
  const s7 = frameStats(file, 7.5);

  const tituloEnFrame = s1 && s1.white >= 120;
  const progressEnFrame = s2p && s2p.greenBar >= 60;
  const nadaAntes = !s3 || s3.greenBand < 40;
  const resultado = s7 && s7.greenBand >= 400;
  const textoOk = s7 && s7.white >= 300;

  const ok = tituloEnFrame && progressEnFrame && nadaAntes && resultado && textoOk;
  if (!ok) allOk = false;

  rows.push({
    video: v,
    titulo1s: tituloEnFrame ? 'OK' : 'FALTA',
    progress2s: progressEnFrame ? 'OK' : 'FALTA',
    before3s: nadaAntes ? 'OK' : 'VERDE ANTES',
    band7s: resultado ? 'OK' : 'FALTA',
    texto7s: textoOk ? 'OK' : 'FALTA',
    estado: ok ? 'PASA' : 'REVISA',
  });
}
console.table(rows);
console.log(allOk ? '\nTODOS LOS VIDEOS BIEN' : '\nHAY VIDEOS POR CORREGIR');