import type { Field } from "payload/types";

import deepMerge from "../utilities/deepMerge";
import { populatePublishedAt } from "./hooks";

type PublishedAt = (overrides?: Partial<Field>) => Field;

export const publishedAtField: PublishedAt = (overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          displayFormat: "dd/MM/yyyy",
        },
      },
      hooks: {
        beforeValidate: [populatePublishedAt],
      },
    },
    overrides
  );
