module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // gradientColorStops: (theme) => ({
      //   ...theme('colors'),
      //   'main': 'var(--main)',
      //   'accent': 'var(--accent)',
      //   'sub': 'var(--sub)',
      // }),
      // backgroundColor: colors.setColors(),
      // textColor: colors.setColors(),
      // borderColor: colors.setColors(),
      // fill: colors.setColors(),
      // gradientColorStops: (theme) => ({
      //   ...theme('colors'),
      //   ...colors.setColors(),
      // }),
    },
  },
  plugins: [require('tailwindcss-3d')({ legacy: true })],
};
