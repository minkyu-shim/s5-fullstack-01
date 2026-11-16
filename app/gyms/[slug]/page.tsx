import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RouteColor from "@/components/route-color";
import { getCurrentRoutes, getGymBySlug, getGyms, type Route } from "@/lib/data";

// SSG + ISR: the routes are in the HTML for SEO, new routes appear within a minute
export const revalidate = 60;

export async function generateStaticParams() {
  const gyms = await getGyms();
  return gyms.map((gym) => ({ slug: gym.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gyms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const gym = await getGymBySlug(slug);
  if (!gym) return {};
  return {
    title: `Climbing routes at ${gym.name}`,
    description: `The routes currently set at ${gym.name} in ${gym.city}, with their grade and colour.`,
  };
}

export default async function GymPage({ params }: PageProps<"/gyms/[slug]">) {
  const { slug } = await params;
  const gym = await getGymBySlug(slug);
  if (!gym) notFound();

  const routes = await getCurrentRoutes(gym.id);
  const walls = Map.groupBy(routes, (route) => route.wall);

  return (
    <div>
      <Link href="/" className="text-sm text-muted hover:text-accent">
        ← All gyms
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{gym.name}</h1>
      <p className="text-muted">{gym.address}</p>
      <p className="mt-4 max-w-2xl">{gym.description}</p>

      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Current routes</h2>
        <Link
          href={`/gyms/${gym.slug}/routes/new`}
          className="text-sm font-medium text-accent hover:underline"
        >
          + Add a route
        </Link>
      </div>
      {routes.length === 0 && (
        <p className="mt-4 text-muted">No routes on the wall right now.</p>
      )}
      {[...walls].map(([wall, wallRoutes]) => (
        <section key={wall} className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {wall}
          </h3>
          <RouteTable routes={wallRoutes} />
        </section>
      ))}

      <p className="mt-8 text-xs text-muted">
        Rendered at {new Date().toLocaleTimeString("en-GB")}
      </p>
    </div>
  );
}

function RouteTable({ routes }: { routes: Route[] }) {
  return (
    <ul className="mt-2 divide-y divide-border rounded-lg border border-border bg-card">
      {routes.map((route) => (
        <li key={route.id}>
          <Link
            href={`/routes/${route.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-background"
          >
            <RouteColor color={route.color} />
            <span className="flex-1 font-medium">{route.name}</span>
            <span className="font-mono text-sm">{route.grade}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
