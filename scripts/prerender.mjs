/**
 * Pre-rendering (SSG) script for Vite React SPA.
 *
 * Spins up a lightweight static server from dist/, visits every route with
 * Puppeteer in headless mode, captures the fully-rendered HTML, and writes
 * it back to dist/ so that crawlers and first-time visitors receive real
 * markup instead of an empty <div id="root">.
 *
 * Usage:  node scripts/prerender.mjs          (run after `vite build`)
 *         vite build && node scripts/prerender.mjs   (combined)
 */

import { createServer } from "node:http";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROUTES = ["/", "/leistungen", "/referenzen", "/about", "/48h", "/ki"];
const PORT = 4173; // same port vite preview uses – unlikely to collide
const DIST_DIR = join(fileURLToPath(import.meta.url), "../../dist");
const TIMEOUT = 30_000; // per-page navigation timeout (ms)
const EXTRA_DELAY = 2_000; // extra wait after networkidle for React hydration

// Minimal MIME map – only types that exist in a typical Vite build output.
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".hdr": "application/octet-stream",
};

// ---------------------------------------------------------------------------
// Static file server (Node built-ins only, SPA fallback to index.html)
// ---------------------------------------------------------------------------

function createStaticServer() {
  const fallbackHtml = readFileSync(join(DIST_DIR, "index.html"));

  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST_DIR, decodeURIComponent(url.pathname));

    // If the path points at a directory, try index.html inside it
    if (!extname(filePath)) {
      const candidate = join(filePath, "index.html");
      if (existsSync(candidate)) {
        filePath = candidate;
      }
    }

    try {
      if (existsSync(filePath) && !filePath.endsWith("/")) {
        const ext = extname(filePath);
        const mime = MIME_TYPES[ext] || "application/octet-stream";
        const content = readFileSync(filePath);
        res.writeHead(200, { "Content-Type": mime });
        res.end(content);
      } else {
        // SPA fallback — serve root index.html for unknown paths
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fallbackHtml);
      }
    } catch {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fallbackHtml);
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(PORT, "127.0.0.1", () => {
      console.log(`[prerender] Static server listening on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
    server.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// Render a single route and return its HTML
// ---------------------------------------------------------------------------

async function renderRoute(browser, route) {
  const page = await browser.newPage();

  // Suppress WebGL / Three.js errors — the canvas won't work in headless
  // Chromium but the rest of the DOM renders fine.
  page.on("pageerror", () => {});
  page.on("console", () => {});

  try {
    const url = `http://127.0.0.1:${PORT}${route}`;
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: TIMEOUT,
    });

    // Give React a moment to finish any post-mount effects / transitions.
    await new Promise((r) => setTimeout(r, EXTRA_DELAY));

    const html = await page.evaluate(() => {
      return document.documentElement.outerHTML;
    });

    return `<!DOCTYPE html>\n${html}`;
  } finally {
    await page.close();
  }
}

// ---------------------------------------------------------------------------
// Write rendered HTML to disk
// ---------------------------------------------------------------------------

function writeRoute(route, html) {
  if (route === "/") {
    const dest = join(DIST_DIR, "index.html");
    writeFileSync(dest, html, "utf-8");
    console.log(`[prerender]   -> ${dest}`);
  } else {
    const dir = join(DIST_DIR, route.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, "index.html");
    writeFileSync(dest, html, "utf-8");
    console.log(`[prerender]   -> ${dest}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("[prerender] Starting pre-render of routes:", ROUTES.join(", "));

  if (!existsSync(DIST_DIR)) {
    console.error(`[prerender] ERROR: dist/ directory not found at ${DIST_DIR}`);
    console.error("[prerender] Run 'vite build' first.");
    process.exit(1);
  }

  let server;
  let browser;

  try {
    server = await createStaticServer();

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--use-gl=swiftshader",
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
      ],
    });

    console.log("[prerender] Browser launched");

    for (const route of ROUTES) {
      try {
        console.log(`[prerender] Rendering ${route} ...`);
        const html = await renderRoute(browser, route);
        writeRoute(route, html);
        console.log(`[prerender] Done: ${route}`);
      } catch (err) {
        console.error(`[prerender] FAILED to render ${route}:`, err.message);
      }
    }

    console.log("[prerender] All routes processed.");
  } catch (err) {
    console.warn("[prerender] Skipping pre-render:", err.message);
    console.warn("[prerender] Site will work as a regular SPA.");
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
      console.log("[prerender] Browser closed");
    }
    if (server) {
      server.close();
      console.log("[prerender] Server stopped");
    }
  }
}

main();
