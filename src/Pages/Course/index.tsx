import { URL_KEYS } from "../../Constants";
import CourseCard from "../../Components/Course/CourseCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import type { CourseType } from "../../Types";

const Course = () => {
  const { data } = useGetApiQuery({ url: URL_KEYS.COURSE.ALL });

  const CourseData = data?.data?.course_data;

  return (
    <div className="pb-5 container container-p ">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {CourseData?.map((item : CourseType, index : number) => (
          <CourseCard key={index} course={item}  />
        ))}
      </div>
    </div>
  );
};

export default Course;
