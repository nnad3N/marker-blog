import { MEDIA_URL } from "@/consts";
import type { Media } from "payload/generated-types";
import type { Component } from "solid-js";

interface Props {
  image: Media | string;
  viewTransitionName: string;
  class?: string;
}

const PayloadImage: Component<Props> = ({
  image,
  class: className = "",
  viewTransitionName,
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
      sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, 1280px"
      alt={image.alt}
      style={{
        "view-transition-name": `image-${viewTransitionName}`,
      }}
    />
  ) : (
    <div class={`aspect-[2/1] w-full animate-pulse bg-gray-300 ${className}`} />
  );
};

export default PayloadImage;
