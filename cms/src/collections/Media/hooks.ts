import { BeforeDeleteHook } from "payload/dist/collections/config/types";
import { Post } from "payload/generated-types";

const checkIfHasMedia = ({ mediaId, doc }: { mediaId: string; doc: Post }) => {
  const imageId = typeof doc.image !== "string" ? doc.image.id : doc.image;
  const content = JSON.stringify(doc.content);

  if (imageId === mediaId || content.includes(String(doc))) {
    const reason = `This media is still used in post "${doc.slug}".`;
    console.error("Failed to delete document, reason: ", reason);
    throw new Error(reason);
  }
};

export const beforeDeleteMedia: BeforeDeleteHook = async ({ req, id }) => {
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
