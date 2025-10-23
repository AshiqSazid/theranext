/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'slider-primary': '#338AFF',
        'slider-secondary': '#a9c5eb',
        'slider-track': '#1E6FFF',
        'table-header': '#a9c5eb',
        'table-cells': '#FDFBF7',
        'table-border': '#d5e2fa',
        'table-hover': '#c6d8f8',
        'spider-primary': '#338AFF',
        'spider-secondary': '#a9c5eb',
        'accent-teal': '#338AFF',
        'accent-olive': '#1E6FFF',
        'accent-beige': '#FDFBF7',
        'accent-dark': '#364153',
      },
    },
  },
  plugins: [],
}
