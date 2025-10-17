import { ImagePath } from "../../Constants";

const classes = [
  {
    id: 1,
    img: `${ImagePath}course/CourseModule.png`,
    subject: "MCQ Aptitude",
    desc: "CSAT Live PathShala is the first revolutionary batch in the world of EdTech where Educator and Aspirants can not only see each other but also ask questions and clear their doubts directly. The main objective of this batch is not only to ensure success in CSAT.",
    tests: 10,
    lectures: 30,
  },
  {
    id: 1,
    img: `${ImagePath}course/CourseModule.png`,
    subject: "MCQ Aptitude",
    desc: "CSAT Live PathShala is the first revolutionary batch in the world of EdTech where Educator and Aspirants can not only see each other but also ask questions and clear their doubts directly. The main objective of this batch is not only to ensure success in CSAT.",
    tests: 10,
    lectures: 30,
  },
  {
    id: 1,
    img: `${ImagePath}course/CourseModule.png`,
    subject: "MCQ Aptitude",
    desc: "CSAT Live PathShala is the first revolutionary batch in the world of EdTech where Educator and Aspirants can not only see each other but also ask questions and clear their doubts directly. The main objective of this batch is not only to ensure success in CSAT.",
    tests: 10,
    lectures: 30,
  },
];

const CourseModule = () => {
  return (
    <div className="space-y-4" data-aos="fade-up">
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="flex max-sm:flex-col gap-4 bg-white rounded-lg  border border-gray-200 p-4 h-full  items-center"
        >
          {/* Image */}
    
          <img
            src={cls.img}
            alt={"img"}
            className="w-fit h-50 sm:w-50 sm:h-fit rounded-lg object-cover"
          />

          {/* Content */}
          <div className="flex flex-col sm:py-3 gap-5 justify-between">
            {/* Tags */}
            <div className="flex flex-col gap-2 ">
              <span className="text-xl font-semibold">{cls.subject}</span>
              <h2 className="text-sm text-gray-700">{cls.desc}</h2>
            </div>
            <div className="flex  gap-6">
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">
                  {cls.lectures}
                </span>
                <span>lectures </span>
              </p>
              <span className="border border-gray-200"></span>
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">
                  {cls.tests}
                </span>
                <span>Tests </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseModule;
