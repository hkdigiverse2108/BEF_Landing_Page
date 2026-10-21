import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";
import Seo from "../../Components/Common/Seo";
import {
  LuChevronRight,
  LuChevronDown,
  LuArrowRight,
  LuCheck,
  LuCircleCheck,
  LuClock,
  LuZap,
  LuBookOpen,
  LuFileText,
  LuGlobe,
} from "react-icons/lu";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question:
      "What is the importance of solving UPSC Prelims previous year question papers?",
    answer:
      "UPSC Prelims PYQs help aspirants understand question patterns, recurring themes, conceptual depth and the way UPSC frames questions. Solving PYQs also helps identify weak areas and improve elimination and time-management strategies.",
  },
  {
    question: "How many years of UPSC Prelims PYQs should I solve?",
    answer:
      "Start with the latest five to ten years and expand your practice based on your preparation stage. Analyse the questions carefully instead of simply counting how many papers you have completed.",
  },
  {
    question: "Should I solve UPSC PYQs topic-wise or year-wise?",
    answer:
      "Use topic-wise PYQs while learning a subject, then switch to full year-wise papers to practise mixed-question recall, judgement and time management.",
  },
  {
    question: "How should I analyse UPSC Prelims PYQs?",
    answer:
      "Review each answer, record why an option was eliminated, tag the relevant subject and concept, and revisit mistakes through a short revision list.",
  },
  {
    question: "Can I download PDF of attempted PYQs?",
    answer:
      "Achiwon practice sets keep your attempted questions and performance cues together so you can return to marked questions during revision.",
  },
];

const SUBJECTS = [
  "All Subjects",
  "History",
  "Polity",
  "Geography",
  "Economy",
  "Environment",
  "Science & Tech",
  "Current Affairs",
];

const PyqPage = () => {
  const [paperType, setPaperType] = useState<"GS" | "CSAT">("GS");
  const [selectedSubject, setSelectedSubject] = useState<string>("All Subjects");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Seo
        title="UPSC Prelims Previous Year Questions (2011–2026) | Bharat Exam Fest"
        description="Download and practice UPSC Prelims PYQs with detailed explanations, mindmaps, and subject-wise analysis for General Studies and CSAT."
      />

      <div className="min-h-screen w-full bg-white flex flex-col font-sans text-[#172033]">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 lg:px-8 lg:pb-20 lg:pt-10">
              {/* Breadcrumbs */}
              <nav
                className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]"
                aria-label="Breadcrumb"
              >
                <NavLink
                  to={ROUTES.HOME}
                  className="font-medium text-[#124699] hover:text-[#F48224] transition-colors"
                >
                  Home
                </NavLink>
                <LuChevronRight className="text-xs text-gray-400" />
                <NavLink
                  to={ROUTES.BLOG.BLOG}
                  className="font-medium text-[#124699] hover:text-[#F48224] transition-colors"
                >
                  UPSC Prelims
                </NavLink>
                <LuChevronRight className="text-xs text-gray-400" />
                <span className="text-[#172033] font-semibold">
                  Previous Year Question Papers
                </span>
              </nav>

              {/* Main Hero Header & Aside Card */}
              <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
                    UPSC Prelims practice library
                  </p>
                  <h1 className="mt-4 max-w-3xl font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033] leading-tight">
                    UPSC Prelims Previous Year Questions
                  </h1>
                  <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-[#64748B]">
                    Get UPSC Prelims Previous Year Question papers with detailed
                    explanations, mindmaps, organized year-wise and subject-wise for
                    focused GS and CSAT preparation.
                  </p>

                  {/* Paper Type Toggle (GS vs CSAT) */}
                  <div
                    className="mt-8 inline-flex rounded-xl border border-gray-200 bg-white p-1.5 shadow-xs"
                    aria-label="Question paper type"
                  >
                    <button
                      type="button"
                      onClick={() => setPaperType("GS")}
                      className={`min-h-11 rounded-lg px-7 text-sm font-bold transition-all cursor-pointer ${
                        paperType === "GS"
                          ? "bg-[#F48224] text-white shadow-xs"
                          : "text-[#64748B] hover:bg-[#F3F7FC] hover:text-[#172033]"
                      }`}
                    >
                      GS
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaperType("CSAT")}
                      className={`min-h-11 rounded-lg px-7 text-sm font-bold transition-all cursor-pointer ${
                        paperType === "CSAT"
                          ? "bg-[#F48224] text-white shadow-xs"
                          : "text-[#64748B] hover:bg-[#F3F7FC] hover:text-[#172033]"
                      }`}
                    >
                      CSAT
                    </button>
                  </div>
                </div>

                {/* Aside Smart Practice Card */}
                <aside
                  id="practice"
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-[#F3F7FC] p-6 sm:p-7 shadow-md lg:col-span-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F48224] text-white">
                      <LuCircleCheck className="text-sm" />
                    </span>
                    <span className="text-xs font-bold text-[#172033]">
                      Trusted by 25K+ Aspirants
                    </span>
                  </div>

                  <h2 className="mt-4 font-heading text-xl sm:text-2xl font-bold leading-snug text-[#172033]">
                    Practice UPSC Prelims PYQs smarter
                  </h2>

                  <ul className="mt-4 space-y-3 text-sm text-[#64748B]">
                    <li className="flex gap-2.5 items-start">
                      <LuCheck className="mt-0.5 text-base text-[#F48224] shrink-0" />
                      <span className="text-[#172033]">
                        Track accuracy and identify weak areas.
                      </span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <LuCheck className="mt-0.5 text-base text-[#F48224] shrink-0" />
                      <span className="text-[#172033]">
                        See past trends and recurring themes.
                      </span>
                    </li>
                  </ul>

                  <a
                    href="#years"
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#124699] px-4 py-3 text-sm font-bold text-white shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-[#0d3473]"
                  >
                    Start Practicing Now <LuArrowRight className="text-base" />
                  </a>

                  <div className="mt-5 aspect-[16/7] overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <img
                      src="https://uxmagic.blob.core.windows.net/public/agent-images/pyq-practice-illustration-1790650350624-qwzoemkbn2q.png"
                      alt="UPSC aspirant solving previous year question papers with a progress chart"
                      className="h-full w-full object-cover"
                      width="1536"
                      height="1024"
                    />
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* Year Grid & Subject Filter Section */}
          <section id="years" className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
              <div className="max-w-4xl">
                {/* Header row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
                      Find your paper
                    </p>
                    <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-[#172033]">
                      Choose a year. Start practising.
                    </h2>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#64748B]">
                      Prioritise recent papers first, then use older PYQs to spot
                      the concepts UPSC returns to repeatedly.
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F3F7FC] px-3.5 py-1.5 text-xs font-semibold text-[#172033] border border-gray-200 shrink-0">
                    <LuClock className="text-sm text-[#F48224]" />
                    Updated for 2026
                  </span>
                </div>

                {/* Subject Filter Pills */}
                <div className="mt-8 overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-2" aria-label="Filter by subject">
                    {SUBJECTS.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSelectedSubject(sub)}
                        className={`min-h-10 rounded-full px-4 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          selectedSubject === sub
                            ? "bg-[#124699] text-white shadow-xs"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-[#124699] hover:text-[#124699]"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Blocks */}
                <div className="mt-12 space-y-12">
                  {/* Block 1: 2022-26 */}
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="font-heading text-xl font-bold text-[#172033]">
                        Last 5 years{" "}
                        <span className="font-sans text-base font-medium text-[#64748B]">
                          (2022–26)
                        </span>
                      </h3>
                      <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Link
                        to={`${ROUTES.FREE_PRACTICE}?year=2026&paper=${paperType}&subject=${encodeURIComponent(selectedSubject)}`}
                        className="group flex min-h-12 items-center justify-between rounded-xl border border-[#124699] bg-[#F3F7FC] px-5 py-3 font-heading text-lg font-bold text-[#124699] shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <span>2026 ({paperType})</span>
                        <LuArrowRight className="text-xl text-[#F48224] transition group-hover:translate-x-1" />
                      </Link>

                      {["2025", "2024", "2023", "2022"].map((year) => (
                        <Link
                          key={year}
                          to={`${ROUTES.FREE_PRACTICE}?year=${year}&paper=${paperType}&subject=${encodeURIComponent(selectedSubject)}`}
                          className="group flex min-h-12 items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 font-heading text-lg font-bold text-[#172033] transition duration-200 hover:-translate-y-0.5 hover:border-[#124699] hover:text-[#124699] hover:shadow-md"
                        >
                          <span>{year} ({paperType})</span>
                          <LuArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#F48224]" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Block 2: 2017-21 */}
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="font-heading text-xl font-bold text-[#172033]">
                        From 2017–21
                      </h3>
                      <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {["2021", "2020", "2019", "2018", "2017"].map((year) => (
                        <Link
                          key={year}
                          to={`${ROUTES.FREE_PRACTICE}?year=${year}&paper=${paperType}&subject=${encodeURIComponent(selectedSubject)}`}
                          className="group flex min-h-12 items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 font-heading text-lg font-bold text-[#172033] transition duration-200 hover:-translate-y-0.5 hover:border-[#124699] hover:text-[#124699] hover:shadow-md"
                        >
                          <span>{year} ({paperType})</span>
                          <LuArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#F48224]" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Block 3: 2012-16 */}
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="font-heading text-xl font-bold text-[#172033]">
                        From 2012–16
                      </h3>
                      <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {["2016", "2015", "2014", "2013", "2012"].map((year) => (
                        <Link
                          key={year}
                          to={`${ROUTES.FREE_PRACTICE}?year=${year}&paper=${paperType}&subject=${encodeURIComponent(selectedSubject)}`}
                          className="group flex min-h-12 items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 font-heading text-lg font-bold text-[#172033] transition duration-200 hover:-translate-y-0.5 hover:border-[#124699] hover:text-[#124699] hover:shadow-md"
                        >
                          <span>{year} ({paperType})</span>
                          <LuArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#F48224]" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Block 4: 2011 */}
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="font-heading text-xl font-bold text-[#172033]">
                        2011
                      </h3>
                      <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Link
                        to={`${ROUTES.FREE_PRACTICE}?year=2011&paper=${paperType}&subject=${encodeURIComponent(selectedSubject)}`}
                        className="group flex min-h-12 items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 font-heading text-lg font-bold text-[#172033] transition duration-200 hover:-translate-y-0.5 hover:border-[#124699] hover:text-[#124699] hover:shadow-md"
                      >
                        <span>2011 ({paperType})</span>
                        <LuArrowRight className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#F48224]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ & CTA Section */}
          <section className="bg-[#F8FAFC] border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-3xl">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
                    Clear your doubts
                  </p>
                  <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172033]">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="mt-10 space-y-3.5">
                  {FAQS.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-heading text-base font-bold text-[#172033] hover:text-[#124699] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <LuChevronDown
                            className={`text-xl text-[#124699] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-relaxed text-[#64748B]">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Call-to-Action Blue Banner */}
              <div className="mt-16 overflow-hidden rounded-2xl bg-[#124699] shadow-xl">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 text-white sm:p-10 lg:p-12">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F48224] px-3 py-1 text-xs font-bold text-white shadow-xs">
                      <LuZap className="text-sm" /> Practice with purpose
                    </div>

                    <h2 className="mt-5 max-w-lg font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                      Crack UPSC with Achiwon
                    </h2>

                    <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-blue-100">
                      Practice smarter, analyse your preparation and build
                      confidence with structured UPSC resources.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="#years"
                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#124699] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50"
                      >
                        Start Practicing
                      </a>
                      <Link
                        to={ROUTES.BLOG.BLOG}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/60 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        Explore Achiwon
                      </Link>
                    </div>
                  </div>

                  <div className="min-h-64 overflow-hidden bg-white/5">
                    <img
                      src="https://uxmagic.blob.core.windows.net/public/agent-images/pyq-banner-illustration-1790650362479-1ke4qun6iqj.png"
                      alt="UPSC aspirant with practice papers and learning progress chart"
                      className="h-full w-full object-cover"
                      width="1536"
                      height="1024"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue Learning Resources Section */}
          <section id="resources" className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#124699]">
                    Continue learning
                  </p>
                  <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-[#172033]">
                    Explore more UPSC resources
                  </h2>
                </div>

                <Link
                  to={ROUTES.BLOG.BLOG}
                  className="inline-flex items-center gap-2 font-bold text-[#124699] hover:text-[#F48224] transition-colors"
                >
                  View resource library <LuArrowRight className="text-lg" />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Resource Card 1 */}
                <Link
                  to={ROUTES.BLOG.BLOG}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#124699] hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F7FC] text-[#124699] group-hover:bg-[#124699] group-hover:text-white transition-colors">
                    <LuBookOpen className="text-2xl" />
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-[#124699]">
                    UPSC Syllabus
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-[#172033] group-hover:text-[#124699] transition-colors">
                    Complete UPSC Syllabus for Prelims &amp; Mains
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#124699] group-hover:text-[#F48224] transition-colors">
                    Explore <LuArrowRight className="text-base" />
                  </span>
                </Link>

                {/* Resource Card 2 */}
                <Link
                  to={ROUTES.BLOG.BLOG}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#124699] hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F7FC] text-[#124699] group-hover:bg-[#124699] group-hover:text-white transition-colors">
                    <LuFileText className="text-2xl" />
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-[#124699]">
                    UPSC Mains
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-[#172033] group-hover:text-[#124699] transition-colors">
                    UPSC Mains Previous Year Questions
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#124699] group-hover:text-[#F48224] transition-colors">
                    Explore <LuArrowRight className="text-base" />
                  </span>
                </Link>

                {/* Resource Card 3 */}
                <Link
                  to={ROUTES.BLOG.BLOG}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#124699] hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F7FC] text-[#124699] group-hover:bg-[#124699] group-hover:text-white transition-colors">
                    <LuGlobe className="text-2xl" />
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-[#124699]">
                    Current Affairs
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-[#172033] group-hover:text-[#124699] transition-colors">
                    Daily Current Affairs for UPSC
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#124699] group-hover:text-[#F48224] transition-colors">
                    Explore <LuArrowRight className="text-base" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PyqPage;
