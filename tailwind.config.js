/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-primary': '#10a37f',
        'green-primary-hover': '#08664f',
        'main-color': '#5b5bd6',
        'main-color-hover': '#0202f0',
      },
    },
  },
  plugins: [],
}
