const sharp = require('sharp');
const path = require('path');

async function updateAllImages() {
  const uniformLogo = path.join(__dirname, '../public/logo/logo.png');

  // 1. icon.png (512x512)
  await sharp(uniformLogo)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../src/app/icon.png'));
  console.log('Updated src/app/icon.png');

  // 2. apple-icon.png (180x180)
  await sharp(uniformLogo)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../src/app/apple-icon.png'));
  console.log('Updated src/app/apple-icon.png');

  // 3. og-default.png (1200x630) - centered emblem on obsidian cyber gradient
  const emblem = await sharp(uniformLogo).resize(500, 500).png().toBuffer();

  const ogBgSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#080A0A" />
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#B7FF3C" stop-opacity="0.15" />
        <stop offset="60%" stop-color="#080A0A" stop-opacity="0" />
      </radialGradient>
      <circle cx="600" cy="315" r="350" fill="url(#centerGlow)" />
    </svg>
  `);

  await sharp(ogBgSvg)
    .composite([{ input: emblem, top: Math.round((630 - 500) / 2), left: Math.round((1200 - 500) / 2) }])
    .png()
    .toFile(path.join(__dirname, '../public/images/og-default.png'));
  console.log('Updated public/images/og-default.png');
}

updateAllImages().catch(err => {
  console.error(err);
  process.exit(1);
});
