import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#fff0f3',
          100: '#ffe3e8',
          200: '#ffccd5',
          300: '#ffa3b5',
          400: '#ff6584',
          500: '#f72585',
          600: '#e01e74',
        }
      },
      animation: {
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
