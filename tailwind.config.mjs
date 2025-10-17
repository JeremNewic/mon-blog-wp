/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
      fontFamily: {
        sans: ['Your Font', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}