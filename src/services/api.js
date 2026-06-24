import axios from "axios";

const API_KEY = "37c16878ac3ca0cac31a03e7f70e7c7a";

export const fetchMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return res.data.results;
};
export const searchMovies = async (query) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return res.data.results;
};
export const fetchTrending = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
export const fetchByGenre = async (genreId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};