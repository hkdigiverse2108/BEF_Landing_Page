import { PiShareFat } from "react-icons/pi";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import WorkshopTestimonialsTab from "../../Components/Workshop/WorkshopTestimonialsTab";
import { NavLink } from "react-router-dom";
import CourseAboutTab from "../../Components/Course/CourseAboutTab";
import CourseLecturesTab from "../../Components/Course/CourseLecturesTab";
import CourseFaqsTab from "../../Components/Course/CourseFaqsTab";
import { useGetApiQuery } from "../../Api/CommonApi";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "Testimonials", label: "Testimonials" },
  { value: "faqs", label: "FAQS" },
];

const Workshop = () => {
  const [tabIndex, setTabIndex] = useState("about");

  const { data: workshopData } = useGetApiQuery({ url: `${URL_KEYS.WORKSHOP.ALL}` });
  const workshop = workshopData?.data?.workshop_data[0] || {};

  const { data: ModulesData } = useGetApiQuery({ url: `${URL_KEYS.MODULE.COURSE_WISE}${workshop._id}` }, { skip: !workshop._id });

  const Modules = ModulesData?.data;

  const { title = "Have questions about this batch?", language = "हिंGLISH", totalLecture = 0, testNumber = 0, description = "subject-level full syllabus batch", totalAmount = 0, discountAmount = 0, _id = "" } = workshop;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <div id="Workshop" className="container container-p space-y-9 py-9 bg-white rounded-xl Workshop">
      <section className="group space-y-6 rounded-md relative">
        <div className="sm:hidden absolute w-full flex gap-5 justify-end px-2 pt-2 ">
          <button className="bg-white/50 text-white  backdrop-blur-md rounded-sm px-2 py-1">
            <PiShareFat />
          </button>
        </div>
        <figure>
          <img src={`${ImagePath}course/CourseCardImage.jpg`} alt="" className="w-full h-full rounded-lg" />
        </figure>
      </section>
      <section className="">
        <div className="space-y-6">
          <section className=" max-sm:text-sm font-medium flex justify-between  gap-3">
            <div className="flex  gap-2 items-center">
              <div className="bg-white border border-gray-300  w-fit h-fit px-3 py-1  rounded-md ">
                {/* <span className="sm:hidden">हिंn</span> */}
                {/* <span className="max-sm:hidden">हिंGLISH</span> */}
                <span>{language}</span>
              </div>
              <div className="uppercase max-sm:text-xs text-primary font-bold ">{description}</div>
            </div>
            {/* <span className="flex gap items-center w-fit h-fit gap-1 bg-white border border-gray-300 backdrop-blur-md rounded-sm px-2 py-1 cursor-pointer">
              Share
              <PiShareFat />
            </span> */}
          </section>
          <section className="flex max-sm:flex-col gap-4 justify-between">
            <h1 className="capitalize font-semibold sm:text-2xl">{title}</h1>
            <button className="max-sm:hidden flex gap items-center w-fit h-fit gap-1 bg-white border border-gray-300 backdrop-blur-md rounded-md px-2 py-1 cursor-pointer">
              <PiShareFat />
              Share
            </button>
          </section>
          <span className="border-b border-gray-300 flex w-full h-0.5" />

          <section className="flex flex-col lg:flex-row gap-5">
            <div className="bg-card-bg  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center  gap-3 mb-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/users.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                </figure>
                <p className=" sm:hidden font-medium ">Module</p>
              </div>
              <div className="space-y-2 w-full ">
                <p className="max-sm:hidden font-medium ">Module</p>
                <ul className="w-full text-sm flex flex-col sm:flex-row gap-2 sm:gap-4">
                   {Modules?.map((module: { name: string }, i: number) => (
                    <li>
                      {i + 1}. {module.name}
                    </li>
                  ))}
                  {/* <li>1. MCQ Aptitude</li>
                  <li>2. MCQ Aptitude Test</li>
                  <li>3. Mapping Test</li> */}
                </ul>
              </div>
            </div>
            <div className="bg-card-bg  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
              {/* Image + Title (top row on mobile) */}
              <div className="flex items-center gap-3 sm:mb-0">
                <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                  <img src={`${ImagePath}workshop/wallet.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
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
            allowScrollButtonsMobile
            className="!w-full !flex !justify-between !gap-4 border-b border-gray-300 mt-6 "
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
              },
            }}
          >
            {TabsName?.map(({ value, label }, index) => {
              return <Tab key={index} value={value} label={label} />;
            })}
          </Tabs>
        </div>
        <div className="mt-6">
          {tabIndex === "about" && <CourseAboutTab totalLecture={totalLecture} totalTest={testNumber} />}
          {tabIndex === "lectures" && <CourseLecturesTab id={_id} />}
          {tabIndex === "Testimonials" && <WorkshopTestimonialsTab />}
          {tabIndex === "faqs" && <CourseFaqsTab />}
        </div>
      </section>

      {/* ==== Fixed Section ==== */}
      <section className=" fixed bottom-0 left-0 right-0 z-10 bg-white  ">
        <div className="container container-p py-3 sm:py-6 flex max-md:flex-col gap-2 md:gap-4 justify-between md:items-end">
          <div>
            <p className="text-gray-600 font-medium">Price</p>
            <h1 className=" sm:text-2xl font-bold flex gap-[2px] items-end">
              <span>₹{discountAmount}</span>
              <span className="text-base text-red-500 font-semibold line-through decoration-2 ps-1">{totalAmount}</span>
            </h1>
          </div>
          <div>
            <p className="max-sm:text-xs text-gray-600 font-medium h-full ">Remaining fee pays after prelims cleared</p>
          </div>
          <div className=" md:w-1/4">
            <NavLink to={ROUTES.WORKSHOP.REGISTER} state={workshop}>
              <button className="btn primary_btn !h-12 !w-full  ">Enroll Now</button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;
