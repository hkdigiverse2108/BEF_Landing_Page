import { TbPhoneCall } from "react-icons/tb";
import { ROUTES } from "../../Constants";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";

import { useState, type FC } from "react";
import ContactContent from "../WorkshopCourse/ContactContent";
import type { WorkshopType } from "../../Types";

const WorkshopCard: FC<{ data: WorkshopType }> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { image = "", language = "", syllabus = "", _id = "" } = data;

  const title = "Have questions about this Workshop?";
  const subtitle = "Talk to a counsellor";

  return (
    <NavLink
      to={`${ROUTES.WORKSHOP.DETAILS.replace(":id", _id)}`}
      className=" relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col justify-end h-fit"
    >
      <div className="relative w-full  rounded-t-2xl overflow-hidden bg-gray-300">
        <figure>
          <img
            src={image}
            alt={image}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full  transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </figure>
        <div className="absolute  top-0 left-0 w-full flex justify-between p-2 gap-7">
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {language}
          </span>
          <span className="bg-white/20 text-white font-bold text-sm p-1 px-1.5 rounded backdrop-blur-md">
            {syllabus}
          </span>
        </div>
      </div>
      <div className="bg-white p-4 grid gap-3">
        <div className="flex flex-nowrap items-center text-xs sm:text-sm justify-between gap-2">
          <span className="font-normal text-xs  ">{title}</span>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Popover
              content={ContactContent}
              trigger="click"
              className="w-fit text-nowrap transition-colors hover:bg-input-box-dark/60 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-normal text-xs p-1 px-3 rounded-sm capitalize flex items-center cursor-pointer"
            >
              <TbPhoneCall className="me-2 text-lg text-success" />
              {subtitle}
            </Popover>
          </div>
        </div>
        <button className="btn primary_btn square !h-12 !w-full   ">
          {" "}
          VIEW BATCH DETAILS
        </button>
      </div>
    </NavLink>
  );
};
export default WorkshopCard;
