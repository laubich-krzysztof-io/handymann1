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
  // Cennik w złotych. Kwoty to ceny końcowe dla klienta.
  // Zmiana tutaj zmienia sekcję „Cennik”, przykładowy rachunek, opis w Google i dane strukturalne.
  pricing: {
    firstHour: 200, // pierwsza godzina pracy z dojazdem w promieniu radiusKm
    halfHour: 60, // każde kolejne rozpoczęte 30 minut
    urgentPct: 50, // pilne, tego samego dnia (dopłata do robocizny)
    nightPct: 100, // noc i święta (dopłata do robocizny)
    night: { from: 22, to: 6 }, // godziny nocne
    careFrom: 450, // stała opieka: od tylu zł miesięcznie
    careHours: 4, // godzin pracy w abonamencie
    careResponseH: 24, // czas reakcji w abonamencie
  },
  // TODO: wpisz prawdziwy numer (format międzynarodowy) i e-mail
  phone: '+48 000 000 000',
  whatsapp: '48000000000', // sam numer, bez + i spacji
  email: 'kontakt@handyman.example',
  // TODO: dane firmy do stopki (nazwa, NIP)
  company: '',
  // Czy dane kontaktowe są prawdziwe (gdy false, nie trafiają do danych strukturalnych)
  contactReady: false,
  // Zdjęcia realizacji: wrzuć pliki do public/img/ i dopisz tutaj.
  // Dopóki lista jest pusta, sekcja „Realizacje” jest ukryta.
  gallery: [] as { src: string; alt: { pl: string; de: string; en: string } }[],
};

export const locales = ['pl', 'de', 'en'] as const;
export type Lang = (typeof locales)[number];
