import React, { useState, useMemo } from "react";
import {
  LuTrophy,
  LuArrowRight,
  LuX,
} from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { CONTACT } from "../../../Data";
import { getActiveSessionMockTestSet } from "./mockQuestionsData";
import ModernVideoPlayer from "../../Common/ModernVideoPlayer";
import { REPORT_VIDEOS } from "../../../Constants/reportVideosData";

export interface FreeMockTestIntroScreenProps {
  onStartTest: () => void;
  onEnrollCourse: () => void;
}

export const FreeMockTestIntroScreen: React.FC<FreeMockTestIntroScreenProps> = ({
  onStartTest,
  onEnrollCourse,
}) => {
  const activeSet = useMemo(() => getActiveSessionMockTestSet(), []);
  const qCount = activeSet?.totalQuestions || 12;
  const marksCount = activeSet?.totalMarks || 24;
  const minsCount = Math.round((activeSet?.durationSeconds || 900) / 60);

  const [activeTab, setActiveTab] = useState<
    "ai" | "summary" | "compare" | "elimination" | "solution" | "mistakemap"
  >("ai");
  const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Achiwon Team! I want to enroll in the UPSC Prelims Course. Please guide me for course admissions."
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${
    CONTACT?.NUMBER || "919999999999"
  }&text=${whatsappMessage}`;

  return (
    <div className="free-test-completion-page">
      {/* Top Floating Action Header Bar with Right-Side Free Mock Test CTA */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 pt-5 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#124699]">
            ACHIWON <span className="text-[#f48224]">UPSC CSE</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#64748b] bg-[#eef4ff] px-2.5 py-0.5 rounded-full border border-[#d6e4ff]">
            All India Free Mock Fest · {activeSet?.shortTitle || "PYQs & Clones"}
          </span>
        </div>
        <button
          type="button"
          onClick={onStartTest}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#124699] to-[#2563EB] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:from-[#0E3A7E] hover:to-[#1D4ED8] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          title="Start Free Mock Test"
        >
          <span>Free Mock Test</span>
          <span className="text-base leading-none font-black">→</span>
        </button>
      </div>

      <main className="free-test-hero">
        {/* Left Side: Copy & Performance Report Features */}
        <section className="free-test-copy">
          <div className="free-test-eyebrow">
            <span className="free-test-eyebrow-dot" />
            <span>Free UPSC Mock Test · {activeSet?.shortTitle || "Live Now"}</span>
          </div>

          <h1>
            Prepare smarter.
            <br />
            Practice with <span className="accent">purpose.</span>
          </h1>

          <p className="free-test-lead">
            Experience the UPSC Prelims test interface, practise your answer
            strategy, and discover where to focus next — all with our free mock test series.
          </p>

          {/* Test Highlights Banner */}
          <div className="free-test-score-banner">
            <div className="free-test-score-stat">
              <b className="text-[#124699]">{qCount}</b>
              <span>Questions</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#16A34A]">{marksCount}</b>
              <span>Marks</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#F48224]">{minsCount}</b>
              <span>Minutes</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#64748B]">AI</b>
              <span>Report</span>
            </div>
          </div>

          {/* 5 Interactive Report Tabs from Achiwon_Free_UPSC_Test_Landing_Page_Animated */}
          <div className="report-tabs" aria-label="Performance report features">
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              onMouseEnter={() => setActiveTab("ai")}
              className={`report-tab report-ai ${
                activeTab === "ai" ? "report-active" : ""
              }`}
            >
              <span className="report-icon">↗</span>
              <span>AI Powered Report Analysis</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("summary")}
              onMouseEnter={() => setActiveTab("summary")}
              className={`report-tab report-summary ${
                activeTab === "summary" ? "report-active" : ""
              }`}
            >
              <span className="report-icon">▤</span>
              <span>Summary</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("compare")}
              onMouseEnter={() => setActiveTab("compare")}
              className={`report-tab report-compare ${
                activeTab === "compare" ? "report-active" : ""
              }`}
            >
              <span className="report-icon">▧</span>
              <span>Compare Competitor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("elimination")}
              onMouseEnter={() => setActiveTab("elimination")}
              className={`report-tab report-elimination ${
                activeTab === "elimination" ? "report-active" : ""
              }`}
            >
              <span className="report-icon">⚠</span>
              <span>Elimination Skill Report</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("solution")}
              onMouseEnter={() => setActiveTab("solution")}
              className={`report-tab report-solution ${
                activeTab === "solution" ? "report-active" : ""
              }`}
              title="Click to view question-by-question solutions"
            >
              <span className="report-icon">📖</span>
              <span>View Solution</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("mistakemap")}
              onMouseEnter={() => setActiveTab("mistakemap")}
              className={`report-tab report-mistakemap ${
                activeTab === "mistakemap" ? "report-active" : ""
              }`}
              title="Click to view Mistake Map Diagnostic Report"
            >
              <span className="report-icon">🗺</span>
              <span>Mistake Map Report</span>
            </button>
          </div>

          {/* Active Feature Context Insight */}
          <div className="mb-6 rounded-xl border border-[#E2E8F0] bg-white/80 p-3.5 text-xs text-[#475569] shadow-2xs">
            {activeTab === "ai" && (
              <p>
                💡 <strong>AI Analysis:</strong> Your conceptual accuracy and
                guesswork precision are analyzed across difficulty levels to
                identify your exact UPSC Prelims strengths.
              </p>
            )}
            {activeTab === "summary" && (
              <p>
                📊 <strong>Summary Report:</strong> Get instant subject-wise and
                strategy-wise performance breakdowns categorized into Very Weak,
                Weak, Average, Strong, and Very Strong.
              </p>
            )}
            {activeTab === "compare" && (
              <p>
                🏆 <strong>Competitor Benchmarking:</strong> Compare your speed,
                accuracy, and score distribution directly against top 10% UPSC CSE qualifiers.
              </p>
            )}
            {activeTab === "elimination" && (
              <p>
                🎯 <strong>Elimination Skill Report:</strong> Evaluates your 50-50
                and option-elimination strategies so you gain +10 to +15 extra
                marks in prelims.
              </p>
            )}
            {activeTab === "solution" && (
              <p>
                📖 <strong>View Solution:</strong> Examine comprehensive Hindi &amp;
                English explanations for every question after completing the test.
              </p>
            )}
            {activeTab === "mistakemap" && (
              <p>
                🗺️ <strong>Mistake Map Report:</strong> Classify every negative mark into
                Concept, Elimination, Silly, or Overthinking errors to permanently eliminate repeat
                blunders in UPSC Prelims.
              </p>
            )}
          </div>

          {/* CTA Row */}
          <div className="free-test-cta-row">
            <button
              type="button"
              onClick={onStartTest}
              className="free-test-btn free-test-btn-primary"
            >
              <span>Start Free Test</span>
              <span className="text-base leading-none">→</span>
            </button>

            <button
              type="button"
              onClick={() => setEnrollModalOpen(true)}
              className="free-test-btn free-test-btn-enroll"
            >
              <span>Enroll Full Course</span>
              <span className="text-base leading-none">↗</span>
            </button>
          </div>

          <div className="free-test-benefit-note">
            <span className="free-test-check-icon">✓</span>
            <span>Free to attempt · Detailed performance analysis included</span>
          </div>
        </section>

        {/* Right Side: Visual Video Column & Discipline Bond Card */}
        <section
          className="free-test-visual-column"
          aria-label="UPSC test video tutorial"
        >
          <div className="video-shell overflow-hidden rounded-3xl">
            <ModernVideoPlayer
              key={activeTab}
              src={REPORT_VIDEOS[activeTab]?.src || "/videos/report/ai-powered.mp4"}
              title={REPORT_VIDEOS[activeTab]?.title || "UPSC Mock Test Walkthrough"}
              subtitle={REPORT_VIDEOS[activeTab]?.subtitle || "See how the test works, learn option elimination, and master your prelims strategy."}
              badge={REPORT_VIDEOS[activeTab]?.badge}
              bannerMode={false}
            />

            <div className="video-meta">
              <div className="video-meta-left">
                <span className="live-dot" />
                <span>{REPORT_VIDEOS[activeTab]?.title || "Test interface walkthrough"}</span>
              </div>
              <button
                className="video-action"
                type="button"
                onClick={onStartTest}
                title="Skip directly to instructions"
              >
                Skip Intro ↗
              </button>
            </div>
          </div>

          {/* Dynamic Walkthrough Highlights for Active Tab */}
          {REPORT_VIDEOS[activeTab]?.points && REPORT_VIDEOS[activeTab].points.length > 0 && (
            <div className="mt-3 rounded-2xl border border-[#E2E8F0] bg-white/95 p-3.5 shadow-2xs">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#124699] mb-1.5 flex items-center gap-1.5">
                <span>✦</span>
                <span>{REPORT_VIDEOS[activeTab]?.badge || "Report Highlights"}</span>
              </div>
              <ul className="space-y-1 text-xs text-[#475569]">
                {REPORT_VIDEOS[activeTab].points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#10B981] font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="free-test-visual-caption">
            <span className="free-test-caption-line" />
            <span>A quick preview before your first question</span>
            <span className="free-test-caption-line" />
          </div>

          <div className="free-test-bond-card">
            <div className="free-test-bond-icon">↗</div>
            <div className="free-test-bond-content">
              <div className="free-test-bond-title">Discipline Bond Refund</div>
              <div className="free-test-bond-text">
                The Discipline Bond is{" "}
                <span className="free-test-bond-badge">refundable</span> if the student{" "}
                <span className="free-test-bond-badge">regularly attends</span> the lectures and
                tests in the course.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enroll Full Course Modal */}
      {isEnrollModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2 text-[#124699]">
                <LuTrophy className="text-xl text-[#F48224]" />
                <h3 className="font-extrabold text-lg text-[#0F172A]">
                  Enroll in the Full Course
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnrollModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#475569]">
              Get personalized faculty mentorship, daily mains answer writing feedback, and full test series coverage.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setEnrollModalOpen(false);
                  onEnrollCourse();
                }}
                className="free-test-btn free-test-btn-enroll w-full"
              >
                <span>Continue to Course Admission</span>
                <LuArrowRight className="text-base" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-50 text-xs sm:text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
              >
                <IoLogoWhatsapp className="text-lg text-emerald-600" />
                <span>Chat on WhatsApp for Counselors</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeMockTestIntroScreen;
