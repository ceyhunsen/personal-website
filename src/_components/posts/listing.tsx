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
 * A post's structure.
 */
export interface Post {
  name: string;
  title: string;
  category: string;
  date: string;
  cover?: string;
  description: string;
  tags?: string[];
  content: string;
  preview?: boolean;
}

/**
 * Returns the directory path for the given post category.
 *
 * @param category The category of the posts (also the directory).
 *
 * @returns Absolute directory path for the posts in the given category.
 */
function getDirectory(category: string): string {
  return join(process.cwd(), "/public/posts/" + category);
}

/**
 * Returns the post details.
 *
 * @param category The category of the post.
 * @param post The name of the post file.
 *
 * @returns The post details including title, date, cover image, description, and content.
 */
export function getPostByCategory(category: string, post: string) {
  const postsDirectory = getDirectory(category);

  const strippedPostName = post.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${strippedPostName}/index.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    name: strippedPostName,
    content,
    category: category,
  } as Post;
}

/**
 * Returns all posts in a category.
 */
export function getAllPosts(folder: string): Post[] {
  const postsDirectory = getDirectory(folder);
  const postNames = fs.readdirSync(postsDirectory);

  // Get all posts and sort them by date in descending order.
  const posts = postNames
    .map((postName) => getPostByCategory(folder, postName))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
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
