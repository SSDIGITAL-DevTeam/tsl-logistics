import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TSL Logistics',
    short_name: 'TSL Logistics',
    description: "Singapore's trusted logistics partner since 2003",
    start_url: '/',
    display: 'standalone',
    background_color: '#1E1E1E',
    theme_color: '#C8A84B',
    // Square marks generated from public/images/logo-only-tsl.png. The 410x105
    // wordmark that used to sit here is the wrong shape for an app icon — it
    // now lives at public/logo-wordmark.png and serves the JSON-LD `logo`.
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
