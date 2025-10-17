import { ImagePath } from "../../Constants";
import CourseCard from "../../Components/Course/CourseCard";

const Course = () => {
  const data = [
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: `${ImagePath}course/CourseCardImage.jpg`,
    },
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: `${ImagePath}course/CourseCardImage.jpg`,
    },
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: `${ImagePath}course/CourseCardImage.jpg`,
    },
  ];
  return (
    <div className="pb-5 container ">
     
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {data.map((item, index) => (
          <CourseCard
            key={index}
            title={item.title}
            subtitle={item.btn}
            image={`${item.img}`}
            onCallClick={() => console.log("Counsellor clicked")}
            onViewDetails={() => console.log("View Batch clicked")}
          />
        ))}
      </div>
    </div>
  );
};

export default Course;
