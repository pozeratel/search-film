import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    }

    fetchMovie();
  }, [movieId]);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygm1eLALWaemoygbmBpsJr3ybpLxFGJ30ogCh26PuR0eh0EoITXRupxpE&s=10";

  return (
    <div className="movie-details">
      <button
        type="button"
        className="movie-details__back"
        onClick={() => window.history.back()}
      >
        Go back
      </button>

      <div className="movie-details__content">
        <img
          className="movie-details__poster"
          src={imageUrl}
          alt={movie.title || "Movie poster"}
        />

        <div className="movie-details__info">
          <h1>{movie?.title || "Loading..."}</h1>
          <h2>Overview</h2>
          <p>{movie?.overview || "Loading overview..."}</p>

          <h3>Genres</h3>
          <ul className="movie-details__genres">
            {movie?.genres?.length ? (
              movie.genres.map((item) => <li key={item.id}>{item.name}</li>)
            ) : (
              <li>Loading genres...</li>
            )}
          </ul>

          <section className="movie-details__additional">
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to={`/movie/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movie/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
