import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FinalReportScreen } from "../../Components/Exam/ModernMockTest/FinalReportScreen";
import Seo from "../../Components/Common/Seo";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import {
  FALLBACK_BACKEND_QUESTIONS,
  type BackendQuestionItem,
  getActiveSessionMockTestSet,
  resetSessionMockTestSet,
} from "../../Components/Exam/ModernMockTest/mockQuestionsData";
import { isLastPrelimsCourse, saveMockTestReward, type MockTestReward } from "../../Utils/mockTestReward";

const MockTestAnalysisPage = () => {
  const navigate = useNavigate();

  // Load latest result from sessionStorage
  const storedResult = useMemo(() => {
    try {
      const data = sessionStorage.getItem("mock_test_latest_result");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const activeSet = useMemo(() => getActiveSessionMockTestSet(), []);

  const fallbackQuestions: BackendQuestionItem[] = useMemo(() => {
    return activeSet?.questions || FALLBACK_BACKEND_QUESTIONS;
  }, [activeSet]);

  const questions: BackendQuestionItem[] =
    storedResult?.questions?.length > 0
      ? storedResult.questions
      : fallbackQuestions;

  const answersState = storedResult?.answersState || {};
  const score = Number(storedResult?.score) || 0;
  const totalMarks = Number(storedResult?.totalMarks) || (questions.length * 2);
  const correctCount = Number(storedResult?.correctCount) || 0;
  const incorrectCount = Number(storedResult?.incorrectCount) || 0;
  const unattemptedCount =
    storedResult?.unattemptedCount !== undefined
      ? Number(storedResult.unattemptedCount)
      : Math.max(0, questions.length - (correctCount + incorrectCount));
  const timeTakenSeconds = Number(storedResult?.timeTakenSeconds) || 180;
  const rawDiscount = Number(storedResult?.earnedDiscount) || 0;
  const effectiveDiscount = rawDiscount > 0 ? rawDiscount : 7499;

  // Course linking
  const { data: coursesListData } = useGetApiQuery({
    url: URL_KEYS.COURSE.ALL,
  });
  const apiCourses: any[] = coursesListData?.data?.course_data || [];
  const lastPrelimsCourse = apiCourses.find((c) => isLastPrelimsCourse(c));
  const lastPrelimsTarget = lastPrelimsCourse?._id
    ? ROUTES.COURSE.DETAILS.replace(":id", lastPrelimsCourse._id)
    : "/course/details/690ccd4aafdfb3c841183295";

  const handleRestartTest = () => {
    resetSessionMockTestSet();
    try {
      sessionStorage.removeItem("mock_test_latest_result");
    } catch (e) {}
    navigate(ROUTES.MOCK_TEST.INTRO);
  };

  const handleEnrollCourse = () => {
    const reward: MockTestReward = {
      score,
      totalMarks,
      scoreDiscount: effectiveDiscount,
      active: true,
      timestamp: Date.now(),
    };
    saveMockTestReward(reward);
    navigate(lastPrelimsTarget, { state: { mockReward: reward } });
  };

  const candidateName = storedResult?.candidateName || storedResult?.name;
  const candidatePhone = storedResult?.candidatePhone || storedResult?.phone;

  return (
    <>
      <Seo
        title="UPSC Mock Test Analysis – Score & Performance"
        description="Check your UPSC mock test score, review correct and incorrect answers, identify weak areas, and improve your Prelims preparation."
      />
      <FinalReportScreen
        questions={questions}
        answersState={answersState}
        score={score}
        totalMarks={totalMarks}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        unattemptedCount={unattemptedCount}
        timeTakenSeconds={timeTakenSeconds}
        earnedDiscount={effectiveDiscount}
        candidateName={candidateName}
        candidatePhone={candidatePhone}
        onRestartTest={handleRestartTest}
        onEnrollCourse={handleEnrollCourse}
      />
    </>
  );
};

export default MockTestAnalysisPage;
