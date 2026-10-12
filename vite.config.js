import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Makes `vite preview` behave like a static host serving the prerendered pages:
// /about → dist/about/index.html, unknown routes → dist/404.html (status 404).
function prerenderedPreview() {
  return {
    name: 'prerendered-preview',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const { pathname } = url;
        if (path.extname(pathname)) return next();
        const file = path.join(dist, pathname, 'index.html');
        if (fs.existsSync(file)) {
          req.url = path.posix.join(pathname, 'index.html') + url.search;
          return next();
        }
        const notFound = path.join(dist, '404.html');
        if (fs.existsSync(notFound)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end(fs.readFileSync(notFound));
        }
        return next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderedPreview()],
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
  },
});
