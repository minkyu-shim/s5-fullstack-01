import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movie Night</h1>
      <p className="mt-2">Pick the movie for our next movie night.</p>
      <nav className="mt-6 flex gap-4 underline">
        <Link href="/movies">Movies</Link>
        <Link href="/about">About</Link>
      </nav>
    </main>
  );
}
