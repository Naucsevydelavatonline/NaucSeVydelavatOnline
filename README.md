# Nauč se vydělávat online

Praktický český vzdělávací web o tom, jak realisticky vydělávat peníze na
internetu. „Money Talks. Bullshit Walks.“

## Stack

- [Astro](https://astro.build) – statický, obsahový, SEO-first web
- Astro Content Collections (Markdown/MDX + Zod) – veškerý obsah
- [Tailwind CSS v4](https://tailwindcss.com) – styly
- [Alpine.js](https://alpinejs.dev) – lehká interaktivita (filtry, menu)
- TypeScript

Bez databáze a bez CMS backendu – obsah žije jako soubory v repozitáři a
je typovaný přes `src/content/config.ts`.

## Vývoj

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # statický build do dist/
npm run preview   # náhled produkčního buildu
```

## Struktura obsahu

```
src/content/
├── categories/cs/*.md   8 hlavních kategorií (metadata)
├── methods/cs/*.md      jednotlivé "možnosti vydělávání"
└── academy/cs/*.mdx     Academy lekce
```

### Přidání nové možnosti vydělávání

1. Vytvoř soubor `src/content/methods/cs/nazev-slugu.md`.
2. Vyplň frontmatter podle schématu v [src/content/config.ts](src/content/config.ts)
   (zkopíruj existující soubor jako šablonu).
3. `category` musí odpovídat `id` existující kategorie
   (`src/content/categories/cs/*.md`).
4. Nástroje v `tools` odkazují na `toolId` z
   [src/data/affiliate-links.ts](src/data/affiliate-links.ts) – když tam
   nástroj chybí, přidej ho tam nejdřív.

### Přidání affiliate nástroje

Uprav [src/data/affiliate-links.ts](src/data/affiliate-links.ts) – jedno
místo pro všechny partnerské odkazy. Dokud `affiliateUrl` není vyplněné,
komponenta `AffiliateLink.astro` automaticky použije `fallbackUrl`.

## Anglická verze (budoucnost)

- V `astro.config.mjs` přibude `en` do `i18n.locales`.
- Obsah: založí se `src/content/methods/en/`, `categories/en/`,
  `academy/en/` vedle stávajících `cs/` složek – beze změny češtiny.
- UI texty: založí se `src/i18n/en.ts` se stejným tvarem jako
  [src/i18n/cs.ts](src/i18n/cs.ts).
- Stránky pro `en` půjdou pod `src/pages/en/...` (zrcadlená struktura),
  čeština zůstává na kořenových URL beze změny.

## CMS (budoucnost)

Content Collections používají Astro Content Layer API (`glob` loader).
Až bude potřeba headless CMS, stačí v `src/content/config.ts` vyměnit
loader za CMS loader se stejným Zod schématem – šablony a komponenty se
nemění.
