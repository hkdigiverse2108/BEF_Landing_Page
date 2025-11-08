import { TbCloudDownload } from "react-icons/tb";
import { ImagePath } from "../../Constants";
import type { CourseType } from "../../Types";
import { useState } from "react";

const CourseAboutTab = ({
  description,
  totalLecture,
  totalTest,
  pdf,
}: CourseType) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <section className="space-y-6" data-aos="fade-up">
      <div className="grid grid-cols-2 gap-3">
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/VideoIcon.png`}
            alt="Lectures"
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-semibold">Lectures</h4>
            <p>{totalLecture}</p>
          </div>
        </section>
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/NotesIcon.png`}
            alt="Tests"
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-semibold">Tests</h4>
            <p>{totalTest}</p>
          </div>
        </section>
      </div>
      <div>
        <div
          className={`  ${isMore ? "" : "line-clamp-8 sm:line-clamp-5"}  `}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <button
          onClick={() => setIsMore(!isMore)}
          className="font-medium text-primary"
        >
          {isMore ? "Less" : "More..."}
        </button>
      </div>
      <div>
        <a
          href={pdf}
          className="flex w-full border border-gray-300  rounded-md hover:border-primary  hover:!text-primary transition-colors text-center justify-center py-4 gap-3 uppercase font-semibold"
        >
          <span className="text-2xl ">
            <TbCloudDownload />
          </span>
          download brochure
        </a>
      </div>
    </section>
  );
};

export default CourseAboutTab;
