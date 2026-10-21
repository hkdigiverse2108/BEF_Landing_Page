import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import { ROUTES } from "../../Constants";
import type { CourseType } from "../../Types";
import ContactContent from "../WorkshopCourse/ContactContent";
import { isLastPrelimsCourse, type MockTestReward } from "../../Utils/mockTestReward";
import "./CourseCard.css";

interface CourseCardProps {
  course: CourseType;
  mockReward?: MockTestReward | null;
  index?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  mockReward,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    _id = "",
    title = "Sure Shot Prelims",
    image = "",
    language = "English",
    syllabus,
  } = course;

  const isLastPrelims = isLastPrelimsCourse(course);
  const eligibleReward = isLastPrelims ? mockReward : null;
  const scoreDiscount = eligibleReward?.scoreDiscount || 0;

  const targetUrl = _id ? ROUTES.COURSE.DETAILS.replace(":id", _id) : ROUTES.COURSE.COURSE;

  return (
    <article className="course-card">
      {/* 1. Header Course Image */}
      <NavLink
        to={targetUrl}
        state={{ mockReward: eligibleReward }}
        className="relative block w-full rounded-t-2xl overflow-hidden bg-gray-200 aspect-[16/9] sm:h-52 cursor-pointer group"
      >
        {image ? (
          <img
            src={image}
            alt={title || "Course"}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#123b85] to-[#1d55b7] text-white font-bold text-lg p-4 text-center">
            {title}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 items-center">
          <span className="bg-black/60 text-white font-bold text-xs px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs">
            {language || "Gujarati"}
          </span>
          {syllabus?.subjectLevel && (
            <span className="bg-[#124699] text-white font-bold text-xs px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs uppercase">
              {syllabus.subjectLevel}
            </span>
          )}
        </div>

        {/* Discount tag is ONLY displayed for the eligible 'LAST PRELIMS' course */}
        {isLastPrelims && scoreDiscount > 0 && (
          <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md animate-pulse">
            ₹{scoreDiscount.toLocaleString()} OFF
          </span>
        )}
      </NavLink>

      {/* 2. Card Body */}
      <div className="card-body">
        {/* Support Row */}
        <div className="support">
          <div>
            <strong>Course support</strong>
            <small>Talk to an academic counsellor</small>
          </div>
          <Popover content={<ContactContent />} trigger="click" placement="bottomRight">
            <button
              type="button"
              className="phone-mini"
              aria-label="Call course support"
              title="Call counsellor"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16.5v3a1.5 1.5 0 0 1-1.65 1.5A18.9 18.9 0 0 1 11.1 18a18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 3.1 3.65 1.5 1.5 0 0 1 4.6 2h3a1.5 1.5 0 0 1 1.5 1.3c.1 1 .35 1.98.72 2.9a1.5 1.5 0 0 1-.34 1.58L8.2 9.06a15 15 0 0 0 6.74 6.74l1.28-1.28a1.5 1.5 0 0 1 1.58-.34c.92.37 1.9.62 2.9.72a1.5 1.5 0 0 1 1.3 1.6Z" />
              </svg>
            </button>
          </Popover>
        </div>

        {/* Module Details Direct Link (Opens Course Details with Module Tab) */}
        <NavLink
          to={targetUrl}
          state={{ mockReward: eligibleReward, activeTab: "module" }}
          className="module"
          title="Click to view all modules and syllabus in course"
        >
          <span>⚙ Module Details</span>
          <span className="module-go">View modules →</span>
        </NavLink>

        {/* Guarantee Callout */}
        <div className="guarantee">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 3 20 6v6c0 5-4 8-8 10-4-2-8-5-8-10V6z" />
            <path d="m8 12 3 3 5-6" />
          </svg>
          <span>Minimum 60+ Marks Direct Hit Guarantee, otherwise 100% refund</span>
        </div>

        {/* View Batch Details CTA */}
        <NavLink
          to={targetUrl}
          state={{ mockReward: eligibleReward }}
          className="card-cta"
        >
          <span>View Batch Details</span>
          {isLastPrelims && scoreDiscount > 0 && (
            <span className="course-card-discount-badge">₹{scoreDiscount.toLocaleString()} Rs Discount</span>
          )}
          <span className="arrow">→</span>
        </NavLink>
      </div>
    </article>
  );
};

export default CourseCard;
