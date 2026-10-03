/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nm-off-white': '#f8fafc',
        'nm-soft-green': '#d1fae5',
        'nm-mint-green': '#a7f3d0',
        'nm-light-teal': '#ccfbf1',
        'nm-soft-blue': '#dbeafe',
        'nm-light-gray': '#f3f4f6',
        'nm-yellow': '#fef08a',
        'nm-orange': '#fbbf24',
        'nm-text-dark': '#374151',
        'nm-text-light': '#6b7280',
        'nm-primary': '#10b981', // green-500
        'nm-primary-dark': '#059669', // green-600
        'nm-secondary': '#0ea5e9', // sky-500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
