import type { Block } from "payload/types";

export const Search: Block = {
  slug: "search",
  labels: {
    singular: "Search",
    plural: "Searches",
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "placeholder",
      type: "text",
    },
  ],
};
