import type { APIRoute } from 'astro';
import { ORIGIN } from '../lib/seo';
import { privacyPath } from '../i18n/privacy';

const pages = ['/', privacyPath];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.map((p) => `  <url>\n    <loc>${ORIGIN}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
