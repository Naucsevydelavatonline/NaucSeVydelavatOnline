import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// Sdílené enumy napříč kolekcemi -----------------------------------------

const langEnum = z.enum(['cs', 'en']).default('cs');

const difficultyEnum = z.enum(['zacatecnik', 'stredni', 'pokrocily']);

const startupCostEnum = z.enum(['zdarma', 'do-500', 'do-5000', '5000-plus']);

const timeToStartEnum = z.enum(['ihned', 'dny', 'tydny', 'mesice']);

// `categories` – 8 hlavních kategorií -------------------------------------

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    lang: langEnum,
    id: z.string(), // stabilní klíč, např. "ai" – používá se v methods.category
    title: z.string(),
    emoji: z.string(),
    shortDescription: z.string(),
    // Tailwind barevný token pro akcent kategorie, např. "violet"
    accentColor: z.string(),
    order: z.number(),
  }),
});

// `methods` – jednotlivé možnosti vydělávání ------------------------------

const methods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/methods' }),
  schema: ({ image }) =>
    z.object({
      lang: langEnum,
      // Explicitní slug (nezávislý na cestě k souboru), používá se v URL
      // /moznosti/[slug] – díky tomu můžou soubory ležet v podsložkách
      // podle jazyka (cs/, později en/), aniž by se URL rozpadla.
      slug: z.string(),
      title: z.string(),
      // Odkazuje na `id` z kolekce `categories` (ne na Astro reference –
      // vyhýbáme se tak id s prefixem podsložky jazyka, viz lib/content.ts).
      category: z.string(),
      // Volitelné další kategorie, ve kterých se metoda má taky zobrazit
      // (např. AI metoda, která patří i do Gaming a streaming) – metoda
      // pak žije v jedné složce/souboru, ale objeví se v obou výpisech.
      secondaryCategories: z.array(z.string()).default([]),
      shortDescription: z.string(),

      // Co přesně bude dělat / Jak na tom vydělává
      whatYouDo: z.string(),
      howYouEarn: z.string(),

      // Kolik stojí začít / co potřebuje / stačí mobil?
      startupCost: startupCostEnum,
      startupCostNote: z.string().optional(),
      requirements: z.array(z.string()),
      mobileOnly: z.boolean().default(false),

      // Jak obtížné to je / jak rychle může začít
      difficulty: difficultyEnum,
      timeToStart: timeToStartEnum,

      // Jak získat prvního zákazníka (delší markdown text v body, tady jen shrnutí)
      firstClientTip: z.string(),

      // Doporučené nástroje – odkazy do affiliate registru (src/data/affiliate-links.ts)
      tools: z
        .array(
          z.object({
            toolId: z.string(),
            note: z.string().optional(),
          })
        )
        .default([]),

      // Realistický potenciál příjmu
      incomePotential: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.literal('Kč').default('Kč'),
        period: z.enum(['mesic', 'projekt', 'hodina']).default('mesic'),
        note: z.string(),
      }),

      // Výhody / rizika a nevýhody
      advantages: z.array(z.string()).default([]),
      risks: z.array(z.string()),

      // Kde a jak začít – sjednocuje "kde se registrovat", "jaké platformy/
      // marketplace/affiliate sítě existují" a "relevantní affiliate
      // nabídky" do jedné strukturované sekce. `toolId` je nepovinný odkaz
      // do src/data/affiliate-links.ts, pokud pro platformu existuje
      // partnerský odkaz; `hasAffiliateProgram` řídí zobrazení affiliate
      // odznaku i bez konkrétního toolId.
      platforms: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
            toolId: z.string().optional(),
            regions: z.string().optional(), // např. "celosvětově", "jen ČR/SK"
            pricingNote: z.string().optional(), // "zdarma", "provize 10 %"...
            hasAffiliateProgram: z.boolean().default(false),
            note: z.string().optional(),
          })
        )
        .default([]),

      // Start od nuly – krok za krokem (checklist)
      zeroToStartSteps: z.array(z.string()).default([]),

      // Orientační plán prvního týdne
      firstWeekPlan: z
        .array(
          z.object({
            period: z.string(), // "Den 1–2", "Týden 1"...
            task: z.string(),
          })
        )
        .default([]),

      // Časté chyby / na co si dát pozor
      commonMistakes: z.array(z.string()).default([]),
      watchOutFor: z.array(z.string()).default([]),

      // Filtrování a vizuál
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      isPremium: z.boolean().default(false), // připraveno pro budoucí Academy paywall
      heroImage: image().optional(),

      // SEO
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

// `academy` – lekce a články ------------------------------------------------

const academy = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/academy' }),
  schema: z.object({
    lang: langEnum,
    slug: z.string(),
    title: z.string(),
    shortDescription: z.string(),
    level: z.enum(['zacatecnik', 'pokrocily']),
    order: z.number().default(0),
    // Slugy metod z kolekce `methods` (viz methods.slug), rozřešeno ručně
    // v lib/content.ts – ze stejného důvodu jako u `methods.category`.
    relatedMethods: z.array(z.string()).default([]),
    isPremium: z.boolean().default(false),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

// `scamAlerts` – vzdělávací sekce o online podvodech ------------------------
//
// Není to "možnost vydělávání" (jiný účel obsahu – ochrana, ne výdělek).
// Přesto se surfuje i jako položka v `categories` (id "scam-alert"), aby
// měla vlastní místo v navigaci a v gridu kategorií vedle Academy – jen
// se u ní na kategorii stránce místo FilterBaru+metod vykreslí seznam
// těchto varování (viz src/pages/kategorie/[category].astro). Reálné
// případy se prezentují jako vzdělávací případové studie (viz
// `caseStudyNote`), nikdy jako návod.

const scamAlerts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scam-alerts' }),
  schema: z.object({
    lang: langEnum,
    slug: z.string(),
    title: z.string(),
    shortDescription: z.string(),
    scamType: z.string(), // "investiční platformy", "crypto", "phishing"...
    howItWorks: z.string(),
    howVictimsAreLured: z.string(),
    warningSigns: z.array(z.string()),
    howToVerify: z.array(z.string()),
    howToProtect: z.array(z.string()),
    whereToReport: z.array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
      })
    ),
    // Volitelná ukázka nástrojů, kterými se podobný obsah reálně vyrábí –
    // ne doporučení k použití, ale ilustrace toho, jak dostupné/reálné to
    // je. Stejný registr a komponenta jako u methods.tools.
    tools: z
      .array(
        z.object({
          toolId: z.string(),
          note: z.string().optional(),
        })
      )
      .default([]),
    caseStudyNote: z.string().optional(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { categories, methods, academy, scamAlerts };

export type DifficultyLevel = z.infer<typeof difficultyEnum>;
export type StartupCost = z.infer<typeof startupCostEnum>;
export type TimeToStart = z.infer<typeof timeToStartEnum>;
