import { content } from '../i18n/content';
import { locales, site, type Lang } from '../config';

export const ORIGIN = 'https://handymann.vercel.app';
export const ogLocale: Record<Lang, string> = { pl: 'pl_PL', de: 'de_DE', en: 'en_GB' };

/** JSON-LD graph: business, website and the page, linked by @id. No invented facts: contact only when real. */
export function jsonLd(lang: Lang) {
  const t = content[lang];
  const pageUrl = `${ORIGIN}/${lang}/`;
  const bizId = `${ORIGIN}/#business`;
  const business: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': bizId,
    name: site.name,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/img/logo-512.png`,
    image: `${ORIGIN}/img/og.png`,
    description: t.meta.description,
    knowsLanguage: ['pl', 'de', 'en'],
    areaServed: [
      ...site.areas.map((name) => ({ '@type': 'City', name })),
      { '@type': 'AdministrativeArea', name: site.region },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.text, areaServed: site.region },
      })),
    },
  };
  if (site.contactReady) {
    business.telephone = site.phone.replace(/\s/g, '');
    business.email = site.email;
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      business,
      {
        '@type': 'WebSite',
        '@id': `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: site.name,
        inLanguage: [...locales],
        publisher: { '@id': bizId },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': bizId },
        primaryImageOfPage: `${ORIGIN}/img/og.png`,
      },
    ],
  };
}
