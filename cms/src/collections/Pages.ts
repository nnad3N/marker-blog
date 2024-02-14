import type { CollectionConfig } from "payload/types";

// import { admins } from "../../access/admins";
// import { adminsOrPublished } from "../../access/adminsOrPublished";
import { slugField } from "../fields/slug";
import { Header } from "../blocks/Header";
import { CallToAction } from "../blocks/CallToAction";
import { populatePublishedAt } from "../hooks/populatePublishedAt";
import { FeaturedPosts } from "../blocks/FeaturedPosts";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    // afterRead: [populateArchiveBlock],
  },
  //   access: {
  //     read: adminsOrPublished,
  //     update: admins,
  //     create: admins,
  //     delete: admins,
  //   },
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
