import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
const root = resolve("out");
const errors = [];
let links = 0,
  pages = 0;
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") await walk(file);
    } else if (entry.name.endsWith(".html")) {
      pages++;
      const html = await readFile(file, "utf8");
      for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
        const url = match[1].split(/[?#]/)[0];
        if (!url.startsWith("/") || url.startsWith("//")) continue;
        links++;
        let target = join(root, decodeURIComponent(url));
        try {
          if ((await stat(target)).isDirectory())
            target = join(target, "index.html");
          await stat(target);
        } catch {
          errors.push(`${file}: ${url}`);
        }
      }
    }
  }
}
await walk(root);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${pages} HTML pages and ${links} internal link / asset references.`,
  );
