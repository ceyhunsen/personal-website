/**
 * @file image.tsx
 * @description Components for handling images.
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
      <img src={source} alt={caption} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
