import type { Block } from "payload/types";

export const Header: Block = {
  slug: "header",
  labels: {
    singular: "Header",
    plural: "Headers",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
  ],
};
