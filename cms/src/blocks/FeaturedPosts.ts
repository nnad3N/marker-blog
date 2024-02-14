import type { Block } from "payload/types";

export const FeaturedPosts: Block = {
  slug: "featuredPosts",
  labels: {
    singular: "Featured Posts",
    plural: "Featuerd Posts",
  },
  fields: [
    {
      type: "relationship",
      name: "featuredPosts",
      label: "Select Featured Posts",
      relationTo: "posts",
      hasMany: true,
      admin: {
        isSortable: true,
      },
      minRows: 1,
      maxRows: 3,
      required: true,
    },
  ],
};
