const fs = require('fs');
const path = require('path');

const rules = [
  { folder: 'components', match: (f, c) => /function\s+\w+\(/.test(c) && /React/.test(c) },
  { folder: 'hooks', match: (f, c) => f.startsWith('use') || /useState|useEffect/.test(c) },
  { folder: 'lib', match: (f, c) => /sanitize|encrypt|token|utils/i.test(f) },
  { folder: 'public', match: (f, c) => f.endsWith('.worker.js') || f.includes('onmessage') },
  { folder: 'styles', match: (f, c) => f.endsWith('.css') },
  { folder: 'main', match: (f, c) => f === 'App.jsx' || /BrowserWindow|electron/.test(c) },
  { folder: 'api', match: (f, c) => f === 'server.js' || /express|ollama|chroma/.test(c) },
];

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => fs.lstatSync(f).isFile());

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const match = rules.find(rule => rule.match(file, content));
  if (match) {
    const destDir = path.join(root, match.folder);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
    fs.renameSync(path.join(root, file), path.join(destDir, file));
    console.log(`Moved: ${file} → ${match.folder}/`);
  } else {
    console.log(`Skipped: ${file}`);
  }
}
