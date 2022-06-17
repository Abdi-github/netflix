import { IMAGE_BASE_URL } from "../../helpers/global-constants";
import VideoCard from "./VideoCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useRef, useState } from "react";

const VideoLists = ({ videos, category }) => {
  const rowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = (direction) => {
    setIsScrolled(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="mb-1 md:mb-3 px-2 md:px-4">
      <h2 className="text-[#e5e5e5] font-semibold py-2 text-sm md:text-2xl hover:text-gray-50 transition duration-300  ">
        {category}
      </h2>
      <div className="group relative ">
        {isScrolled && (
          <HiChevronLeft
            className="scrollIcon left-0.5"
            onClick={() => handleClick("left")}
          />
        )}

        <div
          className="flex relative items-center md:p-2 gap-x-2 md:gap-x-3 overflow-x-scroll scrollbar-hide"
          ref={rowRef}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="hover:scale-105 md:hover-125 hover:z-50"
            >
              <VideoCard
                video={video}
                imgSrc={
                  video?.backdrop_path || video?.poster_path !== null
                    ? `${IMAGE_BASE_URL}/w500${
                        video?.backdrop_path || video?.poster_path
                      }`
                    : `/images/others/default-movie.png`
                }
                imgAlt={video?.original_title}
              />
            </div>
          ))}
        </div>
        <HiChevronRight
          className="scrollIcon right-2 z-50"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default VideoLists;
