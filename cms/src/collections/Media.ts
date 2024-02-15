import path from "path";
import type { CollectionConfig } from "payload/types";
import { anyone } from "./Users/access";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: anyone,
  },
  upload: {
    staticDir: path.resolve(__dirname, "../../../media"),
    imageSizes: [
      {
        name: "thumbnail",
        width: 640,
        height: 320,
        withoutEnlargement: false,
        formatOptions: {
          format: "webp",
        },
      },
      {
        name: "content",
        width: 768,
        height: 384,
        withoutEnlargement: false,
        formatOptions: {
          format: "webp",
        },
      },
      {
        name: "desktop",
        width: 1280,
        height: 640,
        withoutEnlargement: false,
        formatOptions: {
          format: "webp",
        },
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
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
