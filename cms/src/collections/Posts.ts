import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { adminOrEditor, adminOrEditorOrPublished } from "./Users/access";
import { publishedAtField } from "../fields/publishedAt";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: adminOrEditorOrPublished,
    update: adminOrEditor,
    create: adminOrEditor,
    delete: adminOrEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
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
      name: "content",
      type: "richText",
      required: true,
    },
    publishedAtField(),
    slugField(),
  ],
};

export default Posts;
