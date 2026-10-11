export type HonorType = 'award' | 'certificate' | 'community' | 'campus';

export const honorTypes: Record<HonorType, string> = {
  award: '獎項 Awards',
  certificate: '證照 Certificate',
  community: '社會參與 Community',
  campus: '校務 Campus',
};

/** images: file names (without extension) in src/assets/honors/ */
export const honors: {
  year: string;
  title: string;
  type: HonorType;
  body: string;
  images?: string[];
  work?: { label: string; href: string };
}[] = [
  {
    year: '2024',
    title: '城市浪人 夢想行動特別獎',
    type: 'award',
    body: '流浪挑戰賽完賽，並獲夢想行動特別獎。',
    images: ['city-wanderer', 'city-wanderer-finish'],
  },
  {
    year: '2023',
    title: '新一代設計展 現場觀眾票選最佳人氣獎',
    type: 'award',
    body: "畢業專題遊戲 Cat's Paw 參展；亦參與巴哈姆特 ACG 創作大賽。",
    work: { label: "Cat's Paw", href: '/works/games/cats-paw/' },
  },
  {
    year: '2023',
    title: '哈潮玩怪獸造型創作大賽 平面組入圍',
    type: 'award',
    body: '以「機蛙蛙」參賽第四屆大賽入圍。',
    images: ['hachao-finalist'],
    work: { label: '機蛙蛙', href: '/works/physical/#jiwawa' },
  },
  {
    year: '2023',
    title: '大同大學 董事長獎',
    type: 'award',
    body: '歷年班排名 1/34。',
    images: ['chairman-award'],
  },
  {
    year: '2022 — 2023',
    title: '畢業製作籌辦委員會 副召集人',
    type: 'campus',
    body: '統籌系上畢業展籌辦與對外展出。',
  },
  {
    year: '2022',
    title: '新北市政府 文化菁英',
    type: 'community',
    body: '新北市文化大使計畫，獲頒文化菁英、文化楷模與文化新秀。',
    images: ['culture-elite', 'culture-model', 'culture-rookie'],
  },
  {
    year: '2021 — 2022',
    title: '新北文化大使',
    type: 'community',
    body: '111 年度培訓與文化服務。',
    images: ['culture-ambassador'],
  },
  {
    year: '2020',
    title: '色彩規劃管理師（色彩計畫）初級',
    type: 'certificate',
    body: '經濟部產業人才能力鑑定；色彩理論、配色規劃與色彩管理實務。',
  },
];
