import { Link, useLocation } from "react-router-dom";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className="movie-list">
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`} state={{ from: location.pathname }}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
