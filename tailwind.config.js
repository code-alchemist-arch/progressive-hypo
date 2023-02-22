/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{tsx,js}', './components/**/*.{tsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#F4F4F4',
        secondary: '#808080',
        anthrazit: '#353535',
        red: '#D82034',
        pistachio: '#CBD38F',
        green01: '#D2EBD3',
        green02: '#87CB8A',
        green03: '#F0FFF1',
        blue01: '#D8E5E4',
        grey01: '#666666',
        grey02: '#808080',
        grey05: '#E5E5E5',
        grey06: '#D8D8D4',
        inner: '#D0D0D0',
        backdrop: '#9D9D9D',
      },
      height: {
        22: '88px',
      },
      lineHeight: {
        5.5: '22px',
        6.5: '26px',
      },
      fontFamily: {
        serif: ['ITC Legacy Serif Std'],
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '3.5xl': '15px',
      },
      inset: {
        '51%': 'calc(50% + 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
