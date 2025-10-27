import { TbPhoneCall } from "react-icons/tb";
import { ImagePath, ROUTES } from "../../Constants";
import { NavLink } from "react-router-dom";
import type { CourseType } from "../../Types";

const CourseCard = ({ course }: { course: CourseType }) => {
  const { title = "Have questions about this batch?", subtitle = "Talk to a counsellor", image = `${ImagePath}course/CourseCardImage.jpg`, language = "हिंGLISH", syllabus: { subjectLevel = "basic" } = {}, _id = "", onCallClick } = course;

  return (
    <NavLink to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`} className="relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end">
      <div className="w-full min-h-[300px] h-full bg-center bg-cover rounded-t-2xl overflow-hidden" style={{ backgroundImage: image }}>
        <div className="p-2 rounded-t-xl mx-0.5 flex justify-between gap-7 mb-0.5 absolute top-0 left-0 w-full z-10">
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">{language}</span>
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-3 rounded backdrop-blur-md">{subjectLevel}</span>
        </div>
      </div>
      <div className="bg-white p-4 grid gap-3">
        <div className="flex flex-wrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-lg">{title}</span>
          <span onClick={onCallClick} className="transition-colors hover:bg-input-box-dark/60 border border-input-box-dark font-semibold text-sm p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer">
            <TbPhoneCall className="me-2 text-lg text-success" />
            {subtitle}
          </span>
        </div>
        <button className="btn primary_btn square !h-12 !w-full  "> VIEW BATCH DETAILS</button>
      </div>
    </NavLink>
  );
};
export default CourseCard;
