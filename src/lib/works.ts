import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryId } from '../data/site';

export type Work = CollectionEntry<'works'>;

const byOrder = (a: Work, b: Work) => a.data.order - b.data.order;

export async function getWorks(category?: CategoryId) {
  const all = await getCollection('works', (w) => !category || w.data.category === category);
  return all.sort(byOrder);
}

export const cases = (works: Work[]) => works.filter((w) => w.data.kind === 'case');
export const minis = (works: Work[]) => works.filter((w) => w.data.kind === 'mini');

export const workHref = (w: Work) => `/works/${w.data.category}/${w.id}/`;
