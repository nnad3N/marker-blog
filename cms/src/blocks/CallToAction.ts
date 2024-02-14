import type { Block } from "payload/types";
import link from "../fields/link";

export const CallToAction: Block = {
  slug: "cta",
  labels: {
    singular: "Call To Action",
    plural: "Calls To Action",
  },

  fields: [link()],
};
