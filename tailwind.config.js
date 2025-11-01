/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Kanit"],
        logo: ["Montserrat Variable"],
      },
    },
  },
  plugins: ["@tailwindcss/typography"],
}
