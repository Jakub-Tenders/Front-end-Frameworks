type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ query, onChange}: SearchBarProps) => {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Search movies, plot keywords, titles..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        <button
            type="button"
            onClick={() => onChange("")}
            title="Clear search"
            >
            &times;
            </button>
      </div>
    </div>
  )
}

export default SearchBar