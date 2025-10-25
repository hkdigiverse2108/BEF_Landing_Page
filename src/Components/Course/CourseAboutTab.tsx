import { TbCloudDownload } from "react-icons/tb";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";
import { useState } from "react";

const CourseAboutTab = ({ totalLecture, totalTest }: CourseType) => {
  const [isMore, setIsMore] = useState(false);

  const { data } = useGetApiQuery({ url: `${URL_KEYS.ABOUT.ALL}?type=course` });
  
  const AboutUs = data?.data?.aboutUs;

  return (
    <section className="space-y-6" data-aos="fade-up">
      <div className="grid grid-cols-2 gap-3">
        <section className="flex gap-3 items-center">
          <img src={`${ImagePath}/workshop/VideoIcon.png`} alt="" className="w-8 h-fit" />
          <div>
            <h4 className="font-semibold">Lectures</h4>
            <p>{totalLecture}</p>
          </div>
        </section>
        <section className="flex gap-3 items-center">
          <img src={`${ImagePath}/workshop/NotesIcon.png`} alt="" className="w-8 h-fit" />
          <div>
            <h4 className="font-semibold">Tests</h4>
            <p>{totalTest}</p>
          </div>
        </section>
      </div>
      <div>
        <div className={`text-sm text-gray-600 ${isMore ? "" : "line-clamp-4"}  `} dangerouslySetInnerHTML={{ __html: AboutUs }} />
        <button onClick={() => setIsMore(!isMore)} className="font-medium text-primary">
          {isMore ? "Less" : "More..."}
        </button>
      </div>
      <div>
        <a href={`${ImagePath}DummyPDF.pdf`} className="flex w-full border border-gray-300  rounded-md hover:border-primary  hover:!text-primary transition-colors text-center justify-center py-4 gap-3 uppercase font-semibold">
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
