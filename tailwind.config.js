/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-nav': '#2E4257',
        'custom-btn': '#FF5800',
        // Add more custom colors as needed
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',}
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')]
}

