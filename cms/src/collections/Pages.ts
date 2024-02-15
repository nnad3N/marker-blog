import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { Header } from "../blocks/Header";
import { CallToAction } from "../blocks/CallToAction";
import { FeaturedPosts } from "../blocks/FeaturedPosts";
import { admin, adminOrEditor, adminOrEditorOrPublished } from "./Users/access";
import { DisplayPosts } from "../blocks/DisplayPosts";
import { publishedAtField } from "../fields/publishedAt";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: adminOrEditorOrPublished,
    update: adminOrEditor,
    create: admin,
    delete: admin,
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "content",
      type: "blocks",
      required: true,
      blocks: [Header, FeaturedPosts, CallToAction, DisplayPosts],
    },
    publishedAtField(),
    slugField(),
  ],
};

export default Pages;
