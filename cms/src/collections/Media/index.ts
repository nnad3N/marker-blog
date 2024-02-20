import type { CollectionConfig } from "payload/types";
import { anyone } from "../Users/access";
import { beforeDeleteMedia } from "./hooks";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: anyone,
  },
  hooks: {
    beforeDelete: [beforeDeleteMedia],
  },
  upload: {
    crop: false,
    focalPoint: false,
    staticURL: process.env.MEDIA_URL,
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
