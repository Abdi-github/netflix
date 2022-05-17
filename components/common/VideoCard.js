import Image from "next/image";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const VideoCard = ({ imgSrc, imgAlt, video }) => {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useContext(StoreContext);

  // console.log("state=======", state);

  const openVideo = () => {
    setShowModal(true);

    dispatch({
      type: "SET_MODAL_MODE",
      payload: { modalMode: true },
    });
    dispatch({
      type: "SET_VIDEO",
      payload: {
        video: video,
      },
      payload: {
        video: { id: video.id, title: video.original_title, type: video.type },
      },
    });

    localStorage.setItem("modalMode", true);
    localStorage.setItem("video", JSON.stringify(video));
  };
  return (
    <div
      className="relative h-[120px] min-w-[180px] cursor-pointer"
      onClick={openVideo}
    >
      <Image
        src={imgSrc}
        layout="fill"
        alt={imgAlt}
        className="object-cover rounded-sm md:rounded"
      />
    </div>
  );
};

export default VideoCard;
