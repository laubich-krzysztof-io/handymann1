import type { APIRoute } from 'astro';
import { content } from '../i18n/content';
import { site } from '../config';
import { ORIGIN } from '../lib/seo';
import { privacyPath } from '../i18n/privacy';

// llms.txt: zwięzły opis firmy dla wyszukiwarek AI (GEO). Generowany z tych samych treści co strona.
export const GET: APIRoute = () => {
  const pl = content.pl;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${pl.meta.description}`,
    '',
    `Obszar działania: do ${site.radiusKm} km od Jeleniej Góry (${site.areas.join(', ')}), ${site.region}.`,
    `Dla kogo: ${pl.contact.form.whoOptions.join(', ').toLowerCase()}.`,
    '',
    '## Usługi',
    ...pl.services.items.map((s) => `- ${s.name}: ${s.text}`),
    `- ${pl.services.note}`,
    '',
    '## Stała opieka nad obiektem',
    `${pl.care.quote} ${pl.care.lead}`,
    ...pl.care.points.map((p) => `- ${p.title}: ${p.text}`),
    '',
    `## ${pl.pricing.title}`,
    ...pl.pricing.rates.map((r) => `- ${r.label}: ${r.price}${r.gross ? ` ${pl.pricing.net} (${r.gross} ${pl.pricing.grossLabel})` : ''}${r.note ? `. ${r.note}` : ''}`),
    ...pl.pricing.extras.map((x) => `- ${x.label}: ${x.price}`),
    `- ${pl.pricing.surcharges}`,
    `- ${pl.pricing.care.title}: ${pl.pricing.care.price} ${pl.pricing.net} ${pl.pricing.care.per}, ${pl.pricing.care.gross} ${pl.pricing.grossLabel} (${pl.pricing.care.points.join(', ')})`,
    ...pl.pricing.zones.items.map((z) => `- ${pl.pricing.zones.title}, ${z.name} (${z.price}): ${z.text}`),
    `- ${pl.pricing.fine}`,
    '',
    '## Jak wygląda zlecenie',
    ...pl.contact.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
    '',
    `## ${pl.faq.title}`,
    ...pl.faq.items.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Strony',
    `- [Strona główna](${ORIGIN}/)`,
    `- [Polityka prywatności](${ORIGIN}${privacyPath})`,
    ...(site.contactReady ? ['', '## Kontakt', `- Telefon: ${site.phone}`, `- E-mail: ${site.email}`] : []),
    '',
  ];
  return new Response(lines.join('\n').replace(/\u00a0/g, ' '), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
