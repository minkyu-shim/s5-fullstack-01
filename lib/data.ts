import gyms from "@/data/gyms.json";
import routes from "@/data/routes.json";
import ascents from "@/data/ascents.json";

export type Gym = {
  id: number;
  slug: string;
  name: string;
  city: string;
  address: string;
  description: string;
};

export type Route = {
  id: number;
  gymId: number;
  name: string;
  grade: string;
  color: string;
  wall: string;
  setAt: string;
  removedAt: string | null;
};

export const ASCENT_STYLES = ["FLASH", "REDPOINT", "ATTEMPT"] as const;
export type AscentStyle = (typeof ASCENT_STYLES)[number];

export type Ascent = {
  id: number;
  routeId: number;
  climberName: string;
  style: AscentStyle;
  date: string;
  comment: string | null;
};

// JSON files stand in for the database until Prisma (Milestone 3).
// The functions are async so the pages will not change when they do.

export async function getGyms(): Promise<Gym[]> {
  return gyms;
}

export async function getGymBySlug(slug: string): Promise<Gym | undefined> {
  return gyms.find((gym) => gym.slug === slug);
}

// Routes still on the wall (removedAt is empty)
export async function getCurrentRoutes(gymId: number): Promise<Route[]> {
  return routes.filter((route) => route.gymId === gymId && !route.removedAt);
}

export async function getRoute(id: number): Promise<Route | undefined> {
  return routes.find((route) => route.id === id);
}

export async function getGym(id: number): Promise<Gym | undefined> {
  return gyms.find((gym) => gym.id === id);
}

// Newest first
export async function getAscents(routeId: number): Promise<Ascent[]> {
  return (ascents as Ascent[])
    .filter((ascent) => ascent.routeId === routeId)
    .sort((a, b) => b.date.localeCompare(a.date));
}
