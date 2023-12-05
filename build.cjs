const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

function makeTemp(name) {
  if (!fs.existsSync(`./${name}`)) {
    fs.mkdirSync(`./${name}`);
  }
}

async function main() {
  makeTemp('dist');

  const result = await build({
    entryPoints: ['src/index.js'],
    platform: 'node',
    bundle: true,
    write: false,
    format: 'esm',
    jsx: 'transform',
    loader: {
      '.js': 'jsx'
    },
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });

  const content = result.outputFiles[0].text;
  fs.writeFileSync('dist/index.js', content);
}
main();
