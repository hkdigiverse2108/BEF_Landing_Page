import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { MockTestHeader } from "./MockTestHeader";
import {
  MockTestQuestionView,
  type UserQuestionAnswerState,
} from "./MockTestQuestionView";
import { MockTestPalette, type QuestionStatus } from "./MockTestPalette";
import { MockTestInstructionsModal } from "./MockTestInstructionsModal";
import { MockTestSubmissionDrawer, type MockTestStats } from "./MockTestSubmissionDrawer";
import { MockTestResultModal } from "./MockTestResultModal";
import { MockTestLeadModal } from "./MockTestLeadModal";
import { FinalReportScreen } from "./FinalReportScreen";
import {
  type BackendQuestionItem,
  type LanguageKey,
  FALLBACK_BACKEND_QUESTIONS,
  getActiveSessionMockTestSet,
  resetSessionMockTestSet,
} from "./mockQuestionsData";
import { ROUTES, URL_KEYS } from "../../../Constants";
import { useGetApiQuery, usePostApiMutation } from "../../../Api/CommonApi";
import {
  matchScoreDiscount,
  saveMockTestReward,
  clearMockTestReward,
  isLastPrelimsCourse,
  type DiscountTier,
} from "../../../Utils/mockTestReward";
import { LuPanelRightOpen } from "react-icons/lu";
import "./ModernMockTest.css";

interface FreePracticeTestProps {
  customQuestions?: BackendQuestionItem[];
  seriesTitle?: string;
  subjectTitle?: string;
  initialDurationSeconds?: number;
  onFinishRedirect?: string;
  initialLanguage?: LanguageKey;
}

export const FreePracticeTest: React.FC<FreePracticeTestProps> = ({
  customQuestions,
  seriesTitle = "Achiwon mock series",
  subjectTitle = "UPSC Multi-Subject Prelims",
  initialDurationSeconds = 600, // 10 minutes default
  onFinishRedirect = ROUTES.COURSE.COURSE,
  initialLanguage = "englishQuestion",
}) => {
  const navigate = useNavigate();

  // Active Mock Test Set (picks Set 1 or randomly from available sets)
  const activeSet = useMemo(() => getActiveSessionMockTestSet(), []);

  // Questions: statically curated from activeSet (or customQuestions override)
  const questions: BackendQuestionItem[] = useMemo(() => {
    if (customQuestions && customQuestions.length > 0) return customQuestions;
    if (activeSet?.questions && activeSet.questions.length > 0) return activeSet.questions;
    return FALLBACK_BACKEND_QUESTIONS;
  }, [customQuestions, activeSet]);

  const totalQuestions = questions.length;
  const effectiveSeriesTitle =
    seriesTitle !== "Achiwon mock series" ? seriesTitle : (activeSet?.seriesTitle || seriesTitle);
  const effectiveSubjectTitle =
    subjectTitle !== "UPSC Multi-Subject Prelims" ? subjectTitle : (activeSet?.subjectTitle || subjectTitle);
  const effectiveDurationSeconds =
    initialDurationSeconds !== 600 ? initialDurationSeconds : (activeSet?.durationSeconds || 900);

  // Dynamic Settings from Admin Panel
  const { data: settingApi } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const settings = settingApi?.data;

  // Language state (English / Hindi toggle like in BEF_APP_WEB)
  const [language, setLanguage] = useState<LanguageKey>(initialLanguage);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersState, setAnswersState] = useState<Record<number, UserQuestionAnswerState>>({});
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set([0]));
  const [secondsRemaining, setSecondsRemaining] = useState(effectiveDurationSeconds);

  // Ant Design message hook & inline validation state
  const [, contextHolder] = message.useMessage();
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  // Modals & Drawers state
  const [isInstructionsOpen, setInstructionsOpen] = useState(false);
  const [isEndTestDrawerOpen, setEndTestDrawerOpen] = useState(false);
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState<{ name: string; phone: string; email?: string } | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [isPaletteCollapsed, setPaletteCollapsed] = useState(false);
  const [hasFinishedTest, setHasFinishedTest] = useState(false);

  // Backend Mutation for Lead Recording
  const [submitMockTestLead, { isLoading: isSubmittingLead }] = usePostApiMutation();

  // Format countdown hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // Mark index as visited on change
  const handleSelectQuestion = (index: number) => {
    setValidationWarning(null);
    setCurrentIndex(index);
    setVisitedIndices((prev) => new Set(prev).add(index));
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const currentAns = answersState[currentIndex];
    const isSkipStrategy =
      currentAns?.strategy === "skip" || currentAns?.strategy === "fearDriverSkip";

    const hasValidOption =
      Boolean(currentAns?.selectedOption) &&
      !currentAns?.excludedOptions?.[currentAns.selectedOption!];

    const hasStrategy = Boolean(currentAns?.strategy);

    if (!isSkipStrategy) {
      if (!hasValidOption || !hasStrategy) {
        let warningText = "";
        if (!hasValidOption) {
          warningText = "Please choose any one option";
        } else {
          warningText = "Please select strategy";
        }
        setValidationWarning(warningText);
        return;
      }
    }

    setValidationWarning(null);
    if (currentIndex < totalQuestions - 1) {
      handleSelectQuestion(currentIndex + 1);
    } else {
      setEndTestDrawerOpen(true);
    }
  };

  const handlePrev = () => {
    setValidationWarning(null);
    if (currentIndex > 0) {
      handleSelectQuestion(currentIndex - 1);
    }
  };

  const handleUpdateCurrentAnswer = (updated: Partial<UserQuestionAnswerState>) => {
    setValidationWarning(null);
    setAnswersState((prev) => {
      const current = prev[currentIndex] || {
        statementJudgments: {},
        excludedOptions: {},
      };
      return {
        ...prev,
        [currentIndex]: {
          ...current,
          ...updated,
        },
      };
    });
  };

  // Compute status for all questions
  const questionStatuses: Record<number, QuestionStatus> = {};
  const markedIndices = new Set<number>();

  for (let i = 0; i < totalQuestions; i++) {
    const ans = answersState[i];

    const isSkip = ans?.strategy === "skip" || ans?.strategy === "fearDriverSkip";
    const hasOption = Boolean(ans?.selectedOption && !ans?.excludedOptions?.[ans.selectedOption]);
    const isMarked = Boolean(ans?.isMarked);

    if (isMarked) {
      markedIndices.add(i);
    }

    if (isSkip) {
      questionStatuses[i] = "skipped";
    } else if (isMarked) {
      questionStatuses[i] = "marked";
    } else if (hasOption) {
      questionStatuses[i] = "answered";
    } else {
      questionStatuses[i] = "notVisited";
    }
  }

  // Calculate stats for Drawer
  let answeredCount = 0;
  let markedCount = 0;
  let skippedCount = 0;
  let unansweredCount = 0;
  let notVisitedCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const status = questionStatuses[i];
    const isMarked = markedIndices.has(i);

    if (status === "answered") answeredCount++;
    if (status === "skipped") skippedCount++;
    if (isMarked) markedCount++;

    if (status !== "answered" && status !== "skipped" && !isMarked) {
      if (visitedIndices.has(i)) unansweredCount++;
      else notVisitedCount++;
    }
  }

  const drawerStats: MockTestStats = {
    total: totalQuestions,
    answered: answeredCount,
    unanswered: unansweredCount,
    notVisited: notVisitedCount,
    skip: skippedCount,
    marked: markedCount,
  };

  // Calculate final score
  let correctCount = 0;
  let incorrectCount = 0;
  let calculatedScore = 0;
  const totalPossibleMarks = questions.reduce(
    (acc, q) => acc + (q.positiveMarks ?? 2),
    0
  );

  questions.forEach((q, idx) => {
    const userAns = answersState[idx]?.selectedOption;
    if (userAns) {
      const correctAns =
        q[language]?.answer ||
        q.englishQuestion?.answer ||
        q.hindiQuestion?.answer ||
        (q as any).correctOption ||
        (q as any).answer;

      const posMarks = q.positiveMarks ?? 2;
      const negMarks = q.negativeMarks ?? 0.67;

      if (userAns === correctAns) {
        correctCount++;
        calculatedScore += posMarks;
      } else {
        incorrectCount++;
        calculatedScore -= negMarks;
      }
    }
  });

  const unattempted = totalQuestions - (correctCount + incorrectCount);

  const discountTiers: DiscountTier[] = settings?.mockTestDiscountTiers || [];
  const earnedDiscount = matchScoreDiscount(calculatedScore, discountTiers);

  // Lead Submission & Test Finalization
  const handleLeadSubmit = async (lead: { name: string; phone: string; email?: string }) => {
    setCandidateInfo(lead);
    const timeTaken = Math.max(0, effectiveDurationSeconds - secondsRemaining);
    const percentage = totalPossibleMarks > 0 ? Math.round((calculatedScore / totalPossibleMarks) * 100) : 0;
    const attempted = correctCount + incorrectCount;
    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;

    const payload = {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || undefined,
      score: calculatedScore,
      totalMarks: totalPossibleMarks,
      totalQuestions,
      correctCount,
      incorrectCount,
      unattemptedCount: unattempted,
      timeTakenSeconds: timeTaken,
      earnedDiscount,
      percentage,
      accuracy,
      subjectTitle: typeof currentSubject === "string" ? currentSubject : effectiveSubjectTitle,
      seriesTitle: effectiveSeriesTitle,
    };

    try {
      await submitMockTestLead({
        url: URL_KEYS.MOCK_TEST.SUBMIT,
        data: payload,
      }).unwrap();
    } catch (err) {
      console.error("Mock test lead submission API error:", err);
    }

    setLeadModalOpen(false);
    setHasFinishedTest(true);

    const resultData = {
      ...payload,
      candidateName: lead.name,
      candidatePhone: lead.phone,
      candidateEmail: lead.email,
      setId: activeSet?.id,
      setTitle: activeSet?.title,
      questions,
      answersState,
    };

    try {
      sessionStorage.setItem("mock_test_latest_result", JSON.stringify(resultData));
    } catch (e) {}

    if (earnedDiscount > 0) {
      saveMockTestReward({
        score: calculatedScore,
        totalMarks: totalPossibleMarks,
        scoreDiscount: earnedDiscount,
        active: true,
        timestamp: Date.now(),
      });
    } else {
      clearMockTestReward();
    }

    navigate(ROUTES.MOCK_TEST.ANALYSIS);
  };

  // Countdown timer: 10 minutes (600 seconds) - automatically triggers lead modal when reaching 0
  useEffect(() => {
    if (hasFinishedTest || isResultModalOpen || isLeadModalOpen) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          setEndTestDrawerOpen(false);
          setIsTimeUp(true);
          setLeadModalOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasFinishedTest, isResultModalOpen, isLeadModalOpen]);

  const handleConfirmEndTest = () => {
    setEndTestDrawerOpen(false);
    setIsTimeUp(false);
    setLeadModalOpen(true);
  };


  // Once played, taking another test resets to a fresh random set from available sets
  const handleRestartTest = () => {
    resetSessionMockTestSet();
    try {
      sessionStorage.removeItem("mock_test_latest_result");
    } catch (e) {}
    window.location.reload();
  };

  // Fetch courses to find Last Prelims course
  const { data: coursesListData } = useGetApiQuery({ url: URL_KEYS.COURSE.ALL });
  const apiCourses: any[] = coursesListData?.data?.course_data || [];
  const lastPrelimsCourse = apiCourses.find((c) => isLastPrelimsCourse(c));
  const lastPrelimsTarget = lastPrelimsCourse?._id
    ? ROUTES.COURSE.DETAILS.replace(":id", lastPrelimsCourse._id)
    : onFinishRedirect || "/course/details/690ccd4aafdfb3c841183295";

  const handleEnrollCourse = () => {
    const isEligible = earnedDiscount > 0;
    if (isEligible) {
      const reward = {
        score: calculatedScore,
        totalMarks: totalPossibleMarks,
        scoreDiscount: earnedDiscount,
        active: true,
        timestamp: Date.now(),
      };
      saveMockTestReward(reward);
      setResultModalOpen(false);
      navigate(lastPrelimsTarget, { state: { mockReward: reward } });
    } else {
      clearMockTestReward();
      setResultModalOpen(false);
      navigate(lastPrelimsTarget);
    }
  };

  const currentQ = questions[currentIndex];
  const currentSubject =
    (typeof currentQ?.subject === "object" ? currentQ?.subject?.name : currentQ?.subject) ||
    (typeof (currentQ as any)?.subjectId === "object" ? ((currentQ as any)?.subjectId as any)?.name : (currentQ as any)?.subjectId) ||
    (typeof currentQ?.type === "string" ? currentQ?.type : "") ||
    subjectTitle;

  const currentAnswerState = answersState[currentIndex] || {
    statementJudgments: {},
    excludedOptions: {},
  };

  if (hasFinishedTest && !showSolutions) {
    return (
      <FinalReportScreen
        questions={questions}
        answersState={answersState}
        score={calculatedScore}
        totalMarks={totalPossibleMarks}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattempted}
        timeTakenSeconds={Math.max(0, effectiveDurationSeconds - secondsRemaining)}
        earnedDiscount={earnedDiscount}
        candidateName={candidateInfo?.name}
        candidatePhone={candidateInfo?.phone}
        onRestartTest={handleRestartTest}
        onEnrollCourse={handleEnrollCourse}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#f4f7fc] flex flex-col font-sans text-[#0F172A]">
      {/* Floating Ambient Glowing Blobs (Blue Shadow & Orange Ambient from Achiwon_PYQ_Modern) */}
      <div className="modern-bg-blobs">
        <div className="modern-blob modern-blob-blue" />
        <div className="modern-blob modern-blob-orange" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 min-h-screen">
        {contextHolder}
        {/* Top Header & Safeguard Alert */}
        <MockTestHeader
          seriesTitle={effectiveSeriesTitle}
          subjectTitle={currentSubject}
          timeRemaining={formatTime(secondsRemaining)}
          onOpenSettings={() => setInstructionsOpen(true)}
          onEndTest={() => setEndTestDrawerOpen(true)}
        />

        {/* Main Container */}
        <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col px-2.5 py-3 sm:px-6 sm:py-6 lg:px-8 min-w-0">
        {/* Solution Review Mode Sticky Offer Banner */}
        {showSolutions && (
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border-2 border-[#16A34A] bg-[#F0FDF4] p-4 text-[#166534] shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16A34A] text-white font-black text-sm">
                ✓
              </span>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-[#14532D]">
                  {earnedDiscount > 0
                    ? `Solutions Review Active · ₹${earnedDiscount.toLocaleString()} Score Discount Earned!`
                    : "Solutions & Detailed Explanations"}
                </p>
                <p className="text-xs text-[#166534]">
                  {earnedDiscount > 0
                    ? `Your score of ${calculatedScore.toFixed(1)} qualifies for ₹${earnedDiscount.toLocaleString()} OFF on any course.`
                    : "Review full step-by-step explanations for each question."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowSolutions(false)}
                className="rounded-xl bg-white border border-[#16A34A] px-3.5 py-2 text-xs font-bold text-[#16A34A] hover:bg-[#DCFCE7] transition cursor-pointer"
              >
                ← Assessment Report
              </button>
              <button
                type="button"
                onClick={handleEnrollCourse}
                className="rounded-xl bg-[#16A34A] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#15803D] transition cursor-pointer"
              >
                {earnedDiscount > 0
                  ? `Claim ₹${earnedDiscount.toLocaleString()} Discount on Courses`
                  : "Explore Courses"}
              </button>
            </div>
          </div>
        )}

        <div className="grid flex-1 gap-4 sm:gap-6 lg:grid-cols-10 w-full min-w-0 max-w-full">
          {/* Left Column: Question Area */}
          <section className={isPaletteCollapsed ? "lg:col-span-10 w-full min-w-0 max-w-full" : "lg:col-span-7 w-full min-w-0 max-w-full"}>
            <MockTestQuestionView
              question={currentQ}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              language={language}
              onToggleLanguage={() =>
                setLanguage((prev) =>
                  prev === "englishQuestion" ? "hindiQuestion" : "englishQuestion"
                )
              }
              answerState={currentAnswerState}
              onUpdateAnswerState={handleUpdateCurrentAnswer}
              onPrev={handlePrev}
              onNext={handleNext}
              showCorrectAnswerBanner={showSolutions}
              onOpenSettings={() => setInstructionsOpen(true)}
              isPaletteCollapsed={isPaletteCollapsed}
              onTogglePalette={() => setPaletteCollapsed(!isPaletteCollapsed)}
              validationWarning={validationWarning}
            />
          </section>

          {/* Right Column: Question Palette */}
          <aside className={isPaletteCollapsed ? "lg:col-span-0 hidden" : "lg:col-span-3"}>
            <MockTestPalette
              totalQuestions={totalQuestions}
              currentQuestionIndex={currentIndex}
              questionStatuses={questionStatuses}
              markedIndices={markedIndices}
              onSelectQuestion={handleSelectQuestion}
              onOpenInstructions={() => setInstructionsOpen(true)}
              onOpenEndTest={() => setEndTestDrawerOpen(true)}
              isCollapsed={isPaletteCollapsed}
              onToggleCollapse={() => setPaletteCollapsed(!isPaletteCollapsed)}
            />
          </aside>
        </div>

        {/* Floating Button to re-open Palette when collapsed (Desktop only) */}
        {isPaletteCollapsed && (
          <button
            type="button"
            onClick={() => setPaletteCollapsed(false)}
            className="hidden lg:flex fixed right-4 top-24 z-30 items-center gap-2 rounded-xl bg-[#124699] px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:bg-[#1E5FC9] transition-all cursor-pointer animate-in fade-in"
            title="Open Question Palette"
          >
            <LuPanelRightOpen className="text-base" />
            <span>Show Question Palette</span>
          </button>
        )}
      </main>

      {/* Instructions Modal */}
      <MockTestInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />

      {/* End Test Submission Review Drawer */}
      <MockTestSubmissionDrawer
        isOpen={isEndTestDrawerOpen}
        onClose={() => setEndTestDrawerOpen(false)}
        stats={drawerStats}
        onConfirmEndTest={handleConfirmEndTest}
      />

      {/* Post-Test Result & Conversion Modal */}
      <MockTestResultModal
        isOpen={isResultModalOpen}
        score={calculatedScore}
        totalMarks={totalPossibleMarks}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattempted}
        onReviewSolutions={() => {
          setResultModalOpen(false);
          setShowSolutions(true);
        }}
        onRestartTest={handleRestartTest}
        onEnrollCourse={handleEnrollCourse}
      />
      {/* End Test Lead Collection Modal */}
      <MockTestLeadModal
        isOpen={isLeadModalOpen}
        score={calculatedScore}
        totalMarks={totalPossibleMarks}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattempted}
        earnedDiscount={earnedDiscount}
        onSubmit={handleLeadSubmit}
        onClose={() => setLeadModalOpen(false)}
        isLoading={isSubmittingLead}
        isTimeUp={isTimeUp}
      />
      </div>
    </div>

  );
};
