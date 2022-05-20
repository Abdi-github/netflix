import { API_BASE_URL, API_KEY } from "./global-constants";

export const getTrending = async () => {
  const res = await fetch(
    `${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`
  );

  const trending = await res.json();

  const data = trending.results.map((result) => {
    return {
      ...result,
      type: result.media_type,
    };
  });
  // console.log("FFFFFFFFFFFFF==============", data);
  return data;
};
export const getNetflixOriginals = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`
  );

  const netflixOriginals = await res.json();
  const data = netflixOriginals.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getTopRated = async () => {
  const res = await fetch(
    `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );

  const topRated = await res.json();
  const data = topRated.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getActionMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
  );

  const action = await res.json();
  const data = action.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getComedyMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
  );

  const comedy = await res.json();
  const data = comedy.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getRomanceMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`
  );

  const romance = await res.json();
  const data = romance.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getHorrorMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
  );

  const horror = await res.json();
  const data = horror.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getDocumentaries = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
  );

  const documentary = await res.json();

  const data = documentary.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};

export const getMovieDetail = async (movie_id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  );

  const movieTrailler = await res.json();
  return movieTrailler;
};
export const getMovieTrailler = async (movie_id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  );

  const movieTrailler = await res.json();
  return movieTrailler;
};
export const getTvShowTrailler = async () => {
  const res = await fetch(
    `${API_BASE_URL}/tv/{tv_id}/videos?api_key=${API_KEY}&language=en-US`
  );

  const TvShowTrailler = await res.json();
  return TvShowTrailler;
};
export const getTvSeasonsTrailler = async () => {
  const res = await fetch(
    `${API_BASE_URL}/tv/{tv_id}/season/{season_number}/videos?api_key=${API_KEY}&language=en-US`
  );

  const TvSeasonsTrailler = await res.json();
  return TvSeasonsTrailler;
};
export const getEpisodesTrailler = async () => {
  const res = await fetch(
    `${API_BASE_URL}/tv/{tv_id}/season/{season_number}/episode/{episode_number}/videos?api_key=${API_KEY}&language=en-US`
  );

  const TvEpisodesTrailler = await res.json();
  return TvEpisodesTrailler;
};
// async function fetchMovie(id) {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
//   );
//   const movie = await response.json();
//   return movie;
// }

// fetchMovie(movieId).then((movie) => {
//   movie.genres.forEach((genre) => {
//     console.log("genre id: " + genre.id + ", genre name: " + genre.name);
//   });
// });
