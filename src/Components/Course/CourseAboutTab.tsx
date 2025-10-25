import { TbCloudDownload } from "react-icons/tb";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";

const CourseAboutTab = ({ totalLecture, totalTest }: CourseType) => {
  const { data } = useGetApiQuery({ url: `${URL_KEYS.ABOUT.ALL}?type=course` });

  // console.log("About : ", data?.data);
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
        <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: AboutUs }} />
        <button className="font-medium">More...</button>
      </div>
      <div>
        <button className="flex w-full border border-gray-300  rounded-md hover:border-primary  hover:!text-primary transition-colors text-center justify-center py-4 gap-3 uppercase font-semibold">
          <span className="text-2xl ">
            <TbCloudDownload />
          </span>
          download brochure
        </button>
      </div>
    </section>
  );
};

export default CourseAboutTab;
