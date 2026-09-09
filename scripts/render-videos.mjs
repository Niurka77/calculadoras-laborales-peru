import { chromium } from 'playwright';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const FULL_CHROME = process.env.CHROME_PATH;

async function launchBrowser() {
  if (FULL_CHROME && existsSync(FULL_CHROME)) {
    return chromium.launch({ executablePath: FULL_CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  }
  return chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] });
}

const VIDEOS_DIR = join(process.cwd(), 'videos');
const RENDER_DIR = join(process.cwd(), 'renders');
const OUT_DIR = join(process.cwd(), 'videos-mp4');
const DURATION_MS = 13000;
const FPS = 30;

mkdirSync(RENDER_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const scenes = readdirSync(VIDEOS_DIR)
  .filter((f) => f.endsWith('.html') && !f.startsWith('README'))
  .sort();

function convertToMp4(webmPath, outPath, seekSec) {
  return new Promise((resolve, reject) => {
    const args = [
      '-y',
      ...(seekSec > 0 ? ['-ss', String(seekSec)] : []),
      '-i', webmPath,
      '-t', String(DURATION_MS / 1000),
      '-vf', 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0a0f1e',
      '-r', String(FPS),
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '22',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      outPath,
    ];
    const proc = spawn(ffmpegPath, args);
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code))));
    proc.on('error', reject);
  });
}

async function renderScene(browser, htmlFile, index) {
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: RENDER_DIR,
      size: { width: 1080, height: 1920 },
    },
  });

  await page.goto('file:///' + join(VIDEOS_DIR, htmlFile).replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.waitForFunction(() => window.__started, null, { timeout: 20000 });
  const startedAt = await page.evaluate(() => window.__startedAt);
  const deadMs = Math.max(startedAt - 0, 0);

  await page.waitForTimeout(DURATION_MS + deadMs + 300);

  const video = page.video();
  await page.close();
  if (!video) throw new Error('no video for ' + htmlFile);
  const webmPath = await video.path();

  const outPath = join(OUT_DIR, htmlFile.replace('.html', '.mp4'));
  await convertToMp4(webmPath, outPath, deadMs / 1000 - 0.05);
  console.log(`[${index + 1}/${scenes.length}] ${htmlFile} -> ${outPath}`);
}

async function main() {
  const browser = await launchBrowser();
  try {
    for (let i = 0; i < scenes.length; i++) {
      await renderScene(browser, scenes[i], i);
    }
  } finally {
    await browser.close();
  }
  console.log('\nListo! Videos en: ' + OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});