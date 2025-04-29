/**
 * Item box for posts.
 */

import { getAllPosts, Post } from "./read";
import "./posts.css";

/**
 * Lists all posts in a category.
 *
 * @param category The category of the posts.
 * @returns A list of post items.
 */
export function ListPostItems({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  const allPosts = getAllPosts(category);

  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>

      {allPosts.map((post) => (
        <PostItem post={post} key={post.title} />
      ))}
    </div>
  );
}

/**
 * Displays a single post item.
 *
 * @param post The post to display.
 * @returns A link to the post with title, image, description, and date.
 */
export function PostItem({ post }: { post: Post }) {
  return (
    <div className="box">
      <a href={"/" + post.category + "/" + post.name}>
        {post.cover && (
          <img
            src={"/posts/" + post.category + "/" + post.name + "/" + post.cover}
            alt={post.title}
          />
        )}

        <h2 className="title">{post.title}</h2>

        <div className="date">
          <time>{post.date}</time>
        </div>

        {/* {post.tags && (
          <div className="tags">
            {postTags.map((postTag) => (
              <span key={postTag} className="tag">
                {postTag}
              </span>
            ))}
          </div>
        )} */}

        <p className="description">{post.description}</p>
      </a>
    </div>
  );
}
