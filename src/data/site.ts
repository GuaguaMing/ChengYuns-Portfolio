export const profile = {
  name: '蔡承芸',
  nameEn: 'Cheng Yun Tsai',
  role: 'UI/UX 設計師',
  email: 'pantxiketsai499@gmail.com',
  cv: '/cv.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/guaguaming' },
    { label: 'Instagram @wywy_studio', href: 'https://instagram.com/wywy_studio' },
  ],
};

export type CategoryId = 'ui-ux' | 'physical' | 'games';

export const categories: {
  id: CategoryId;
  index: string;
  title: string;
  keywords: string;
  philosophy: string;
  miniTitle: string;
  miniNote: string;
}[] = [
  {
    id: 'ui-ux',
    index: '01',
    title: 'UI / UX 設計',
    keywords: 'Research · IA · Accessibility · Front-end',
    philosophy:
      '從真實問題出發：訪談第一線、重整資訊架構，讓醫療、公共與學術平台的複雜資訊變得清楚、可被信任。',
    miniTitle: 'RESEARCH NOTE',
    miniNote: '保密專案僅以文字摘要呈現',
  },
  {
    id: 'physical',
    index: '02',
    title: '實體創作',
    keywords: 'Toy · Graphic · Brand Visual',
    philosophy: '把角色與品牌從螢幕帶到手上：3D 建模、塗裝、包裝到展場，以及平面主視覺與周邊產品。',
    miniTitle: 'MINI WORKS',
    miniNote: '單張作品以 Lightbox 檢視',
  },
  {
    id: 'games',
    index: '03',
    title: '遊戲設計',
    keywords: 'Unity · AR · Tech Art · Narrative',
    philosophy: '用玩法說故事：從世界觀與角色設定，到 Unity 技術美術與 AR 現地互動。',
    miniTitle: 'EARLY WORKS',
    miniNote: '校內作業，精簡呈現學習軌跡',
  },
];

export const nav = [
  ...categories.map((c) => ({ label: c.title, href: `/works/${c.id}/` })),
  { label: '其他歷程', href: '/archive/' },
  { label: '關於我', href: '/about/' },
];
