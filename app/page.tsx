import Link from "next/link";
import { getCurrentRoutes, getGyms } from "@/lib/data";

// ISR: gyms change rarely, so the route counts can be up to an hour old
export const revalidate = 3600;

export default async function Home() {
  const gyms = await getGyms();
  const routeCounts = await Promise.all(
    gyms.map(async (gym) => (await getCurrentRoutes(gym.id)).length),
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Climbing gyms</h1>
      <p className="mt-2 text-muted">
        Pick a gym to see what is set on its walls.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {gyms.map((gym, i) => (
          <li key={gym.id}>
            <Link
              href={`/gyms/${gym.slug}`}
              className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <h2 className="text-lg font-semibold">{gym.name}</h2>
              <p className="text-sm text-muted">{gym.city}</p>
              <p className="mt-3 text-sm">
                {routeCounts[i]} {routeCounts[i] === 1 ? "route" : "routes"} on
                the wall
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-muted">
        Rendered at {new Date().toLocaleTimeString("en-GB")}
      </p>
    </div>
  );
}
