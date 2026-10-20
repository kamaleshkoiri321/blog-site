const sharp = require('sharp');
const path = require('path');

async function createSpaciousUniformLogo() {
  const inputPath = path.join(__dirname, '../public/logo/logo-clean.png');
  const outputPath = path.join(__dirname, '../public/logo/logo.png');

  console.log('Loading clean logo from:', inputPath);

  // 1. Crop to the exact visual content bounds of logo-clean.png
  // Bounds from earlier analysis: minX: 151, maxX: 878, minY: 157, maxY: 770
  // w = 728, h = 614
  const contentCrop = {
    left: 151,
    top: 157,
    width: 728,
    height: 614
  };

  // Scale factor: 0.82 gives ~100px of elegant breathing room between the letters and the ring
  const targetWidth = Math.round(contentCrop.width * 0.82);
  const targetHeight = Math.round(contentCrop.height * 0.82);

  const croppedBuffer = await sharp(inputPath)
    .extract(contentCrop)
    .resize(targetWidth, targetHeight, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const width = 1024;
  const height = 1024;
  const cx = 512;
  const cy = 512;
  const rRing = 472;

  // 2. Initialize 1024x1024 canvas with deep obsidian black [2, 4, 2, 255] inside the circle
  const canvas = Buffer.alloc(width * height * 4, 0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      const idx = (y * width + x) * 4;
      if (dist <= rRing + 5) {
        canvas[idx] = 2;
        canvas[idx + 1] = 4;
        canvas[idx + 2] = 2;
        canvas[idx + 3] = 255;
      }
    }
  }

  // Calculate top-left position to place resized content exactly centered at (cx, cy)
  const destLeft = Math.round(cx - targetWidth / 2);
  const destTop = Math.round(cy - targetHeight / 2);

  const baseWithContent = await sharp(canvas, { raw: { width, height, channels: 4 } })
    .composite([{
      input: croppedBuffer,
      left: destLeft,
      top: destTop
    }])
    .png()
    .toBuffer();

  // 3. Create SVG with mathematically uniform glowing neon ring
  const ringSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur1" />
          <feGaussianBlur stdDeviation="3.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="outerGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <!-- Soft ambient radial glow -->
      <circle cx="${cx}" cy="${cy}" r="${rRing}" stroke="#B7FF3C" stroke-width="14" fill="none" opacity="0.4" filter="url(#outerGlow)" />

      <!-- Deep outer contrast stroke -->
      <circle cx="${cx}" cy="${cy}" r="${rRing + 4}" stroke="#030803" stroke-width="3" fill="none" opacity="0.9" />

      <!-- Bright cyber neon ring -->
      <circle cx="${cx}" cy="${cy}" r="${rRing}" stroke="#B7FF3C" stroke-width="7" fill="none" filter="url(#neonGlow)" />

      <!-- High-intensity laser core -->
      <circle cx="${cx}" cy="${cy}" r="${rRing}" stroke="#F4FFE5" stroke-width="2.2" fill="none" opacity="0.95" />

      <!-- Inner dark bevel for metallic 3D depth -->
      <circle cx="${cx}" cy="${cy}" r="${rRing - 4}" stroke="#061205" stroke-width="2.5" fill="none" opacity="0.8" />
    </svg>
  `);

  const composited = await sharp(baseWithContent)
    .composite([{ input: ringSvg, top: 0, left: 0 }])
    .raw()
    .toBuffer({ resolveWithObject: true });

  const compData = composited.data;

  // Perfect 360-degree radial alpha calculation:
  // r <= rRing + 4: alpha is 255 (completely solid)
  // rRing + 4 < r <= rRing + 20: smooth cosine fade
  // r > rRing + 20: alpha is 0 (100% transparent)
  const rSolid = rRing + 4;
  const rCutoff = rRing + 20;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      const idx = (y * width + x) * 4;

      if (dist <= rSolid) {
        compData[idx + 3] = 255;
      } else if (dist <= rCutoff) {
        const t = (dist - rSolid) / (rCutoff - rSolid);
        const factor = 0.5 * (1 + Math.cos(t * Math.PI));
        compData[idx + 3] = Math.round(255 * factor);
      } else {
        compData[idx] = 0;
        compData[idx + 1] = 0;
        compData[idx + 2] = 0;
        compData[idx + 3] = 0;
      }
    }
  }

  await sharp(compData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log('Successfully written spacious uniform emblem to:', outputPath);
}

createSpaciousUniformLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
