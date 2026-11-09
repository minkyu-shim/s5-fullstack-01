"use client";

import { useEffect, useState } from "react";
import { MovieList } from "@/components/movie-list";
import type { Movie } from "@/lib/movies";

export default function MoviesClientPage() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    // Runs in the browser, after the page has loaded
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data));
  }, []);

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movies (client-rendered)</h1>
      {movies === null ? <p className="mt-6" role="status">Loading movies...</p> : <MovieList movies={movies} />}
    </main>
  );
}
