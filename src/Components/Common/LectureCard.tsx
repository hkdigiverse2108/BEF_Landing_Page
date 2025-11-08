import type { LectureType } from "../../Types";

interface LectureCardProps {
  lecture: LectureType;
  setPlayVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoLink: React.Dispatch<React.SetStateAction<string>>;
}

const LectureCard = ({
  lecture,
  setPlayVideo,
  setVideoLink,
}: LectureCardProps) => {
  return (
    <div
      key={lecture?._id}
      className="flex max-sm:flex-col gap-4 bg-white rounded-lg  border border-gray-200 p-2 h-fit items-stretch"
    >
      {/* Image */}
      <figure
        onClick={() => {
          setPlayVideo(true);
          setVideoLink(lecture?.link);
        }}
      >
        <img
          src={lecture?.image}
          alt={lecture?.title}
          className="w-full h-full sm:w-fit sm:h-23 rounded-lg object-cover"
        />
      </figure>

      <div className="flex flex-col  gap-2 justify-between ">
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-gray-200 px-1.5 py-0.5 rounded">
            {lecture?.language}{" "}
          </span>
          <span className="text-primary font-semibold">
            {lecture?.subjectName}
          </span>
        </div>

        <h2 className="font-semibold text-sm sm:text-base">{lecture?.title}</h2>

        <p className="text-gray-600 text-xs font-medium sm:text-sm">
          {lecture?.subtitle}
        </p>

        <p className="text-gray-600 text-xs font-medium">{lecture?.date}</p>
      </div>
    </div>
  );
};

export default LectureCard;
