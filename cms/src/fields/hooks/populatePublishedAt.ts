import { FieldHook } from "payload/types";

export const populatePublishedAt: FieldHook = ({ value }) => {
  if (!value) {
    return new Date();
  }

  return value;
};
