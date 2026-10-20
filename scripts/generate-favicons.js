const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createIcoFromPngBuffers(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + count * 16;
  const entries = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // Bit depth
    entry.writeUInt32LE(buf.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function generateFavicons() {
  const masterLogo = path.join(__dirname, '../public/logo/logo.png');
  console.log('Reading master logo from:', masterLogo);

  // High quality resizes
  const s16 = await sharp(masterLogo).resize(16, 16, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s32 = await sharp(masterLogo).resize(32, 32, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s48 = await sharp(masterLogo).resize(48, 48, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s64 = await sharp(masterLogo).resize(64, 64, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s180 = await sharp(masterLogo).resize(180, 180, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s192 = await sharp(masterLogo).resize(192, 192, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
  const s512 = await sharp(masterLogo).resize(512, 512, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();

  const icoBuffer = createIcoFromPngBuffers([s16, s32, s48, s64], [16, 32, 48, 64]);

  // Destination targets
  const targets = [
    { dest: path.join(__dirname, '../src/app/favicon.ico'), buf: icoBuffer },
    { dest: path.join(__dirname, '../public/favicon.ico'), buf: icoBuffer },
    { dest: path.join(__dirname, '../src/app/icon.png'), buf: s192 },
    { dest: path.join(__dirname, '../public/icon.png'), buf: s192 },
    { dest: path.join(__dirname, '../src/app/apple-icon.png'), buf: s180 },
    { dest: path.join(__dirname, '../public/apple-icon.png'), buf: s180 },
    { dest: path.join(__dirname, '../public/icon-512.png'), buf: s512 },
  ];

  for (const { dest, buf } of targets) {
    fs.writeFileSync(dest, buf);
    console.log(`Wrote: ${dest} (${buf.length} bytes)`);
  }

  console.log('All favicons and app icons generated successfully!');
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
