/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F0F0F',
        'text': '#fff',
        'bordes': '#AFAFAF',
        'danger': '#a90f0f'
      }
    },
    
  },
  plugins: [],
}

