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

window.Alpine = Alpine;
Alpine.start();
