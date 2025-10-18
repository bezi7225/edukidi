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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        secondary: 'hsl(var(--secondary))',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
      borderRadius: {
        'edukidi': '1rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
};
