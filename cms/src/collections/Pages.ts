import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { Header } from "../blocks/Header";
import { CallToAction } from "../blocks/CallToAction";
import { populatePublishedAt } from "../hooks/populatePublishedAt";
import { FeaturedPosts } from "../blocks/FeaturedPosts";
import { admin, adminOrEditor, adminOrEditorOrPublished } from "./Users/access";

const Pages: CollectionConfig = {
  slug: "pages",
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
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "blocks",
      required: true,
      blocks: [Header, FeaturedPosts, CallToAction],
    },
    slugField(),
  ],
};

export default Pages;
