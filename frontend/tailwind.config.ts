import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Anybody Variable"],
    },
    extend: {
      fontFamily: {
        sans: ["Atkinson", ...fontFamily.sans],
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
