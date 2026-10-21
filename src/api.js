import axios from "axios";

const API_KEY = "9a8169401a13546e2ff20fd1839c5c8d";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export async function GetTrandingMovies() {
  const response = await api.get("/trending/movie/day", {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await api.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await api.get(`/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
    },
  });

  return response.data.results;
}

export const GetTrendingMovies = GetTrandingMovies;
