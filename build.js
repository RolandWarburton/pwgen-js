import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { build } from 'esbuild';

function makeTemp(name) {
  if (!existsSync(`./${name}`)) {
    mkdirSync(`./${name}`);
  }
}

async function main() {
  makeTemp('dist');

  const result = await build({
    entryPoints: ['src/index.js'],
    platform: 'node',
    bundle: true,
    write: false,
    format: 'esm'
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });

  const content = result.outputFiles[0].text;
  writeFileSync('dist/index.js', content);
}
main();
