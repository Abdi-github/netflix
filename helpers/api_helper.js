import { API_BASE_URL, API_KEY } from "./global-constants";

export const getTrending = async () => {
  const res = await fetch(
    `${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`
  );

  const trending = await res.json();
  return trending;
};
export const getNetflixOriginals = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`
  );

  const netflixOriginals = await res.json();
  return netflixOriginals;
};
export const getTopRated = async () => {
  const res = await fetch(
    `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );

  const topRated = await res.json();
  return topRated;
};
export const getActionMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
  );

  const action = await res.json();
  return action;
};
export const getComedyMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
  );

  const comedy = await res.json();
  return comedy;
};
export const getRomanceMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`
  );

  const romance = await res.json();
  return romance;
};
export const getHorrorMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
  );

  const horror = await res.json();
  return horror;
};
export const getDocumentaries = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
  );

  const documentary = await res.json();
  return documentary;
};
