import { getCollection, type CollectionEntry } from 'astro:content';

export type CategoryEntry = CollectionEntry<'categories'>;
export type MethodEntry = CollectionEntry<'methods'>;
export type AcademyEntry = CollectionEntry<'academy'>;
export type ScamAlertEntry = CollectionEntry<'scamAlerts'>;

const CURRENT_LANG = 'cs';

export async function getCategories(): Promise<CategoryEntry[]> {
  const all = await getCollection('categories', (c) => c.data.lang === CURRENT_LANG);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getCategoryById(id: string): Promise<CategoryEntry | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.data.id === id);
}

export async function getMethods(): Promise<MethodEntry[]> {
  return getCollection('methods', (m) => m.data.lang === CURRENT_LANG);
}

export async function getMethodBySlug(slug: string): Promise<MethodEntry | undefined> {
  const methods = await getMethods();
  return methods.find((m) => m.data.slug === slug);
}

export function methodBelongsToCategory(method: MethodEntry, categoryId: string): boolean {
  return method.data.category === categoryId || method.data.secondaryCategories.includes(categoryId);
}

export async function getMethodsByCategory(categoryId: string): Promise<MethodEntry[]> {
  const methods = await getMethods();
  return methods
    .filter((m) => methodBelongsToCategory(m, categoryId))
    .sort((a, b) => a.data.title.localeCompare(b.data.title, 'cs'));
}

export async function getFeaturedMethods(limit = 4): Promise<MethodEntry[]> {
  const methods = await getMethods();
  return methods.filter((m) => m.data.featured).slice(0, limit);
}

export async function getMobileOnlyMethods(): Promise<MethodEntry[]> {
  const methods = await getMethods();
  return methods.filter((m) => m.data.mobileOnly);
}

export async function getAcademyLessons(): Promise<AcademyEntry[]> {
  const lessons = await getCollection('academy', (a) => a.data.lang === CURRENT_LANG);
  return lessons.sort((a, b) => a.data.order - b.data.order);
}

export async function getAcademyLessonBySlug(slug: string): Promise<AcademyEntry | undefined> {
  const lessons = await getAcademyLessons();
  return lessons.find((l) => l.data.slug === slug);
}

export async function getRelatedMethods(slugs: string[]): Promise<MethodEntry[]> {
  const methods = await getMethods();
  return slugs
    .map((slug) => methods.find((m) => m.data.slug === slug))
    .filter((m): m is MethodEntry => Boolean(m));
}

export async function getRelatedAcademyLessons(methodSlug: string): Promise<AcademyEntry[]> {
  const lessons = await getAcademyLessons();
  return lessons.filter((l) => l.data.relatedMethods.includes(methodSlug));
}

export async function getScamAlerts(): Promise<ScamAlertEntry[]> {
  const alerts = await getCollection('scamAlerts', (a) => a.data.lang === CURRENT_LANG);
  return alerts.sort((a, b) => a.data.title.localeCompare(b.data.title, 'cs'));
}

export async function getScamAlertBySlug(slug: string): Promise<ScamAlertEntry | undefined> {
  const alerts = await getScamAlerts();
  return alerts.find((a) => a.data.slug === slug);
}
