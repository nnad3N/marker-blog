import { CMS_URL } from "@/consts";
import type { PayloadResponse } from "@/types/payload";

export const payloadFetch = async <T>(
  endpoint: string,
): Promise<(T extends any[] ? PayloadResponse<T> : T) | undefined> => {
  try {
    return fetch(`${CMS_URL}/api/${endpoint}`).then((res) => res.json());
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
