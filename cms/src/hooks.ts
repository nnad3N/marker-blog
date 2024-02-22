import { CollectionAfterChangeHook } from "payload/types";
import { Page, Post } from "payload/generated-types";

export const invokeRedeployWebhook = () =>
  fetch(
    `https://internal.circleci.com/private/soc/e/394cec55-80aa-4ecf-a7ba-175a0132e46b?secret=${process.env.CIRCLECI_REDEPLOY_SECRET}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );

export const redeployPage: CollectionAfterChangeHook<Page | Post> = async ({ doc }) => {
  if (doc._status === "draft") return;

  await invokeRedeployWebhook();
};
