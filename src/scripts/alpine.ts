import Alpine from 'alpinejs';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

interface MethodFilterOptions {
  mobileOnlyDefault?: boolean;
  categoryDefault?: string;
}

// Sdílená filtrovací logika pro "Najdi si cestu" i pro filtr uvnitř
// jednotlivých kategorií. Karty možností (MethodCard.astro) nesou
// data-* atributy (data-categories, data-cost, data-difficulty,
// data-mobile-only) – filtr jen přepíná jejich `hidden` atribut podle
// aktuálně zvolených hodnot, žádný framework na renderování gridu
// není potřeba. `data-categories` je seznam oddělený mezerou (primární
// + vedlejší kategorie), aby metoda patřící do víc sekcí (např. AI i
// Gaming) prošla filtrem v obou.
Alpine.data('methodFilter', (options: MethodFilterOptions = {}) => ({
  category: options.categoryDefault ?? 'all',
  cost: 'all',
  difficulty: 'all',
  mobileOnly: options.mobileOnlyDefault ?? false,
  visibleCount: 0,

  apply() {
    const cards = (this.$el as HTMLElement).querySelectorAll<HTMLElement>('[data-method-card]');
    let count = 0;
    cards.forEach((card) => {
      const categories = (card.dataset.categories ?? '').split(' ');
      const matches =
        (this.category === 'all' || categories.includes(this.category)) &&
        (this.cost === 'all' || card.dataset.cost === this.cost) &&
        (this.difficulty === 'all' || card.dataset.difficulty === this.difficulty) &&
        (!this.mobileOnly || card.dataset.mobileOnly === 'true');
      card.hidden = !matches;
      if (matches) count += 1;
    });
    this.visibleCount = count;
  },
}));

interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const CONSENT_KEY = 'cookie-consent';

function readConsent(): CookieConsent | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null');
  } catch {
    return null;
  }
}

// Cookie lišta (CookieBanner.astro). Výchozí Consent Mode stav nastavuje
// inline skript v BaseLayout.astro před GTM, tady jen ukládáme volbu
// a posíláme update. Event `cookie_consent_update` jde v GTM použít jako
// spouštěč pro tagy, které consent mode nativně nepodporují.
Alpine.data('cookieConsent', () => {
  const saved = readConsent();
  return {
    open: saved === null,
    details: false,
    analytics: saved?.analytics ?? false,
    marketing: saved?.marketing ?? false,

    init() {
      document.addEventListener('click', (event) => {
        if ((event.target as HTMLElement).closest('[data-cookie-settings]')) {
          event.preventDefault();
          this.details = true;
          this.open = true;
        }
      });
    },

    save(analytics: boolean, marketing: boolean) {
      this.analytics = analytics;
      this.marketing = marketing;
      const consent: CookieConsent = { analytics, marketing, updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      } catch {
        // Úložiště nedostupné (anonymní okno apod.) – souhlas platí jen pro tuto stránku.
      }
      const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      // gtag musí do dataLayer posílat objekt `arguments`, ne pole – jinak ho GTM ignoruje.
      const gtag =
        w.gtag ??
        function (..._args: unknown[]) {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer.push(arguments);
        };
      gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
      });
      w.dataLayer.push({ event: 'cookie_consent_update', analytics, marketing });
      this.open = false;
      this.details = false;
    },
  };
});

window.Alpine = Alpine;
Alpine.start();
