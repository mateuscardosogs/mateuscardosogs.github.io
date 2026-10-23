/**
 * Generates the static images referenced in <head>: the social card and the
 * Apple touch icon. Both are laid out at fixed pixel sizes so headless Chrome
 * captures them exactly, and both live in public/ once generated.
 *
 *   npm run images
 */
import { spawn } from 'node:child_process';
import { access, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const tmp = join(root, '.images');

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
  throw new Error('No Chrome binary found. Set CHROME_PATH.');
}

const FONTS =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';

const og = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;background:#FAFAF9;color:#08090A;
       font-family:"Space Grotesk",sans-serif;position:relative}
  .grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(8,9,10,.07) 1px,transparent 1px);background-size:104px 100%}
  .pad{position:relative;padding:72px 80px;height:100%;display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{display:flex;align-items:center;gap:14px;font-family:"IBM Plex Mono",monospace;font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:#8A9098}
  .mark{width:12px;height:12px;background:#E5431B}
  h1{font-size:62px;font-weight:600;letter-spacing:-.03em;line-height:1.04;max-width:960px}
  em{font-style:normal;color:#E5431B}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;border-top:1px solid #D6D9DC;padding-top:28px}
  .nums{display:flex;gap:56px}
  .num b{display:block;font-size:34px;font-weight:600;letter-spacing:-.03em}
  .num span{font-family:"IBM Plex Mono",monospace;font-size:13px;color:#585D63;letter-spacing:.04em}
  .who{text-align:right;font-family:"IBM Plex Mono",monospace;font-size:14px;color:#585D63;letter-spacing:.04em;line-height:1.7}
</style></head><body>
<div class="grid"></div>
<div class="pad">
  <div class="eyebrow"><span class="mark"></span>Mateus Cardoso · AI engineer &amp; software engineer</div>
  <h1>I build AI automations and integrations that <em>hold up in production</em>.</h1>
  <div class="foot">
    <div class="nums">
      <div class="num"><b>&minus;73%</b><span>support tickets</span></div>
      <div class="num"><b>158</b><span>AI extraction configs</span></div>
      <div class="num"><b>40k+</b><span>offers / hour</span></div>
    </div>
    <div class="who">mateuscardosogs.com<br>MCode Studio Labs</div>
  </div>
</div>
</body></html>`;

const touchIcon = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:180px;height:180px;overflow:hidden;background:#08090A;display:flex;align-items:center;justify-content:center}
  .frame{width:112px;height:112px;border:8px solid #FAFAF9;display:flex;align-items:center;justify-content:center}
  .core{width:56px;height:56px;background:#E5431B}
</style></head><body><div class="frame"><div class="core"></div></div></body></html>`;

const chrome = await findChrome();
await mkdir(tmp, { recursive: true });
await mkdir(pub, { recursive: true });

const jobs = [
  { html: og, file: 'og.html', out: join(pub, 'og.png'), size: '1200,630' },
  { html: touchIcon, file: 'touch.html', out: join(pub, 'apple-touch-icon.png'), size: '180,180' },
];

for (const job of jobs) {
  const src = join(tmp, job.file);
  await writeFile(src, job.html, 'utf8');
  await new Promise((ok, fail) => {
    const p = spawn(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--default-background-color=00000000',
        `--window-size=${job.size}`,
        '--virtual-time-budget=8000',
        `--screenshot=${job.out}`,
        `file://${src}`,
      ],
      { stdio: 'ignore' },
    );
    p.on('error', fail);
    p.on('exit', (code) => (code === 0 ? ok() : fail(new Error(`chrome exited with ${code}`))));
  });
  console.log(`  image        ${job.size.padEnd(10)} → public/${job.out.split('/').pop()}`);
}

await rm(tmp, { recursive: true, force: true });
