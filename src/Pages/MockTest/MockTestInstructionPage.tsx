import { useNavigate } from "react-router-dom";
import { ExamInstructionScreen } from "../../Components/Exam/ExamInstructionScreen";
import Seo from "../../Components/Common/Seo";
import { ROUTES } from "../../Constants";

const MockTestInstructionPage = () => {
  const navigate = useNavigate();

  const handleStartExam = (lang: string) => {
    const langKey = lang === "Hindi" ? "hindiQuestion" : "englishQuestion";
    sessionStorage.setItem("mock_test_lang", langKey);
    navigate(ROUTES.MOCK_TEST.TEST);
  };

  return (
    <>
      <Seo
        title="UPSC Mock Test Instructions – Exam Guidelines"
        description="Read the UPSC mock test instructions to understand the test rules, duration, and guidelines before starting your test."
      />
      <ExamInstructionScreen
        onStartExam={handleStartExam}
        examTitle="Free Mock Test Instructions"
        actionButtonText="Start Free Mock Test"
        showHeader={false}
        showFooter={false}
        showStrip={false}
      />
    </>
  );
};

export default MockTestInstructionPage;
