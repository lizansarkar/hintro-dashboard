import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#5c7cfa",
          600: "#4c6ef5",
          700: "#4263eb",
          800: "#3b5bdb",
          900: "#364fc7",
        },
        surface: {
          0: "#ffffff",
          50: "#f8f9fc",
          100: "#f1f3f9",
          200: "#e9ecf5",
          300: "#dde1ed",
        },
        ink: {
          900: "#1a1d2e",
          700: "#3d4263",
          500: "#6b7194",
          300: "#a3a8c3",
          100: "#d4d7e7",
        },
        success: "#37b24d",
        warning: "#f59f00",
        danger: "#f03e3e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(26,29,46,0.06), 0 1px 2px rgba(26,29,46,0.04)",
        cardHover:
          "0 4px 12px rgba(26,29,46,0.08), 0 2px 4px rgba(26,29,46,0.04)",
        elevated:
          "0 10px 30px rgba(26,29,46,0.1), 0 4px 8px rgba(26,29,46,0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;