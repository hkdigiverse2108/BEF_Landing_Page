import { useNavigate } from "react-router-dom";
import { FreeMockTestIntroScreen } from "../../Components/Exam/ModernMockTest";
import Seo from "../../Components/Common/Seo";
import { ROUTES, URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";
import { isLastPrelimsCourse } from "../../Utils/mockTestReward";

const MockTestIntroPage = () => {
  const navigate = useNavigate();

  const { data: coursesListData } = useGetApiQuery({ url: URL_KEYS.COURSE.ALL });
  const apiCourses: any[] = coursesListData?.data?.course_data || [];
  const lastPrelimsCourse = apiCourses.find((c) => isLastPrelimsCourse(c));
  const lastPrelimsTarget = lastPrelimsCourse?._id
    ? ROUTES.COURSE.DETAILS.replace(":id", lastPrelimsCourse._id)
    : "/course/details/690ccd4aafdfb3c841183295";

  const handleEnrollCourse = () => {
    navigate(lastPrelimsTarget);
  };

  return (
    <>
      <Seo
        title="Free UPSC Mock Test Online for UPSC 2027"
        description="Take free UPSC mock tests for Prelims 2027. Practice exam-style questions, improve accuracy, and track your preparation."
      />
      <FreeMockTestIntroScreen
        onStartTest={() => navigate(ROUTES.MOCK_TEST.INSTRUCTION)}
        onEnrollCourse={handleEnrollCourse}
      />
    </>
  );
};

export default MockTestIntroPage;
