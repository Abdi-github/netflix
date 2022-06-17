import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ReactPlayer from "react-player";
import {
  getMovieDetail,
  getMovieTrailler,
  getTvShowDetail,
  getTvShowTrailler,
} from "../helpers/api_helper";
import {
  HiX,
  HiOutlinePlus,
  HiOutlineThumbUp,
  HiCheck,
  HiThumbUp,
} from "react-icons/hi";
import _ from "lodash";
import { async } from "@firebase/util";
export const Modal = () => {
  // const [showModal, setShowModal] = React.useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const [videoKey, setVideoKey] = useState(null);
  const [videoDetail, setVideoDetail] = useState(null);
  const [isMovieAddedTomylist, setIsMovieAddedTomylist] = useState(false);
  const [isMovieLiked, setIsMovieLiked] = useState(false);

  const { modalMode, video } = state;

  if (video) {
    if (video.type === "movie") {
      getMovieTrailler(video.id).then((videos) => {
        // console.log("KEY________________", videos.results[0].key);
        if (videos.results[0]?.key) {
          setVideoKey(videos.results[0]?.key);
          // console.log("KEY", videoKey);
        } else {
          setVideoKey("o5cbHaffnbI");
        }
      });
      getMovieDetail(video.id).then((videoDetail) => {
        // console.log("DETAIL================", videoDetail);

        setVideoDetail(videoDetail);
      });
    }
    if (video.type === "tv-show") {
      getTvShowTrailler(video.id).then((videos) => {
        // console.log("KEY________________", videos.results[0].key);
        if (videos.results[0]?.key) {
          setVideoKey(videos.results[0]?.key);
          // console.log("KEY", videoKey);
        } else {
          setVideoKey("o5cbHaffnbI");
        }
      });
      getTvShowDetail(video.id).then((videoDetail) => {
        // console.log("DETAIL================", videoDetail);

        setVideoDetail(videoDetail);
      });
    }
  }

  const closeModal = () => {
    localStorage.setItem("modalMode", false);
    localStorage.setItem("video", null);

    dispatch({
      type: "SET_MODAL_MODE",
      payload: { modalMode: false },
    });
    dispatch({
      type: "SET_VIDEO",
      payload: { video: null },
    });
  };

  useEffect(() => {
    console.log("state=======", state);

    if (modalMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalMode]);

  const addToMyList = () => {
    // console.log(video);
    let myList = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("myList")) {
        myList = JSON.parse(localStorage.getItem("myList"));
      }
      // push new product to cart
      video = { ...video, myListAdded: true };
      myList.push(video);
      // remove duplicates
      let unique = _.uniqWith(myList, _.isEqual);
      // console.log("unique", unique);
      // save to local storage
      localStorage.setItem("myList", JSON.stringify(unique));

      dispatch({
        type: "ADD_TO_MYLIST",
        payload: {
          myList: unique,
        },
      });

      setIsMovieAddedTomylist(true);
    }
  };

  const removeFromMyList = () => {
    console.log("VVVVV", video);
    const newList = state.myList.filter((x) => x.id !== video.id);
    localStorage.setItem("myList", JSON.stringify(newList));
    dispatch({
      type: "REMOVE_FROM_MYLIST",
      payload: {
        myList: newList,
      },
    });
    setIsMovieAddedTomylist(false);
  };

  const likeMovie = () => {
    // console.log(video);
    let likedList = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("liked")) {
        likedList = JSON.parse(localStorage.getItem("liked"));
      }
      // push new product to cart
      likedList.push(video);
      // remove duplicates
      let unique = _.uniqWith(likedList, _.isEqual);
      // console.log("unique", unique);
      // save to local storage
      localStorage.setItem("liked", JSON.stringify(unique));

      dispatch({
        type: "LIKE_MOVIE",
        payload: {
          liked: unique,
        },
      });

      setIsMovieLiked(true);
    }
  };

  const dislikeMovie = () => {
    const newLikedList = state.liked.filter((x) => x.id !== video.id);
    localStorage.setItem("liked", JSON.stringify(newLikedList));
    dispatch({
      type: "DISLIKE_MOVIE",
      payload: {
        liked: newLikedList,
      },
    });
    setIsMovieLiked(false);
  };

  useEffect(() => {
    if (state?.myList.length > 0) {
      const existVideo = state.myList.find((x) => x?.id === video?.id);
      console.log("EXIST", existVideo);
      if (existVideo) {
        setIsMovieAddedTomylist(true);
      } else {
        setIsMovieAddedTomylist(false);
      }
    }
    if (state?.liked.length > 0) {
      const existVideo = state.liked.find((x) => x?.id === video?.id);
      console.log("EXIST", existVideo);
      if (existVideo) {
        setIsMovieLiked(true);
      } else {
        setIsMovieLiked(false);
      }
    }
  }, [video?.id]);

  return (
    <>
      {modalMode ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl md:min-w-[650px]  group">
              {/*content*/}

              <div className="absolute top-[40%] left-0 pl-4 flex flex-col gap-2 ">
                <button onClick={closeModal}>
                  <HiX className="modalBtn" />
                </button>
                {isMovieAddedTomylist ? (
                  <button onClick={removeFromMyList}>
                    <HiCheck className="modalBtn" />
                  </button>
                ) : (
                  <button onClick={addToMyList}>
                    <HiOutlinePlus className="modalBtn" />
                  </button>
                )}
                {isMovieLiked ? (
                  <button onClick={dislikeMovie}>
                    <HiThumbUp className="modalBtn" />
                  </button>
                ) : (
                  <button onClick={likeMovie}>
                    <HiOutlineThumbUp className="modalBtn" />
                  </button>
                )}
              </div>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoKey}`}
                controls={true}
                width="100%"
              />
              <div className="bg-black/60 px-3 py-3  ">
                <div className="flex items-center space-x-4 text-sm font-light mb-4">
                  <p className="text-green-500 font-normal">
                    {videoDetail?.vote_average * 10}% Match
                  </p>
                  <p>{videoDetail?.release_date} </p>
                  <span className=" px-[2px] py-[0] border ">HD</span>
                </div>
                <div className="md:flex md:space-x-8">
                  <div className="md:w-2/3">
                    <p>{videoDetail?.overview}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-gray-400">
                      Genres:{" "}
                      <span className="text-gray-200">
                        {videoDetail?.genres
                          .map((genre) => genre.name)
                          .join(", ")}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Original language:{" "}
                      <span className="text-gray-200">
                        {videoDetail?.original_language}
                      </span>
                    </p>{" "}
                    <p className="text-gray-400">
                      Total vote:{" "}
                      <span className="text-gray-200">
                        {videoDetail?.vote_count}
                      </span>
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default Modal;
