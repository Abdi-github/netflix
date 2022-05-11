import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";

import { IMAGE_BASE_URL } from "../helpers/global-constants";

const Banner = ({ videos }) => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    setVideo(videos[Math.floor(Math.random() * videos.length)]);
  }, [videos]);

  return (
    <div className="flex h-[60vh]  md:h-[90vh] bg-gradient-to-b from-gray-900/50 to-gray-500/10">
      <div className="absolute right-0 left-0 top-0  w-screen  h-[60vh]  md:h-[90vh] -z-10 ">
        <Image
          src={`${IMAGE_BASE_URL}${video?.backdrop_path || video?.poster_path}`}
          alt={video?.original_title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="py-24 md:self-center px-2 md:px-4 lg:px-7 space-y-2  md:space-y-3">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          {video?.original_title || video?.title}
        </h1>
        <p className="line-clamp-4 max-w-xs text-xs  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
          {video?.overview}
        </p>
        <div className="flex space-x-3">
          <button className="btnBanner bg-white text-black  ">
            <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 " />
            play
          </button>
          <button className="btnBanner bg-[gray]/70">
            more info
            <HiInformationCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
