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
        // Aura.build Exact Colors
        amber: {
          DEFAULT: '#D68F54',
          dim: '#E8B991',
        },
        clay: {
          DEFAULT: '#9E584D',
          soft: '#C68E85',
        },
        sage: {
          DEFAULT: '#7E8D85',
          light: '#C8D1CD',
        },
        sand: '#DBCBB8',
        stone: '#96948F',
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
        'aurora': 'aurora-shift 35s ease infinite',
        'enter': 'enter-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flame': 'flame-flicker 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'wax': 'wax-press 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fold': 'fold-flap 0.8s ease-in-out forwards',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
