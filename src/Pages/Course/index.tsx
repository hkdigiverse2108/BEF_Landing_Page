import React, { useState, useEffect } from "react";
import { URL_KEYS } from "../../Constants";
import CourseCard from "../../Components/Course/CourseCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";
import Loader from "../../Components/Common/Loader";
import Seo from "../../Components/Common/Seo";
import StructuredData from "../../Components/Common/StructuredData";
import {
  getMockTestReward,
  clearMockTestReward,
  type MockTestReward,
} from "../../Utils/mockTestReward";
import {
  LuSlidersHorizontal,
  LuChevronDown,
  LuCheck,
} from "react-icons/lu";

const FALLBACK_MY_COURSES: CourseType[] = [
  {
    _id: "sure-shot-prelims",
    title: "Sure Shot Prelims",
    subtitle: "Pay full fees only after you clear Prelims!",
    language: "English",
    syllabus: { subjectLevel: "Advanced GS", fullSyllabus: "" },
    courseMoneyBack: true,
    totalLecture: 24,
    totalTest: 18,
    description: "Comprehensive GS Foundation with daily answer drills.",
    price: 15000,
    payingPrice: 7000,
  },
  {
    _id: "guaranteed-prelims",
    title: "Guaranteed Prelims",
    subtitle: "Pay full fees only after you clear Prelims!",
    language: "English",
    syllabus: { subjectLevel: "Full GS", fullSyllabus: "" },
    courseMoneyBack: true,
    totalLecture: 36,
    totalTest: 30,
    description: "Complete GS coverage with topic-wise mentoring.",
    price: 18000,
    payingPrice: 8500,
  },
  {
    _id: "last-prelims",
    title: "Last Prelims",
    subtitle: "Pay full fees only after you clear Prelims!",
    language: "English",
    syllabus: { subjectLevel: "Full GS + CSAT", fullSyllabus: "" },
    courseMoneyBack: true,
    totalLecture: 20,
    totalTest: 26,
    description: "Rapid revision with CSAT Booster and grand mocks.",
    price: 20000,
    payingPrice: 9500,
  },
  {
    _id: "daily-pyqs",
    title: "Daily PYQ's Practice",
    subtitle: "Solve daily & get 100% refund",
    language: "English",
    syllabus: { subjectLevel: "Daily PYQs", fullSyllabus: "" },
    courseMoneyBack: true,
    totalLecture: 40,
    totalTest: 25,
    description: "10-year previous questions analysis & smart traps elimination.",
    price: 8000,
    payingPrice: 4000,
  },
  {
    _id: "daily-csat",
    title: "Daily CSAT Practice",
    subtitle: "Solve daily & get 100% refund",
    language: "English",
    syllabus: { subjectLevel: "CSAT Test", fullSyllabus: "" },
    courseMoneyBack: true,
    totalLecture: 18,
    totalTest: 15,
    description: "Quant shortcuts, reading comprehension & logical drills.",
    price: 9000,
    payingPrice: 4500,
  },
  {
    _id: "mcq-aptitude",
    title: "MCQ Aptitude",
    subtitle: "Build speed, accuracy, and confidence.",
    language: "English",
    syllabus: { subjectLevel: "MCQ Aptitude", fullSyllabus: "" },
    courseMoneyBack: false,
    totalLecture: 30,
    totalTest: 20,
    description: "Elimination skills, intelligent guessing techniques.",
    price: 7000,
    payingPrice: 3500,
  },
];

const Course: React.FC = () => {
  const [mockReward, setMockReward] = useState<MockTestReward | null>(null);
  const [showAllMyCourses, setShowAllMyCourses] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"all" | "victory" | "popular">("all");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Live Exam Festival Countdown (UPSC Prelims 2026 Target: May 24, 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 231,
    hours: 16,
    minutes: 30,
    seconds: 59,
  });

  useEffect(() => {
    const targetDate = new Date("2026-05-24T09:30:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reward = getMockTestReward();
    if (reward) {
      setMockReward(reward);
      // One-time only: clear persistent storage and history state immediately so refresh removes the discount
      clearMockTestReward();
      if (window.history.replaceState && window.history.state?.usr?.mockReward) {
        const copy = { ...window.history.state };
        delete copy.usr.mockReward;
        window.history.replaceState(copy, document.title);
      }
    }
  }, []);

  const { data: courseData, isLoading: courseLoading } = useGetApiQuery({
    url: URL_KEYS.COURSE.ALL,
  });

  const apiCourses: CourseType[] = courseData?.data?.course_data || [];

  // Merge API courses with rich fallback courses
  const combinedCourses = apiCourses.length > 0 ? [...apiCourses] : FALLBACK_MY_COURSES;
  if (combinedCourses.length < 6) {
    FALLBACK_MY_COURSES.forEach((item) => {
      if (!combinedCourses.some((c) => c._id === item._id || c.title === item.title)) {
        combinedCourses.push(item);
      }
    });
  }

  // Filter & sort
  let displayedMyCourses = [...combinedCourses];
  if (selectedSort === "victory") {
    displayedMyCourses = displayedMyCourses.filter((c) => c.courseMoneyBack || c.title?.includes("Prelims"));
  }

  const visibleMyCourses = showAllMyCourses ? displayedMyCourses : displayedMyCourses.slice(0, 6);

  if (courseLoading && apiCourses.length === 0) return <Loader />;

  return (
    <>
      <Seo
        title="UPSC & Competitive Exam Courses Online | Achiwon"
        description="Explore UPSC & competitive exam courses at Achiwon. Get structured learning, expert guidance, AI-driven tools & smart study plans for exam success."
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.achiwon.com/#organization",
              name: "Achiwon",
              url: "https://www.achiwon.com/",
              logo: "https://www.achiwon.com/logo.png",
              description:
                "Achiwon is an AI-powered UPSC & competitive exam preparation platform offering structured courses, mock tests, workshops and smart study tools.",
              sameAs: [
                "https://www.facebook.com/bharatexamfest",
                "https://www.instagram.com/bharatexamfest",
                "https://www.youtube.com/@bharatexamfest",
              ],
            },
            {
              "@type": "WebPage",
              "@id": "https://www.achiwon.com/course#webpage",
              url: "https://www.achiwon.com/course",
              name: "UPSC & Competitive Exam Courses – Achiwon",
              description:
                "Explore a comprehensive list of UPSC & competitive exam preparation courses on Achiwon with structured learning, AI tools, mock practice and expert guidance.",
            },
          ],
        }}
      />

      {/* ================= 1. EXAM FESTIVAL COUNTDOWN TOP BAR ================= */}
      <div className="w-full bg-[#124699] text-white border-b border-[#1E5FC9]/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F48224] animate-ping" />
            <span className="tracking-wide">Let's celebrate this Exam Festival</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 font-mono font-bold text-[11px] sm:text-xs text-white/95">
            <span className="bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">
              {timeLeft.days} Days
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">
              {String(timeLeft.hours).padStart(2, "0")} Hrs
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">
              {String(timeLeft.minutes).padStart(2, "0")} Min
            </span>
            <span className="bg-[#F48224] text-white px-2 py-0.5 rounded-md shadow-xs">
              {String(timeLeft.seconds).padStart(2, "0")} Sec
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#F8FAFC] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          {/* ================= 2. "MY COURSES" SECTION ================= */}
          <section className="mb-14">
            {/* Section Header */}
            <div className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded-full bg-[#124699]" />
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                    My Courses
                  </h1>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#64748B]">
                  Pick up where you left off and stay ready for Prelims.
                </p>
              </div>

              {/* Sort / Filter Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 text-xs sm:text-sm font-bold text-[#124699] shadow-xs transition-all duration-200 hover:border-[#124699] hover:bg-[#F8FAFC] cursor-pointer"
                >
                  <LuSlidersHorizontal className="text-base" />
                  <span>
                    Sort: {selectedSort === "victory" ? "Victory Fest" : "All Batches"}
                  </span>
                  <LuChevronDown className="text-sm" />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute right-0 top-12 z-30 w-48 rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSort("all");
                        setSortDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
                    >
                      <span>All Batches</span>
                      {selectedSort === "all" && <LuCheck className="text-sm text-[#124699]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSort("victory");
                        setSortDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
                    >
                      <span>Victory Fest Batches</span>
                      {selectedSort === "victory" && <LuCheck className="text-sm text-[#124699]" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleMyCourses.map((item: CourseType, index: number) => (
                <CourseCard
                  key={item._id || index}
                  course={item}
                  mockReward={mockReward}
                  index={index}
                />
              ))}
            </div>

            {/* "View More" Toggle Button */}
            {displayedMyCourses.length > 6 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllMyCourses((prev) => !prev)}
                  className="flex min-h-11 items-center gap-2 rounded-xl border-2 border-[#F48224] bg-white px-6 text-xs sm:text-sm font-bold text-[#0F172A] shadow-xs transition-all duration-200 hover:bg-[#F48224] hover:text-white cursor-pointer"
                >
                  <span>{showAllMyCourses ? "Show Less" : "View More Courses"}</span>
                  <LuChevronDown
                    className={`text-base text-[#F48224] transition-transform ${showAllMyCourses ? "rotate-180 text-white" : ""
                      }`}
                  />
                </button>
              </div>
            )}
          </section>

          {/* ================= UPSC SEO CONTENT SECTION ================= */}
          <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-10 text-[#475569] shadow-xs space-y-6 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-black text-[#124699]">
              Best UPSC Courses by Achiwon
            </h2>

            <p>
              The process of preparing for the UPSC examination is not only hard work, but it also
              requires proper guidance, organized learning, and smart planning. Achiwon provides
              highly structured UPSC courses that enable aspirants to build a strong conceptual
              understanding, exam-focused training, and sustained assessment to succeed in one of
              India’s most competitive examinations.
            </p>

            <p>
              Our UPSC courses are designed by professional mentors, subject experts, and former
              aspirants who understand the evolving UPSC syllabus, answer writing patterns, and
              evaluation criteria. Whether you are a first-time aspirant or a repeat candidate,
              Achiwon ensures a clear and effective path toward success.
            </p>

            <h3 className="text-xl font-bold text-[#0F172A] mt-8">
              Why Choose Achiwon for UPSC Preparation?
            </h3>

            <p>
              Achiwon is a reputed academic platform offering a balanced blend of academic
              excellence and practical exam-oriented learning. Our courses help aspirants develop
              strong fundamentals and analytical abilities required for the Civil Services
              Examination.
            </p>

            <h3 className="text-xl font-bold text-[#0F172A] mt-8">
              Major Features of Our UPSC Courses
            </h3>

            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>Complete UPSC syllabus coverage</li>
              <li>Learning aligned with the latest UPSC exam pattern</li>
              <li>Interactive mentorship sessions and workshops</li>
              <li>Regular UPSC mock tests with detailed analysis</li>
              <li>Conceptual clarity across all GS subjects</li>
              <li>Flexible learning opportunities for students</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0F172A] mt-8">
              Concept Clarification and Strategy Workshops
            </h3>
            <p>
              Achiwon conducts special UPSC strategy workshops focusing on answer writing,
              revision techniques, time management, and examination psychology.
            </p>

            <h3 className="text-xl font-bold text-[#124699] mt-8">
              Prepare Your UPSC with Achiwon
            </h3>
            <p className="font-medium text-[#0F172A]">
              Register today and take your first step toward UPSC success with Achiwon.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Course;
