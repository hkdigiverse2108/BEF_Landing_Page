import { ImagePath, ROUTES, URL_KEYS, resolveCourseId, getCourseSeo } from "../../Constants";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState, useRef, type SyntheticEvent } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import CourseAboutTab from "../../Components/Course/CourseAboutTab";
import CourseLecturesTab from "../../Components/Course/CourseLecturesTab";
import CourseModuleTab from "../../Components/Course/CourseModuleTab";
import CourseFaqsTab from "../../Components/Course/CourseFaqsTab";
import { useGetApiQuery } from "../../Api/CommonApi";
import ShareModal from "../../Components/Common/ShareModal";
import Loader from "../../Components/Common/Loader";
import type { ModuleType } from "../../Types";
import Seo from "../../Components/Common/Seo";
import {
  getMockTestReward,
  clearMockTestReward,
  isLastPrelimsCourse,
  type MockTestReward,
} from "../../Utils/mockTestReward";

const TabsName = [
  { value: "about", label: "About" },
  { value: "lectures", label: "Lectures" },
  { value: "module", label: "Module" },
  { value: "faqs", label: "FAQS" },
];

const CourseDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get("tab");
  const isModuleInitiallyRequested =
    queryTab === "module" ||
    (location.state as any)?.activeTab === "module" ||
    location.hash === "#modules";

  const [tabIndex, setTabIndex] = useState(() => (isModuleInitiallyRequested ? "module" : (location.state as any)?.activeTab || "about"));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mockReward] = useState<MockTestReward | null>(() => {
    return (location.state as any)?.mockReward || getMockTestReward();
  });

  const navigate = useNavigate();
  const hasAutoScrolledRef = useRef(false);

  useEffect(() => {
    // One-time only: clear persistent storage, history state, and clean URL on mount
    // so that if the user refreshes the page, the discount and module query/tab are immediately removed
    clearMockTestReward();
    if (window.history.replaceState) {
      const copy = window.history.state ? { ...window.history.state } : {};
      if (copy.usr?.mockReward) {
        delete copy.usr.mockReward;
      }
      if (copy.usr?.activeTab) {
        delete copy.usr.activeTab;
      }
      // Clean query params (?tab=module) and hash (#modules) from the address bar so on refresh it is completely gone
      if (location.search || location.hash) {
        window.history.replaceState(copy, document.title, location.pathname);
      } else {
        window.history.replaceState(copy, document.title);
      }
    }
  }, []);

  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const rawIdentifier = id || slug || "";
  const resolvedId = resolveCourseId(rawIdentifier);
  const courseSeo = getCourseSeo(rawIdentifier);

  const { data: courseData, isLoading: courseLoading } = useGetApiQuery(
    {
      url: `${URL_KEYS.COURSE.ONE}${resolvedId}`,
    },
    { skip: !resolvedId }
  );
  const course = courseData?.data || {};
  const { _id = "", title = "", image = "", language = "", pdf = "", courseMoneyBack = "", description = "", price = 0, payingPrice = 0, discountPrice = 0, priceInStruction = "" } = course;

  const finalMetaTitle =
    courseSeo?.metaTitle ||
    course?.metaTitle ||
    (title ? `${title} | Achiwon` : "UPSC Course | Achiwon");
  const finalMetaDescription =
    courseSeo?.metaDescription ||
    (Array.isArray(course?.metaDescription)
      ? course?.metaDescription[0]
      : course?.metaDescription) ||
    description;

  const isLastPrelims = isLastPrelimsCourse(course);
  const eligibleReward = isLastPrelims ? mockReward : null;
  const scoreDiscount = eligibleReward?.scoreDiscount || 0;

  const { data: modulesData, isLoading: moduleLoading } = useGetApiQuery({ url: `${URL_KEYS.MODULE.ALL}?courseFilter=${_id || resolvedId}` }, { skip: !(_id || resolvedId) });
  const Modules = modulesData?.data?.module_data || [];

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const totalTest = Modules?.reduce((sum: number, module: ModuleType) => sum + Number(module?.totalTest || 0), 0);

  const totalLecture = Modules?.reduce((sum: number, module: ModuleType) => sum + Number(module?.totalLecture || 0), 0);

  // When module tab is requested on initial navigation and data has finished loading, scroll directly to modules once
  useEffect(() => {
    if (hasAutoScrolledRef.current) return;
    if (courseLoading || moduleLoading) return;

    if (isModuleInitiallyRequested) {
      hasAutoScrolledRef.current = true;
      setTabIndex("module");
      const scrollTimer = setTimeout(() => {
        const targetElement = document.getElementById("modules-section");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
      return () => clearTimeout(scrollTimer);
    }
  }, [courseLoading, moduleLoading, isModuleInitiallyRequested]);

  useEffect(() => {
    if (!rawIdentifier) {
      navigate(ROUTES.COURSE.COURSE);
    }
  }, [rawIdentifier, navigate]);

  if (courseLoading || moduleLoading) return <Loader />;

  return (
    <>
      <Seo title={finalMetaTitle} description={finalMetaDescription} />
      <div id="Course" className="container container-p space-y-9 py-9 bg-white rounded-xl">
        <section className="group space-y-6 rounded-md relative">
          <div className="sm:hidden absolute w-full flex gap-5 justify-end px-2 pt-2 ">
            <ShareModal />
          </div>
          <figure>
            <img src={image} alt={image} onLoad={() => setImageLoaded(true)} className={`w-full h-full  transition-opacity rounded-md duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} />
          </figure>
        </section>
        <section>
          <div className="space-y-6">
            <section className="max-sm:text-sm font-medium flex justify-end gap-3">
              {language && (
                <div className="bg-white border border-gray-300 w-fit h-fit px-3 py-1 rounded-md">
                  <span>{language}</span>
                </div>
              )}
            </section>
            <section className="flex max-sm:flex-col gap-4 justify-between">
              <h1 className="capitalize font-semibold sm:text-2xl">{title}</h1>
              <span className="max-sm:hidden">
                <ShareModal />
              </span>
            </section>
            <span className="border-b border-gray-300 flex w-full h-0.5" />

            <section className="flex flex-col lg:flex-row gap-5">
              <div
                onClick={() => {
                  setTabIndex("module");
                  document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="bg-card-bg cursor-pointer hover:shadow-md transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5"
                title="Click to view module details"
              >
                <div className="flex items-center  gap-3 mb-3 sm:mb-0">
                  <figure className="rounded-full bg-primary/10  w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center  ">
                    <img src={`${ImagePath}workshop/users.png`} alt="Users" className="w-8 h-8  sm:w-10 sm:h-10" />
                  </figure>
                  <p className=" sm:hidden font-medium ">Module</p>
                </div>
                <div className="space-y-2 w-full ">
                  <div className="flex items-center justify-between">
                    <p className="max-sm:hidden font-medium">Module ({Modules?.length || 0})</p>
                    <span className="text-xs text-primary font-bold hover:underline">View details →</span>
                  </div>
                  <ul className="w-full text-sm font-medium  grid grid-cols-1  sm:grid-cols-2 sm:flex-row gap-2">
                    {Modules?.map((module: { name: string }, i: number) => (
                      <li key={i}>
                        {i + 1}. {module.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-card-bg  transition-all px-5 py-3 rounded w-full flex flex-col sm:flex-row sm:items-center sm:gap-5">
                {/* Image + Title (top row on mobile) */}
                <div className="flex items-center gap-3 sm:mb-0">
                  <figure className="rounded-full bg-primary/10 p-3 sm:p-4 h-fit w-fit">
                    <img src={`${ImagePath}workshop/wallet.png`} alt="Users" className="w-8 sm:w-10 h-fit" />
                  </figure>
                  <div className="space-y-1.5 w-full font-medium">
                    {courseMoneyBack ? (
                      String(courseMoneyBack)
                        .split(",")
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line, idx) => (
                          <p key={idx} className="leading-snug">
                            {line}
                          </p>
                        ))
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div id="modules-section" className="scroll-mt-28">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="primary"
              variant="scrollable"
              aria-label="primary tabs example"
              className="!w-full !flex !justify-between !gap-4 border-b border-gray-300 mt-6 DetailsTabs "
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
            {tabIndex === "about" && <CourseAboutTab pdf={pdf} description={description} totalLecture={totalLecture} totalTest={totalTest} />}
            {tabIndex === "lectures" && <CourseLecturesTab Modules={Modules} />}
            {tabIndex === "module" && <CourseModuleTab id={id} modules={Modules} isLoading={moduleLoading} />}
            {tabIndex === "faqs" && <CourseFaqsTab />}
          </div>
        </section>

        {/* ==== Fixed Section ==== */}
        <section className=" !fixed !bottom-0 left-0 right-0 z-10 bg-white container-p   ">
          <div className="container py-2 sm:py-3 flex max-md:flex-col gap-2 md:gap-4 justify-between md:items-end">
            <div>
              <p className="text-gray-600 font-medium">Price</p>
              {scoreDiscount > 0 ? (
                <div>
                  <div className="sm:text-xl font-bold flex gap-2 items-baseline">
                    <span className="text-2xl font-black text-primary">
                      ₹{scoreDiscount.toLocaleString()}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      ₹{Number(price || 20000).toLocaleString()}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      -₹{Math.max(0, Number(price || 20000) - scoreDiscount).toLocaleString()} Mock Test Discount
                    </span>
                  </div>
                </div>
              ) : discountPrice ? (
                <div className=" sm:text-xl font-bold flex gap-[2px] items-end">
                  <span>₹{payingPrice}/</span>
                  <span className="text-base text-gray-600 font-bold">₹{discountPrice}</span>
                  <span className="text-base font-medium text-red-500 line-through ps-1">{price}</span>
                </div>
              ) : (
                <div className=" sm:text-xl font-bold flex gap-[2px] items-end">
                  <span>₹{payingPrice}</span>
                  <span className="text-base text-red-500 font-semibold line-through decoration-2 ps-1">{price}</span>
                </div>
              )}
            </div>
            <div>
              <p className="max-sm:text-xs text-emerald-600 font-bold h-full">
                {scoreDiscount > 0
                  ? `🏆 Mock Test Score Discount Applied (Pay ₹${scoreDiscount.toLocaleString()} Only)`
                  : priceInStruction}
              </p>
            </div>
            <div className=" md:w-1/4">
              <NavLink
                to={ROUTES.COURSE.REGISTER}
                state={{
                  ...course,
                  mockReward: eligibleReward,
                  scoreDiscount,
                  payingPrice: scoreDiscount > 0 ? scoreDiscount : payingPrice,
                }}
              >
                <button className="btn primary_btn !h-12 !w-full  ">Join Now</button>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetails;
