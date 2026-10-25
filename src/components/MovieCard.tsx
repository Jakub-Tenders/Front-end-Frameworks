import { Movie } from "../types";
import { getGenreNames } from "../data/genres";
import { getPosterUrl } from "../data/sampleMovies";
import { useAppContext } from "../context/AppContext";

type MovieCardProps = { movie: Movie; onMovieClick: (movie: Movie) => void };

const MovieCard = ({ movie, onMovieClick }: MovieCardProps) => {
  const { toggleFavorite, isFavorite } = useAppContext();
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const genreNames = getGenreNames(movie.genre_ids);

  return (
    <article className="movie-card" tabIndex={0} aria-label={movie.title}>
      <div className="poster-wrapper">
        <img src={getPosterUrl(movie.poster_path)} alt={movie.title} className="poster-img" loading="lazy" />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {(movie.vote_average ?? 0).toFixed(1)}
            </span>
            <button
              className={`favorite-btn${isFavorite(movie.id) ? " is-favorite" : ""}`}
              title="Add to Watchlist"
              aria-label={
                isFavorite(movie.id)
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              onClick={() => toggleFavorite(movie)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <span
            className="quick-view-hint"
            onClick={() => onMovieClick(movie)}
            role="button"
            tabIndex={0}
          >
            View Details
          </span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{year}</span>
          <span>{movie.vote_count ?? 0} votes</span>
        </div>
        <div className="movie-genres-tags">
          {genreNames.map((genre) => (
            <span className="genre-tag" key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default MovieCard