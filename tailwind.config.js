/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kolt: {
          red: '#b01f24',
          ink: '#151515',
          sand: '#f5efe9',
          cream: '#fbf8f4'
        }
      },
      boxShadow: {
        luxe: '0 24px 70px rgba(17,17,17,0.08), 0 6px 20px rgba(17,17,17,0.04)'
      },
      backgroundImage: {
        'kolt-glow': 'radial-gradient(circle at top left, rgba(176,31,36,0.10), transparent 32%), radial-gradient(circle at bottom right, rgba(214,195,171,0.32), transparent 42%)'
      }
    }
  },
  plugins: []
};
