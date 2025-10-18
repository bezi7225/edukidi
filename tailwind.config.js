/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8EC5FC',
        accent: '#FF6F61',
        success: '#6BCB77',
        text: {
          primary: '#3C3C3C',
          secondary: '#555555',
        },
        background: '#FFF8F0',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
      borderRadius: {
        'edukidi': '1rem',
      },
    },
  },
  plugins: [],
};
