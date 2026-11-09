import type { Movie } from "@/lib/movies";

export function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {movies.map((movie) => (
        <li key={movie.id} className="rounded border p-4">
          <h2 className="font-semibold">
            {movie.title} ({movie.year})
          </h2>
          <p className="text-sm">
            {movie.genre} · {movie.minutes} min
          </p>
        </li>
      ))}
    </ul>
  );
}
