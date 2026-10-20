import type { APIRoute } from 'astro';
import { locales, type Lang } from '../config';
import { ORIGIN } from '../lib/seo';
import { privacyPath } from '../i18n/privacy';

// Każda strona w trzech językach, z odnośnikami hreflang do pozostałych wersji
const pages: ((l: Lang) => string)[] = [(l) => `/${l}/`, privacyPath];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .flatMap((path) => {
      const alts = locales
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${path(l)}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${path('pl')}"/>`)
        .join('\n');
      return locales.map((l) => `  <url>\n    <loc>${ORIGIN}${path(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`);
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
