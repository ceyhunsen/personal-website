/**
 * @file listing.tsx
 * @description This file contains the code for reading and listing posts.
 *
 * This file also defines a post's structure.
 */

import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import "./posts.css";

/**
 * A post's content and metadata.
 */
export interface Post {
  /** File name of the post */
  name: string;
  /** Display title of the post */
  title: string;

  /** Short description of the post */
  description: string;
  /** Release date of the post */
  date: string;
  /** Category of the post */
  category: string;

  /** (Optional) Cover image of the post */
  cover?: string;
  /** (Optional) Tags of the post */
  tags?: string[];

  /** Actual content of the post */
  content: string;
}

/**
 * @description Get the directory for the given post category.
 *
 * @param category Category name.
 *
 * @returns Absolute (relative to project root) directory for the given category.
 */
function getCategoryDirectory(category: string): string {
  return join(process.cwd(), "/public/posts/" + category);
}

/**
 * @description Get a post's content and metadata.
 *
 * A post must have an `index.md` file in its directory. E.g.:
 * `/public/posts/blog/my-post/index.md`
 *
 * @param category Category of the post.
 * @param name Name of the post file.
 *
 * @returns Post's content and metadata.
 */
export function getPostByCategory(category: string, name: string): Post {
  // Get path to index.md.
  const postDirectory = getCategoryDirectory(category);
  const pathToIndex = join(postDirectory, `${name}/index.md`);

  // Read its content and metadata.
  const fileContents = fs.readFileSync(pathToIndex, "utf8");
  const { data, content } = matter(fileContents);

  return {
    name,
    content,
    category,
    ...data,
  } as Post;
}

/**
 * @description Get all posts in a category.
 *
 * @param category Category of the posts.
 *
 * @returns Contents and metadata of all the posts in the category.
 */
export function getAllPostsByCategory(category: string): Post[] {
  // Get all the post names in the category.
  const postsDirectory = getCategoryDirectory(category);
  const postNames = fs.readdirSync(postsDirectory);

  // Read all the posts and sort them by date in descending order.
  return postNames
    .map((postName) => getPostByCategory(category, postName))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

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
  const allPosts = getAllPostsByCategory(category);

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
