/**
 * @file image.tsx
 * @description Components for handling images.
 */

import Image from "next/image";

/**
 * @description A component that displays an image with a caption.
 *
 * @param {string} source - Source URL of the image.
 * @param {string} caption - Caption (also alt) for the image.
 */
export default function ImageWithCaption({
  source,
  caption,
}: {
  source: string;
  caption: string;
}) {
  return (
    <figure>
      <Image src={source} alt={caption} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
