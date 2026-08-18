import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Auto-copy logo-only-tsl.png to back-office public folder
try {
  const src = path.resolve(__dirname, '../end-user/public/images/logo-only-tsl.png');
  const destPublic = path.resolve(__dirname, 'public/logo-only-tsl.png');
  const destFavicon = path.resolve(__dirname, 'public/favicon.png');
  const destLogo = path.resolve(__dirname, 'public/logo.png');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPublic);
    fs.copyFileSync(src, destFavicon);
    fs.copyFileSync(src, destLogo);
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
