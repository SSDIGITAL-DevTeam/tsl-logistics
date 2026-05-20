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
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
