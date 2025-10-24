import { TbCloudDownload } from "react-icons/tb";
import { ImagePath } from "../../Constants";

const CourseAboutTab = () => {
  return (
    <section className="space-y-6" data-aos="fade-up">
      <div className="grid grid-cols-2 gap-3">
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/VideoIcon.png`}
            alt=""
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-semibold">Lectures</h4>
            <p>30</p>
          </div>
        </section>
        <section className="flex gap-3 items-center">
          <img
            src={`${ImagePath}/workshop/NotesIcon.png`}
            alt=""
            className="w-8 h-fit"
          />
          <div>
            <h4 className="font-semibold">Lectures</h4>
            <p>30</p>
          </div>
        </section>
      </div>
      <div>
        <p className="text-sm text-gray-600">
          CSAT Live PathShala is the first revolutionary batch in the world of
          EdTech where Educator and Aspirants can not only see each other but
          also ask questions and clear their doubts directly. The main objective
          of this batch is not only to ensure success in CSAT but also to
          provide the aspirant with an environment similar to offline centres in
          Delhi from the comfort of their home.
        </p>
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
