import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: wpisz docelową domenę po wdrożeniu
  site: 'https://handymann.vercel.app',
  i18n: {
    locales: ['pl', 'de', 'en'],
    defaultLocale: 'pl',
    // Bez automatycznej strony „Redirecting…” (2 s opóźnienia): przekierowanie z / robi serwer (vercel.json)
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
