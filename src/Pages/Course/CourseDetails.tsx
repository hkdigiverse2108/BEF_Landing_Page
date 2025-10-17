import { PiShareFat } from "react-icons/pi";
import { ImagePath } from "../../Constants";
import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import AboutTab from "../../Components/Workshop/WorkshopAboutTab";
import LecturesTab from "../../Components/Workshop/WorkshopLecturesTab";
import FaqsTab from "../../Components/Workshop/WorkshopFaqsTab";
import { IoIosArrowBack } from "react-icons/io";
import CourseModule from "../../Components/Course/CourseModule";
import { useNavigate } from "react-router-dom";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "module", label: "Module" },
  { value: "faqs", label: "FAQS" },
];

const CourseDetails = () => {
  const [tabIndex, setTabIndex] = useState("about");

  const navigate = useNavigate();

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <div
      id="Course"
      className="container container-p space-y-9 py-9 bg-white rounded-xl"
    >
      <section className="group space-y-6 rounded-md relative">
        <div className=" absolute text-white  w-full flex gap-5 justify-between p-2 text-center text-2xl ">
          <span
            onClick={() => navigate(-1)}
            className="bg-white/50 backdrop-blur-md rounded-sm px-2 py-1"
          >
            <IoIosArrowBack />
          </span>
          <span className="bg-white/50  backdrop-blur-md rounded-sm px-2 py-1">
            <PiShareFat />
          </span>
        </div>
        <figure>
          <img
            src={`${ImagePath}workshop/CourseThumbnail.webp`}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </figure>
      </section>
      <section className="">
        <div className="space-y-6">
          <section className=" max-sm:text-sm font-medium flex justify-between  gap-3">
            <div className="flex  gap-2 items-center">
              <div className="bg-white border border-gray-300  w-fit h-fit px-3 py-1  rounded-md ">
                <span className="sm:hidden">हिंn</span>
                <span className="max-sm:hidden">हिंGLISH</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold ">
                subject-level full syllabus batch
              </div>
            </div>
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize font-semibold sm:text-2xl">
              CSAT Live pathshala by madhukar kotawe
            </h1>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />

          <section className="flex flex-col lg:flex-row gap-5">
            <div className="bg-card-bg  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center  gap-3 mb-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img
                    src={`${ImagePath}workshop/users.png`}
                    alt="Users"
                    className="w-8 sm:w-10 h-fit"
                  />
                </figure>
                <p className=" sm:hidden font-medium ">Module</p>
              </div>
              <div className="space-y-2 w-full ">
                <p className="max-sm:hidden font-medium ">Module</p>
                <ul className="w-full text-sm flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <li>1. MCQ Aptitude</li>
                  <li>2. MCQ Aptitude Test</li>
                  <li>3. Mapping Test</li>
                </ul>
              </div>
            </div>
            <div className="bg-card-bg  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              {/* Image + Title (top row on mobile) */}
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img
                    src={`${ImagePath}workshop/wallet.png`}
                    alt="Users"
                    className="w-8 sm:w-10 h-fit"
                  />
                </figure>
                <div className="space-y-2 w-full font-medium ">
                  <p>100% Money Back</p>
                </div>
              </div>
              {/* <div className="space-y-2 w-full ">
                <p className="max-sm:hidden">Module</p>
                <ul className="w-full text-sm flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <li>1. MCQ Aptitude</li>
                  <li>2. MCQ Aptitude Test</li>
                  <li>3. Mapping Test</li>
                </ul>
              </div> */}
            </div>
          </section>

          {/* <span className="border-b border-gray-300 flex w-full h-0.5" /> */}
        </div>

        <div>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="primary"
            variant="scrollable"
            aria-label="primary tabs example"
            className="!w-full !flex !justify-between !gap-4 border-b border-gray-300 mt-6 "
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return (
                <Tab
                  key={index}
                  value={value}
                  label={label}
                  className="!font-bold   "
                />
              );
            })}
          </Tabs>
        </div>
        <div className="mt-6">
          {tabIndex === "about" && <AboutTab />}
          {tabIndex === "lectures" && <LecturesTab />}
          {tabIndex === "module" && <CourseModule />}
          {tabIndex === "faqs" && <FaqsTab />}
        </div>
      </section>

      {/* ==== Fixed Section ==== */}
      <section className=" fixed bottom-0 left-0 right-0 z-10 bg-white  ">
        <div className="container container-p py-3 sm:py-6 flex max-md:flex-col gap-2 md:gap-4 justify-between md:items-end">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            <h1 className=" sm:text-2xl font-bold flex gap-[2px] items-end">
              <span>₹0</span>
              <span className="text-sm text-gray-400 font-semibold line-through decoration-2 ">
                500
              </span>
            </h1>
          </div>
          <div>
            <p className="max-sm:text-xs text-gray-600 font-medium h-full ">
              Remaining fee pays after prelims cleared
            </p>
          </div>
          <div className=" md:w-1/4">
            <button className="btn primary_btn !h-12 !w-full  ">
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
