// Centrální registr affiliate/partnerských nástrojů.
//
// Proč takhle: každá "možnost vydělávání" v src/content/methods odkazuje
// na nástroj přes `toolId`, ne přes přímou URL. Když se změní affiliate
// odkaz nebo přibude nová partnerská smlouva, upravuje se JEN tento
// soubor – ne desítky markdown souborů. Komponenta `AffiliateLink.astro`
// tento registr čte a když pro nástroj ještě affiliate odkaz není,
// automaticky použije `fallbackUrl` (běžný odkaz na nástroj), takže
// obsah lze psát dřív, než je partnerství domluvené.
//
// Později: tahle struktura se dá 1:1 přesunout do DB tabulky
// (id, name, affiliateUrl, fallbackUrl, category, clicks, ...), aniž by
// se muselo měnit API komponenty AffiliateLink.

export interface AffiliateTool {
  id: string;
  name: string;
  description: string;
  /** Aktivní partnerský odkaz. Když chybí, použije se fallbackUrl. */
  affiliateUrl?: string;
  /** Běžný (neafiliovaný) odkaz na nástroj – vždy vyplněný. */
  fallbackUrl: string;
  category: string;
  /** Zobrazí se vedle odkazu, pokud jde o affiliate odkaz. */
  disclosureText: string;
}

export const affiliateTools: Record<string, AffiliateTool> = {
  'capcut': {
    id: 'capcut',
    name: 'CapCut',
    description: 'Střih videa a titulky pro Shorts/Reels/TikTok, zdarma pro mobil i desktop.',
    fallbackUrl: 'https://www.capcut.com/',
    category: 'ai-video',
    disclosureText: 'partnerský odkaz',
  },
  'elevenlabs': {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI hlasy pro voiceover a dabing ve velkém množství jazyků.',
    fallbackUrl: 'https://elevenlabs.io/',
    category: 'ai-audio',
    disclosureText: 'partnerský odkaz',
  },
  'chatgpt': {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'AI asistent pro copywriting, nápady, automatizaci a AI agenty.',
    fallbackUrl: 'https://chatgpt.com/',
    category: 'ai-text',
    disclosureText: 'partnerský odkaz',
  },
  'canva': {
    id: 'canva',
    name: 'Canva',
    description: 'Grafický editor s AI nástroji pro design, thumbnaily a sociální sítě.',
    fallbackUrl: 'https://www.canva.com/',
    category: 'ai-design',
    disclosureText: 'partnerský odkaz',
  },
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Generování AI obrázků v kvalitě vhodné i pro komerční použití.',
    fallbackUrl: 'https://www.midjourney.com/',
    category: 'ai-image',
    disclosureText: 'partnerský odkaz',
  },
  'fiverr': {
    id: 'fiverr',
    name: 'Fiverr',
    description: 'Freelance tržiště pro nabízení služeb zahraničním klientům.',
    fallbackUrl: 'https://www.fiverr.com/',
    category: 'freelance',
    disclosureText: 'partnerský odkaz',
  },
  'upwork': {
    id: 'upwork',
    name: 'Upwork',
    description: 'Freelance platforma pro dlouhodobější zakázky a klienty.',
    fallbackUrl: 'https://www.upwork.com/',
    category: 'freelance',
    disclosureText: 'partnerský odkaz',
  },
  'shopify': {
    id: 'shopify',
    name: 'Shopify',
    description: 'Založení e-shopu bez nutnosti programování.',
    fallbackUrl: 'https://www.shopify.com/',
    category: 'ecommerce',
    disclosureText: 'partnerský odkaz',
  },
  'make': {
    id: 'make',
    name: 'Make (dříve Integromat)',
    description: 'Vizuální nástroj pro AI automatizace a propojování aplikací bez kódu.',
    fallbackUrl: 'https://www.make.com/',
    category: 'ai-automation',
    disclosureText: 'partnerský odkaz',
  },
  'suno': {
    id: 'suno',
    name: 'Suno',
    description: 'Tvorba hudby a písní pomocí AI z textového zadání.',
    fallbackUrl: 'https://suno.com/',
    category: 'ai-music',
    disclosureText: 'partnerský odkaz',
  },
  'distrokid': {
    id: 'distrokid',
    name: 'DistroKid',
    description: 'Distribuce hudby na Spotify, Apple Music a další streamovací služby.',
    fallbackUrl: 'https://distrokid.com/',
    category: 'music-distribution',
    disclosureText: 'partnerský odkaz',
  },
  'etsy': {
    id: 'etsy',
    name: 'Etsy',
    description: 'Tržiště pro ruční výrobky, vintage a digitální produkty s vlastním publikem kupujících.',
    fallbackUrl: 'https://www.etsy.com/',
    category: 'ecommerce',
    disclosureText: 'partnerský odkaz',
  },
  'twitch': {
    id: 'twitch',
    name: 'Twitch',
    description: 'Živé streamování s vestavěnou monetizací (subscriptions, bits, reklamy).',
    fallbackUrl: 'https://www.twitch.tv/',
    category: 'streaming',
    disclosureText: 'partnerský odkaz',
  },
};

export function getAffiliateTool(toolId: string): AffiliateTool | undefined {
  return affiliateTools[toolId];
}
