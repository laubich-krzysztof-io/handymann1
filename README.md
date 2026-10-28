# handyman.karkonosze

Strona usług naprawczych i stałej opieki nad obiektami w Karkonoszach. Astro, statyczny HTML, trzy języki (PL / DE / EN), lokalne fonty i zdjęcia z rzeczywistej realizacji.

## Uruchomienie

Zalecany Node.js 24 LTS (testy korzystają z natywnej obsługi TypeScript).

```sh
npm ci
npm run dev
```

Podgląd: `http://localhost:4321/pl/`. Pozostałe wersje: `/de/` i `/en/`.

```sh
npm run check
npm test
npm run build
npm run preview
```

## Wersja `codex/karkonosze-redesign`

- Nowy układ z prawdziwym zdjęciem wykonawcy i realizacji, lokalnym charakterem oraz czytelną ofertą.
- Wybór usługi przenosi ją do formularza kontaktowego.
- Galeria pozwala obejrzeć przygotowanie, malowanie, detal i gotowy efekt. Bez JavaScript pokazuje wszystkie zdjęcia.
- Kalkulator podaje koszt netto, VAT i brutto, korzystając ze stawek w `src/config.ts`. Pierwsza godzina obejmuje dojazd; kolejne rozpoczęte pół godziny są naliczane w całości. Obliczenia w groszach ograniczają błędy zaokrągleń.
- Kalkulator dotyczy zwykłego terminu. Dopłaty za pilne zlecenia, noce i święta są opisane oddzielnie. Kwota jest orientacyjna, a nie ofertą zaakceptowaną przez wykonawcę.
- Formularz przygotowuje link do WhatsAppa lub poczty. Nie wysyła wiadomości automatycznie i nie przechowuje danych. Klient otwiera przygotowaną wiadomość osobnym przyciskiem. Bez JavaScript pozostają bezpośrednie linki kontaktowe.
- Menu mobilne działa z klawiaturą, zamyka się klawiszem Escape i przywraca fokus. Strona respektuje ograniczenie animacji.

## Gdzie edytować

- `src/config.ts`: kontakt, cennik, VAT, obszar działania, dane firmy i opcjonalne dodatkowe zdjęcia.
- `src/i18n/content.ts`: istniejące opisy usług, cennik, FAQ i dane realizacji.
- `src/i18n/redesign.ts`: teksty nowego układu, formularza i kalkulatora w trzech językach.
- `src/styles/global.css`: kolory, typografia, układ i reguły responsywne.
- `src/components/`: nagłówek, stopka, formularz, galeria, kalkulator i ikony.
- `src/lib/estimate.ts`: obliczenia kosztów i formatowanie waluty; testy w `tests/estimate.test.mjs`.

## Podgląd i publikacja

Gałąź jest osobną propozycją do porównania z `main`. Integracja GitHub–Vercel może tworzyć automatyczne wdrożenie Preview po wypchnięciu gałęzi.

Przed docelową publikacją należy uzupełnić istniejące puste dane firmy (`company`, `nip`, `address`) i potwierdzić domenę w `astro.config.mjs`. Ustawienie `site.indexable` pozostaje `false`, zgodnie z wersją bazową. Zmiana wyglądu nie włącza indeksowania.
