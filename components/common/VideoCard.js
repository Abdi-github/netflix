import Image from "next/image";

const VideoCard = ({ imgSrc, imgAlt }) => {
  return (
    <div className="relative h-[120px] min-w-[180px]">
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
