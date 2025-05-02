import { PostBox } from "@/_components/posts/listing";
import { getPostByCategory } from "@/_components/posts/listing";
import Link from "next/link";

export default function Home() {
  const highlightedPosts = [
    getPostByCategory("blog", "i-crashed-my-motorcycle-and-broke-my-wrist"),
    getPostByCategory("travel-logs", "riva-avenue"),
    getPostByCategory("travel-logs", "bangkok"),
    getPostByCategory("technical-writings", "c-compiling-basics"),
  ];

  return (
    <div>
      <header>
        <h1>Welcome</h1>
      </header>

      <article>
        <p>
          I am Ceyhun: A computer engineer, a motorcyclist and a traveler based
          in İstanbul/Türkiye.
        </p>

        <p>
          This is my personal website. Here, I share my technical
          knowledge/portfolio, travel experiences and other kinds of personal
          stuff. To know more about me, you can check out the{" "}
          <Link href="/about">about me</Link> page or{" "}
          <a href="/ceyhun_sen_resume.pdf">my resume</a>. You can also check out
          my <Link href="/blog">blog</Link> for my thoughts and experiences, or{" "}
          <Link href="/travel-logs">travel logs</Link> for my travel
          experiences.
        </p>

        <h2>Highlighted Posts</h2>

        {highlightedPosts.map((post) => (
          <PostBox post={post} key={post.title} />
        ))}
      </article>
    </div>
  );
}
