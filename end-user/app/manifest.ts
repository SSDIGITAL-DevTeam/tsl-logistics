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
    // NOTE: this is the wordmark (410x105), not a square app icon. It was
    // previously declared as 192x192 and 512x512, neither of which was true —
    // and /icon.png did not exist at all until it was added to public/.
    // TODO: add purpose-built square 192/512 icons for PWA installability.
    icons: [
      { src: '/icon.png', sizes: '410x105', type: 'image/png' },
    ],
  };
}
