// 首頁 Hero 輪播的 3D 模型
// src：models-src/ 內的原始 FBX；slug：轉出的 public/models/{slug}.glb
// base：最好看的那一面（弧度，x 俯仰、y 左右）
// simplify：減面設定（預設保留 10% 面數、容許誤差 0.002），檔案太大時調低 ratio、調高 error
// exclude：轉檔時刪掉的節點名稱（隱藏的舊版本、重疊的備份物件）
// mirror：被改過名字的對稱生成器（名稱含 Mirror / 映象 等的會自動處理）
// scale / offset / exposure：顯示時的放大倍率、位置微調（x 正值往右）、亮度（1 為原樣）
export type HeroModel = {
  slug: string;
  name: string;
  src: string;
  base: { x: number; y: number };
  simplify?: { ratio: number; error: number };
  exclude?: string[];
  mirror?: string[];
  scale?: number;
  offset?: { x: number; y: number };
  exposure?: number;
};

export const heroModels: HeroModel[] = [
  { slug: 'hyrax', name: '蹄兔', src: '蹄兔.fbx', base: { x: 0.1, y: 0.6 } },
  {
    slug: 'mr',
    name: 'Mr.',
    src: 'Mr.fbx',
    base: { x: 0.1, y: 0.7 },
    simplify: { ratio: 0.03, error: 0.01 },
    // Button / Button_add_mouth / 超級分屍：與「八爪」重疊的舊版底座；Mesh：未上色的白色身體
    exclude: ['Button', 'Button_add_mouth', '超級分屍', 'Mesh'],
    scale: 1.25,
  },
  { slug: 'planet-bafei', name: '星球巴非', src: '星球巴非.fbx', base: { x: 0.1, y: 0.4 }, mirror: ['Hand', 'Hand 1', 'Ear'], scale: 0.9 },
  { slug: 'jiwawa', name: '機蛙蛙', src: '2023 哈潮玩 怪獸造型創作大賽-B-機蛙蛙.fbx', base: { x: 0.1, y: 0.5 }, scale: 0.8 },
  {
    slug: 'changle-segua',
    name: '暢樂嗇呱',
    src: '2024哈潮玩 怪獸造型創作大賽-B-暢樂嗇呱.fbx',
    base: { x: 0.1, y: -0.5 },
    offset: { x: 0.3, y: 0 },
  },
  // 頂點色本身接近純白，壓低亮度才看得出明暗
  { slug: 'knot', name: '打結', src: '打結.fbx', base: { x: 0.1, y: 0 }, scale: 1.15, offset: { x: 0.35, y: 0.1 }, exposure: 0.7 },
];
