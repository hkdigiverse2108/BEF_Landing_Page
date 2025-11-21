import { FaLock } from "react-icons/fa";
import type { LectureType } from "../../Types";
import { FileTextFilled } from "@ant-design/icons";
import { useAppDispatch } from "../../Store/Hook";
import { setModalVideoLink, setModalVideoPlay } from "../../Store/Slices/VideoModalSlice";

interface LectureCardProps {
  lecture: LectureType;
}

const LectureCard = ({ lecture }: LectureCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div key={lecture?._id} className=" flex max-sm:flex-col flex-nowrap gap-2 justify-between bg-white rounded-lg  border border-gray-200 p-2 h-fit items-stretch">
      <section className="flex max-sm: gap-4 h-fit ">
        {/* Image */}
        <figure
          className="relative"
          onClick={() => {
            if (!lecture?.isLocked) {
              dispatch(setModalVideoPlay(true));
              dispatch(setModalVideoLink(lecture?.link));
            }
          }}
        >
          <img src={lecture?.image} alt={lecture?.title} className="min-w-20 max-h-30 max-w-60 w-full h-fit  sm:w-full sm:h-23 rounded-lg object-cover" />
          {lecture?.isLocked && (
            <span className="absolute -top-1 -left-1 bg-black/10 backdrop-blur-md p-2 rounded-full">
              <FaLock className="text-white max-sm:text-xs" />
            </span>
          )}
        </figure>

        <div className="flex flex-col  gap-2 sm:justify-between max-w-1/2">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-gray-200 px-1.5 py-0.5 rounded">{lecture?.language} </span>
            <span className="text-primary font-semibold">{lecture?.subjectName}</span>
          </div>

          <h2 className="font-semibold text-sm sm:text-base">{lecture?.title}</h2>

          <p className="max-sm:hidden text-gray-600 text-xs font-medium sm:text-sm">{lecture?.subtitle}</p>

          {/* <p className="text-gray-600 text-xs font-medium">{lecture?.date}</p> */}
        </div>
      </section>
      <section className="flex max-sm:justify-between  items-end ">
        <p className="sm:hidden  text-gray-600 text-xs font-medium sm:text-sm">{lecture?.subtitle}</p>
        {lecture?.pdf && (
          <a href={lecture?.pdf} className="flex gap-2 py-1 px-2  h-fit items-center  hover:text-primary border border-gray-200 hover:border-primary rounded max-sm:text-xs sm:ont-medium transition duration-200  ">
            <FileTextFilled className="sm:text-xl " />
            <span>PDF</span>
          </a>
        )}
      </section>
    </div>
  );
};

export default LectureCard;
