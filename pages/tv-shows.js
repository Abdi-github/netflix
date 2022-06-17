import Head from "next/head";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";

import {
  getPopularTvShows,
  getTopRatedTvShows,

} from "../helpers/api_helper";

const TvShows = ({ popular, topRated }) => {
  return (
    <>
      <Head>
        <title>Netflix tv shows</title>
      </Head>
      <NavBar />
      <div className="mt-20">
        <VideoLists videos={popular} category="Popular" />
        <VideoLists videos={topRated} category="Top Rated" />
      </div>
      <Modal />
    </>
  );
};

export default TvShows;

export const getStaticProps = async (ctx) => {
  const popular = await getPopularTvShows();
  const topRated = await getTopRatedTvShows();

  //   console.log("POPULAR===============", popular);

  return {
    props: {
      popular,
      topRated,
    },
  };
};
