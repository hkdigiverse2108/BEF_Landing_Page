import { URL_KEYS } from "../../Constants";
import CourseCard from "../../Components/Course/CourseCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";
import Loader from "../../Components/Common/Loader";

const Course = () => {
  const { data: courseData, isLoading: courseLoading } = useGetApiQuery({ url: URL_KEYS.COURSE.ALL });

  const courses = courseData?.data?.course_data;

  if (courseLoading) return <Loader />;

  return (
    <div className="pb-5 container container-p ">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {courses?.map((item: CourseType, index: number) => (
          <CourseCard key={index} course={item} />
        ))}
      </div>
    </div>
  );
};

export default Course;
