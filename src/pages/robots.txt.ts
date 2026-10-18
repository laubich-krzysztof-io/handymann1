import type { APIRoute } from 'astro';
import { site } from '../config';
import { ORIGIN } from '../lib/seo';

export const GET: APIRoute = () => {
  const body = site.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
    : `# Indeksowanie wyłączone, dopóki dane kontaktowe są przykładowe (src/config.ts: indexable)\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
