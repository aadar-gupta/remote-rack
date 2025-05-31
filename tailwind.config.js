/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8A2C8',
        secondary: '#FADADD',
        cream: '#FFF5E1',
        charcoal: '#333333',
      },
      dropShadow: {
        'white': '0 4px 6px -1px rgba(255, 255, 255, 0.5), 0 2px 4px -2px rgba(255, 255, 255, 0.3)',
      },
      textShadow: {
        'outline': '-1px -1px 0 #333333, 1px -1px 0 #333333, -1px 1px 0 #333333, 1px 1px 0 #333333',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-outline': {
          'text-shadow': '-1px -1px 0 #333333, 1px -1px 0 #333333, -1px 1px 0 #333333, 1px 1px 0 #333333',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
