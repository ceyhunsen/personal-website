import Link from "next/link";
import "@/_components/css/navigation.css";

export default function navigationPane() {
  return (
    <nav>
      <div>
        <Link id="logo" href="/">
          Ceyhun Şen
        </Link>
      </div>

      <div>
        <Link href="/technical-writings">Technical Writings</Link>
        <br />
        <Link href="/travel-logs">Travel Logs</Link>
        <br />
        <Link href="/blog">Blog</Link>
        <br />
        <Link href="/about">About</Link>
        <br />
        <Link href="/contact">Contact</Link>
        <br />
      </div>

      <div>
        <a id="resume" href="/ceyhun_sen_resume.pdf" target="_blank">
          Resume
        </a>
      </div>
    </nav>
  );
}
