import type { Block } from "@/types/payload";
import PayloadImage from "@/components/PayloadImage";
import FormattedDate from "@/components/FormattedDate";
import type { Component } from "solid-js";

interface Props {
  post: Exclude<Block<"featuredPosts">["featuredPosts"][number], string>;
}

const Post: Component<Props> = ({ post }) => {
  return (
    <a
      href={`/posts/${post.slug}`}
      class="flex flex-1 basis-[26rem] flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-100 hover:-translate-y-2 hover:shadow-xl"
    >
      <PayloadImage
        image={post.image}
        squiggle={true}
        viewTransitionName={post.slug}
      />
      <div class="flex flex-1 flex-col justify-between gap-y-1.5 px-6 py-4">
        <h3 class="text-lg font-bold md:text-xl">{post.title}</h3>
        <FormattedDate
          class="mt-auto text-sm"
          date={new Date(post.publishedAt)}
        />
      </div>
    </a>
  );
};

export default Post;
