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
 * @description Component for listing posts by theirs category.
 *
 * @param category Category of the posts.
 * @param title Title of the category.
 *
 * @returns A list of posts.
 */
export function ListPostsByCategory({
  category,
  category_title,
}: {
  category: string;
  category_title: string;
}) {
  const allPosts = getAllPostsByCategory(category);

  return (
    <div>
      <header>
        <h1>{category_title}</h1>
      </header>

      {allPosts.map((post) => (
        <PostItem post={post} key={post.title} />
      ))}
    </div>
  );
}

/**
 * @description Component for displaying a single post.
 *
 * @param post Post name.
 *
 * @returns Post box with metadata.
 */
export function PostItem({ post }: { post: Post }) {
  const tags: string[] = Array.isArray(post.tags) ? post.tags : [];

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

        {tags.length > 0 &&
          tags.map((tag) => {
            return (
              <div className="tag_box">
                <span key={tag} className="tag">
                  {tag}
                </span>
              </div>
            );
          })}

        <p className="description">{post.description}</p>
      </a>
    </div>
  );
}
