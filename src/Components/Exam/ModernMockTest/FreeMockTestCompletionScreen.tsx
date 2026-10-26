import React, { useState } from "react";
import {
  LuSparkles,
  LuTrophy,
  LuArrowRight,
  LuX,
} from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { CONTACT } from "../../../Data";
import ModernVideoPlayer from "../../Common/ModernVideoPlayer";
import { REPORT_VIDEOS } from "../../../Constants/reportVideosData";

export interface FreeMockTestCompletionScreenProps {
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  earnedDiscount?: number;
  onReviewSolutions: () => void;
  onRestartTest?: () => void;
  onEnrollCourse: () => void;
}

export const FreeMockTestCompletionScreen: React.FC<
  FreeMockTestCompletionScreenProps
> = ({
  score,
  totalMarks,
  correctCount,
  incorrectCount,
  unattemptedCount,
  earnedDiscount = 0,
  onReviewSolutions,
  onEnrollCourse,
}) => {
  const [activeTab, setActiveTab] = useState<
    "ai" | "summary" | "compare" | "elimination" | "solution" | "mistakemap"
  >("ai");
  const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Achiwon Team! I completed the Free Practice Test with Score: ${score.toFixed(
      2
    )} / ${totalMarks}.${
      earnedDiscount > 0
        ? ` I unlocked ₹${earnedDiscount.toLocaleString()} Score Merit Discount on courses!`
        : ""
    } Please guide me for course admissions.`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${
    CONTACT?.NUMBER || "919999999999"
  }&text=${whatsappMessage}`;

  return (
    <div className="free-test-completion-page">
      <main className="free-test-hero">
        {/* Left Side: Copy & Performance Report */}
        <section className="free-test-copy">
          <div className="free-test-eyebrow">
            <span className="free-test-eyebrow-dot" />
            <span>Free UPSC Mock Test · Completed</span>
          </div>

          <h1>
            Prepare smarter.
            <br />
            Practice with <span className="accent">purpose.</span>
          </h1>

          <p className="free-test-lead">
            Experience the UPSC Prelims test interface, practise your answer
            strategy, and discover where to focus next — all with a free mock test.
          </p>

          {/* Performance Summary Banner */}
          <div className="free-test-score-banner">
            <div className="free-test-score-stat">
              <b className="text-[#124699]">{score.toFixed(2)}</b>
              <span>Score / {totalMarks}</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#16A34A]">{correctCount}</b>
              <span>Correct</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#EF4444]">{incorrectCount}</b>
              <span>Incorrect</span>
            </div>
            <div className="free-test-score-stat">
              <b className="text-[#64748B]">{unattemptedCount}</b>
              <span>Skipped</span>
            </div>
          </div>

          {/* Unlocked Discount Badge if earned */}
          {earnedDiscount > 0 && (
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#F48224]/30 bg-[#FFF7ED] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#C2410C] shadow-2xs">
              <LuSparkles className="text-base text-[#F48224] shrink-0" />
              <span>
                Merit Reward Unlocked: You earned{" "}
                <strong className="text-[#EA580C]">
                  ₹{earnedDiscount.toLocaleString()} OFF
                </strong>{" "}
                on full course enrollment!
              </span>
            </div>
          )}

          {/* 5 Interactive Report Tabs from Achiwon_Free_UPSC_Test_Landing_Page_Animated */}
          <div className="report-tabs" aria-label="Performance report features">
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
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
              className={`report-tab report-elimination ${
                activeTab === "elimination" ? "report-active" : ""
              }`}
            >
              <span className="report-icon">⚠</span>
              <span>Elimination Skill Report</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("solution");
                onReviewSolutions();
              }}
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
                📊 <strong>Summary Report:</strong> You answered{" "}
                <strong>{correctCount}</strong> correctly with a net score of{" "}
                <strong>{score.toFixed(2)}</strong>. Review your performance
                breakdown anytime.
              </p>
            )}
            {activeTab === "compare" && (
              <p>
                🏆 <strong>Competitor Benchmarking:</strong> Compare your time
                taken per question against the top 10% UPSC CSE qualifiers.
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
                📖 <strong>View Solution:</strong> Click "View Solution" or the
                button below to examine comprehensive Hindi &amp; English
                explanations for every statement.
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
              onClick={onReviewSolutions}
              className="free-test-btn free-test-btn-primary"
            >
              <span>View Solutions</span>
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

            {/* <button
              type="button"
              onClick={onRestartTest}
              className="free-test-btn border border-[#CBD5E1] bg-white text-[#1E293B] hover:bg-[#F8FAFC]"
              title="Retake the practice test"
            >
              <LuRotateCcw className="text-sm" />
              <span>Retake Test</span>
            </button> */}
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
                onClick={onReviewSolutions}
                title="Review solutions"
              >
                Review Solutions ↗
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

          <div className="visual-caption">
            <span className="caption-line" />
            <span>A quick preview before your next step</span>
            <span className="caption-line" />
          </div>

          {/* Discipline Bond Refund Card */}
          <div className="bond-card">
            <div className="bond-icon" aria-hidden="true">
              ↗
            </div>
            <div className="bond-content">
              <div className="bond-title">Discipline Bond Refund</div>
              <div className="bond-copy">
                The Discipline Bond is <strong>refundable</strong> if the
                student <strong>regularly attends</strong> the lectures and
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
              Congratulations on completing the Free Mock Test! Get personalized
              faculty mentorship, daily mains answer writing feedback, and full
              test series coverage.
            </p>

            {earnedDiscount > 0 && (
              <div className="mt-4 rounded-xl border border-[#F48224]/30 bg-[#FFF7ED] p-3 text-xs font-bold text-[#C2410C]">
                🎉 ₹{earnedDiscount.toLocaleString()} Score Merit Discount has
                been saved to your session!
              </div>
            )}

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
