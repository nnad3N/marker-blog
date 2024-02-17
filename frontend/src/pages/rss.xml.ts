import rss from "@astrojs/rss";
import { payloadFetch } from "@/data/payload";
import type { Post, Setting } from "payload/generated-types";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const [postData, settings] = await Promise.all([
    payloadFetch<Post[]>("posts"),
    payloadFetch<Setting>("globals/settings"),
  ]);

  if (!postData || !settings) return new Response(null);

  const title = settings.websiteTitle;

  return rss({
    title: title,
    description: settings.websiteDescription,
    site: context.site ?? "",
    items: postData.docs.map((post) => ({
      title: `${post.title} | ${title}`,
      link: `/posts/${post.slug}/`,
      pubDate: new Date(post.publishedAt),
      content: post.content_html ?? undefined,
    })),
  });
};
