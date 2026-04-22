export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ivory: 'var(--ivory)',
        blush: { DEFAULT: 'var(--blush)', light: 'var(--blush-light)', mid: 'var(--blush-mid)' },
        gold: { DEFAULT: 'var(--gold)', light: 'var(--gold-light)' },
        lavender: { DEFAULT: 'var(--lavender)', light: 'var(--lavender-light)' },
        taupe: 'var(--taupe)',
        dark: { DEFAULT: 'var(--dark)', mid: 'var(--dark-mid)' },
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
}
