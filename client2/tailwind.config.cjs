module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body:['Open Sans', 'sans-serif'],
    },
    extend: {
      screens: {
        mf: '990px',
      },
      Keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform' : 'translateX(120%)',
            transform: 'transalateX(120%)',
          },
          "100%" : {
            '-webkit-tranform' : 'translateX(0%)',
            transform: 'transalateX(0%)',
          },
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [require('@tailwindcss/forms')],
}