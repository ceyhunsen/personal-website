import ImageWithCaption from "@/_components/image";
import Link from "next/link";

export default function Index() {
  return (
    <div>
      <header>
        <h1>About Me</h1>
      </header>

      <article>
        <ImageWithCaption
          source="/assets/about_me.jpg"
          caption="A photo of me, staring into a river in Bangkok, Thailand."
        />

        <p>
          I am a computer engineer by profession. I enjoy working on low-level
          software. In college, I was part of a team and took responsibility for
          developing low-level software for our projects. After college, I
          worked on Linux device drivers and BSP (Board Support Package)
          development. These fields are my favorite areas to work in and where
          my expertise lies.
        </p>

        <p>
          I also enjoy working on high-level software if the project is
          interesting. Currently, I work in the blockchain space. My previous
          experiences are detailed in my{" "}
          <a href="/ceyhun_sen_resume.pdf">resume</a>.
        </p>

        <p>
          I also share some of my hobbies here, on this website. I ride my
          motorcycle and take pictures of the scenery I see on the way. These
          pictures and some of the cool routes I discover are shared in my{" "}
          <Link href="/travel-logs">travel logs</Link>. I sometimes write{" "}
          <Link href="/technical-writings">technical articles</Link> about my
          hobbies and work. I also share other miscellaneous topics and thoughts
          on <Link href="/blog">my blog</Link>.
        </p>
      </article>
    </div>
  );
}
