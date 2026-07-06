import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          500: "#1f7ac7",
          600: "#1664a6",
          700: "#124f84"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
