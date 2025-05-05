/**
 * @file image.tsx
 * @description Components for handling images.
 */

import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

/**
 * @description A component that displays an `Image` with a caption.
 *
 * @param {StaticImageData} source - Static image data.
 * @param {string} caption - Caption (also alt) for the image.
 */
export function ImageWithCaption({
  source,
  caption,
}: {
  source: StaticImageData;
  caption: string;
}) {
  return (
    <figure>
      <Image
        src={source}
        alt={caption}
        height={source.height}
        width={source.width}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
