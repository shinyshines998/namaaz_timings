/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#d4b052",
        teal: "#0a4f4f",
        amber: "#ffd700",
        cream: "#fff8dc",
      },
      fontFamily: {
        amiri: ["var(--font-amiri)"],
        cormorant: ["var(--font-cormorant)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
