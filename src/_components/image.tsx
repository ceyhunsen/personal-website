/**
 * @file image.tsx
 * @description Components for handling images.
 */

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
    <figure style={{ width: "100%", textAlign: "center", margin: "0" }}>
      <img
        src={source}
        alt={caption}
        style={{ width: "100%", height: "auto" }}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
