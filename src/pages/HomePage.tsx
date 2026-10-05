import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/MovieList";

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;

const HomePage = ({ searchQuery }: { searchQuery: string }) => {
  const { movies, loading, error } = useMovies(apiUrl);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="main-container">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong. {error}</p>}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </main>
  );
};

export default HomePage;