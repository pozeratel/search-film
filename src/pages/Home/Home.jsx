import { GetTrandingMovies } from "../../api";
import { useEffect, useState } from "react";
import MovieList from "../../components/Navigation/MovieList";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movies = await GetTrandingMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        setError("Не вдалося завантажити фільми. Спробуйте ще раз.");
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <h1>Trending Today</h1>
      {error ? <p>{error}</p> : <MovieList movies={movies} />}
    </div>
  );
}

export default Home;
