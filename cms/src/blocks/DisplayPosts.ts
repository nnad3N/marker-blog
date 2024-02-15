import type { Block } from "payload/types";

export const DisplayPosts: Block = {
  slug: "displayPosts",
  labels: {
    singular: "Display Posts",
    plural: "Display Posts",
  },
  fields: [
    {
      type: "select",
      name: "orderBy",
      label: "Order By",
      required: true,
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
    {
      type: "select",
      name: "style",
      required: true,
      options: [
        {
          label: "Full",
          value: "full",
        },
        {
          label: "Compact",
          value: "compact",
        },
      ],
      defaultValue: "full",
    },
  ],
};
