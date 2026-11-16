import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewRouteForm from "@/components/new-route-form";
import { getCurrentRoutes, getGymBySlug, getGyms } from "@/lib/data";

// Static: the page is prerendered per gym, the form itself runs on the client
export async function generateStaticParams() {
  const gyms = await getGyms();
  return gyms.map((gym) => ({ slug: gym.slug }));
}

export const metadata: Metadata = {
  title: "Add a route",
};

export default async function NewRoutePage({
  params,
}: PageProps<"/gyms/[slug]/routes/new">) {
  const { slug } = await params;
  const gym = await getGymBySlug(slug);
  if (!gym) notFound();

  // Existing walls are suggested in the wall field
  const routes = await getCurrentRoutes(gym.id);
  const walls = [...new Set(routes.map((route) => route.wall))];

  return (
    <div className="max-w-md">
      <Link
        href={`/gyms/${gym.slug}`}
        className="text-sm text-muted hover:text-accent"
      >
        ← {gym.name}
      </Link>
      <h1 className="mt-2 mb-6 text-3xl font-bold tracking-tight">
        Add a route
      </h1>
      <NewRouteForm gymSlug={gym.slug} walls={walls} />
    </div>
  );
}
