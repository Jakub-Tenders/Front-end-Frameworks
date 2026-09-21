import MovieCard from "./MovieCard";
import { Movie } from "../types";

const MovieList = ({ movies }: { movies: Movie[] }) => {
  if (movies.length === 0) {
    return <p className="empty-state">No movies found.</p>;
  }
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;