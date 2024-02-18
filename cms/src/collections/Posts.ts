import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { adminOrEditor, adminOrEditorOrPublished } from "./Users/access";
import { publishedAtField } from "../fields/publishedAt";
import { lexicalHTML } from "@payloadcms/richtext-lexical";

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
      maxLength: 50,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      maxLength: 250,
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
    lexicalHTML("content", { name: "content_html" }),
    publishedAtField(),
    slugField(undefined, {
      required: true,
    }),
  ],
};

export default Posts;
