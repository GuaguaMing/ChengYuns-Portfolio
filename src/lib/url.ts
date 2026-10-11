// 部署在 GitHub Pages 子路徑（/ChengYuns-Portfolio/），站內連結一律經過這裡補上 base
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
