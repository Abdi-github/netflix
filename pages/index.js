import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import NavBar from "../components/common/NavBar";
import { getNetflixOriginals, getTrending } from "../helpers/api_helper";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (ctx) => {
  const trending = await getTrending();
  const netflixOriginals = await getNetflixOriginals();
  console.log(
    "TRENDING VIDEOS=====================>>",
    netflixOriginals.results
  );

  return {
    props: {
      trending: trending.results,
      netflixOriginals: netflixOriginals.results,
    },
  };
};

export default function Home({ trending, netflixOriginals }) {
  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        {" "}
        <NavBar />
        <Banner videos={netflixOriginals} />
      </div>
    </>
  );
}
