import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";

const FeatureSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const featureData = [
    {
      title: "AI-Driven Analytics",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Personalized Feedback",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Gamified Learning",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Community Challenges",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Community Challenges",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Community Challenges",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
    {
      title: "Community Challenges",
      image: `${ImagePath}/home/Feature_frame.jpg`,
      youtube: "https://youtube.com/watch?v=XJj2PbenIsU",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden">
      <div className="container px-4 ">
        {/* Section Title */}
        <div
          className="text-center mb-24"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-bold  text-primary">
            Features that make our app different!
          </h2>
          <p className=" mt-4">
            Experience unparalleled AI-driven insights, detailed post-exam
            analysis, <br />
            unique earning opportunities and features designed to simplify UPSC
            preparation.
          </p>
        </div>
        {/* Feature Layout */}
        {/* Feature Layout */}
        <div className="bg-white rounded-2xl shadow-[0_4px_30px_#EDE9FE] flex flex-col lg:flex-row justify-between items-start lg:items-start pt-16 pb-8 px-4 lg:px-12 gap-8 relative">
          {/* Left Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-end space-y-8 w-full lg:w-1/3">
            {featureData
              .filter((_, i) => i % 2 === 0)
              .map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-right"
                  className="flex flex-col items-end gap-3 w-full "
                >
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full  rounded-xl overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>
                  <h4 className="text-lg font-semibold text-primary uppercase text-right">
                    {item.title}
                  </h4>
                </div>
              ))}
          </div>

          {/* Center Image (overlapping top) */}
          <div
            className="w-full lg:w-1/3 p-3 flex justify-center relative lg:-translate-y-40 z-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={`${ImagePath}/home/Feature.jpg`}
              alt="Feature Illustration"
              className="w-fit h-fit lg:w-full md:h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-start space-y-8 w-full lg:w-1/3">
            {featureData
              .filter((_, i) => i % 2 !== 0)
              .map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-left"
                  className="flex flex-col items-start gap-3 w-full lg:max-w-[300px]"
                >
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full aspect-[5/3] rounded-xl overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>
                  <h4 className="text-lg font-semibold text-primary uppercase text-left">
                    {item.title}
                  </h4>
                </div>
              ))}
          </div>
        </div>
        `
      </div>
    </section>
  );
};

export default FeatureSection;
