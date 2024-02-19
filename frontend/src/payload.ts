import { CMS_URL } from "@/consts";
import type { PayloadResponse } from "@/types/payload";

export const payloadFetch = async <T>(
  endpoint: string,
): Promise<(T extends any[] ? PayloadResponse<T> : T) | undefined> => {
  try {
    const res = await fetch(`${CMS_URL}/api/${endpoint}`);

    if (!res.ok) return undefined;

    return res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
