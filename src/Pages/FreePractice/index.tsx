import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FreePracticeTest,
  FreeMockTestIntroScreen,
} from "../../Components/Exam/ModernMockTest";
import { ExamInstructionScreen } from "../../Components/Exam/ExamInstructionScreen";
import type { LanguageKey } from "../../Components/Exam/ModernMockTest/mockQuestionsData";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import { isLastPrelimsCourse } from "../../Utils/mockTestReward";

type FreePracticeStage = "intro" | "instruction" | "test";

const FreePracticePage = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<FreePracticeStage>("intro");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("englishQuestion");

  const { data: coursesListData } = useGetApiQuery({ url: URL_KEYS.COURSE.ALL });
  const apiCourses: any[] = coursesListData?.data?.course_data || [];
  const lastPrelimsCourse = apiCourses.find((c) => isLastPrelimsCourse(c));
  const lastPrelimsTarget = lastPrelimsCourse?._id
    ? ROUTES.COURSE.DETAILS.replace(":id", lastPrelimsCourse._id)
    : "/course/details/690ccd4aafdfb3c841183295";

  const handleEnrollCourse = () => {
    navigate(lastPrelimsTarget);
  };

  // Stage 1: "Prepare smarter. Practice with purpose." Intro Page
  if (stage === "intro") {
    return (
      <FreeMockTestIntroScreen
        onStartTest={() => setStage("instruction")}
        onEnrollCourse={handleEnrollCourse}
      />
    );
  }

  // Stage 2: Clean Instructions Screen (Centered, no Header/Footer)
  if (stage === "instruction") {
    return (
      <ExamInstructionScreen
        onStartExam={(lang) => {
          setSelectedLanguage(lang === "Hindi" ? "hindiQuestion" : "englishQuestion");
          setStage("test");
        }}
        examTitle="Free Mock Test Instructions"
        actionButtonText="Start Free Mock Test"
        showHeader={false}
        showFooter={false}
        showStrip={false}
      />
    );
  }

  // Stage 3: Question Palette Test (Finishes into FinalReportScreen)
  return <FreePracticeTest initialLanguage={selectedLanguage} />;
};

export default FreePracticePage;
