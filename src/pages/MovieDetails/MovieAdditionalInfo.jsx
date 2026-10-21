import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieCredits, getMovieReviews } from "../../api";

function MovieAdditionalInfo({ type }) {
  const { movieId } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const isCast = type === "cast";
  const title = isCast ? "Cast" : "Reviews";

  useEffect(() => {
    let isCurrent = true;

    async function fetchItems() {
      setIsLoading(true);
      setError("");

      try {
        const data = isCast
          ? await getMovieCredits(movieId)
          : await getMovieReviews(movieId);

        if (isCurrent) {
          setItems(isCast ? data.cast : data);
        }
      } catch (fetchError) {
        console.error(`Failed to fetch movie ${type}:`, fetchError);
        if (isCurrent) {
          setError(`Не вдалося завантажити ${isCast ? "акторський склад" : "відгуки"}. Спробуйте ще раз.`);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    fetchItems();

    return () => {
      isCurrent = false;
    };
  }, [isCast, movieId, type]);

  return (
    <main className="movie-additional">
      <Link className="movie-additional__back" to={`/movie/${movieId}`}>
        Back to movie
      </Link>
      <h1>{title}</h1>

      {isLoading ? <p>Loading {title.toLowerCase()}...</p> : null}
      {error ? <p role="alert">{error}</p> : null}
      {!isLoading && !error && items.length === 0 ? (
        <p>No {title.toLowerCase()} available for this movie.</p>
      ) : null}

      {!isLoading && !error && items.length > 0 ? (
        <ul className={`movie-additional__list movie-additional__list--${type}`}>
          {items.map((item) =>
            isCast ? (
              <li key={item.credit_id}>
                <strong>{item.name}</strong>
                {item.character ? <span> as {item.character}</span> : null}
              </li>
            ) : (
              <li key={item.id} className="movie-additional__review">
                <h2>{item.author || "Anonymous"}</h2>
                {item.author_details?.rating != null ? (
                  <p className="movie-additional__rating">
                    Rating: {item.author_details.rating}/10
                  </p>
                ) : null}
                <p>{item.content}</p>
              </li>
            ),
          )}
        </ul>
      ) : null}
    </main>
  );
}

export default MovieAdditionalInfo;
