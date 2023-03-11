/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['@./index.html','./src/**/*.{vue,js,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'primary':'#474749',
        'botColor':'#909090',
        'userColor':'#6690ad'
      }
    },
    container:{
      padding:'2rem',
      center:true
    },
    screens:{
      sm:'640px',
      md:'768px'
    }
  },
  plugins: [],
}
