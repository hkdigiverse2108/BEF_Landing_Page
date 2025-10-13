import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Autoplay, EffectCards, Pagination } from "swiper/modules";

const HeroSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const appLinks = {
    playstore: "#",
    appstore: "#",
  };

  const users = [
    `${ImagePath}/home/used01.png`,
    `${ImagePath}/home/used02.png`,
    `${ImagePath}/home/used03.png`,
    `${ImagePath}/home/used04.png`,
  ];

  const slides = [
    `${ImagePath}/home/screen4.png`,
    `${ImagePath}/home/screen4.png`,
    `${ImagePath}/home/screen4.png`,
  ];

  return (
    <section className=" mt-16 overflow-hidden heroSection">
      {/* Background animation lines (you can make this animated later if needed) */}
      <div className="anim_line  max-w-[100rem]">
        {[...Array(9)].map((_, i) => (
          <span key={i}>
            <img
              src={`${ImagePath}anim_line.png`}
              alt="animation-line"
              className="w-0.5 h-[100px] rounded-b-2xl"
            />
          </span>
        ))}
      </div>

      {/* Main Container */}
      <div className="container z-10 mx-auto relative px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="lg:w-1/2 space-y-6" data-aos="fade-right">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold  leading-tight">
              Let's Celebrate this Exam Festival
            </h1>
            <p className="text-gray-600 mt-4  md:text-lg">
              First ever in History of UPSC!!! Revolutionizing UPSC Prelims with
              AI and Advanced Reporting.
            </p>
          </div>

          {/* App Buttons */}
          <div className="flex gap-5 mt-6 ">
            <a
              href={appLinks.appstore}
              className="relative border-2 border-success rounded-xl px-3 py-2 sm:px-6 sm:py-3 bg-white hover:bg-success transition group "
            >
              <img
                src={`${ImagePath}home/appstore_blue.png`}
                alt="App Store"
                className="h-8 block group-hover:hidden"
              />
              <img
                src={`${ImagePath}home/appstore_white.png`}
                alt="App Store"
                className="h-8 hidden group-hover:block"
              />
            </a>

            <a
              href={appLinks.playstore}
              className="relative border-2 border-success  rounded-xl px-3 py-2 sm:px-6 sm:py-3 bg-white hover:bg-success transition group"
            >
              <img
                src={`${ImagePath}home/googleplay_blue.png`}
                alt="Play Store"
                className="h-8 block group-hover:hidden"
              />
              <img
                src={`${ImagePath}home/googleplay_white.png`}
                alt="Play Store"
                className="h-8 hidden group-hover:block"
              />
            </a>
          </div>

          {/* Users */}
          <div className="flex items-center mt-8">
            <div className="flex -space-x-3 mr-4">
              {users.map((u, i) => (
                <img
                  key={i}
                  src={u}
                  alt="user"
                  className="w-14 h-14 rounded-full "
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-tight">
              50K+ <br /> used this app
            </p>
          </div>
        </div>

        {/* Right Slider */}
        <div
          className="relative w-fit flex justify-center items-center px-21 "
          data-aos="fade-left"
        >
          {/* Background circle */}
          <div className="hidden sm:block absolute w-[450px] h-[450px] bg-primary rounded-full -z-10"></div>

          {/* Decorative icons */}
          <img
            src={`${ImagePath}home/message_icon.png`}
            alt="message"
            className="hidden sm:block absolute -left-5 z-100  bottom-16 "
          />
          <img
            src={`${ImagePath}home/shield_icon.png`}
            alt="shield"
            className="hidden sm:block absolute -right-5  top-16 "
          />

          {/* Image slider (simplified) */}
          <div className="relative w-[300px] h-[700px] flex items-center justify-center ">
            {/* Swiper Slides (behind frame) */}
            <Swiper
              modules={[Pagination, A11y, Autoplay, EffectCards]}
              slidesPerView={1}
              speed={700}
              loop={true}
              effect="fade"
              autoplay={{ delay: 2000 }}
              //   pagination={{ clickable: true }}
              className=" absolute  z-0 rounded-[30px] !overflow-hidden  bg-white "
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={i} className="">
                  <img
                    src={slide}
                    alt={`slide-${i}`}
                    className="w-full h-full object-cover !px-0.5"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Frame Image (on top) */}
            <img
              src={`${ImagePath}f1.png`}
              alt="frame"
              className="absolute top-14 left-0 w-full h-fit z-10 pointer-events-none select-none !overflow-hidden scale-110 "
            />
          </div>
        </div>
      </div>

      {/* Wave shape at bottom */}
      <div
        className=" w-full h-[13rem] bg-cover bg-center mt-[-50px] z-100 overflow-visible  "
        style={{
          backgroundImage: `url(${ImagePath}home/banner-shape.svg)`,
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
