import type { ImageMetadata } from 'astro';

/**
 * 圖片自動對應：src/assets/works/<作品 id>/
 *   cover.jpg          → 封面
 *   01-說明文字.jpg    → 內頁圖，依檔名排序，「01-」之後的文字成為圖說
 * 新增或替換圖片只要放進資料夾即可，不需改程式。
 */
const workFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/works/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const honorFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/honors/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export interface Media {
  src: ImageMetadata;
  caption: string;
}

const parse = (path: string) => {
  const [, folder, file] = path.match(/\/([^/]+)\/([^/]+)$/)!;
  const base = file.replace(/\.[^.]+$/, '');
  return { folder, base, caption: base.replace(/^\d+[-_ ]?/, '') };
};

export function getWorkMedia(id: string): { cover?: ImageMetadata; gallery: Media[] } {
  const entries = Object.entries(workFiles)
    .map(([path, mod]) => ({ ...parse(path), src: mod.default }))
    .filter((f) => f.folder === id)
    .sort((a, b) => a.base.localeCompare(b.base, 'zh-Hant', { numeric: true }));
  const cover = entries.find((f) => f.base === 'cover')?.src;
  const gallery = entries.filter((f) => f.base !== 'cover').map(({ src, caption }) => ({ src, caption }));
  return { cover: cover ?? gallery[0]?.src, gallery };
}

export function getHonorImage(name: string): ImageMetadata | undefined {
  return Object.entries(honorFiles).find(([path]) => parse(path).base === name)?.[1].default;
}
