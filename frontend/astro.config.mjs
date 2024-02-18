import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://example.com",
  integrations: [sitemap(), tailwind(), solidJs()],
});
