import movies from "@/data/movies.json";

export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  minutes: number;
};

// Simulates a slow database query (1 second)
export async function getMovies(): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return movies;
}
