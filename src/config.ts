// Dane kontaktowe i ustawienia strony. ZMIEŃ przed publikacją.
export const site = {
  name: 'Handyman',
  // TODO: wpisz prawdziwy numer (format międzynarodowy) i e-mail
  phone: '+48 000 000 000',
  whatsapp: '48000000000', // sam numer, bez + i spacji
  email: 'kontakt@handyman.example',
  // TODO: dane firmy do stopki (nazwa, NIP)
  company: '',
  // Zdjęcia realizacji: wrzuć pliki do public/img/ i dopisz tutaj.
  // Dopóki lista jest pusta, sekcja „Realizacje” jest ukryta.
  gallery: [] as { src: string; alt: { pl: string; de: string; en: string } }[],
};

// Obszar działania: miejscowości na mapie (x, y w układzie mapy 600 × 690).
// tier: 'core' = na co dzień, 'extended' = na zapytanie. Zmień według potrzeb.
export const towns: { name: string; x: number; y: number; tier: 'core' | 'extended'; label?: 'left' | 'right' | 'above' }[] = [
  { name: 'Lwówek Śląski', x: 295, y: 60, tier: 'extended' },
  { name: 'Gryfów Śląski', x: 135, y: 184, tier: 'core' },
  { name: 'Lubomierz', x: 219, y: 212, tier: 'core' },
  { name: 'Wleń', x: 379, y: 206, tier: 'core' },
  { name: 'Mirsk', x: 101, y: 276, tier: 'core' },
  { name: 'Stara Kamienica', x: 310, y: 342, tier: 'core' , label: 'left' },
  { name: 'Jeżów Sudecki', x: 418, y: 318, tier: 'core' },
  { name: 'Jelenia Góra', x: 439, y: 377, tier: 'core' },
  { name: 'Świeradów-Zdrój', x: 62, y: 370, tier: 'extended' , label: 'right' },
  { name: 'Piechowice', x: 303, y: 460, tier: 'core' },
  { name: 'Szklarska Poręba', x: 234, y: 497, tier: 'core' , label: 'left' },
  { name: 'Podgórzyn', x: 389, y: 486, tier: 'extended' , label: 'left' },
  { name: 'Mysłakowice', x: 489, y: 476, tier: 'extended' , label: 'above' },
  { name: 'Karpacz', x: 462, y: 574, tier: 'extended' , label: 'left' },
  { name: 'Kowary', x: 537, y: 549, tier: 'extended' , label: 'left' },
];

export const locales = ['pl', 'de', 'en'] as const;
export type Lang = (typeof locales)[number];
