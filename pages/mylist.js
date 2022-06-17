import Head from "next/head";
import { useContext, useState, useEffect } from "react";

import NavBar from "../components/common/NavBar";
import VideoLists from "../components/common/VideoLists";
import Modal from "../components/Modal";
import { StoreContext } from "../context/StoreContext";

const MyList = () => {
  const { state } = useContext(StoreContext);

  const { myList } = state;

  return (
    <>
      <Head>
        <title>Netflix My List</title>
      </Head>
      <NavBar />
      <div className="mt-20">
        {myList.length > 0 ? (
          <VideoLists videos={myList} category="My List" />
        ) : (
          <div>
            <h4 className="text-center text-red-500 font-semibold text-xl">
              You have not any added movie to the list
            </h4>
          </div>
        )}
      </div>

      <Modal />
    </>
  );
};

export default MyList;
