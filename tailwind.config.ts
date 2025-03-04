import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        icon: "var(--icon)",
        primary: "#356EF5", // TASK text color
        secondary: "#66DFD2", // X text color
        accent: "#FB7B4C", // Underline color
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out forwards",
        slideUp: "slideUp 0.3s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
      },
      boxShadow: {
        cardShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        cardBorderRadius: "12px",
      },
      backgroundColor: {
        cardBackground: "var(--card-background-light)",
      },
      padding: {
        cardPadding: "32px",
      },
      margin: {
        cardMargin: "1.25rem",
      },
      utilities: {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and Opera
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
