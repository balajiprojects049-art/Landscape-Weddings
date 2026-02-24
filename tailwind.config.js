/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          dark: '#B8962E',
          light: '#FCEB9E',
          faint: 'rgba(255,215,0,0.1)',
        },
        noir: {
          DEFAULT: '#050505',
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8962E 0%, #FFD700 50%, #B8962E 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, #FFD700 0%, #B8962E 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,215,0,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255,215,0,0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(255,215,0,0.22), 0 0 60px rgba(255,215,0,0.10)',
        'gold-sm': '0 0 15px rgba(255,215,0,0.15)',
        'gold-lg': '0 0 60px rgba(255,215,0,0.35), 0 0 120px rgba(255,215,0,0.18)',
        'gold-xl': '0 0 80px rgba(255,215,0,0.45), 0 0 160px rgba(255,215,0,0.22)',
      },
      brightness: {
        30: '.30',
        40: '.40',
      },
    },
  },
  plugins: [],
}
