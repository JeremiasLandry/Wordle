const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/generatePlayableJson.js <source-images-folder>');
  process.exit(1);
}

const src = process.argv[2];
if (!src) usage();

const absSrc = path.resolve(src);
if (!fs.existsSync(absSrc) || !fs.statSync(absSrc).isDirectory()) {
  console.error('Source folder not found or not a directory:', absSrc);
  process.exit(2);
}

const destDir = path.resolve(__dirname, '..', 'public', 'images', 'characters');
fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(absSrc)
  .filter(f => !f.startsWith('.'))
  .filter(f => fs.statSync(path.join(absSrc, f)).isFile())
  .sort((a,b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

if (files.length === 0) {
  console.error('No image files found in', absSrc);
  process.exit(3);
}

const playable = files.map((filename, idx) => {
  const srcPath = path.join(absSrc, filename);
  const destPath = path.join(destDir, filename);
  fs.copyFileSync(srcPath, destPath);
  const title = path.parse(filename).name.replace(/[-_]/g, ' ').trim();
  return {
    day: idx + 1,
    title: title,
    word: null,
    imageUrl: `/images/characters/${filename}`
  };
});

const outJson = path.resolve(__dirname, '..', 'public', 'playableCharacters.json');
fs.writeFileSync(outJson, JSON.stringify(playable, null, 2), 'utf8');

console.log('Copied', files.length, 'images to', destDir);
console.log('Wrote', outJson);

process.exit(0);
