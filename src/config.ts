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

export const locales = ['pl', 'de', 'en'] as const;
export type Lang = (typeof locales)[number];
