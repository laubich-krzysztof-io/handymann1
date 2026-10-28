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
  // Zmiana tutaj zmienia sekcję „Cennik”, przykładowy rachunek, pytania, opis w Google i dane strukturalne.
  // TE SAME LICZBY są w Dyspozytorze (repo dyspozytor, lib/pricing.ts): zmieniaj w obu miejscach.
  pricing: {
    firstHour: 200, // pierwsza godzina pracy z dojazdem w strefie 1 (także same oględziny bez naprawy)
    halfHour: 70, // każde kolejne rozpoczęte 30 minut
    zone2Travel: 40, // dopłata za dojazd do strefy 2, raz za wizytę, bez dopłat procentowych
    urgentPct: 50, // pilne, tego samego dnia (dopłata do robocizny)
    nightPct: 100, // noc i święta (dopłata do robocizny)
    night: { from: 22, to: 6 }, // godziny nocne
    careFrom: 590, // stała opieka: od tylu zł miesięcznie
    careHours: 4, // godzin pracy w pakiecie
    careResponseH: 24, // czas reakcji w pakiecie (także w weekendy)
    vatPct: 23, // VAT doliczany do kwot netto (do potwierdzenia z księgowym: 8% przy części prac w mieszkaniach i domach)
  },
  // Strefy dojazdu: po gminach, żeby klient od razu wiedział, gdzie jest (bez liczenia kilometrów).
  // Dyspozytor ma te same strefy w lib/area.ts.
  zones: {
    one: 'Jelenia Góra z Cieplicami i Sobieszowem oraz gminy Podgórzyn, Mysłakowice, Piechowice, Jeżów Sudecki i Stara Kamienica',
    two: 'Karpacz, Kowary, Szklarska Poręba, Świeradów-Zdrój, Janowice Wielkie, Lwówek Śląski, Kamienna Góra i inne miejscowości do 30 km od Jeleniej Góry',
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
