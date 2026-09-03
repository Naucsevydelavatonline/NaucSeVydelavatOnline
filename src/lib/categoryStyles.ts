// Tailwind vyžaduje, aby se použité třídy objevily v kódu jako celé
// literály (jinak je JIT scanner nenajde a vyhodí je z buildu). Proto tu
// místo skládání `bg-${barva}-100` držíme pevnou mapu – `accentColor`
// v content frontmatteru zůstává jen čitelný popisek pro autory obsahu.

export interface CategoryStyle {
  badge: string; // pozadí + text pro drobný štítek
  border: string; // barva rámečku karty při hoveru
  iconBg: string; // pozadí kolem emoji ikony
}

const violet: CategoryStyle = {
  badge: 'bg-violet-100 text-violet-700',
  border: 'hover:border-violet-400',
  iconBg: 'bg-violet-100',
};

const lime: CategoryStyle = {
  badge: 'bg-lime-100 text-lime-800',
  border: 'hover:border-lime-400',
  iconBg: 'bg-lime-100',
};

const red: CategoryStyle = {
  badge: 'bg-red-100 text-red-700',
  border: 'hover:border-red-400',
  iconBg: 'bg-red-100',
};

export const categoryStyles: Record<string, CategoryStyle> = {
  ai: violet,
  'tvorba-obsahu': lime,
  freelance: lime,
  ecommerce: lime,
  'socialni-site': lime,
  'online-podnikani': lime,
  finance: lime,
  'gaming-streaming': lime,
  academy: lime,
  'scam-alert': red,
};

export function getCategoryStyle(categoryId: string): CategoryStyle {
  return categoryStyles[categoryId] ?? lime;
}
