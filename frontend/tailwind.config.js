/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#191919',
        'secondary': '#54156F',
        'text': '#fff',
        'card-bg': '#1E1E1E',
        'card-muted': '#262626',
        'red': '#D91E41',
        'dead': '#726f6f',
        'blue': '#29C5EE',
        'green': '#0cba68',
        'yellow': '#F2C029',
        'bordes': '#AFAFAF',
        'input': '#1f2937'
        },
      backgroundImage: {
        'login-background': "url('../src/assets/images/7329234.jpg')",
        'footer-texture': "url('../src/assets/images/7329234.jpg')",       
}
    },
    
  },
  plugins: [],
}

