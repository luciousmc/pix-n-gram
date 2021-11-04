module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          medium: '#005C98',
        },
        black: {
          light: '#262626',
          faded: '#000059',
        },
        gray: {
          base: '#616161',
          background: '#FAFAFA',
          primary: '#DBDBDB',
        },
        red: {
          primary: '#ED4956',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
