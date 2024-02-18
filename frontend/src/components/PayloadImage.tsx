import { MEDIA_URL } from "@/consts";
import type { Media } from "payload/generated-types";
import type { Component } from "solid-js";

interface Props {
  image: Media | string;
  squiggle?: boolean;
}

const PayloadImage: Component<Props> = ({ image, squiggle }) => {
  const isImage = typeof image !== "string";

  const sizes = isImage
    ? Object.values(image.sizes ?? {}).map(
        (image) => `${MEDIA_URL + image.url} ${image.width}w`,
      )
    : [];
  const srcset = sizes.join(", ");

  return isImage ? (
    <img
      class={`aspect-[2/1] w-full object-cover ${squiggle ? "squiggle" : ""}`}
      src={MEDIA_URL + image.url}
      srcset={srcset}
      sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, 1280px"
      alt={image.alt}
    />
  ) : (
    <div
      class={`aspect-[2/1] w-full animate-pulse bg-gray-300 ${squiggle ? "squiggle" : ""}`}
    />
  );
};

export default PayloadImage;
