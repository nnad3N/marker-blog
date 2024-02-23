import { MEDIA_URL } from "@/consts";
import type { Media } from "payload/generated-types";
import type { Component } from "solid-js";

interface Props {
  image: Media | string;
  viewTransitionName: string;
  class?: string;
  lazy?: boolean;
}

const PayloadImage: Component<Props> = ({
  image,
  class: className = "",
  viewTransitionName,
  lazy = true,
}) => {
  const isImage = typeof image !== "string";

  const sizes = isImage
    ? Object.values(image.sizes ?? {}).map(
        (image) => `${MEDIA_URL + image.url} ${image.width}w`,
      )
    : [];
  const srcset = sizes.join(", ");

  return isImage ? (
    <img
      class={`aspect-[2/1] w-full object-cover ${className}`}
      src={MEDIA_URL + image.url}
      srcset={srcset}
      sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (min-width: 1536px) and (max-width: 1920px) 640px, 1280px"
      alt={image.alt}
      style={{
        "view-transition-name": `image-${viewTransitionName}`,
      }}
      loading={lazy ? "lazy" : "eager"}
    />
  ) : (
    <div class={`aspect-[2/1] w-full animate-pulse bg-gray-300 ${className}`} />
  );
};

export default PayloadImage;
