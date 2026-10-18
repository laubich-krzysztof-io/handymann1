import type { APIRoute } from 'astro';
import { locales } from '../config';
import { ORIGIN } from '../lib/seo';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const alts = locales
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}/${l}/"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/pl/"/>`)
    .join('\n');
  const urls = locales
    .map((l) => `  <url>\n    <loc>${ORIGIN}/${l}/</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
