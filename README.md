# Handyman

Strona wizytówkowa (tylko po polsku) dla marki Handyman: usługi dla pensjonatów, małych hoteli, firm i domów w Karkonoszach.

Astro, statyczny build, wdrożenie na Vercel.

## Uruchomienie

```
npm install
npm run dev
npm run build
```

## Co uzupełnić przed publikacją

- `src/config.ts`: telefon, WhatsApp, e-mail, dane firmy do stopki.
- `astro.config.mjs` → `site`: docelowa domena.
- `src/i18n/content.ts`: teksty strony.

## Gałąź `referencja`: układ wzorowany na holiday.cyprianerhof.com

- Kroje: EB Garamond (nagłówki, ceny) i Mona Sans (tekst). Kolory: tło #F2F2F2, grafit #2D2D2D, żółty #FFF0B0, lawenda #CACEFF.
- Style: `src/styles/ref.css`, skrypt: `src/scripts/ref.ts` (zakładki, formularz, pojawianie się sekcji), treści sekcji: `src/i18n/ref.ts`
  (fakty z `content.ts` i `config.ts`, więc cennik zmienia się w jednym miejscu).
- **Zdjęcia:** `src/photos.ts`. Gdzie jest `src: null`, strona pokazuje podpisaną ramkę „Zdjęcie do uzupełnienia” z opisem, co ma być
  na zdjęciu. Żeby dodać zdjęcie: wrzuć plik do `public/img/` (najlepiej .webp, ok. 1600 px; do galerii też wersja `-900.webp`)
  i wpisz ścieżkę, np. `src: '/img/hydraulika-1.webp'`. Ramki mają te same proporcje co zdjęcia, układ się nie przesunie.
