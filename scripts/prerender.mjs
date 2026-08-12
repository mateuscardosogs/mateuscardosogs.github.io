/**
 * Turns the SSR bundle into static HTML — one file per route — plus a sitemap.
 * Runs after `build:client` and `build:server`; see package.json > build.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const { render, routes, ORIGIN } = await import(pathToFileURL(join(root, '.ssr/entry-server.js')).href);

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('dist/index.html lost its <!--app-head--> / <!--app-html--> placeholders.');
}

for (const route of routes) {
  const { html, head, lang } = render(route);
  const page = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);

  const out = join(dist, route.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page, 'utf8');
  console.log(`  prerendered  ${route.path.padEnd(26)} → ${route.file}`);
}

const indexable = routes.filter((r) => !r.noIndex);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map(
    (r) =>
      `  <url><loc>${ORIGIN}${r.path}</loc>` +
      `<changefreq>monthly</changefreq>` +
      `<priority>${r.kind === 'home' ? '1.0' : '0.7'}</priority></url>`,
  ),
  '</urlset>',
  '',
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
console.log(`  sitemap      ${indexable.length} urls`);
