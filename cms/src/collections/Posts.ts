import type { CollectionConfig } from "payload/types";

// import { admins } from "../../access/admins";
// import { adminsOrPublished } from "../../access/adminsOrPublished";
import { slugField } from "../fields/slug";
import { populatePublishedAt } from "../hooks/populatePublishedAt";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  hooks: {
    beforeChange: [populatePublishedAt],
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
