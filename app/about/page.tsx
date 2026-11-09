import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Movie Night",
  description: "What Movie Night is and how it works",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-2">
        Movie Night is a small app built during session 1 of the Next.js course.
      </p>
    </main>
  );
}
