# Ceyhun Şen's Personal Website

This directory includes my (Ceyhun Şen) personal website and resume source.

If you want to check out this website, visit
[ceyhunsen.me](https://ceyhunsen.me/) or build it locally.

## How To Build

### Prerequisites

This website is built with [Next.js](https://nextjs.org/). Please
[install Node](https://nodejs.org/en/download) for this reason. After installing
required packages, run:

```bash
# Install dependencies
npm ci
```

### Development Server

To run the development server:

```bash
npm run dev
```

Than, [http://localhost:3000](http://localhost:3000) can be opened with your
browser to visit website.

### Build

To build release version:

```bash
npx --no-install next build
```

### Build Resume

My resume is located at
[`public/resume/ceyhun_sen_resume.tex`](public/resume/ceyhun_sen_resume.tex).
Its build steps can be viewed on
[`public/resume/README.md`](public/resume/README.md).

## License

[MIT license](LICENSE).
