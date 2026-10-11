import { getImage } from 'astro:assets';
import type { Media } from './media';

/** 產生 Lightbox 用的大圖網址（JSON 字串，放進 data-lightbox） */
export async function lightboxData(items: Media[]) {
  const out = await Promise.all(
    items.map(async (m) => ({ src: (await getImage({ src: m.src, width: Math.min(1800, m.src.width) })).src, caption: m.caption })),
  );
  return JSON.stringify(out);
}
