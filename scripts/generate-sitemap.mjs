#!/usr/bin/env node

/**
 * generate-sitemap.mjs
 * --------------------
 * Build-time script that generates sitemap.xml and copies robots.txt
 * into the dist/ directory.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *
 * Uses only Node.js built-ins (fs, path).
 */

import { writeFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ─── Config ─── */
const BASE_URL = 'https://rs-digitalsolutions.de';

const ROUTES = [
  { path: '/',            changefreq: 'weekly',  priority: '1.0' },
  { path: '/leistungen',  changefreq: 'monthly', priority: '0.9' },
  { path: '/referenzen',  changefreq: 'monthly', priority: '0.9' },
  { path: '/about',       changefreq: 'monthly', priority: '0.8' },
  { path: '/ki',          changefreq: 'monthly', priority: '0.8' },
  { path: '/48h',         changefreq: 'monthly', priority: '0.8' },
];

/* ─── Paths ─── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const publicDir = resolve(projectRoot, 'public');

/* ─── Helpers ─── */
function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function buildSitemapXml(routes, baseUrl, lastmod) {
  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

/* ─── Main ─── */
function main() {
  const lastmod = todayISO();

  // Ensure dist/ exists
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
    console.log(`[sitemap] Created ${distDir}`);
  }

  // Generate sitemap.xml
  const sitemapContent = buildSitemapXml(ROUTES, BASE_URL, lastmod);
  const sitemapPath = resolve(distDir, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`[sitemap] Generated ${sitemapPath} (lastmod: ${lastmod})`);

  // Copy robots.txt
  const robotsSrc = resolve(publicDir, 'robots.txt');
  const robotsDest = resolve(distDir, 'robots.txt');

  if (existsSync(robotsSrc)) {
    if (!existsSync(robotsDest)) {
      copyFileSync(robotsSrc, robotsDest);
      console.log(`[sitemap] Copied robots.txt to ${robotsDest}`);
    } else {
      console.log(`[sitemap] robots.txt already exists in dist/, skipping copy`);
    }
  } else {
    console.warn(`[sitemap] Warning: ${robotsSrc} not found, skipping robots.txt copy`);
  }

  console.log('[sitemap] Done.');
}

main();
