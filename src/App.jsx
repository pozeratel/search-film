import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Movie from "./pages/Movie/Movie";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import MovieAdditionalInfo from "./pages/MovieDetails/MovieAdditionalInfo";
import Layout from "./components/Layout/Layout.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movie" element={<Movie />} />
        <Route path="movie/:movieId" element={<MovieDetails />} />
        <Route
          path="movie/:movieId/cast"
          element={<MovieAdditionalInfo type="cast" />}
        />
        <Route
          path="movie/:movieId/reviews"
          element={<MovieAdditionalInfo type="reviews" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
