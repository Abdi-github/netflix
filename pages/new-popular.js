import Head from "next/head";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";

import {
  getNewMovies,
  getNewTvShows,
  getPopularMovies,
  getPopularTvShows,
  getTopRatedTvShows,
} from "../helpers/api_helper";

const NewPopular = ({ popularTvs, newTvs, popularMovies, newMovies }) => {
  console.log("NM==========", newMovies);
  return (
    <>
      <Head>
        <title>Netflix New & Popular</title>
      </Head>
      <NavBar />
      <div className="mt-20">
        <VideoLists videos={newMovies} category="New Movies" />
        <VideoLists videos={popularMovies} category="Popular Movies" />
        <VideoLists videos={newTvs} category="New TV Shows" />
        <VideoLists videos={popularTvs} category="Popular TV Shows" />
      </div>
      <Modal />
    </>
  );
};

export default NewPopular;

export const getStaticProps = async (ctx) => {
  const popularTvs = await getPopularTvShows();
  const newTvs = await getNewTvShows();
  const popularMovies = await getPopularMovies();
  const newMovies = await getNewMovies();

  //   console.log("POPULAR===============", popular);

  return {
    props: {
      popularTvs,
      newTvs,
      popularMovies,
      newMovies,
    },
  };
};
