import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige : "#fff8f4",
        secondary : "#3d3d4e"
      },
      fontFamily : {
        sans : ['Mona sans',  'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
} satisfies Config;
