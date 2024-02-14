import type { Block } from "payload/types";

export const DisplayPosts: Block = {
  slug: "display-posts",
  labels: {
    singular: "Display Posts",
    plural: "Display Posts",
  },
  fields: [
    {
      type: "select",
      name: "orderBy",
      label: "Order By",
      options: [
        {
          label: "Newest",
          value: "desc",
        },
        {
          label: "Oldest",
          value: "asc",
        },
      ],
      defaultValue: "desc",
    },
  ],
};
