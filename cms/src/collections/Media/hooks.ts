import { BeforeDeleteHook, AfterChangeHook } from "payload/dist/collections/config/types";
import { Media, Post } from "payload/generated-types";
import { createHash } from "crypto";

const checkIfHasMedia = ({ mediaId, doc }: { mediaId: string; doc: Post }) => {
  const imageId = typeof doc.image !== "string" ? doc.image.id : doc.image;
  const content = JSON.stringify(doc.content);

  if (imageId === mediaId || content.includes(String(doc))) {
    const reason = `This media is still used in post "${doc.slug}".`;
    console.error("Failed to delete document, reason: ", reason);
    throw new Error(reason);
  }
};

export const safeguardDelete: BeforeDeleteHook = async ({ req, id }) => {
  const mediaId = String(id);

  const [versions, posts] = await Promise.all([
    req.payload.findVersions({ collection: "posts" }),
    req.payload.find({
      collection: "posts",
      depth: 0,
    }),
  ]);

  versions.docs.forEach(({ version }) => checkIfHasMedia({ mediaId, doc: version }));
  posts.docs.forEach((doc) => checkIfHasMedia({ mediaId, doc }));
};

const getHash = (doc: Media) => {
  const copy = { ...doc };
  delete copy.updatedAt;
  return createHash("sha256").update(JSON.stringify(copy)).digest("hex");
};

export const rebuildPage: AfterChangeHook<Media> = async ({ doc, previousDoc }) => {
  const hash = getHash(doc);
  const prevHash = getHash(previousDoc);

  if (hash === prevHash) return;

  // rebuild
};
