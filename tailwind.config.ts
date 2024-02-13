import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Bubblegum"],
    },
    extend: {
      fontFamily: {
        sans: ["Atkinson", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;
