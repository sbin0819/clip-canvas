/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '16/9': '16/9',
        '4/3': '4/3',
        '1/1': '1/1',
        '4/5': '4/5',
        '9/16': '9/16',
      },
      borderColor: {
        'border-primary': '#00d084',
      },
    },
  },
  plugins: [],
};
