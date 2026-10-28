import { content } from '../i18n/content';
import { site, type Lang } from '../config';

export const ORIGIN = 'https://handymann.vercel.app';
/** Tekst do danych strukturalnych: twarde spacje (typografia na stronie) jako zwykłe */
const plain = (v: string) => v.replace(/\u00a0/g, ' ');

export const ogLocale: Record<Lang, string> = { pl: 'pl_PL' };

/** JSON-LD graph: business, website and the page, linked by @id. No invented facts: contact only when real. */
export function jsonLd(lang: Lang) {
  const t = content[lang];
  const pageUrl = `${ORIGIN}/`;
  const bizId = `${ORIGIN}/#business`;
  const p = site.pricing;
  const pr = t.pricing;
  // Cennik jako oferty: te same kwoty co w sekcji „Cennik” (config.ts)
  const rate = (name: string, price: Record<string, unknown>, unit: Record<string, unknown>) => ({
    '@type': 'Offer',
    name: plain(name),
    priceCurrency: 'PLN',
    ...price,
    priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: 'PLN', valueAddedTaxIncluded: false, ...price, referenceQuantity: { '@type': 'QuantitativeValue', ...unit } },
    areaServed: { '@id': `${ORIGIN}/#area` },
  });
  const business: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': bizId,
    name: site.name,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/img/logo-512.png`,
    image: `${ORIGIN}/img/og.png`,
    description: t.meta.description,
    knowsLanguage: ['pl'],
    // Promień od Jeleniej Góry plus miejscowości wymienione na stronie (jedno zdanie w sekcji „Cennik”)
    areaServed: [
      {
        '@type': 'GeoCircle',
        '@id': `${ORIGIN}/#area`,
        name: `${site.radiusKm} km – ${site.center.name}`,
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: site.center.lat, longitude: site.center.lng },
        geoRadius: site.radiusKm * 1000,
      },
      ...site.areas.map((name) => ({ '@type': 'City', name })),
      { '@type': 'AdministrativeArea', name: site.region },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.text, areaServed: { '@id': `${ORIGIN}/#area` } },
      })),
    },
    makesOffer: [
      rate(pr.rates[0].label, { price: p.firstHour }, { value: 1, unitCode: 'HUR' }),
      rate(pr.rates[1].label, { price: p.halfHour }, { value: 30, unitCode: 'MIN' }),
      rate(pr.care.title, { minPrice: p.careFrom }, { value: 1, unitCode: 'MON' }),
    ],
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
        inLanguage: 'pl',
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
      {
        // Te same pytania i odpowiedzi co w sekcji „Częste pytania”
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: `${pageUrl}#pytania`,
        inLanguage: lang,
        isPartOf: { '@id': `${pageUrl}#page` },
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: plain(f.q),
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      },
    ],
  };
}
