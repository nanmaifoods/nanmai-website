/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink:    '#E91E8C',
          green:   '#2E7D32',
          lime:    '#66BB6A',
          cream:   '#FFF8F0',
          gold:    '#F9A825',
          dark:    '#1A1A1A',
          gray:    '#F5F5F5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-in':   'slideIn 0.5s ease forwards',
        'float':      'float 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-20px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'brand':  '0 4px 24px rgba(233,30,140,0.15)',
        'card':   '0 2px 20px rgba(0,0,0,0.08)',
        'hover':  '0 8px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
