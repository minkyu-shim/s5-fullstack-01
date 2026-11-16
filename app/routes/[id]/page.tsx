import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscentForm from "@/components/ascent-form";
import RouteColor from "@/components/route-color";
import { getAscents, getGym, getRoute } from "@/lib/data";
import { formatDate, STYLE_LABELS } from "@/lib/format";

// Dynamic: a climber who logs an ascent must see it immediately
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/routes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const route = await getRoute(Number(id));
  if (!route) return {};
  return { title: `${route.name} (${route.grade})` };
}

export default async function RoutePage({ params }: PageProps<"/routes/[id]">) {
  const { id } = await params;
  const route = await getRoute(Number(id));
  if (!route) notFound();

  const [gym, ascents] = await Promise.all([
    getGym(route.gymId),
    getAscents(route.id),
  ]);
  if (!gym) notFound();

  return (
    <div>
      <Link
        href={`/gyms/${gym.slug}`}
        className="text-sm text-muted hover:text-accent"
      >
        ← {gym.name}
      </Link>

      <div className="mt-2 flex items-center gap-3">
        <RouteColor color={route.color} />
        <h1 className="text-3xl font-bold tracking-tight">{route.name}</h1>
        <span className="rounded bg-accent px-2 py-0.5 font-mono text-sm font-semibold text-background">
          {route.grade}
        </span>
      </div>

      <dl className="mt-4 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
        <dt className="text-muted">Wall</dt>
        <dd>{route.wall}</dd>
        <dt className="text-muted">Colour</dt>
        <dd className="capitalize">{route.color}</dd>
        <dt className="text-muted">Set on</dt>
        <dd>{formatDate(route.setAt)}</dd>
        {route.removedAt && (
          <>
            <dt className="text-muted">Removed on</dt>
            <dd>{formatDate(route.removedAt)}</dd>
          </>
        )}
      </dl>

      <h2 className="mt-10 text-xl font-semibold">Log an ascent</h2>
      <div className="mt-4">
        <AscentForm routeId={route.id} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">
        Ascents ({ascents.length})
      </h2>
      {ascents.length === 0 ? (
        <p className="mt-4 text-muted">Nobody has logged this route yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
          {ascents.map((ascent) => (
            <li key={ascent.id} className="px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="font-medium">{ascent.climberName}</span>
                <span className="text-sm text-accent">
                  {STYLE_LABELS[ascent.style]}
                </span>
                <span className="ml-auto text-sm text-muted">
                  {formatDate(ascent.date)}
                </span>
              </div>
              {ascent.comment && (
                <p className="mt-1 text-sm text-muted">{ascent.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs text-muted">
        Rendered at {new Date().toLocaleTimeString("en-GB")}
      </p>
    </div>
  );
}
