import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ReactPlayer from "react-player";
import { getMovieDetail, getMovieTrailler } from "../helpers/api_helper";
import { HiX, HiOutlinePlus, HiOutlineThumbUp } from "react-icons/hi";
export const Modal = () => {
  // const [showModal, setShowModal] = React.useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const [videoKey, setVideoKey] = useState(null);
  const [videoDetail, setVideoDetail] = useState(null);

  const { modalMode, video } = state;

  console.log("state=======", state);

  // const openModal = () => {
  //   setShowModal(true);
  //   localStorage.setItem("modalMode", true);
  //   localStorage.setItem("video", video);

  //   dispatch({
  //     type: "SET_MODAL_MODE",
  //     payload: { modalMode: true },
  //   });
  //   dispatch({
  //     type: "SET_VIDEO",
  //     payload: { video: video },
  //   });
  // };

  if (video) {
    if (video.type === "movie") {
      getMovieTrailler(video.id).then((videos) => {
        // console.log("KEY________________", videos.results[0].key);
        setVideoKey(videos.results[0].key);
      });
      getMovieDetail(video.id).then((videoDetail) => {
        console.log("DETAIL================", videoDetail);

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
    if (modalMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalMode]);

  return (
    <>
      {modalMode ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl md:min-w-[650px]  group">
              {/*content*/}
              <div className="absolute top-[40%] left-0 pl-4 flex flex-col gap-2 ">
                <button onClick={closeModal}>
                  <HiX className=" w-7 h-7 bg-gray-700/70  border-[1.5px] border-gray-300 rounded-full p-[2px] text-gray-300 hidden  group-hover:inline-block" />
                </button>
                <button onClick={closeModal}>
                  <HiOutlinePlus className=" w-7 h-7 bg-gray-700/70  border-[1.5px] border-gray-300 rounded-full p-[2px] text-gray-300 hidden  group-hover:inline-block" />
                </button>
                <button onClick={closeModal}>
                  <HiOutlineThumbUp className=" w-7 h-7 bg-gray-700/70  border-[1.5px] border-gray-300 rounded-full p-[2px] text-gray-300 hidden  group-hover:inline-block" />
                </button>
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

//  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//    {/*header*/}
//    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//      <h3 className="text-3xl font-semibold">Modal Title</h3>
//      <button
//        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//        onClick={closeModal}
//      >
//        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//          ×
//        </span>
//      </button>
//    </div>
//    {/*body*/}
//    <div className="relative p-6 flex-auto">
//      <p className="my-4 text-slate-500 text-lg leading-relaxed">
//        {video.original_title}
//      </p>
//    </div>
//    {/*footer*/}
//    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//      <button
//        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//        type="button"
//        onClick={closeModal}
//      >
//        Close
//      </button>
//      <button
//        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//        type="button"
//        onClick={closeModal}
//      >
//        Save Changes
//      </button>
//    </div>
//  </div>;

// <div className=" grid sm:grid-cols-1 md:grid-cols-2  gap-x-5 bg-black/60 px-3 py-3 ">
//   <div className="col-span-[2/3]">
//     <div className="flex space-x-3 text-sm font-light mb-2">
{
  /* <p className="text-green-500 font-normal">
  {videoDetail?.vote_average * 10}% Match
</p>; */
}
// <p>{videoDetail?.release_date} </p>
// <p className=" px-[2px] py-[0] border ">HD</p>
// </div>
// <div>
//   <p>{videoDetail?.overview} </p>
// </div>
//   </div>

//   <div className="mt-7">
// <p className="text-[gray]">
//   Genres:{" "}
//   <span className="text-gray-200">
//     {videoDetail?.genres.map((genre) => genre.name).join(", ")}
//   </span>
// </p>{" "}
//   </div>
// </div>;
