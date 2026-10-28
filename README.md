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
- `src/config.ts` → `gallery`: zdjęcia realizacji (pliki do `public/img/`). Dopóki lista jest pusta, sekcja „Realizacje” jest ukryta.
- `astro.config.mjs` → `site`: docelowa domena.
- `src/i18n/content.ts`: teksty strony.
