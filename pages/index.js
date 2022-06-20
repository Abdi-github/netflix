import Head from "next/head";
import { useContext, useState, useEffect } from "react";

import Banner from "../components/Banner";
import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";
import { StoreContext } from "../context/StoreContext";

import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTrending,
} from "../helpers/api_helper";
import useSubscription from "../helpers/useSubscription";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContextProvider";

const Home = ({
  trending,
  netflixOriginals,
  actions,
  romances,
  comedies,
  horrors,
  documentaries,
}) => {
  const router = useRouter();

  const { state } = useContext(StoreContext);
  const { myList } = state;
  // console.log("MY LIST INDEX", myList);
  const [myListVideos, setMyListVideos] = useState([]);
  useSubscription();

  const { user } = useAuth();

  // useEffect(() => {

  // }, [router, user, subs]);
  useEffect(() => {
    setMyListVideos(myList);
  }, [myList]);

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
      {myListVideos.length > 0 && (
        <VideoLists videos={myListVideos} category="My List" />
      )}

      <Modal />
    </>
  );
};

export default Home;

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
