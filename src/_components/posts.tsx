/**
 * @file listing.tsx
 * @description This file contains the code for reading and listing posts.
 *
 * This file also defines a post's structure.
 */

import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import "@/_components/css/posts.css";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const locale = "tr-TR";

/**
 * @description A post's content and metadata.
 *
 * @argument name File name of the post.
 * @argument title Display title of the post.
 * @argument description [Optional] Short description of the post.
 * @argument date Release date of the post.
 * @argument date Last visit date for travel logs.
 * @argument category Category of the post.
 * @argument cover [Optional] Cover image of the post.
 * @argument tags [Optional] Tags of the post.
 * @argument content Actual content of the post.
 */
export interface Post {
  name: string;
  title: string;

  date: Date;
  last_visit?: Date;
  category: string;
  description?: string;

  cover?: string;
  tags?: string[];

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
    .sort((post1, post2) => {
      if (category === "travel-logs" && post1.last_visit && post2.last_visit) {
        return post1.last_visit > post2.last_visit ? -1 : 1;
      } else {
        return post1.date > post2.date ? -1 : 1;
      }
    });
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
  const posts = getAllPostsByCategory(category);

  return (
    <div>
      <header>
        <h1>{category_title}</h1>
      </header>

      {posts.map((post) => (
        <PostBox post={post} key={post.title} />
      ))}
    </div>
  );
}

/**
 * @description Component for displaying a single post.
 *
 * @param post Post metadata.
 *
 * @returns Post box with metadata.
 */
export function PostBox({ post }: { post: Post }) {
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

        {post.last_visit &&
        new Date(post.last_visit).toLocaleDateString(locale) !==
          new Date(post.date).toLocaleDateString(locale) ? (
          <div className="date">
            <time>
              Last visit: {new Date(post.last_visit).toLocaleDateString(locale)}
            </time>
            <br />
            <time>
              First time visited:{" "}
              {new Date(post.date).toLocaleDateString(locale)}
            </time>
          </div>
        ) : (
          <div className="date">
            <time>{new Date(post.date).toLocaleDateString(locale)}</time>
          </div>
        )}

        {post.tags &&
          post.tags.map((tag) => {
            return (
              <div className="tag_box" key={tag}>
                <span className="tag">{tag}</span>
              </div>
            );
          })}

        {post.description && <p className="description">{post.description}</p>}
      </a>
    </div>
  );
}

/**
 * @description Component for displaying a post's content and metadata.
 *
 * @param post Post content and metadata.
 *
 * @returns Post page content.
 */
export async function PostContent(post: Post) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(transformImageToImageWithCaption)
    .process(post.content);
  const htmlContent = processedContent.toString();

  return (
    <div>
      <header>
        <h1>{post.title}</h1>
        {post.last_visit &&
        new Date(post.last_visit).toLocaleDateString(locale) !==
          new Date(post.date).toLocaleDateString(locale) ? (
          <div className="date">
            <time>
              Last visit: {new Date(post.last_visit).toLocaleDateString(locale)}
            </time>{" "}
            <br />
            <time>
              First time visited:{" "}
              {new Date(post.date).toLocaleDateString(locale)}
            </time>
          </div>
        ) : (
          <div className="date">
            <time>{new Date(post.date).toLocaleDateString(locale)}</time>
          </div>
        )}
      </header>

      <article dangerouslySetInnerHTML={{ __html: htmlContent }}></article>
    </div>
  );
}

/**
 * @description Transform <img> elements to <figure> with <figcaption>.
 *
 * @returns A transformer function for rehype.
 */
function transformImageToImageWithCaption() {
  // eslint-disable-next-line
  return (tree: any) => {
    visit(tree, "element", (node, _, parent) => {
      if (node.tagName === "img") {
        parent.tagName = "figure";

        if (node.properties.alt) {
          const caption = {
            type: "element",
            tagName: "figcaption",
            children: [
              {
                type: "text",
                value: node.properties?.alt || "",
              },
            ],
          };

          parent.children = [node, caption];
        }
      }
    });
  };
}
