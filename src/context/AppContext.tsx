import { createContext, useContext, useReducer, useEffect } from "react";
import type { Theme, Movie } from "../types";

export type Review = {
  watched: boolean;
  rating: number | null;
  opinion: string;
};

const EMPTY_REVIEW: Review = { watched: false, rating: null, opinion: "" };

type State = {
  theme: Theme;
  favorites: Movie[];
  reviews: Record<number, Review>;
};

type Action =
  | { type: "SET_THEME" }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_REVIEW"; payload: { id: number; review: Partial<Review> } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case "SET_REVIEW": {
      const prev = state.reviews[action.payload.id] ?? EMPTY_REVIEW;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.id]: { ...prev, ...action.payload.review },
        },
      };
    }
    default:
      return state;
  }
};

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  reviews: Record<number, Review>;
  getReview: (id: number) => Review;
  setReview: (id: number, review: Partial<Review>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const initialTheme =
    (localStorage.getItem("cinegrid_theme") as Theme) || "dark";

  const initialFavorites: Movie[] = JSON.parse(
    localStorage.getItem("cinegrid_favorites") || "[]",
  );

  const initialReviews: Record<number, Review> = JSON.parse(
    localStorage.getItem("cinegrid_reviews") || "{}",
  );

  const [state, dispatch] = useReducer(reducer, {
    theme: initialTheme,
    favorites: initialFavorites,
    reviews: initialReviews,
  });

  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("cinegrid_favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem("cinegrid_reviews", JSON.stringify(state.reviews));
  }, [state.reviews]);

  const toggleTheme = () => dispatch({ type: "SET_THEME" });

  const toggleFavorite = (movie: Movie) =>
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });

  const isFavorite = (id: number) => state.favorites.some((m) => m.id === id);

  const getReview = (id: number) => state.reviews[id] ?? EMPTY_REVIEW;

  const setReview = (id: number, review: Partial<Review>) =>
    dispatch({ type: "SET_REVIEW", payload: { id, review } });

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
        reviews: state.reviews,
        getReview,
        setReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};