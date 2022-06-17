import Head from "next/head";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";
import {
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTrending,
} from "../helpers/api_helper";

const movies = ({
  trending,
  netflixOriginals,
  actions,
  romances,
  comedies,
  horrors,
}) => {
  return (
    <>
      <Head>
        <title>Netflix My List</title>
      </Head>
      <NavBar />
      <div className="mt-20">
        <VideoLists videos={netflixOriginals} category="Netflix Originals" />
        <VideoLists videos={trending} category="Trending" />
        <VideoLists videos={actions} category="Action Thriller" />
        <VideoLists videos={romances} category="Romance" />
        <VideoLists videos={comedies} category="Comedy" />
        <VideoLists videos={horrors} category="Scary" />
      </div>

      <Modal />
    </>
  );
};

export default movies;

export const getServerSideProps = async (ctx) => {
  const trending = await getTrending();
  const netflixOriginals = await getNetflixOriginals();
  const actions = await getActionMovies();
  const romances = await getRomanceMovies();
  const comedies = await getComedyMovies();
  const horrors = await getHorrorMovies();
  // console.log("TRENDING VIDEOS=====================>>", actions);

  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  //   // where: [
  //   //   ["metadata.type", "==", "books"],
  //   //   ["metadata.rating", ">=", 4],
  //   // ],
  //   // limit: 10,
  // })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  return {
    props: {
      trending: trending,
      netflixOriginals: netflixOriginals,
      actions: actions,
      horrors: horrors,
      comedies: comedies,
      romances: romances,
    },
  };
};
