import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Zatím jen čeština, bez URL prefixu (čisté URL: /kategorie/ai, /moznosti/...).
// Až přibude angličtina, stačí doplnit locale do pole `locales` a založit
// zrcadlenou strukturu stránek pod `src/pages/en/` – čeština se nezmění.
export default defineConfig({
  site: 'https://naucsevydelavatonline.cz',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
