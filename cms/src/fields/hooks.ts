import { Page, Post } from "payload/generated-types";
import type { FieldHook } from "payload/types";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

interface GetSlug {
  data: Partial<Page | Post>;
  originalDoc: Page | Post;
  fallback: string;
}

const getSlug = ({ data, originalDoc, fallback }: GetSlug) => {
  const fallbackData = data?.[fallback] || originalDoc?.[fallback];

  if (fallbackData && typeof fallbackData === "string") {
    return format(fallbackData);
  }
};

export const formatSlug =
  (fallback: string): FieldHook<Page | Post> =>
  ({ operation, value, originalDoc, data }) => {
    // Posts need to have slug, but cannot be required because beforeValidate hook won't work
    if (value === "" && originalDoc.pageType === "post") {
      return getSlug({ data, originalDoc, fallback });
    }

    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create") {
      return getSlug({ data, originalDoc, fallback });
    }

    return value;
  };

export const populatePublishedAt: FieldHook = ({ value }) => {
  if (!value) {
    return new Date();
  }

  return value;
};
