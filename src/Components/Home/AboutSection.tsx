import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";

const AboutSection = () => {
  const stats = [
    {
      icon: `${ImagePath}about/download.png`,
      label: "Download",
      value: "50K+",
    },
    {
      icon: `${ImagePath}about/followers.png`,
      label: "Followers",
      value: "20K+",
    },
    {
      icon: `${ImagePath}about/reviews.png`,
      label: "Reviews",
      value: "102+",
    },
  ];

  return (
    <section id="about" className=" relative overflow-hidden pt-10 pb-1 ">
      <div className="container container-p flex flex-col lg:flex-row items-center gap-12">
        {/* Left Div */}
        <div
          className=" relative flex justify-center items-center w-full md:w-1/2 lg:w-full "
          data-aos="fade-right"
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px]
              bg-white rounded-full -z-10 shadow-md"
          ></div>

          <img
            src={`${ImagePath}about/about-frame.png`}
            alt="App Main Screen"
            className="w-64 sm:w-80 smooth-float "
            data-aos="zoom-in"
            
          />
          <img
            src={`${ImagePath}about/about-screen.png`}
            alt="App Secondary Screen"
            className="w-1/2 sm:w-fit lg:w-1/2 absolute z-50  right-0  sm:bottom-24 
                        smooth-float-delayed"
            data-aos="zoom-in"
          
          />
        </div>
        {/* right Div */}
        <div
          className=" w-full h-full "
          data-aos="fade-left"
        >
          <div className="text-left  mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-4">
              Some awesome words about app.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Experience a revolutionary way to practice with features like
              striking out wrong options, marking 100% sure answers, and playing
              with logic—all designed to boost your confidence and accuracy.
              Every click takes you closer to success!
            </p>
          </div>

          <ul
            id="counter"
            className="grid grid-cols-1 sm:grid-cols-2 mt-10 justify-between gap-6"
            data-aos="fade-up"
          >
            {stats.map((item, index) => (
              <li
                key={index}
                className="flex items-center w-full bg-white 
                         rounded-xl px-5 py-4
                           transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="icon mr-4  flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-success">
                  <p className=" text-3xl font-bold leading-none">
                    {item.value}
                  </p>
                  <p className="ext-sm mt-1">{item.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
