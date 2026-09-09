// Centrální SEO / social-preview resolver.
//
// Proč takhle: BaseLayout.astro dostává z jednotlivých stránek jen syrová
// data (title, description, ownImage, categoryId, ogType, případně
// hotový jsonLd uzel) a VŠECHNU odvozovací logiku (fallback řetězec OG
// obrázku, stavba JSON-LD objektů) dělá tenhle soubor. Jednotlivé .astro
// stránky tak nikdy neduplikují SEO logiku – jen zavolají helper nebo
// rovnou předají svá content-collection data do BaseLayout.
//
// Fallback řetězec OG obrázku (viz zadání):
//   1. vlastní obrázek stránky/tutorialu (ownImage)
//   2. obrázek jeho kategorie (podle categoryId, mapování níže)
//   3. globální default obrázek webu
//
// Cesty k obrázkům jsou obyčejné stringy mířící do `public/` – schválně
// NE Astro `image()` helper. Astro image() by při buildu ověřovalo, že
// soubor fyzicky existuje, a build by spadl, dokud nedodáme finální
// obrázky. Cesta do public/ se při buildu neověřuje – dokud soubor
// nepřibude, prohlížeč/scraper dostane na obrázek 404, ale stránka i
// build zůstanou v pořádku (viz zadání bod 8: "build se nesmí rozbít").

import { ui } from '../i18n/cs';

export const SITE_NAME = ui.siteName;

// Jediné místo v kódu, kde je oficiální kontaktní e-mail napsaný natvrdo –
// všude jinde (Footer, /o-projektu, affiliate disclosure, Organization
// JSON-LD) se importuje odsud. Změna e-mailu v budoucnu = úprava tady.
export const SITE_EMAIL = 'naucsevydelavatonline@gmail.com';

// Globální fallback (tier 3) – použije se, když stránka ani její kategorie
// nemají vlastní obrázek. Soubor: public/og/default.jpg.
export const DEFAULT_OG_IMAGE = '/og/default.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'Nauč se vydělávat online – praktický český web o reálném vydělávání peněz na internetu.';

// Fallback (tier 2) podle kategorie – klíč odpovídá `categories.id`
// (src/content/categories/cs/*.md), tedy i `methods.category`. Soubory:
// public/og/categories/<id>.jpg.
const CATEGORY_OG_IMAGES: Record<string, string> = {
  ai: '/og/categories/ai.jpg',
  'tvorba-obsahu': '/og/categories/tvorba-obsahu.jpg',
  freelance: '/og/categories/freelance.jpg',
  ecommerce: '/og/categories/ecommerce.jpg',
  'socialni-site': '/og/categories/socialni-site.jpg',
  'online-podnikani': '/og/categories/online-podnikani.jpg',
  finance: '/og/categories/finance.jpg',
  'gaming-streaming': '/og/categories/gaming-streaming.jpg',
  academy: '/og/categories/academy.jpg',
  'scam-alert': '/og/categories/scam-alert.jpg',
};

const CATEGORY_OG_IMAGE_ALTS: Record<string, string> = {
  ai: 'Ilustrace ke kategorii Vydělávání s AI.',
  'tvorba-obsahu': 'Ilustrace ke kategorii Tvorba obsahu.',
  freelance: 'Ilustrace ke kategorii Freelance.',
  ecommerce: 'Ilustrace ke kategorii E-commerce.',
  'socialni-site': 'Ilustrace ke kategorii Sociální sítě.',
  'online-podnikani': 'Ilustrace ke kategorii Online podnikání.',
  finance: 'Ilustrace ke kategorii Finance a investování.',
  'gaming-streaming': 'Ilustrace ke kategorii Gaming a streaming.',
  academy: 'Ilustrace k sekci Academy.',
  'scam-alert': 'Ilustrace k sekci Scam Alert.',
};

export function getCategoryOgImage(categoryId: string | undefined): string | undefined {
  return categoryId ? CATEGORY_OG_IMAGES[categoryId] : undefined;
}

export interface ResolveOgImageInput {
  /** Vlastní obrázek stránky/tutorialu (`ogImage` z content collection), pokud je vyplněný. */
  ownImage?: string;
  /** Id kategorie (`categories.id`) pro fallback na tier 2. */
  categoryId?: string;
}

/** Fallback řetězec: vlastní obrázek → obrázek kategorie → globální default. */
export function resolveOgImage({ ownImage, categoryId }: ResolveOgImageInput): string {
  return ownImage || getCategoryOgImage(categoryId) || DEFAULT_OG_IMAGE;
}

export interface ResolveOgImageAltInput {
  ownAlt?: string;
  categoryId?: string;
}

/** Stejný fallback řetězec jako u obrázku, jen pro alt text. */
export function resolveOgImageAlt({ ownAlt, categoryId }: ResolveOgImageAltInput): string {
  return ownAlt || (categoryId && CATEGORY_OG_IMAGE_ALTS[categoryId]) || DEFAULT_OG_IMAGE_ALT;
}

// --- Structured data (JSON-LD) ---------------------------------------------
//
// Drženo záměrně minimální – žádné vymyšlené firemní údaje (logo, adresa,
// telefon, sociální profily), které projekt nikde jinde nemá.

export function organizationJsonLd(siteUrl: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl.toString(),
    email: SITE_EMAIL,
  };
}

export function websiteJsonLd(siteUrl: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl.toString(),
  };
}

export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}

/** Pro tutorialy / Academy lekce / Scam Alert detaily (og:type = article). */
export function articleJsonLd({ headline, description, datePublished, dateModified }: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: 'cs',
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export interface WebPageJsonLdInput {
  name: string;
  description: string;
}

/** Pro ostatní typy stránek (homepage, kategorie, statické stránky). */
export function webPageJsonLd({ name, description }: WebPageJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    inLanguage: 'cs',
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Absolutní URL položky (viz Breadcrumbs.astro, které ji sestaví z `Astro.site`). */
  url: string;
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
