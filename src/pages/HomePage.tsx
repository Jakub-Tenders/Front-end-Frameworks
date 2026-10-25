import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { Movie } from "../types";

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;

const HomePage = ({ searchQuery }: { searchQuery: string }) => {
  const { movies, loading, error } = useMovies(apiUrl);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="main-container">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong. {error}</p>}
      {!loading && !error && (
        <>
          <MovieList movies={filteredMovies} onMovieClick={setSelectedMovie} />
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;