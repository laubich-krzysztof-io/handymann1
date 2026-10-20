import type { APIRoute } from 'astro';
import { content } from '../i18n/content';
import { site } from '../config';
import { ORIGIN } from '../lib/seo';

// llms.txt: zwięzły opis firmy dla wyszukiwarek AI (GEO). Generowany z tych samych treści co strona.
export const GET: APIRoute = () => {
  const pl = content.pl;
  const en = content.en;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${pl.meta.description}`,
    `> ${en.meta.description}`,
    '',
    `Obszar działania: do ${site.radiusKm} km od Jeleniej Góry (${site.areas.join(', ')}), ${site.region}.`,
    'Języki obsługi: polski, niemiecki, angielski.',
    `Dla kogo: ${pl.contact.form.whoOptions.join(', ')}.`,
    '',
    '## Usługi',
    ...pl.services.items.map((s) => `- ${s.name}: ${s.text}`),
    `- ${pl.services.note}`,
    '',
    '## Stała opieka nad obiektem',
    pl.care.lead,
    ...pl.care.points.map((p) => `- ${p.title}: ${p.text}`),
    '',
    `## ${pl.pricing.title}`,
    ...pl.pricing.rates.map((r) => `- ${r.label}: ${r.price}${r.gross ? ` ${pl.pricing.net} (${r.gross} ${pl.pricing.grossLabel})` : ''}${r.note ? `. ${r.note}` : ''}`),
    `- ${pl.pricing.surcharges}`,
    `- ${pl.pricing.care.title}: ${pl.pricing.care.price} ${pl.pricing.net} ${pl.pricing.care.per}, ${pl.pricing.care.gross} ${pl.pricing.grossLabel} (${pl.pricing.care.points.join(', ').toLowerCase()})`,
    `- ${pl.pricing.area}`,
    `- ${pl.pricing.fine}`,
    '',
    '## Jak wygląda zlecenie',
    ...pl.process.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
    '',
    '## Strony',
    `- [Polski](${ORIGIN}/pl/)`,
    `- [Deutsch](${ORIGIN}/de/)`,
    `- [English](${ORIGIN}/en/)`,
    ...(site.contactReady ? ['', '## Kontakt', `- Telefon: ${site.phone}`, `- E-mail: ${site.email}`] : []),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
