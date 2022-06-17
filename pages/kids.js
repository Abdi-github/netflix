import Head from "next/head";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";
import {
  getKidsHighlyRatedMovies,
  getKidsPopularMovies,
  getKidsRecentMovies,
} from "../helpers/api_helper";

const movies = ({ popular, recent, highlyRated }) => {
  console.log("recent :>> ", recent);
  return (
    <>
      <Head>
        <title>Netflix Kids</title>
      </Head>
      <NavBar />
      <div className="mt-20">
        <VideoLists videos={recent} category="Kids Recent Movies" />
        <VideoLists videos={popular} category="Kids Popular Movies" />
        <VideoLists videos={highlyRated} category="Kids Top Rated Movies" />
      </div>

      <Modal />
    </>
  );
};

export default movies;

export const getServerSideProps = async (ctx) => {
  const popular = await getKidsPopularMovies();
  const recent = await getKidsRecentMovies();
  const highlyRated = await getKidsHighlyRatedMovies();

  return {
    props: {
      popular,
      recent,
      highlyRated,
    },
  };
};
