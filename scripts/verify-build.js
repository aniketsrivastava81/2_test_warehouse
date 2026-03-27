import fs from 'node:fs';
import path from 'node:path';

const requiredFiles = [
  'dist/index.html',
  'vercel.json',
  'src/App.jsx',
  'src/components/forms/ARTryOnLauncher.jsx',
  'src/scenes/VaultRoom.jsx',
  'src/scenes/CottonCloud.jsx',
  'src/scenes/OrganicOasis.jsx',
  'src/scenes/UrbanCanvas.jsx',
  'src/scenes/AbstractDreamscape.jsx',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));
if (missing.length) {
  console.error('Build verification failed. Missing files:');
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const distAssetsDir = path.resolve('dist/assets');
const hasAssets = fs.existsSync(distAssetsDir) && fs.readdirSync(distAssetsDir).length > 0;
if (!hasAssets) {
  console.error('Build verification failed. dist/assets is empty.');
  process.exit(1);
}

console.log('Build verification passed. Required files and built assets are present.');
