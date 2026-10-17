import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: wpisz docelową domenę po wdrożeniu
  site: 'https://handymann.vercel.app',
  i18n: {
    locales: ['pl', 'de', 'en'],
    defaultLocale: 'pl',
    routing: { prefixDefaultLocale: true },
  },
});
