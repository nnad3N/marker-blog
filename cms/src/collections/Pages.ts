import type { CollectionConfig } from "payload/types";

import { slugField } from "../fields/slug";
import { Header } from "../blocks/Header";
import { CallToAction } from "../blocks/CallToAction";
import { FeaturedPosts } from "../blocks/FeaturedPosts";
import { anyone, admin, adminOrEditor } from "./Users/access";
import { DisplayPosts } from "../blocks/DisplayPosts";
import { Search } from "../blocks/Search";
import { pageTypeField } from "../fields/pageType";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: anyone,
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
      name: "content",
      type: "blocks",
      required: true,
      blocks: [Header, FeaturedPosts, CallToAction, DisplayPosts, Search],
    },
    slugField(undefined, {
      access: {
        create: admin,
        update: admin,
      },
    }),
    pageTypeField("page"),
  ],
};

export default Pages;
