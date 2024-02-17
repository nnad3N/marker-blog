import type { Page, Setting } from "payload/generated-types";

type BlockUnion = Blocks[number];
type GetBlockTypeValue<T> = T extends { blockType: infer U } ? U : never;

export type Blocks = Page["content"];
export type BlockType = GetBlockTypeValue<BlockUnion>;
export type Block<T extends BlockType> = Extract<BlockUnion, { blockType: T }>;

export type PayloadResponse<T> = {
  docs: T;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type Socials = NonNullable<Setting["socials"]>;
