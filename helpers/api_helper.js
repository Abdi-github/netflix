import { API_BASE_URL, API_KEY } from "./global-constants";
import useSubscription from "./useSubscription";

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
export const getNewMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const newMovies = await res.json();

  const data = newMovies.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getPopularMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  const popular = await res.json();

  const data = popular.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getKidsPopularMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&with_genres=16&include_adult=false&sort_by=popularity.desc`
  );

  const kids = await res.json();

  const data = kids.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getKidsRecentMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&with_genres=16&include_adult=false&sort_by=release_date.desc`
  );

  const kids = await res.json();

  const data = kids.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};
export const getKidsHighlyRatedMovies = async () => {
  const res = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&with_genres=16&include_adult=false&sort_by=vote_average.desc`
  );

  const kids = await res.json();

  const data = kids.results.map((result) => {
    return {
      ...result,
      type: "movie",
    };
  });
  return data;
};

// /discover/movie?certification_country=US&certification.lte=G&with_genres=16&include_adult=false&sort_by=popularity.desc

export const getPopularTvShows = async () => {
  const res = await fetch(
    `${API_BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  const tvShows = await res.json();

  const data = tvShows.results.map((result) => {
    return {
      ...result,
      type: "tv-show",
    };
  });
  return data;
};

export const getTopRatedTvShows = async () => {
  const res = await fetch(
    `${API_BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );

  const tvShows = await res.json();

  const data = tvShows.results.map((result) => {
    return {
      ...result,
      type: "tv-show",
    };
  });
  return data;
};

export const getNewTvShows = async () => {
  const res = await fetch(
    `${API_BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  );

  const newTvs = await res.json();

  const data = newTvs.results.map((result) => {
    return {
      ...result,
      type: "tv-show",
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
export const getTvShowDetail = async (tv_id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${tv_id}?api_key=${API_KEY}&language=en-US`
  );

  const showTrailler = await res.json();
  return showTrailler;
};

export const getMovieTrailler = async (movie_id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  );

  const movieTrailler = await res.json();
  return movieTrailler;
};
export const getTvShowTrailler = async (tv_id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${tv_id}/videos?api_key=${API_KEY}&language=en-US`
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

// const subs = useSubscription();
// export const getUserSubscription = () => {
//   if (subs === null) return null;
//   return subs;
// };
