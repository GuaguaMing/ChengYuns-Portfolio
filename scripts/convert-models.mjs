// FBX → 網頁用 GLB：npm run models（或 npm run models -- hyrax 只轉單一模型）
// 1. FBX2glTF 轉成 GLB
// 2. 頂點色從 sRGB 轉為線性（FBX 存 sRGB，glTF 規定線性，不轉會偏白）
// 3. 對稱生成器（名稱為 Mirror / Symmetry / 映象 / 鏡像 / 對稱，或列在 mirror 的節點）的子物件補上鏡像那一半（FBX 不會烘焙生成器）
// 4. 刪掉 exclude 指定的節點；模型都沒貼圖，順便移除 UV（UV 接縫會讓頂點無法合併、減面失效）
// 5. gltf-transform optimize：減面 + meshopt 壓縮 + 貼圖轉 webp
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { NodeIO } from '@gltf-transform/core';
import { heroModels } from '../src/data/models.ts';

const FBX2GLTF = `node_modules/fbx2gltf/bin/${process.platform === 'darwin' ? 'Darwin' : process.platform === 'win32' ? 'Windows_NT' : 'Linux'}/FBX2glTF`;
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const only = process.argv.slice(2);
const tmp = mkdtempSync(join(tmpdir(), 'models-'));

for (const { slug, src, simplify = { ratio: 0.1, error: 0.002 }, exclude = [], mirror = [] } of heroModels.filter((m) => !only.length || only.includes(m.slug))) {
  console.log(`\n▶ ${src} → public/models/${slug}.glb`);
  const raw = join(tmp, slug);
  execFileSync(FBX2GLTF, ['--binary', '--input', join('models-src', src), '--output', raw], { stdio: 'inherit' });

  const io = new NodeIO();
  const doc = await io.read(`${raw}.glb`);
  const colors = new Set(
    doc.getRoot().listMeshes().flatMap((m) => m.listPrimitives().map((p) => p.getAttribute('COLOR_0')).filter(Boolean)),
  );
  for (const acc of colors) {
    const a = acc.getArray();
    const n = acc.getElementSize();
    for (let i = 0; i < a.length; i += n) for (let j = 0; j < 3; j++) a[i + j] = toLinear(a[i + j]);
  }
  for (const node of doc.getRoot().listNodes().filter((n) => n.listChildren().length && (/mirror|symmetry|映象|鏡像|對稱|镜像|对称/i.test(n.getName()) || mirror.includes(n.getName())))) {
    const [sx, sy, sz] = node.getScale();
    const twin = doc.createNode(`${node.getName()} R`).setTranslation(node.getTranslation()).setRotation(node.getRotation()).setScale([-sx, sy, sz]);
    const copy = (n) => {
      const c = doc.createNode(`${n.getName()} R`).setTranslation(n.getTranslation()).setRotation(n.getRotation()).setScale(n.getScale()).setMesh(n.getMesh());
      n.listChildren().forEach((child) => c.addChild(copy(child)));
      return c;
    };
    node.listChildren().forEach((child) => twin.addChild(copy(child)));
    node.getParentNode()?.addChild(twin);
    console.log(`  鏡像補齊：${node.getName()}`);
  }
  for (const node of doc.getRoot().listNodes().filter((n) => exclude.includes(n.getName()))) {
    const drop = (n) => (n.listChildren().forEach(drop), n.dispose());
    drop(node);
    console.log(`  刪除：${node.getName()}`);
  }
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) if (!prim.getMaterial()?.getBaseColorTexture()) prim.setAttribute('TEXCOORD_0', null);
  }
  await io.write(`${raw}.prep.glb`, doc);

  execFileSync(
    'npx',
    ['gltf-transform', 'optimize', `${raw}.prep.glb`, `public/models/${slug}.glb`,
      '--compress', 'meshopt', '--simplify-ratio', String(simplify.ratio), '--simplify-error', String(simplify.error),
      '--texture-compress', 'webp', '--texture-size', '1024'],
    { stdio: 'inherit' },
  );
}

rmSync(tmp, { recursive: true, force: true });
