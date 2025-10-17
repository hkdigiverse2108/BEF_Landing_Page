import { ImagePath } from "../../Constants";

const classes = [
  {
    id: 1,
    img: `${ImagePath}workshop/LectureThumbnail.png`,
    language: "EN",
    subject: "INDIAN ECONOMY",
    title: "Economy For Mains Class 2",
    instructor: "Shyam Shekhar Engaged",
    date: "23 March",
  },
  {
    id: 2,
    img: `${ImagePath}workshop/LectureThumbnail.png`,
    language: "EN",
    subject: "INDIAN ECONOMY",
    title: "Economy For Mains Class 2",
    instructor: "Shyam Shekhar Engaged",
    date: "23 March",
  },
  {
    id: 3,
    img: `${ImagePath}workshop/LectureThumbnail.png`,
    language: "EN",
    subject: "INDIAN ECONOMY",
    title: "Economy For Mains Class 2",
    instructor: "Shyam Shekhar Engaged",
    date: "23 March",
  },
];

const CourseLecturesTab = () => {
  return (
    <div className="space-y-4" data-aos="fade-up">
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="flex max-sm:flex-col gap-4 bg-white rounded-lg  border border-gray-200 p-4 h-full items-stretch"
        >
          {/* Image */}
          <img
            src={cls.img}
            alt={cls.title}
            className="w-full h-full sm:w-fit sm:h-35 rounded-lg object-cover"
          />

          {/* Content */}
          <div className="flex flex-col sm:py-3 gap-2 justify-between">
            {/* Tags */}
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-gray-200 px-1.5 py-0.5 rounded">
                {" "}
                {cls.language}{" "}
              </span>
              <span className="text-primary font-semibold">{cls.subject}</span>
            </div>

            {/* Title */}
            <h2 className="font-semibold text-sm sm:text-base">{cls.title}</h2>

            {/* Instructor */}
            <p className="text-gray-600 text-xs font-medium sm:text-sm">
              {cls.instructor}
            </p>

            {/* Date */}
            <p className="text-gray-600 text-xs font-medium">{cls.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseLecturesTab;
