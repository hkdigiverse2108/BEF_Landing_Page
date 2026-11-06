import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { FaRegCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import Seo from "../../Components/Common/Seo";
import { ImagePath, ROUTES } from "../../Constants";
import { InstructionButtons } from "../../Data";
// Preserved tabbed screen (kept available as requested, not deleted)
import { ExamInstructionScreen } from "../../Components/Exam/ExamInstructionScreen";

const MockTestInstructionPage = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<"English" | "Hindi">("English");

  const handleStartExam = (lang: "English" | "Hindi" = selectedLang) => {
    const langKey = lang === "Hindi" ? "hindiQuestion" : "englishQuestion";
    sessionStorage.setItem("mock_test_lang", langKey);
    navigate(ROUTES.MOCK_TEST.TEST);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <Seo
        title="UPSC Mock Test Instructions – Exam Guidelines"
        description="Read the UPSC mock test instructions to understand the test rules, duration, and guidelines before starting your test."
      />

      {/* Top Floating Action Header Bar */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-30 shadow-xs">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={ROUTES.HOME} className="flex flex-col items-start justify-center leading-none" title="Achiwon Home">
              <img src={`${ImagePath}logo/logo.png`} alt="Achiwon" className="h-6 sm:h-7 w-auto object-contain" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#f48224] tracking-wider leading-none mt-1">
                UPSC &amp; GPSC CSE
              </span>
            </Link>
          </div>
          <Link
            to={ROUTES.MOCK_TEST.INTRO}
            className="text-xs sm:text-sm font-semibold text-[#124699] hover:text-[#f48224] transition-colors flex items-center gap-1.5"
          >
            <IoMdArrowRoundBack /> Back to Test Intro
          </Link>
        </div>
      </header>

      {/* Main Single-Page Instruction Content */}
      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-8 py-8">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 sm:p-8 md:p-10 shadow-xs">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.MOCK_TEST.INTRO)}
              aria-label="Go back"
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f6fd] text-[#124699] transition-all duration-300 hover:border hover:border-[#f48224] hover:text-[#f48224] cursor-pointer"
            >
              <IoMdArrowRoundBack className="text-lg" />
            </button>
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-1.5 h-6 rounded-full bg-[#124699] shrink-0" />
              <div className="min-w-0">
                <h1 className="capitalize font-bold text-lg sm:text-2xl text-gray-900 truncate">
                  Free Mock Test Instructions
                </h1>
              </div>
            </div>
          </div>
          <hr className="border-[#e2e8f0] my-5" />

          <div className="flex flex-col gap-10 mt-6">
            {/* 1. True/False Statement Labeling */}
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
                1. Practice Actively Label Each Statement True Or False!
              </h2>
              <div className="grid grid-cols-1 2xl:grid-cols-2">
                <div className="border border-[#e2e8f0] p-4 shadow-xs rounded-xl flex max-sm:flex-col justify-center items-center w-full gap-3 bg-[#f8fafc]">
                  <span className="flex-1 font-medium text-gray-800 text-sm sm:text-base">
                    1. Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1
                  </span>
                  <div className="flex justify-end max-sm:w-full items-center">
                    <Tooltip title={<span className="text-gray-900 font-medium">Click if statement is True</span>} color="#dcfce7" open placement="left" zIndex={40}>
                      <CheckCircleFilled style={{ color: "#F48224", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition" />
                    </Tooltip>
                    <Tooltip title={<span className="text-gray-900 font-medium">Click if statement is False</span>} color="#ffe2e2" open placement="bottom" zIndex={40}>
                      <CloseCircleFilled style={{ color: "red", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <span className="border-t border-[#e2e8f0] flex w-full" />

            {/* 2. Option Elimination */}
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
                2. Improve accuracy : use the elimination icon for 50-50 or 33-33-33!
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="border border-[#e2e8f0] p-4 shadow-xs rounded-xl flex max-sm:flex-col justify-center items-center w-full gap-3 bg-[#f8fafc]">
                  <div className="flex items-center w-full">
                    <FaRegCircle style={{ color: "gray" }} className="shrink-0" />
                    <span className="flex-1 font-medium px-2 text-gray-800 text-sm sm:text-base">
                      Both Statement-1 and statement-2 are correct and Statement-2 explains Statement-1
                    </span>
                    <Tooltip title={<span className="text-gray-900 font-medium">Click if you want to eliminate option</span>} color="#ffe2e2" open zIndex={40}>
                      <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} className="px-2 cursor-pointer hover:scale-110 transition shrink-0" />
                    </Tooltip>
                  </div>
                </div>
                <div className="border border-red-500 bg-red-50 p-4 shadow-xs rounded-xl flex max-sm:flex-col justify-center items-center w-full gap-3">
                  <div className="flex items-center w-full">
                    <FaRegCircle style={{ color: "gray" }} className="shrink-0" />
                    <span className="flex-1 font-medium px-2 text-red-600 line-through text-sm sm:text-base">
                      Statement-1 is incorrect, but statement-2 is correct
                    </span>
                    <CloseCircleFilled style={{ color: "red", fontSize: "18px" }} className="px-2 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            <span className="border-t border-[#e2e8f0] flex w-full" />

            {/* 3. Button Actions Explained */}
            <div className="min-h-48">
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
                3. Strategize Your Answers: Button Actions Explained
              </h2>
              <div className="flex justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {InstructionButtons?.map((btn, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        className={`w-auto shrink-0 whitespace-nowrap flex items-center justify-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-4 text-xs sm:text-sm font-semibold text-white rounded-xl shadow-md transition-all duration-200 hover:scale-105 ${btn.color}`}
                      >
                        <span className="shrink-0 text-base">{btn.icon}</span>
                        <span className="whitespace-nowrap">{btn.label}</span>
                      </button>
                      <div className="w-full sm:flex-1 relative bg-[#f1f6fd] p-3 sm:p-3.5 rounded-xl shadow-xs border border-[#e2e8f0]">
                        <div className="absolute block w-3.5 h-3.5 bg-[#f1f6fd] rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 border-t border-r sm:border-r-0 sm:border-l border-[#e2e8f0]" />
                        <p className="text-xs sm:text-sm text-gray-800 text-center sm:text-left leading-relaxed m-0">
                          {btn.tooltipLabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className="border-t border-[#e2e8f0] flex w-full" />

            {/* 4. 2X Stakes */}
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
                4. "2X The Stakes, 2X The Thrill!"
              </h2>
              <div className="pt-2 flex items-center gap-3">
                <div className="flex max-sm:flex-col items-center gap-5">
                  <Badge count={"2X"} color="#124699">
                    <div className="text-sm py-2 px-4 bg-[#f1f6fd] border border-[#e2e8f0] rounded-xl shadow-xs">
                      <span className="font-bold text-gray-900 rounded">Question : 01</span>
                    </div>
                  </Badge>
                  <div className="sm:col-span-2 relative bg-[#f1f6fd] p-3.5 rounded-xl shadow-xs border border-[#e2e8f0]">
                    <div className="absolute block w-3.5 h-3.5 bg-[#f1f6fd] rotate-45 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-0 sm:-translate-x-1/2 sm:-translate-y-1/2 border-t border-r sm:border-r-0 sm:border-l border-[#e2e8f0]" />
                    <p className="text-xs sm:text-sm text-gray-800 text-center sm:text-left leading-relaxed">
                      Answer correctly: Earn double marks. Answer wrong: Lose double marks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <span className="border-t border-[#e2e8f0] flex w-full" />

            {/* 5. You Can Change Language */}
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-4">
                5. You Can Change Language
              </h2>
              <div className="flex items-center gap-5 flex-wrap pt-3">
                <Tooltip
                  title={<span className="text-gray-900 font-medium">English / Hindi</span>}
                  color="#ffe2e2"
                  open
                  placement="top"
                  zIndex={40}
                >
                  <span className="text-sm font-semibold flex flex-nowrap gap-2 items-center text-gray-900 cursor-default">
                    <IoLanguage className="text-xl text-[#124699]" />
                    Language
                  </span>
                </Tooltip>
                <div className="inline-flex rounded-xl p-1 bg-[#f1f6fd] border border-[#e2e8f0] gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedLang("English")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedLang === "English"
                        ? "bg-[#124699] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLang("Hindi")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedLang === "Hindi"
                        ? "bg-[#124699] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Hindi
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full flex justify-end mt-10 pt-6 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={() => handleStartExam(selectedLang)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#124699] hover:bg-[#1a55b3] text-white font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Start Free Mock Test →
            </button>
          </div>

          {/* Hidden reference to preserve ExamInstructionScreen import */}
          <div style={{ display: "none" }} aria-hidden="true">
            <ExamInstructionScreen showHeader={false} showFooter={false} showStrip={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockTestInstructionPage;
