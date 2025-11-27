import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";

const AboutSection = ({ aboutUs }: { aboutUs: string }) => {
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
        <div className=" relative flex max-sm:justify-start justify-center   w-[20rem] sm:w-[40rem] md:w-[48rem] lg:w-[70rem] " data-aos="fade-right">
          <div
            className="absolute left-1/2 sm:left-1/2 md:left-1/2 lg:1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[300px] sm:w-[400px] md:w-[400px] h-[300px] sm:h-[400px] md:h-[400px]
              rounded-full -z-10 shadow-md bg-white"
          ></div>

          <img src={`${ImagePath}about/about-frame.png`} alt="App Main Screen" className="w-44 sm:w-65 smooth-float max-sm:ms-2" data-aos="zoom-in" />
          <img
            src={`${ImagePath}about/about-screen.png`}
            alt="App Secondary Screen"
            className="  w-36  sm:w-65 md:w-70 lg:w-50 absolute z-50  right-0 sm:-right-11 md:-right-1  lg:-right-10 xl:-right-9  bottom-24   smooth-float-delayed"
            // data-aos="zoom-in"
          />
        </div>
        {/* right Div */}
        <div
          className=" w-full h-full "
          // data-aos="fade-left"
        >
          <div className="text-left  mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-4">Some awesome words about app.</h2>
            <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: aboutUs }} />
          </div>

          <ul
            id="counter"
            className="grid grid-cols-1 sm:grid-cols-2 mt-10 justify-between gap-6"
            //  data-aos="fade-up"
          >
            {stats?.map((item, index) => (
              <li
                key={index}
                className="flex items-center w-full bg-white 
                         rounded-xl px-5 py-4
                           transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="icon mr-4  flex-shrink-0">
                  <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                </div>
                <div className="text-success">
                  <p className=" text-3xl font-bold leading-none">{item.value}</p>
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
