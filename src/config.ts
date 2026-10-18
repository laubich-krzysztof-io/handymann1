// Dane kontaktowe i ustawienia strony. ZMIEŃ przed publikacją.
export const site = {
  name: 'handyman.karkonosze',
  // Indeksowanie w Google i AI. Zostaw false, dopóki telefon i e-mail są przykładowe.
  // Po wpisaniu prawdziwych danych zmień na true: zmieni się meta robots, robots.txt i sitemap.
  indexable: false,
  // Obszar działania (do danych strukturalnych i llms.txt)
  areas: ['Jelenia Góra', 'Lubomierz', 'Szklarska Poręba'],
  region: 'Karkonosze',
  // TODO: wpisz prawdziwy numer (format międzynarodowy) i e-mail
  phone: '+48 000 000 000',
  whatsapp: '48000000000', // sam numer, bez + i spacji
  email: 'kontakt@handyman.example',
  // TODO: dane firmy do stopki (nazwa, NIP)
  company: '',
  // Zdjęcia realizacji: wrzuć pliki do public/img/ i dopisz tutaj.
  // Dopóki lista jest pusta, sekcja „Realizacje” jest ukryta.
  // Czy dane kontaktowe są prawdziwe (gdy false, nie trafiają do danych strukturalnych)
  contactReady: false,
  gallery: [] as { src: string; alt: { pl: string; de: string; en: string } }[],
};

export const locales = ['pl', 'de', 'en'] as const;
export type Lang = (typeof locales)[number];
