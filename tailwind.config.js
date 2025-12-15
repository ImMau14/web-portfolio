import tailwindTypography from "@tailwindcss/typography"

const utilsPlugin = ({ addUtilities }) => {
  const newUtilities = {}

  newUtilities[".ease-spring"] = {
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  addUtilities(newUtilities)
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "Kanit",
            },

            p: {
              fontFamily: "Inter Variable",
            },

            "*": {
              color: "#f0f4ff",
            },
          },
        },
      },

      fontFamily: {
        heading: ["Kanit"],
        logo: ["Montserrat Variable"],
        body: ["Inter Variable"],
      },

      colors: {
        silver: {
          50: "#fcfdff",
          100: "#fafcfc",
          150: "#f8faff",
          200: "#f6f9ff",
          250: "#f5f8ff",
          300: "#f3f6ff",
          350: "#f2f5ff",
          400: "#f0f4ff",
          450: "#eff3ff",
          500: "#d0d3df",
          550: "#6f7380",
          600: "#646873",
          650: "#595c66",
          700: "#4f5159",
          750: "#43454c",
          800: "#383b40",
          850: "#2c2e33",
          900: "#212226",
          950: "#161719",
          1000: "#0f1011",
        },
      },

      transitionDelay: {
        0: "0ms",
        40: "40ms",
        80: "80ms",
        120: "120ms",
        160: "160ms",
        200: "200ms",
      },

      transitionDuration: {
        250: "250ms",
      },

      scale: {
        103: "1.03",
        97: "0.97",
      },
    },
  },

  plugins: [tailwindTypography, utilsPlugin],
}
