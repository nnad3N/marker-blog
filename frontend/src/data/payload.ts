import { CMS_URL } from "@/consts";
import type { PayloadResponse } from "@/types/payload";
import type { Page } from "payload/generated-types";

export const getPages = async (): Promise<PayloadResponse<Page>> => {
  try {
    return fetch(`${CMS_URL}/api/pages?depth=2`).then((res) => res.json());
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
