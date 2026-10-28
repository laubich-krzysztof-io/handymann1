// Treści strony w układzie wzorowanym na Cyprianerhof (gałąź „referencja”).
// Wszystkie fakty pochodzą z obecnej strony: content.ts (teksty) i config.ts (ceny, strefy, kontakt).
import { content } from './content';
import { site } from '../config';

const t = content.pl;
const P = site.pricing;
const zl = (n: number) => `${n} zł`;
const money = (n: number) =>
  `${new Intl.NumberFormat('pl-PL', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)} zł`;
const gross = (n: number) => Math.round(n * (100 + P.vatPct)) / 100;

/** Zakładki „Co naprawiam”: jak bloki tematyczne referencji (lista po lewej, tekst, siatka zdjęć) */
export const tabs = [
  {
    id: 'hydraulika',
    label: 'Hydraulika',
    title: t.services.items[0].name,
    intro: t.services.lead,
    bullets: ['Kapiące krany', 'Zatkane odpływy', 'Wymiana baterii, WC i syfonów', 'Podłączanie urządzeń'],
    photos: 'hydraulika' as const,
  },
  {
    id: 'elektryka',
    label: 'Elektryka',
    title: t.services.items[1].name,
    intro: t.services.lead,
    line: t.services.note,
    bullets: ['Gniazdka i włączniki', 'Oświetlenie', 'Osprzęt rozdzielnic', 'Szukanie przyczyny usterki'],
    photos: 'elektryka' as const,
  },
  {
    id: 'montaz',
    label: 'Montaż i remonty',
    title: t.services.items[2].name,
    intro: t.services.lead,
    bullets: ['Meble i półki', 'Drzwi i zamki', 'Malowanie', 'Drobne naprawy płytek, okien i okuć'],
    photos: 'montaz' as const,
  },
  {
    id: 'opieka',
    label: 'Stała opieka',
    title: t.care.title,
    intro: t.care.lead,
    bullets: t.care.points.map((p) => `${p.title}: ${p.text.charAt(0).toLowerCase()}${p.text.slice(1)}`),
    cta: t.care.cta,
    visit: t.care.visit, // zamiast zdjęć: przykładowa lista po wizycie
  },
];

/** „Na czym można polegać” (w referencji: „What sets us apart”) */
export const pillars = [
  { title: 'Uprawnienia SEP do 1 kV', text: 'Prace elektryczne na podstawie świadectwa kwalifikacyjnego. Świadectwo pokazuję przed rozpoczęciem pracy.' },
  { title: 'Cena przed rozpoczęciem pracy', text: 'Orientacyjna na podstawie zdjęcia, dokładna po oględzinach na miejscu.' },
  { title: 'Jawny cennik', text: `Stawki netto i brutto z VAT ${P.vatPct}% są na tej stronie, z przykładowym rachunkiem.` },
  { title: 'Faktura VAT', text: 'Robocizna, dojazd i materiały wpisane osobno.' },
];

/** Karty cennika na ciemnym pasie (w referencji: „Top offers”) */
export const priceCards = [
  { badge: 'Strefa 1', title: 'Pierwsza godzina pracy z dojazdem', price: zl(P.firstHour), gross: `${money(gross(P.firstHour))} brutto`, note: 'Dojazd w cenie: Jelenia Góra i najbliższa okolica.', topic: 0 },
  { badge: 'Robocizna', title: 'Każde kolejne rozpoczęte 30 minut', price: zl(P.halfHour), gross: `${money(gross(P.halfHour))} brutto`, note: 'Liczone od pierwszej minuty po pierwszej godzinie.', topic: 0 },
  { badge: 'Strefa 2', title: 'Dojazd do strefy 2', price: `+${zl(P.zone2Travel)}`, gross: `+${money(gross(P.zone2Travel))} brutto`, note: 'Np. Karpacz, Kowary, Szklarska Poręba, Wleń. Raz za wizytę.', topic: 0, href: '#strefy' },
  { badge: 'Miesięcznie', title: t.pricing.care.title, price: `od ${zl(P.careFrom)}`, gross: `od ${money(gross(P.careFrom))} brutto`, note: `${P.careHours} godziny pracy, dojazdy w cenie, reakcja w ciągu ${P.careResponseH} godzin.`, topic: 1 },
];

/** Liczby (w referencji: pas z sześcioma kartami) — tylko fakty z cennika i opisu usług */
export const stats = [
  { value: String(P.firstHour), unit: 'zł', label: 'pierwsza godzina z dojazdem, netto', icon: 'coin' },
  { value: String(site.radiusKm), unit: 'km', label: 'od Jeleniej Góry, dwie strefy dojazdu', icon: 'pin' },
  { value: String(P.careResponseH), unit: 'h', label: 'reakcja przy stałej opiece, także w weekendy', icon: 'clock' },
  { value: '1', unit: 'kV', label: 'uprawnienia SEP do prac elektrycznych', icon: 'bolt' },
  { value: String(P.careHours), unit: 'h', label: 'pracy w miesięcznym pakiecie opieki', icon: 'house' },
  { value: '0', unit: '%', label: 'dopłaty w soboty i niedziele w dzień', icon: 'calendar' },
];
