import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette
        honeycomb: '#DE9C52',
        honey: '#DE9C52',
        spice: '#A85846',
        'cottage-spice': '#A85846',
        sand: '#D5C6B4',
        'pastel-sand': '#D5C6B4',
        martinique: '#3C3748',

        // Light Theme
        lynx: '#F7F7F7',
        howl: '#202030',
        'black-howl': '#202030',

        // Dark Theme
        'dark-bg': '#18181F',
        'dark-surface': '#242430',
        'dark-text': '#E8E6E3',

        // Semantic
        success: '#7D9D6A',
        'gentle-error': '#C97B7B',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '48px',
      },
      animation: {
        'aurora': 'aurora-shift 30s ease infinite',
        'enter': 'enter-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flame': 'flame-flicker 3s infinite ease-in-out',
        'float': 'float-paper 4s ease-in-out infinite',
        'wax-drip': 'wax-drip 0.6s ease-out forwards',
        'stamp': 'stamp-press 0.4s ease-out 0.5s backwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
