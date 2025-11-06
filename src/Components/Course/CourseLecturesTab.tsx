import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { LectureType } from "../../Types";

const CourseLecturesTab = ({ id }: { id?: string }) => {

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?courseFilter=${id}`,
  });

  const Lectures = data?.data?.lecture_data || [];
  console.log(Lectures);
  return (
    <div className="space-y-4" data-aos="fade-up">
      {Lectures?.map((lecture: LectureType) => (
        <a
          href={lecture?.link}
          target="_blank"
          rel="noopener noreferrer"
          key={lecture?._id}
          className="flex max-sm:flex-col gap-4 bg-white rounded-lg  border border-gray-200 p-4 h-full items-stretch"
        >
          {/* Image */}
          <img
            src={lecture?.image}
            alt={lecture?.title}
            className="w-full h-full sm:w-fit sm:h-35 rounded-lg object-cover"
          />

          {/* Content */}
          <div className="flex flex-col sm:py-3 gap-2 justify-between">
            {/* Tags */}
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-gray-200 px-1.5 py-0.5 rounded">
                {" "}
                {lecture?.language}{" "}
              </span>
              <span className="text-primary font-semibold">
                {lecture?.subjectName}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-sm sm:text-base">
              {lecture?.title}
            </h2>

            {/* Instructor */}
            <p className="text-gray-600 text-xs font-medium sm:text-sm">
              {lecture?.subtitle}
            </p>

            {/* Date */}
            <p className="text-gray-600 text-xs font-medium">{lecture?.date}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CourseLecturesTab;
