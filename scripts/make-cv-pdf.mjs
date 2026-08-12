/**
 * Renders the built /cv/ and /pt/cv/ pages to PDF with headless Chrome and
 * writes them into public/cv/, so the next build copies them into dist/.
 * The print stylesheet in src/styles/cv.css strips the nav, footer and toolbar.
 *
 *   npm run build && npm run cv:pdf
 */
import { spawn } from 'node:child_process';
import { access, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/cv');
const PORT = 5199;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
].filter(Boolean);

async function findChrome() {
  for (const c of CHROME_CANDIDATES) {
    try {
      await access(c);
      return c;
    } catch {
      /* next candidate */
    }
  }
  throw new Error(`No Chrome binary found. Set CHROME_PATH. Tried:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
}

function run(cmd, args) {
  return new Promise((ok, fail) => {
    const p = spawn(cmd, args, { stdio: 'ignore' });
    p.on('error', fail);
    p.on('exit', (code) => (code === 0 ? ok() : fail(new Error(`${cmd} exited with ${code}`))));
  });
}

const chrome = await findChrome();
await mkdir(outDir, { recursive: true });

const server = spawn(process.execPath, [join(root, 'scripts/serve.mjs'), String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 400));

try {
  for (const [lang, path] of [
    ['en', '/cv/'],
    ['pt', '/pt/cv/'],
  ]) {
    const out = join(outDir, `mateus-cardoso-cv-${lang}.pdf`);
    await run(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${out}`,
      `http://localhost:${PORT}${path}`,
    ]);
    console.log(`  cv pdf       ${path.padEnd(12)} → public/cv/mateus-cardoso-cv-${lang}.pdf`);
  }
} finally {
  server.kill();
}
