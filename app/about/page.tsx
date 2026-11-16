import type { Metadata } from "next";
import { GRADES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "What Climb Log is, and how grades and ascent styles work.",
};

const STYLES = [
  {
    name: "Flash",
    text: "You climbed the route from start to top on your first try, without falling.",
  },
  {
    name: "Redpoint",
    text: "You climbed the route without falling, after one or more earlier tries.",
  },
  {
    name: "Attempt",
    text: "You tried the route but did not reach the top yet. It is still your project.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">About Climb Log</h1>
      <p className="mt-4">
        Climb Log lists the routes currently set on each wall of indoor
        climbing gyms, so you can see what is new, pick your next project and
        keep track of what you have climbed. There is no account: you enter
        your name when you log an ascent.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Grades</h2>
      <p className="mt-2">
        Routes use the French scale. The number gives the main level, the
        letter (a, b, c) splits it into three steps, and a + makes it slightly
        harder. From easiest to hardest:
      </p>
      <p className="mt-3 flex flex-wrap gap-2">
        {GRADES.map((grade) => (
          <span
            key={grade}
            className="rounded border border-border bg-card px-2 py-0.5 font-mono text-sm"
          >
            {grade}
          </span>
        ))}
      </p>
      <p className="mt-3">
        Each route also has a colour: it is the colour of its holds on the
        wall.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Ascent styles</h2>
      <dl className="mt-2 space-y-3">
        {STYLES.map((style) => (
          <div key={style.name}>
            <dt className="font-semibold text-accent">{style.name}</dt>
            <dd>{style.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
