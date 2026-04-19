export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        ui: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink2)', 3: 'var(--ink3)', 4: 'var(--ink4)' },
        gold: { DEFAULT: 'var(--gold)', light: 'var(--gold-light)', pale: 'var(--gold-pale)', border: 'var(--gold-border)', glow: 'var(--gold-glow)' },
        rose: { DEFAULT: 'var(--rose)', light: 'var(--rose-light)', pale: 'var(--rose-pale)', border: 'var(--rose-border)' },
        teal: { DEFAULT: 'var(--teal)', light: 'var(--teal-light)', pale: 'var(--teal-pale)' },
        lavender: { DEFAULT: 'var(--lavender)', pale: 'var(--lavender-pale)' },
        paper: { DEFAULT: 'var(--paper)', 2: 'var(--paper2)', 3: 'var(--paper3)', 4: 'var(--paper4)' },
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
      },
    },
  },
  plugins: [],
}
