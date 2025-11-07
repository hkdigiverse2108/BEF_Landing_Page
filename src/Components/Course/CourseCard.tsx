import { TbPhoneCall } from "react-icons/tb";
import { ROUTES } from "../../Constants";
import { Link, NavLink } from "react-router-dom";
import type { CourseType } from "../../Types";
import { Popover } from "antd";
import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { CONTACT } from "../../Data";

const CourseCard = ({ course }: { course: CourseType }) => {
  const {
    image = "",
    language = "हिंGLISH",
    syllabus: { subjectLevel = "basic" } = {},
    _id = "",
  } = course;

  const title = "Have questions about this Course?";
  const subtitle = "Talk to a counsellor";

  const HandleContactClick = () => {};

  const content = (
    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      <Link
        to={`tel:${CONTACT?.number}`}
        className="flex flex-nowrap gap-2 cursor-pointer !text-black"
      >
        <IoCall className="me-2 text-lg text-success" />
        Make Call
      </Link>
      <span className=" border-t flex border-gray-200  "></span>
      <Link
        to={`https://api.whatsapp.com/send?text=${CONTACT?.number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-nowrap gap-2 cursor-pointer !text-black"
      >
        <IoLogoWhatsapp className="me-2 text-lg text-success" /> Chat With Us
      </Link>
    </div>
  );

  return (
    <NavLink
      to={`${ROUTES.COURSE.DETAILS.replace(":id", _id)}`}
      className=" relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end h-fit"
    >
      <div className="relative w-full  rounded-t-2xl overflow-hidden bg-gray-300">
        <figure className=" ">
          <img src={image} alt="Course" className=" w-full h-full " />
        </figure>
        <div className="absolute  top-0 left-0 w-full flex justify-between p-2 gap-7">
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {language}
          </span>
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {subjectLevel}
          </span>
        </div>
      </div>
      <div className="bg-white p-4 grid gap-3">
        <div className="flex flex-nowrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-xs  ">{title}</span>
          <span
            onClick={(e) => {
              e.preventDefault();
              HandleContactClick();
            }}
          >
            <Popover
              content={content}
              trigger="click"
              className="w-fit text-nowrap transition-colors hover:bg-input-box-dark/60 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-normal text-xs p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"
            >
              <TbPhoneCall className="me-2 text-lg text-success" />
              {subtitle}
            </Popover>
          </span>
        </div>
        <button className="btn primary_btn square !h-12 !w-full   ">
          {" "}
          VIEW BATCH DETAILS
        </button>
      </div>
    </NavLink>
  );
};
export default CourseCard;
