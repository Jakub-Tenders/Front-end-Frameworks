import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");

const filteredMovies = SAMPLE_MOVIES.filter((movie) =>
  movie.title.toLowerCase().includes(query.toLowerCase())
);

  return (
    <div className="app-layout">
      <main className="main-container">
        <h1>Movie App</h1>
        <SearchBar query={query} onChange={setQuery} />
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
};
export default App;