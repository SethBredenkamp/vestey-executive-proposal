/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        ck: {
          bg: 'var(--bg)',
          bg2: 'var(--bg-2)',
          surface: 'var(--surface)',
          surface2: 'var(--surface-2)',
          fg: 'var(--fg)',
          fg2: 'var(--fg-2)',
          fg3: 'var(--fg-3)',
          accent: 'var(--accent)',
          accentStrong: 'var(--accent-strong)',
          accent2: 'var(--accent-2)',
        },
        obsidian: {
          950: '#08090a',
          900: '#0d0e10',
          800: '#111215',
          700: '#17181c',
        }
      },
    },
  },
  plugins: [],
}
