import { ListPostsByCategory } from "@/_components/posts/listing";

export default function Index() {
  return (
    <ListPostsByCategory
      category="technical-writings"
      category_title="Technical Writings"
    />
  );
}
