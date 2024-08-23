const colors = get();
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
      backgroundColor: colors.setColors(),
      textColor: colors.setColors(),
      borderColor: colors.setColors(),
      fill: colors.setColors(),
      gradientColorStops: (theme) => ({
        ...theme('colors'),
        ...colors.setColors(),
      }),
    },
  },
  plugins: [require('tailwindcss-3d')({ legacy: true })],
};

function get() {
  const variants = ['navy', 'kaki'];
  const randomIndex = Math.floor(Math.random() * variants.length);
  const randomVariant = variants[randomIndex];

  function setColors() {
    const defaultBg =
      randomVariant === 'navy' ? 'var(--background)' : 'var(--background2)';
    const defaultText =
      randomVariant === 'navy' ? 'var(--base)' : 'var(--base2)';
    const defaultSubBg =
      randomVariant === 'navy' ? 'var(--lighter)' : 'var(--lighter2)';

    return {
      'default-bg': defaultBg,
      'default-accent': defaultText,
      'default-sub-bg': defaultSubBg,
    };
  }

  return { setColors };
}
