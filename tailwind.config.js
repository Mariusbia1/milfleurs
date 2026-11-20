/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1517',       // Noir profond, doux et chaleureux
        ivory: '#FAF8F5',     // Blanc cassé albâtre, lumineux et haut de gamme
        linen: '#F2ECE6',     // Lin chaud et doux
        sand: '#E6DDD4',      // Beige sable naturel
        gold: '#B9864E',      // Doré champagne / bronze chaleureux et élégant
        mist: '#F6F2EE',      // Surface douce et neutre
        brown: '#4A2E35',     // Espresso raffiné
        blush: '#EFE7E2',     // Nude poudré très subtil
        rose: '#9E5F6B',      // Vieux rose poudré délicat
        plum: '#22151B',      // Prune noire / noir velours
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
        soft: '0 12px 36px -8px rgba(26, 21, 23, 0.08), 0 4px 12px -2px rgba(26, 21, 23, 0.03)',
        card: '0 10px 30px -4px rgba(26, 21, 23, 0.05), 0 2px 6px -1px rgba(26, 21, 23, 0.02)',
        elevated: '0 20px 45px -10px rgba(26, 21, 23, 0.12), 0 6px 16px -4px rgba(26, 21, 23, 0.04)',
      },
    },
  },
  plugins: [],
}
