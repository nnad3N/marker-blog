import path from "path";
import type { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: path.resolve(__dirname, "../../../media"),
    imageSizes: [
      {
        name: "thumbnail",
        width: 640,
        height: 320,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 384,
        position: "centre",
      },
      {
        name: "desktop",
        width: 1200,
        height: 600,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    resizeOptions: {
      withoutEnlargement: false,
    },
    formatOptions: {
      format: "webp",
    },
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export default Media;
