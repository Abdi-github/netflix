import Head from "next/head";

import Banner from "../components/Banner";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";

import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTrending,
} from "../helpers/api_helper";

export const getServerSideProps = async (ctx) => {
  const trending = await getTrending();
  const netflixOriginals = await getNetflixOriginals();
  const actions = await getActionMovies();
  const romances = await getRomanceMovies();
  const comedies = await getComedyMovies();
  const horrors = await getHorrorMovies();
  const documentaries = await getDocumentaries();
  // console.log("TRENDING VIDEOS=====================>>", actions);

  return {
    props: {
      trending: trending,
      netflixOriginals: netflixOriginals,
      actions: actions,
      horrors: horrors,
      comedies: comedies,
      romances: romances,
      documentaries: documentaries,
    },
  };
};

export default function Home({
  trending,
  netflixOriginals,
  actions,
  romances,
  comedies,
  horrors,
  documentaries,
}) {
  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <NavBar />
      <Banner videos={netflixOriginals} />
      <VideoLists videos={trending} category="Trending" />
      <VideoLists videos={actions} category="Action Thriller" />
      <VideoLists videos={romances} category="Romance" />
      <VideoLists videos={comedies} category="Comedy" />
      <VideoLists videos={horrors} category="Scary" />
      <VideoLists videos={documentaries} category="Documentary" />
      <Modal />
    </>
  );
}
