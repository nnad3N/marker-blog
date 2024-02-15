import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { populatePublishedAt } from "../hooks/populatePublishedAt";
import { admin, adminOrEditor, adminOrEditorOrPublished } from "./Users/access";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  access: {
    read: adminOrEditorOrPublished,
    update: adminOrEditor,
    create: admin,
    delete: admin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    slugField(),
  ],
};

export default Posts;
