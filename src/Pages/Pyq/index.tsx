import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { ROUTES, URL_KEYS } from "../../Constants";
import Seo from "../../Components/Common/Seo";
import { useGetApiQuery } from "../../Api/CommonApi";
import FormattedSolution from "../../Components/Common/FormattedSolution";
import {
  LuBookOpen,
  LuClock,
  LuZap,
  LuSearch,
  LuChevronRight,
  LuChevronDown,
  LuArrowRight,
  LuLayers,
  LuCompass,
  LuTrendingUp,
  LuLandmark,
  LuTreePine,
  LuCpu,
  LuBookmark,
  LuScanLine,
  LuTrophy,
  LuSparkles,
  LuRotateCcw,
  LuCheck,
} from "react-icons/lu";

export interface PyqSubjectMeta {
  id?: string;
  name: string;
  slug?: string;
  count: number;
}

export interface PyqYearMeta {
  year: string;
  totalQuestions: number;
  papersCount?: number;
  subjects: PyqSubjectMeta[];
}

export const toSlug = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Universal safe string extraction helper (handles objects with {combined}, {statement}, {text}, arrays, primitives)
export const extractText = (val: any): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    if (typeof val.combined === "string") return val.combined;
    if (typeof val.statement === "string") return val.statement;
    if (typeof val.text === "string") return val.text;
    if (typeof val.value === "string") return val.value;
    if (typeof val.title === "string") return val.title;
    if (typeof val.key === "string") return val.key;
    if (Array.isArray(val)) {
      return val.map((item) => extractText(item)).filter(Boolean).join(" ");
    }
    const stringValues = Object.values(val)
      .map((v) => extractText(v))
      .filter(Boolean);
    if (stringValues.length > 0) {
      return stringValues.join(" ");
    }
  }
  return String(val);
};

// Robust helper to normalize options from object or array format
export const normalizeOptions = (options: any): { letter: string; text: string }[] => {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      if (typeof opt === "string") return { letter, text: opt };
      return {
        letter: opt?.option || opt?.key || letter,
        text: extractText(opt?.value ?? opt?.text ?? opt?.combined ?? opt?.key ?? opt),
      };
    });
  }
  if (typeof options === "object") {
    return Object.entries(options).map(([key, val]) => ({
      letter: key.toUpperCase(),
      text: extractText(val),
    }));
  }
  return [];
};

// Dynamic icon helper for subjects
const getSubjectIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("polity") || lower.includes("gov")) return LuLandmark;
  if (lower.includes("econom") || lower.includes("agri")) return LuTrendingUp;
  if (lower.includes("environ") || lower.includes("ecol")) return LuTreePine;
  if (lower.includes("science") || lower.includes("tech")) return LuCpu;
  if (lower.includes("geograph") || lower.includes("ir")) return LuCompass;
  if (lower.includes("ancient") || lower.includes("history") || lower.includes("culture")) return LuBookOpen;
  return LuLayers;
};

const FAQS = [
  {
    question: "What is the importance of solving UPSC Prelims previous year question papers?",
    answer:
      "UPSC Prelims PYQs help aspirants understand question framing patterns, recurring themes, conceptual depth, and traps. Solving PYQs with option elimination analysis improves judgement and time management.",
  },
  {
    question: "How many years of UPSC Prelims PYQs should I solve?",
    answer:
      "Aspirants should thoroughly analyse at least the latest 8 to 10 years of PYQs (from 2018 to 2025). Focus on understanding why incorrect options were eliminated, as UPSC frequently turns previous wrong options into next year's questions.",
  },
  {
    question: "Are solutions aligned with the official UPSC answer keys?",
    answer:
      "Yes. Every question includes a verified official answer key and structured explanation detailing core concepts, option elimination logic, and relevant current affairs linkages.",
  },
  {
    question: "Can I practice these PYQs in a timed mock test simulator?",
    answer:
      "Yes! Achiwon provides a full-fledged timed mock exam simulator with real negative marking (-0.66 marks) and instant percentile ranking. Click 'Start Free Mock Test' anytime.",
  },
];

export const PyqPage: React.FC = () => {
  const { year: routeYear, paper: routePaper, subject: routeSubject } = useParams<{
    year?: string;
    paper?: string;
    subject?: string;
  }>();

  const navigate = useNavigate();
  const location = useLocation();

  // Mode: "questions" (Question Papers) or "explore" (Explore Topics)
  const isExplorePath = location.pathname.includes("/explore-topics");
  const [activeTabMode, setActiveTabMode] = useState<"questions" | "explore">(
    isExplorePath ? "explore" : "questions"
  );

  useEffect(() => {
    if (location.pathname.includes("/explore-topics")) {
      setActiveTabMode("explore");
    } else {
      setActiveTabMode("questions");
    }
  }, [location.pathname]);

  // 1. Fetch Dynamic PYQ Metadata 100% from Backend API
  const { data: pyqMetaResponse, isFetching: isMetaFetching } = useGetApiQuery({
    url: URL_KEYS.PYQ.META,
  });

  const yearsMeta: PyqYearMeta[] = useMemo(() => {
    if (Array.isArray(pyqMetaResponse?.data)) {
      return pyqMetaResponse.data;
    }
    return [];
  }, [pyqMetaResponse]);

  const availableYears = useMemo(() => {
    return yearsMeta.map((y) => y.year);
  }, [yearsMeta]);

  // Active Year resolution from URL slug or first available year in DB
  const selectedYear = useMemo(() => {
    if (routeYear && availableYears.includes(routeYear)) {
      return routeYear;
    }
    return availableYears[0] || "2025";
  }, [routeYear, availableYears]);

  // Active Year Metadata
  const activeYearMeta = useMemo(() => {
    return yearsMeta.find((y) => y.year === selectedYear) || yearsMeta[0];
  }, [yearsMeta, selectedYear]);

  const subjectsForActiveYear = useMemo(() => {
    return activeYearMeta?.subjects || [];
  }, [activeYearMeta]);

  // Active Paper resolution (GS Paper / CSAT)
  const selectedPaper = useMemo(() => {
    if (routePaper) {
      return routePaper.toLowerCase().includes("csat") ? "csat" : "gs-paper";
    }
    return "gs-paper";
  }, [routePaper]);

  // Active Subject resolution from URL slug or default
  const selectedSubjectDoc = useMemo(() => {
    if (!routeSubject || routeSubject === "all" || routeSubject === "all-subjects") {
      return null;
    }
    const cleanRouteSub = routeSubject.toLowerCase().trim();
    return subjectsForActiveYear.find((s) => {
      const sSlug = s.slug || toSlug(s.name);
      return sSlug === cleanRouteSub || sSlug.includes(cleanRouteSub) || cleanRouteSub.includes(sSlug);
    });
  }, [routeSubject, subjectsForActiveYear]);

  const selectedSubjectName =
    selectedSubjectDoc?.name || (routeSubject ? routeSubject.replace(/-/g, " ") : "All Subjects");
  const selectedSubjectSlug = selectedSubjectDoc
    ? selectedSubjectDoc.slug || toSlug(selectedSubjectDoc.name)
    : routeSubject || "all";

  // Local interactive states
  const [language, setLanguage] = useState<"englishQuestion" | "hindiQuestion">("englishQuestion");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic Topics Aggregation for the Topic Explorer from Backend Metadata
  const dynamicTopics = useMemo(() => {
    const topicMap: Record<
      string,
      {
        id: string;
        name: string;
        slug: string;
        totalCount: number;
        years: { year: string; count: number }[];
      }
    > = {};

    for (const yMeta of yearsMeta) {
      for (const sub of yMeta.subjects || []) {
        const key = sub.slug || toSlug(sub.name);
        if (!key) continue;
        if (!topicMap[key]) {
          topicMap[key] = {
            id: key,
            name: sub.name,
            slug: key,
            totalCount: 0,
            years: [],
          };
        }
        topicMap[key].totalCount += sub.count;
        if (sub.count > 0 && !topicMap[key].years.some((y) => y.year === yMeta.year)) {
          topicMap[key].years.push({ year: yMeta.year, count: sub.count });
        }
      }
    }

    return Object.values(topicMap).sort((a, b) => b.totalCount - a.totalCount);
  }, [yearsMeta]);

  // Topic Explorer interactive states
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");

  useEffect(() => {
    if (dynamicTopics.length > 0 && (!selectedTopicId || !dynamicTopics.some((t) => t.id === selectedTopicId))) {
      setSelectedTopicId(dynamicTopics[0].id);
    }
  }, [dynamicTopics, selectedTopicId]);

  const activeTopicObj = useMemo(() => {
    return dynamicTopics.find((t) => t.id === selectedTopicId) || dynamicTopics[0];
  }, [dynamicTopics, selectedTopicId]);

  const [sidebarSubjectSearch, setSidebarSubjectSearch] = useState<string>("");

  // Navigation Helper that updates URL slugs dynamically
  const navigateToSlug = (year: string, paper: string = "gs-paper", subjectSlug?: string) => {
    const isSuperkalamUrl = location.pathname.startsWith("/upsc-prelims");
    const basePath = isSuperkalamUrl ? "/upsc-prelims/previous-year-question-paper" : "/pyq";

    let target = `${basePath}/${year}/${paper}`;
    if (subjectSlug && subjectSlug !== "all" && subjectSlug !== "All Subjects") {
      target = `${basePath}/${year}/${paper}/${toSlug(subjectSlug)}`;
    }
    navigate(target);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  // Reset selected answers and solutions when URL slug/page changes
  useEffect(() => {
    setUserSelectedAnswers({});
    setExpandedSolutions({});
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  // 2. Fetch Questions 100% Dynamically from Backend API
  const queryUrl = useMemo(() => {
    if (!selectedYear) return "";
    const params = new URLSearchParams();
    params.set("year", selectedYear);
    if (selectedSubjectDoc) {
      params.set("subject", selectedSubjectDoc.id || selectedSubjectDoc.name);
    } else if (routeSubject && routeSubject !== "all") {
      params.set("subject", routeSubject);
    }
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }
    params.set("limit", "100");
    return `${URL_KEYS.PYQ.QUESTIONS}?${params.toString()}`;
  }, [selectedYear, selectedSubjectDoc, routeSubject, debouncedSearch]);

  const { data: questionsResponse, isFetching: isQuestionsFetching } = useGetApiQuery(
    {
      url: queryUrl,
    },
    {
      skip: !queryUrl || activeTabMode === "explore",
    }
  );

  const fetchedQuestions = useMemo(() => {
    const qData = questionsResponse?.data?.questions;
    if (Array.isArray(qData)) {
      return qData;
    }
    return [];
  }, [questionsResponse]);

  // Sidebar filtered subjects
  const filteredSidebarSubjects = useMemo(() => {
    if (!sidebarSubjectSearch.trim()) return subjectsForActiveYear;
    const q = sidebarSubjectSearch.toLowerCase().trim();
    return subjectsForActiveYear.filter((s) => s.name.toLowerCase().includes(q));
  }, [subjectsForActiveYear, sidebarSubjectSearch]);

  const handleOptionClick = (questionId: string, optionKey: string) => {
    setUserSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const toggleSolution = (questionId: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const seoTitle = `UPSC Prelims ${selectedYear} ${selectedSubjectName} Previous Year Question Papers with Solutions | Achiwon`;
  const seoDescription = `Practice official UPSC Prelims ${selectedYear} ${selectedSubjectName} questions with detailed answers, option elimination analysis, and official keys on Achiwon.`;

  return (
    <div className="min-h-screen bg-white text-[#14213D]">
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords="UPSC Prelims, PYQ, Previous Year Questions, Model Answers, Solutions"
        noIndex={true}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Dynamic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <Link to={ROUTES.HOME} className="hover:text-primary transition">
            Home
          </Link>
          <LuChevronRight className="text-gray-400" />
          <Link
            to={ROUTES.PYQ}
            onClick={() => setActiveTabMode("questions")}
            className="hover:text-primary transition"
          >
            Previous Year Questions
          </Link>
          {activeTabMode === "explore" ? (
            <>
              <LuChevronRight className="text-gray-400" />
              <span className="font-semibold text-primary">Explore Topics</span>
            </>
          ) : (
            <>
              <LuChevronRight className="text-gray-400" />
              <button
                onClick={() => navigateToSlug(selectedYear, selectedPaper)}
                className="hover:text-primary font-medium"
              >
                {selectedYear}
              </button>
              <LuChevronRight className="text-gray-400" />
              <span className="font-medium text-gray-600 uppercase">
                {selectedPaper === "csat" ? "CSAT Paper" : "GS Paper"}
              </span>
              {selectedSubjectDoc && (
                <>
                  <LuChevronRight className="text-gray-400" />
                  <span className="font-semibold text-primary">{selectedSubjectDoc.name}</span>
                </>
              )}
            </>
          )}
        </nav>

        {/* View Switcher Bar (Question Papers vs Explore Topics) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/80 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTabMode("questions");
                if (isExplorePath) navigate(`/pyq/${selectedYear}/${selectedPaper}`);
              }}
              className={`min-h-10 rounded-lg px-4 text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTabMode === "questions"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50/60"
              }`}
            >
              <LuBookOpen className="text-base" />
              <span>Question Papers by Year</span>
            </button>
            <button
              onClick={() => {
                setActiveTabMode("explore");
                navigate(ROUTES.PYQ_EXPLORE);
              }}
              className={`min-h-10 rounded-lg px-4 text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTabMode === "explore"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50/60"
              }`}
            >
              <LuLayers className="text-base" />
              <span>Explore Topics &amp; Subtopics</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.MOCK_TEST.INTRO}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-2 transition shadow-sm"
            >
              <LuZap className="text-sm" />
              <span>Start Free Timed Mock</span>
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODE 1: EXPLORE TOPICS (frame-6ace124478b5d5ef3297a1b8.html)     */}
        {/* ============================================================== */}
        {activeTabMode === "explore" ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                <LuCompass className="text-base text-orange-500" />
                <span>TOPIC HIERARCHY EXPLORER</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#14213D]">
                Explore UPSC Prelims Topics
              </h1>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
                Choose a subject domain below to inspect verified questions and available years directly from database records.
              </p>

              {/* Dynamic Topic Cards Grid from DB Metadata */}
              {isMetaFetching && dynamicTopics.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500">Loading topics...</div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" aria-label="Topics">
                  {dynamicTopics.map((t) => {
                    const Icon = getSubjectIcon(t.name);
                    const isSelected = selectedTopicId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTopicId(t.id);
                        }}
                        className={`min-h-28 rounded-xl p-4 text-left transition border ${
                          isSelected
                            ? "border-primary bg-primary text-white shadow-md"
                            : "border-gray-200 bg-white hover:bg-blue-50/50 hover:border-blue-300 text-[#14213D]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`text-2xl ${isSelected ? "text-orange-400" : "text-primary"}`} />
                          <LuChevronDown
                            className={`text-xl transition-transform ${isSelected ? "rotate-180 text-white" : "text-gray-400"}`}
                          />
                        </div>
                        <p className="font-heading font-bold text-base mt-4">{t.name}</p>
                        <p className={`text-xs mt-1 ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                          {t.totalCount} Total Questions · {t.years.length} Exam Years
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Subtopic / Years Explorer Container */}
            {activeTopicObj && (
              <section id="topic-explorer-details" className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-[#14213D]">{activeTopicObj.name}</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose an available exam year to view verified questions with model answers.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Available Exam Years:</p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeTopicObj.years.map((y) => (
                      <button
                        key={y.year}
                        onClick={() => {
                          setActiveTabMode("questions");
                          navigateToSlug(y.year, "gs-paper", activeTopicObj.slug);
                        }}
                        className="min-h-10 px-4 rounded-xl border border-gray-200 bg-white hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/50 font-bold text-xs transition shadow-2xs flex items-center gap-2"
                      >
                        <span>{y.year} PYQs</span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                          {y.count} Qs
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* MODE 2: QUESTIONS & MODEL ANSWERS (frame-6ace17a278b5d5ef3297df76) */
          /* ============================================================== */
          <div id="pyq-questions-hub" className="space-y-6">
            {/* Hero Header Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <LuBookOpen className="text-base text-orange-500" />
                    <span>PREVIOUS YEAR QUESTIONS · MODEL ANSWERS &amp; SOLUTIONS</span>
                  </div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#14213D] leading-tight">
                    UPSC Prelims {selectedYear} · {selectedSubjectName}
                  </h1>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-gray-600">
                    Comprehensive chapter-wise and year-wise question bank with structured model solutions, official UPSC
                    answer keys, and strategic option elimination breakdowns.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-blue-50/80 border border-blue-100 px-4 py-3 text-xs sm:text-sm text-primary font-medium shrink-0">
                  <LuClock className="text-lg text-orange-500 shrink-0" />
                  <span>Designed for focused, long-form study</span>
                </div>
              </div>
            </div>

            {/* 2-Column Responsive Layout: 7fr Main + 3fr Sticky Sidebar */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(300px,3fr)]">
              {/* LEFT COLUMN (7fr): Questions Stream */}
              <section className="min-w-0 space-y-6">
                {/* Year Selector Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="font-heading text-lg font-bold text-[#14213D]">Browse Questions by Year</h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Select an exam year to load its verified questions and subject weightage.
                        </p>
                      </div>
                      <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary">
                        UPSC Prelims Archive
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2" aria-label="Year navigation">
                      {availableYears.map((yr) => {
                        const isSelected = yr === selectedYear;
                        return (
                          <button
                            key={yr}
                            onClick={() => navigateToSlug(yr, selectedPaper, selectedSubjectSlug)}
                            className={`min-h-10 rounded-lg px-4 text-xs font-bold transition ${
                              isSelected
                                ? "bg-primary text-white shadow-sm"
                                : "border border-gray-200 bg-white text-[#14213D] hover:border-primary hover:bg-blue-50/40"
                            }`}
                          >
                            {yr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Subject Filter Pills Bar */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-base font-bold text-[#14213D]">
                        {selectedYear} Subject Filters
                      </h3>
                      <p className="text-xs text-gray-500">
                        Showing question counts dynamically from database records.
                      </p>
                    </div>

                    {/* Language Switcher */}
                    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                      <button
                        onClick={() => setLanguage("englishQuestion")}
                        className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                          language === "englishQuestion"
                            ? "bg-white text-primary shadow-xs"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage("hindiQuestion")}
                        className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                          language === "hindiQuestion"
                            ? "bg-white text-primary shadow-xs"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        हिन्दी
                      </button>
                    </div>
                  </div>

                  {/* Subject Pills */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigateToSlug(selectedYear, selectedPaper, "all")}
                      className={`min-h-9 px-3.5 rounded-lg text-xs font-bold transition ${
                        !selectedSubjectDoc || selectedSubjectSlug === "all"
                          ? "bg-primary text-white shadow-xs"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      All Subjects ({activeYearMeta?.totalQuestions || fetchedQuestions.length})
                    </button>

                    {subjectsForActiveYear.map((sub) => {
                      const subSlug = sub.slug || toSlug(sub.name);
                      const isSelected = selectedSubjectDoc?.id === sub.id || selectedSubjectSlug === subSlug;
                      return (
                        <button
                          key={sub.name}
                          onClick={() => navigateToSlug(selectedYear, selectedPaper, subSlug)}
                          className={`min-h-9 px-3.5 rounded-lg text-xs font-bold transition ${
                            isSelected
                              ? "bg-primary text-white shadow-xs"
                              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <span>{sub.name}</span>
                          <span
                            className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                              isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {sub.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search within this year's questions */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                    <div className="min-h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50/70 px-3 flex items-center gap-2">
                      <LuSearch className="text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search keyword in questions or explanations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-xs text-[#14213D]"
                      />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Questions Stream Header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-heading text-lg font-bold text-[#14213D]">
                    Questions List ({fetchedQuestions.length})
                  </h3>
                  <span className="text-xs text-gray-500">
                    Year: {selectedYear} · Paper: {selectedPaper.toUpperCase()}
                  </span>
                </div>

                {/* Loading state */}
                {isQuestionsFetching && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 space-y-3">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                    <p>Loading questions for UPSC Prelims {selectedYear}...</p>
                  </div>
                )}

                {/* Empty State */}
                {!isQuestionsFetching && fetchedQuestions.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 space-y-3">
                    <LuBookOpen className="mx-auto text-4xl text-gray-300" />
                    <p className="font-bold text-[#14213D] text-base">No questions found</p>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      No question records matched your filter criteria for {selectedYear}. Try selecting "All Subjects" or
                      clearing your search.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        navigateToSlug(selectedYear, selectedPaper, "all");
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs"
                    >
                      <LuRotateCcw className="text-sm" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}

                {/* Question Cards List */}
                <div className="space-y-5">
                  {fetchedQuestions.map((q: any, idx: number) => {
                    const qId = q._id || `q_${idx}`;
                    const qData = q[language] || q.englishQuestion || {};
                    const statementList = qData.statementQuestion || [];
                    const pairList = qData.pairQuestion || [];
                    const normalizedOpts = normalizeOptions(qData.options);
                    const selectedOpt = userSelectedAnswers[qId];
                    const isSolutionOpen = !!expandedSolutions[qId];
                    const isBookmarked = !!bookmarkedQuestions[qId];
                    const subjectBadge =
                      q.fullLengthSubject?.name || q.subject?.name || q.subjectName || "General Studies";

                    // Retrieve official correct answer from englishQuestion / hindiQuestion / root
                    const correctLetter = (
                      qData.answer ||
                      q.englishQuestion?.answer ||
                      q.hindiQuestion?.answer ||
                      q.answer ||
                      q.correctAnswer ||
                      ""
                    )
                      .toString()
                      .trim()
                      .toUpperCase();

                    return (
                      <article
                        key={qId}
                        className="overflow-hidden rounded-2xl border border-gray-200 border-l-4 border-l-primary bg-white shadow-xs transition duration-200 hover:border-primary hover:shadow-md"
                      >
                        <div className="p-5 sm:p-6 space-y-4">
                          {/* Card Meta Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary">
                                {subjectBadge}
                              </span>
                              <span className="text-xs text-gray-500">UPSC Prelims {q.year || selectedYear}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs font-bold text-gray-600">Q.{idx + 1}</span>
                            </div>

                            <button
                              onClick={() => toggleBookmark(qId)}
                              aria-label="Save question"
                              className={`flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                                isBookmarked ? "text-orange-500 font-bold" : "text-gray-400 hover:text-gray-700"
                              }`}
                            >
                              <LuBookmark className={`text-base ${isBookmarked ? "fill-orange-500" : ""}`} />
                              <span>{isBookmarked ? "Saved" : "Save for revision"}</span>
                            </button>
                          </div>

                          {/* Question Text */}
                          <div className="space-y-3">
                            <h3 className="font-heading text-sm sm:text-base font-bold text-[#14213D] leading-relaxed">
                              {extractText(qData.question) || "Question text is being updated..."}
                            </h3>

                            {/* Statements list */}
                            {statementList.length > 0 && (
                              <div className="rounded-xl bg-gray-50/80 border border-gray-200/60 p-3.5 space-y-2 text-xs sm:text-sm text-gray-800">
                                {statementList.map((stmtItem: any, sIdx: number) => {
                                  const stmtText = extractText(stmtItem);
                                  return (
                                    <div key={sIdx} className="flex items-start gap-2.5">
                                      <span className="font-bold text-primary shrink-0">{sIdx + 1}.</span>
                                      <span className="leading-relaxed text-gray-800">{stmtText}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Pairs list */}
                            {pairList.length > 0 && (
                              <div className="rounded-xl bg-gray-50/80 border border-gray-200/60 p-3.5 space-y-2 text-xs sm:text-sm text-gray-800">
                                {pairList.map((pairItem: any, pIdx: number) => {
                                  const rawText = extractText(pairItem);
                                  const parts = rawText.includes("---")
                                    ? rawText.split("---").map((p) => p.trim())
                                    : rawText.includes(":")
                                    ? rawText.split(":").map((p) => p.trim())
                                    : [rawText];

                                  return (
                                    <div
                                      key={pIdx}
                                      className={`flex flex-wrap items-center justify-between py-1.5 border-b border-gray-200/50 last:border-b-0 gap-2 ${
                                        pIdx === 0 && rawText.toLowerCase().includes("---") && !/^\d/i.test(rawText.trim())
                                          ? "font-bold text-gray-900 bg-gray-100/70 px-2 rounded"
                                          : ""
                                      }`}
                                    >
                                      {parts.length > 1 ? (
                                        parts.map((part, partIdx) => (
                                          <span
                                            key={partIdx}
                                            className={partIdx === 0 ? "font-semibold text-gray-800" : "text-primary font-medium"}
                                          >
                                            {part}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-gray-800">{rawText}</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Last Question Prompt */}
                            {qData.lastQuestion && (
                              <p className="text-xs sm:text-sm font-semibold text-gray-700 italic">
                                {extractText(qData.lastQuestion)}
                              </p>
                            )}
                          </div>

                          {/* Options List */}
                          <div className="space-y-2.5 pt-1">
                            {normalizedOpts.map((opt) => {
                              const isSelected = selectedOpt === opt.letter;
                              const isCorrect = correctLetter === opt.letter;
                              const hasAnswered = !!selectedOpt;
                              const showAsCorrect = (hasAnswered && isCorrect) || (isSolutionOpen && isCorrect);
                              const showAsIncorrect = hasAnswered && isSelected && !isCorrect;

                              return (
                                <button
                                  key={opt.letter}
                                  onClick={() => handleOptionClick(qId, opt.letter)}
                                  className={`w-full rounded-xl p-3 sm:p-3.5 text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 border cursor-pointer ${
                                    showAsCorrect
                                      ? "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold shadow-xs"
                                      : showAsIncorrect
                                      ? "border-rose-400 bg-rose-50/80 text-rose-950 font-medium"
                                      : isSelected
                                      ? "border-primary bg-blue-50/60 text-[#14213D] shadow-2xs"
                                      : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-800"
                                  }`}
                                >
                                  <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <span
                                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                        showAsCorrect
                                          ? "bg-emerald-600 text-white"
                                          : showAsIncorrect
                                          ? "bg-rose-500 text-white"
                                          : isSelected
                                          ? "bg-primary text-white"
                                          : "border border-gray-300 bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {opt.letter}
                                    </span>
                                    <span className="leading-snug pt-0.5 break-words">{opt.text}</span>
                                  </div>

                                  {/* Answer indicator badges */}
                                  {showAsCorrect && (
                                    <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                                      <LuCheck className="text-xs" /> Correct Answer
                                    </span>
                                  )}
                                  {showAsIncorrect && (
                                    <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full">
                                      ✕ Your Choice
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Action Footer: Solution Toggle */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                            <div className="text-xs">
                              {selectedOpt ? (
                                selectedOpt === correctLetter ? (
                                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                                    <LuCheck className="text-sm" /> Great job! Option ({selectedOpt}) is Correct.
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
                                    ✕ Incorrect! You selected ({selectedOpt}). Official answer is ({correctLetter}).
                                  </span>
                                )
                              ) : isSolutionOpen && correctLetter ? (
                                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                                  <LuCheck className="text-sm" /> Official UPSC Answer: Option ({correctLetter})
                                </span>
                              ) : (
                                <span className="text-gray-500">Click an option to test your answer</span>
                              )}
                            </div>

                            <button
                              onClick={() => toggleSolution(qId)}
                              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-50 hover:bg-blue-100/80 px-4 py-2 text-xs font-bold text-primary transition cursor-pointer"
                            >
                              <span>{isSolutionOpen ? "Hide Detailed Solution" : "View Answer & Explanation"}</span>
                              <LuChevronDown
                                className={`text-sm transition-transform ${isSolutionOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                          </div>

                          {/* Expandable Solution Section */}
                          {isSolutionOpen && (
                            <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-3">
                              <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-4">
                                <FormattedSolution
                                  solution={qData.solution || q.englishQuestion?.solution}
                                  correctAnswer={correctLetter}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Year-Wise Question Archive Banner Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#14213D]">
                        Year-Wise Question Archives
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Continue exploring questions from other UPSC Prelims years (2018–2025).
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableYears.map((yr) => (
                        <button
                          key={yr}
                          onClick={() => navigateToSlug(yr, selectedPaper)}
                          className={`min-h-9 px-3 rounded-lg text-xs font-bold border transition ${
                            yr === selectedYear
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* RIGHT COLUMN (3fr): Sticky Sidebar */}
              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                {/* 1. AI Answer Evaluation Card */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-orange-50/30 p-5 border-b border-blue-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          AI SMART EVALUATION
                        </p>
                        <h3 className="mt-1 font-heading text-lg font-bold text-[#14213D]">
                          Evaluate Your Speed &amp; Accuracy
                        </h3>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                        <LuScanLine className="text-xl" />
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs text-gray-600 leading-relaxed">
                      Practice real UPSC Prelims tests with instant AI analytics, option trap breakdowns, and negative marking simulator.
                    </p>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 border border-gray-100">
                      <LuZap className="text-orange-500 text-lg mt-0.5 shrink-0" />
                      <p className="text-xs text-gray-600 leading-normal">
                        Simulate 120-minute timed exam conditions with live All-India percentile rank.
                      </p>
                    </div>

                    <Link
                      to={ROUTES.MOCK_TEST.INTRO}
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-sm hover:opacity-95 transition"
                    >
                      <span>Start Free Mock Simulator</span>
                      <LuArrowRight className="text-sm" />
                    </Link>
                  </div>
                </section>

                {/* 2. Build Your Prelims Edge Card */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <LuSparkles className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-[#14213D]">Build Your Prelims Edge</h3>
                      <p className="text-[11px] text-gray-500">Comprehensive Prelims Strategy</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-600">
                    Create a consistent answer-solving discipline with topic-wise PYQs, elimination workshops, and syllabus trackers.
                  </p>
                  <Link
                    to={ROUTES.COURSE.COURSE}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
                  >
                    <span>Explore Prelims Victory Courses</span>
                    <LuArrowRight className="text-sm" />
                  </Link>
                </section>

                {/* 3. Browse Questions by Subject Card */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-sm font-bold text-[#14213D]">Questions by Subject</h3>
                      <p className="text-[11px] text-gray-500">Fast switch within {selectedYear}</p>
                    </div>
                    <LuLayers className="text-lg text-orange-500" />
                  </div>

                  <div className="relative">
                    <LuSearch className="pointer-events-none absolute left-3 top-2.5 text-sm text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter subjects..."
                      value={sidebarSubjectSearch}
                      onChange={(e) => setSidebarSubjectSearch(e.target.value)}
                      className="min-h-9 w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs text-[#14213D] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {filteredSidebarSubjects.map((sub) => {
                      const subSlug = sub.slug || toSlug(sub.name);
                      const isSelected = selectedSubjectDoc?.id === sub.id || selectedSubjectSlug === subSlug;
                      return (
                        <button
                          key={sub.name}
                          onClick={() => navigateToSlug(selectedYear, selectedPaper, subSlug)}
                          className={`min-h-14 p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                            isSelected
                              ? "border-primary bg-blue-50 text-primary font-bold shadow-2xs"
                              : "border-gray-200 bg-gray-50/60 hover:bg-blue-50/40 hover:border-gray-300 text-gray-800"
                          }`}
                        >
                          <span className="text-[11px] font-semibold line-clamp-1">{sub.name}</span>
                          <span className="text-[10px] text-gray-500">{sub.count} Qs</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => navigateToSlug(selectedYear, selectedPaper, "all")}
                    className="w-full text-center text-xs font-bold text-primary hover:underline pt-1"
                  >
                    View All Subjects in {selectedYear} ➔
                  </button>
                </section>

                {/* 4. Download PYQs Card */}
                {/* <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-sm font-bold text-[#14213D]">Download Prelims PYQs</h3>
                    <LuDownload className="text-lg text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Keep latest official question papers and answer keys handy for offline preparation.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-primary bg-white text-xs font-bold text-primary hover:bg-blue-50 transition"
                  >
                    <LuDownload className="text-sm" />
                    <span>Download / Print Questions</span>
                  </button>
                </section> */}

                {/* 5. Need Help Card */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <LuSparkles className="text-base text-orange-500" />
                    <span>Need Guidance?</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Ask an Achiwon mentor how to approach conceptual traps in {selectedSubjectName}.
                  </p>
                  <Link
                    to={ROUTES.HELP_SUPPORT.ABOUT_US}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1"
                  >
                    <span>Connect with Achiwon Mentors ➔</span>
                  </Link>
                </section>
              </aside>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BOTTOM FULL-WIDTH BANNER (frame-6ace124478b5d5ef3297a1b8 (1)) */}
        {/* ============================================================== */}
        <section className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#0D3166] text-white p-6 sm:p-9 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400 backdrop-blur-xs">
                <LuTrophy className="text-3xl" />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-white">
                  Crack UPSC Prelims with Achiwon Smart Test Series
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-blue-100/90 max-w-xl leading-relaxed">
                  Join thousands of serious aspirants practising timed question banks, elimination workshops, and AI-driven mock analyses.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to={ROUTES.MOCK_TEST.INTRO}
                className="min-h-11 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition shadow-md"
              >
                Start Free Mock Test
              </Link>
              <Link
                to={ROUTES.COURSE.COURSE}
                className="min-h-11 px-5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FAQS ACCORDION SECTION                                         */}
        {/* ============================================================== */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">COMMON QUERIES</p>
            <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-[#14213D]">
              Frequently Asked Questions (PYQs)
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Everything you need to know about preparing with UPSC Prelims previous year questions.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="overflow-hidden rounded-xl border border-gray-200 transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-xs sm:text-sm text-[#14213D] hover:bg-gray-50 transition"
                  >
                    <span>{faq.question}</span>
                    <LuChevronDown
                      className={`text-base text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PyqPage;
