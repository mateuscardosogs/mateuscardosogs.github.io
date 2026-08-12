import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The production site is prerendered to one HTML file per route, so there is no
 * client router. In dev there are no files, only URLs — this hands `index.html`
 * to any non-asset request so /pt/, /cv/ and /cases/* are browsable.
 */
function devRouteFallback(): Plugin {
  return {
    name: 'mc-dev-route-fallback',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '/';
        const isAsset = /\.[a-z0-9]+(\?|$)/i.test(url);
        if (!isAsset && !url.startsWith('/@') && !url.startsWith('/node_modules')) {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devRouteFallback()],
  build: {
    target: 'es2020',
    assetsDir: 'assets',
    // One stylesheet for the whole site: it is small, and it saves a
    // render-blocking round trip per route.
    cssCodeSplit: false,
  },
});
