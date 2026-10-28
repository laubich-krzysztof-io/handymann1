// Dane kontaktowe i ustawienia strony. ZMIEŃ przed publikacją.
export const site = {
  name: 'handyman.karkonosze',
  // Indeksowanie w Google i AI. Zostaw false, dopóki telefon i e-mail są przykładowe.
  // Po wpisaniu prawdziwych danych zmień na true: zmieni się meta robots, robots.txt i sitemap.
  indexable: false,
  // Obszar działania: promień od Jeleniej Góry (do danych strukturalnych i llms.txt).
  // Na stronie te same miejscowości są wpisane w jednym zdaniu w src/i18n/content.ts (pricing.area).
  center: { name: 'Jelenia Góra', lat: 50.9044, lng: 15.7194 },
  radiusKm: 30,
  areas: ['Jelenia Góra', 'Karpacz', 'Szklarska Poręba', 'Świeradów-Zdrój', 'Podgórzyn', 'Mysłakowice', 'Kowary', 'Piechowice'],
  region: 'Karkonosze',
  // Cennik w złotych NETTO (bez VAT). Strona pokazuje obok cenę brutto z vatPct.
  // Zmiana tutaj zmienia sekcję „Cennik”, przykładowy rachunek, opis w Google i dane strukturalne.
  pricing: {
    firstHour: 200, // pierwsza godzina pracy z dojazdem w promieniu radiusKm
    halfHour: 70, // każde kolejne rozpoczęte 30 minut
    urgentPct: 50, // pilne, tego samego dnia (dopłata do robocizny)
    nightPct: 150, // noc i święta (dopłata do robocizny)
    night: { from: 22, to: 6 }, // godziny nocne
    careFrom: 450, // stała opieka: od tylu zł miesięcznie
    careHours: 4, // godzin pracy w abonamencie
    careResponseH: 24, // czas reakcji w abonamencie
    vatPct: 23, // VAT doliczany do kwot netto
  },
  // Kontakt (format międzynarodowy)
  phone: '+48 537 419 388',
  whatsapp: '48537419388', // sam numer, bez + i spacji
  email: 'laubichkrzysztof@gmail.com',
  // TODO: dane firmy do stopki i polityki prywatności (administrator danych)
  company: '', // np. 'QuickFix Serwis+ Jan Kowalski'
  nip: '', // np. '6110000000'
  address: '', // np. 'Popielówek 1, 59-623 Lubomierz'
  // Czy dane kontaktowe są prawdziwe (gdy false, nie trafiają do danych strukturalnych)
  contactReady: true,
};

export const locales = ['pl'] as const;
export type Lang = (typeof locales)[number];
