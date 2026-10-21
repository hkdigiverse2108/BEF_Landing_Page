import React from "react";
import { NavLink } from "react-router-dom";
import { LuArrowRight, LuSparkles, LuBrain } from "react-icons/lu";
import { ROUTES } from "../../Constants";

export const BlogBlueAdBanner: React.FC<{
  title?: string;
  subtitle?: string;
  buttonText?: string;
  link?: string;
}> = ({
  title = "Prepare Smarter for UPSC 2026",
  subtitle = "Practice high-yield questions, elimination logics, and test your readiness with our curated 10-question free mock test.",
  buttonText = "Start Free Practice",
  link = ROUTES.FREE_PRACTICE || "/free-practice",
}) => {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#124699] to-[#1E5FC9] p-6 sm:p-8 text-white shadow-md">
      {/* Background graphic circle */}
      <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border-[30px] border-white/10" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white/80">
            <LuSparkles /> Bharat Exam Fest Initiative
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <NavLink
          to={link}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-black text-[#124699] shadow-md transition-all hover:bg-[#FFF3EA] hover:text-[#F48224] hover:shadow-lg"
        >
          <span>{buttonText}</span>
          <LuArrowRight className="text-base" />
        </NavLink>
      </div>
    </div>
  );
};

export const BlogOrangeAdBanner: React.FC<{
  title?: string;
  subtitle?: string;
  buttonText?: string;
  link?: string;
}> = ({
  title = "Test Your UPSC Preparation",
  subtitle = "Challenge yourself with 5-subject randomized Prelims mock questions and unlock exclusive score-based course scholarships.",
  buttonText = "Take Free Mock Test",
  link = ROUTES.FREE_PRACTICE || "/free-practice",
}) => {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#F48224] to-[#F59E0B] p-6 sm:p-8 text-white shadow-md">
      {/* Background decorative circles */}
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-44 w-44 rounded-full border-[28px] border-white/15" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white/85">
            <LuBrain /> Daily Practice Module
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-amber-50 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <NavLink
          to={link}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-xs sm:text-sm font-black text-white shadow-md transition-all hover:bg-white hover:text-[#0F172A] hover:shadow-lg"
        >
          <span>{buttonText}</span>
          <LuArrowRight className="text-base" />
        </NavLink>
      </div>
    </div>
  );
};
