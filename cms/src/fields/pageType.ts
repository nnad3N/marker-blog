import type { Field } from "payload/types";

type PageType = (type: "page" | "post") => Field;

export const pageTypeField: PageType = (type) => ({
  name: "pageType",
  type: "text",
  defaultValue: type,
  hidden: true,
  required: true,
});
