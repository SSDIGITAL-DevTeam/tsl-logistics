import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8A84B',
      },
      fontFamily: {
        // Must match the next/font family loaded in app/layout.tsx. Previously
        // this named "Plus Jakarta Sans", which is never loaded, so every
        // `font-sans` silently fell back to system-ui.
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
