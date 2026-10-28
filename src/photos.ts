// Zdjęcia strony. Gdzie jest null, strona pokazuje podpisaną ramkę „Zdjęcie do uzupełnienia”.
// Żeby dodać zdjęcie: wrzuć plik do public/img/ (najlepiej .webp, ok. 1600 px szerokości)
// i wpisz tu jego ścieżkę, np. '/img/hydraulika-1.webp'. Opis (alt) mówi, co ma być na zdjęciu.
export interface Shot { src: string | null; alt: string; w?: number; h?: number }

const mural = (id: string, alt: string, w: number, h: number): Shot => ({ src: `/img/mural-${id}-1600.webp`, alt, w, h });

export const photos = {
  // Otwarcie na cały ekran: prawdziwe zlecenie (mural z górami)
  hero: mural('malowanie', 'Malowanie pomarańczowego szczytu wałkiem przy samej krawędzi taśmy', 1600, 1200),
  // Ciemny pas z cennikiem: tło
  band: mural('gotowe', 'Gotowa ściana z górami', 1200, 1600),
  hydraulika: [
    { src: null, alt: 'Wymiana baterii w łazience pensjonatu' },
    { src: null, alt: 'Syfon pod umywalką po naprawie' },
    { src: null, alt: 'Podłączenie pralki lub zmywarki' },
    { src: null, alt: 'Narzędzia hydrauliczne w pracy' },
  ] as Shot[],
  elektryka: [
    { src: null, alt: 'Wymiana gniazdka lub włącznika' },
    { src: null, alt: 'Oświetlenie nad lustrem w pokoju gościnnym' },
    { src: null, alt: 'Pomiar w rozdzielnicy' },
    { src: null, alt: 'Świadectwo kwalifikacyjne SEP' },
  ] as Shot[],
  montaz: [
    mural('tasma', 'Klejenie taśmy malarskiej przed malowaniem gór', 1200, 1600),
    mural('detal', 'Zdejmowanie taśmy z niebieskiego szczytu, widoczna ostra krawędź farby', 1200, 1600),
    { src: null, alt: 'Montaż mebli w apartamencie' },
    { src: null, alt: 'Regulacja drzwi lub zamka' },
  ] as Shot[],
};
