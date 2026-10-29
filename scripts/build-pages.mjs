import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const images = path.join(root, "public/images");
const output = path.join(images, "generated");
const sizes = JSON.parse(await readFile(path.join(root, "lib/image-sizes.json"), "utf8"));
const widths = [...sizes.imageSizes, ...sizes.deviceSizes];
await mkdir(output, { recursive: true });

for (const file of await readdir(images)) {
  if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
  await Promise.all(widths.map(width =>
    sharp(path.join(images, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(output, `${path.parse(file).name}-${width}.webp`))
  ));
}

const result = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build"], {
  cwd: root,
  env: { ...process.env, LAURA_PAGES_BUILD: "1" },
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
