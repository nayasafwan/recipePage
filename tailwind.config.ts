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
        background: "#fdfdfd",
        foreground: "var(--foreground)",
        beige : "#fff8f4",
        primary : "#F67A24",
        secondary : "#3d3d4e",
      },
      fontFamily : {
        sans : ['Mona sans',  'ui-sans-serif', 'system-ui']
      },
      borderWidth: {
        1.5: "1.5px", 
        1.75: "1.75px", 
        3 : "3px"
      },
    },
  },
  plugins: [],
} satisfies Config;
