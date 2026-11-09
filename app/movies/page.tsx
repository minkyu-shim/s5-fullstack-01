import type { Metadata } from "next";
import { MovieList } from "@/components/movie-list";
import { getMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Movies | Movie Night",
  description: "The movies you can vote for",
};

export default async function MoviesPage() {
  const movies = await getMovies();
  console.log(`[movies] rendered ${movies.length} movies`);

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movies</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Rendered at {new Date().toISOString()}
      </p>
      <MovieList movies={movies} />
    </main>
  );
}
