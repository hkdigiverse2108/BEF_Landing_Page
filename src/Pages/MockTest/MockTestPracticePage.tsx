import { useState } from "react";
import { FreePracticeTest } from "../../Components/Exam/ModernMockTest";
import Seo from "../../Components/Common/Seo";
import type { LanguageKey } from "../../Components/Exam/ModernMockTest/mockQuestionsData";

const MockTestPracticePage = () => {
  const [initialLanguage] = useState<LanguageKey>(() => {
    const saved = sessionStorage.getItem("mock_test_lang");
    return saved === "hindiQuestion" ? "hindiQuestion" : "englishQuestion";
  });

  return (
    <>
      <Seo
        title="UPSC PYQ Practice Online – Previous Year Questions"
        description="Practice UPSC Previous Year Questions (PYQs) online to understand exam patterns, strengthen concepts, and prepare for UPSC Prelims 2027."
      />
      <FreePracticeTest initialLanguage={initialLanguage} />
    </>
  );
};

export default MockTestPracticePage;
