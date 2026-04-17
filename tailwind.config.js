/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#fff5cc',
          200: '#f7df8a',
          300: '#dfc164',
          400: '#cba84b',
          500: '#9f7c2c',
        },
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at 50% 0%, rgba(215, 181, 91, 0.32) 0%, rgba(215, 181, 91, 0.05) 35%, rgba(0, 0, 0, 0) 70%)',
        'gold-gradient':
          'linear-gradient(145deg, #f3df9f 0%, #e4c97a 32%, #b88e3a 55%, #f2db95 82%, #a5752b 100%)',
      },
      boxShadow: {
        gold: '0 8px 20px rgba(198, 158, 67, 0.35), inset 0 1px 0 rgba(255, 246, 214, 0.45)',
        'gold-glow': '0 12px 34px rgba(198, 158, 67, 0.4), 0 0 0 1px rgba(255, 226, 143, 0.3)',
      },
    },
  },
  plugins: [],
}

