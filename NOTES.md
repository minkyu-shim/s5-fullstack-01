# NOTES.md — Session 1: From React SPA to Next.js

Movie Night — answers for Lab 1 (Step 3) and Lab 2.

---

## Lab 1 — Tour of the project

### 1. In which file are the `<html>` and `<body>` tags?

In **`app/layout.tsx`**, the root layout. It is the only place where they appear. Every page is rendered inside its `<body>` through the `children` prop.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 2. Which file renders the page at `/`?

**`app/page.tsx`**. In the App Router, a `page.tsx` file makes its folder's route publicly accessible. `app/page.tsx` → `/`, `app/about/page.tsx` → `/about`.

In Step 6, renaming `app/page.tsx` to `app/home.tsx` makes `/` return a 404: only files named `page.tsx` create routes.

### 3. Which folder is for images and other static files, and how do you reference them?

The **`public/`** folder. Its files are served as they are, from the root URL. You reference them with a path that starts with `/` and **does not include `public`**:

| File on disk | URL |
|---|---|
| `public/next.svg` | `/next.svg` |
| `public/images/poster.jpg` | `/images/poster.jpg` |

```tsx
import Image from "next/image";

<Image src="/next.svg" alt="Next.js logo" width={100} height={20} />
// or a plain <img src="/next.svg" alt="Next.js logo" />
```

### 4. What is `tsconfig.json` doing in your project?

It configures TypeScript for the project:

* **Type checking**: VS Code uses it for errors and autocompletion, and `npm run build` uses it to type-check the code (the build fails on a type error).
* **Compiler options**: `strict: true`, `jsx: "react-jsx"`, `moduleResolution: "bundler"`, `resolveJsonModule: true` (lets `lib/movies.ts` import `data/movies.json`), etc.
* **`noEmit: true`**: TypeScript itself does not produce JavaScript files. Turbopack/SWC compile the code; `tsc` only checks types.
* **`paths`**: defines the `@/*` alias (question 5).
* **`include`**: which files are checked, including `next-env.d.ts` and the generated route types in `.next/types` (for example the global `LayoutProps<"/">` type used in `app/layout.tsx`).
* **`plugins: [{ "name": "next" }]`**: the Next.js TypeScript plugin, which warns in the editor about invalid route config (e.g. a wrong value for `export const dynamic`).

### 5. What does `@/*` mean in `tsconfig.json`? Write an import that uses it.

```json
"paths": {
  "@/*": ["./*"]
}
```

`@/` is an alias for the **project root**. It avoids long relative paths that break when you move a file.

```tsx
// Without the alias, from app/movies/page.tsx:
import { getMovies } from "../../lib/movies";

// With the alias, from anywhere in the project:
import { getMovies } from "@/lib/movies";          // → lib/movies.ts
import { MovieList } from "@/components/movie-list"; // → components/movie-list.tsx
```

### 6. What does `app/layout.tsx` import from `next/font/google`, and what does Next.js do with it at build time?

It imports two font functions, **`Geist`** and **`Geist_Mono`**:

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// <html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
```

At build time, Next.js:

* **downloads** the font files from Google Fonts and **self-hosts** them with the other static assets. The browser never sends a request to Google (better privacy and performance, no extra DNS lookup);
* only keeps the requested **subset** (`latin`), so files are smaller;
* generates the `@font-face` CSS and an adjusted **fallback font** (`size-adjust`), to avoid layout shift (CLS) while the font loads;
* exposes the fonts as **CSS variables** (`--font-geist-sans`, `--font-geist-mono`), applied with the class names on `<html>` and used by the `@theme inline` block of `globals.css` (`--font-sans`, `--font-mono`).

### 7. What's the difference between `layout.tsx` and `page.tsx`?

| | `layout.tsx` | `page.tsx` |
|---|---|---|
| Role | UI **shared** by a segment and all its children | UI **unique** to one route |
| Receives | `children` (the page or nested layout) | `params`, `searchParams` |
| Makes a route accessible? | No | Yes |
| On navigation | **Persists**: keeps its state, is not re-rendered | Replaced by the new page |
| Required? | Root layout is required | Needed for a URL to exist |

Example: with `app/layout.tsx` and `app/movies/layout.tsx`, the page `/movies` is rendered like this:

```
RootLayout            (app/layout.tsx)
└── MoviesLayout      (app/movies/layout.tsx)
    └── MoviesPage    (app/movies/page.tsx)
```

### 8. Where would you put a navbar that appears on every page?

In the **root layout, `app/layout.tsx`**, above `{children}`. Ideally in its own component file:

```tsx
// components/navbar.tsx
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 underline">
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// app/layout.tsx
<body>
  <Navbar />
  {children}
</body>
```

Because the layout persists across navigations, the navbar is not re-rendered when you change page.

### 9. What is `globals.css` for, and where is it imported?

It contains the **global styles** applied to the whole app:

* `@import "tailwindcss";` — loads Tailwind CSS (v4);
* CSS variables such as `--background` and `--foreground`, with a dark mode version (`prefers-color-scheme: dark`);
* a `@theme inline` block that maps the fonts and colours to Tailwind;
* base styles on `body`.

It is imported once, in **`app/layout.tsx`**:

```tsx
import "./globals.css";
```

Since the root layout wraps every page, the styles apply everywhere.

### 10. What is `AGENTS.md`, and does your app need it to run?

`AGENTS.md` is a Markdown file of instructions for **AI coding agents** (GitHub Copilot, Cursor, Codex, etc.). It tells them that this version of Next.js may differ from their training data and that they must read the **version-matched documentation bundled in `node_modules/next/dist/docs/`** before writing code. It helps prevent outdated code (Pages Router, `getServerSideProps`, …).

**No, the app does not need it to run.** Next.js never reads it: it is not imported, not compiled, not served. Deleting it changes nothing for `npm run dev`, `build` or `start`.

---

## Lab 2 — First server-rendered page

### 1. In the page source, are the movie titles present for `/movies`? For `/movies-client`? Why?

* **`/movies`: yes.** It is a Server Component: `getMovies()` runs on the server (at build time, or on each request with `force-dynamic`), and the HTML sent to the browser already contains the list. This is why it still works with JavaScript disabled.
* **`/movies-client`: no.** The page source only contains `Loading movies...`. The component is prerendered on the server too, but at that moment `movies` is `null`. The `fetch` is inside `useEffect`, which **only runs in the browser**, after the JavaScript has loaded and hydrated the page. The titles only exist in the DOM after that.

```
/movies          server: getMovies() → HTML with 6 titles → browser displays it
/movies-client   server: HTML "Loading..." → browser: JS loads → useEffect → fetch → titles
```

### 2. Without `force-dynamic`, you run `npm run build` again tomorrow, then `npm start`, without changing anything else. What does the "Rendered at" timestamp show, and why?

It shows **the time of tomorrow's build**, and it stays frozen on that value for every request and every refresh.

The page is static (`○`): `new Date().toISOString()` is evaluated **once, during `next build`**, and the result is written into the HTML. Each new build re-renders the page, so the timestamp changes from build to build, but never between requests. It never shows the time of a visitor's request.

### 3. Give one situation where `force-dynamic` is still the right choice, and explain why.

**Live vote results during the movie night.** While students vote, the results page must show the current count to everyone. A static page would show the counts of the build (wrong), and even ISR would show stale results for a few seconds or minutes. Here, freshness matters more than the extra second: each request must read the database.

Other valid examples: a page whose content depends on the request (user's cookie, language from headers, search query), stock prices, an admin dashboard, an order status page.

### 4. A classmate sees `[movies] rendered 6 movies` in the browser console and says: "So this code runs in the browser." What do you answer, and how can you prove it?

Answer: **No, it runs on the server.** In development, Next.js **replays server logs in the browser console** as a debugging aid, marked with a "Server" badge. The code did not run in the browser.

Proofs:

* The same line is printed in the **terminal** running `npm run dev`, by Node.js, once per request.
* In **production** (`npm run build` + `npm start`), the line never appears in the browser console. Without `force-dynamic`, it is only printed once, in the **build log**; with `force-dynamic`, it is printed in the terminal at each request.
* With **JavaScript disabled**, the movie list is still rendered: no browser code was needed to get the data.
* The page uses `async`/`await` directly in the component and imports `data/movies.json` through `lib/movies.ts` — a Server Component. Adding `import "server-only";` at the top of `lib/movies.ts` would make the build fail if this code was ever imported into the browser.

### 5. Which version would you choose for a public movie catalogue that changes once a week, and why?

**The server-rendered static version, with ISR** — for example:

```tsx
export const revalidate = 86400; // regenerate at most once a day
```

Why:

* **SEO**: the titles are in the HTML, so search engines and link previews see them immediately. The client version only shows `Loading movies...` in its HTML.
* **Speed**: the page is prerendered and served instantly (from a CDN after deployment). The one-second query is paid once per revalidation, not by each visitor as with `force-dynamic`.
* **Freshness**: with ISR, the weekly change appears without rebuilding or redeploying the app. A plain static page would also work if you rebuild after each weekly update.
* `force-dynamic` would be wasteful: rendering the same content on every request for data that changes once a week. The client version is the worst choice: slower content display (FCP/LCP) and nothing useful in the HTML without JavaScript.
