import { API_BASE_URL, API_KEY } from "./global-constants";


export const getTrending = async () => {
  const res = await fetch(`${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`);

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
