import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Helper function to turn PNG buffer into valid ICO format
function createIcoFromPng(pngBuffer: Buffer): Buffer {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // image type 1 = ICO
  header.writeUInt16LE(1, 4); // number of images

  header.writeUInt8(0, 6); // width
  header.writeUInt8(0, 7); // height
  header.writeUInt8(0, 8); // color count
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // color planes
  header.writeUInt16LE(32, 12); // bpp
  header.writeUInt32LE(pngBuffer.length, 14); // image size
  header.writeUInt32LE(22, 18); // offset

  return Buffer.concat([header, pngBuffer]);
}

// Auto-copy logo-only-tsl.png to back-office public folder & generate favicon.ico
try {
  const src = path.resolve(__dirname, '../end-user/public/images/logo-only-tsl.png');
  const destPublic = path.resolve(__dirname, 'public/logo-only-tsl.png');
  const destFavicon = path.resolve(__dirname, 'public/favicon.png');
  const destLogo = path.resolve(__dirname, 'public/logo.png');
  const destIco = path.resolve(__dirname, 'public/favicon.ico');

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPublic);
    fs.copyFileSync(src, destFavicon);
    fs.copyFileSync(src, destLogo);

    const pngBuf = fs.readFileSync(src);
    const icoBuf = createIcoFromPng(pngBuf);
    fs.writeFileSync(destIco, icoBuf);
  }
} catch (e) {
  console.error('Error copying logo asset:', e);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          editor: ['@tiptap/react', '@tiptap/starter-kit'],
        },
      },
    },
  },
});
