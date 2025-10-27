import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Autoplay, EffectCards, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import AnimationLine from "../Common/AnimationLine";
import type { InterfaceType } from "./InterfaceSection";
import { APP_LINKS } from "../../Constants/AppLinks";

const HeroSection = ({ interfaces }: { interfaces: InterfaceType[] }) => {
  const users = [`${ImagePath}/home/user01.png`, `${ImagePath}/home/user02.png`, `${ImagePath}/home/user03.png`, `${ImagePath}/home/user04.png`];


  return (
    <section id="hero" className="overflow-hidden">
      <AnimationLine />
      {/* Main Container */}
      <div className="container container-p z-10 mx-auto relative px-4 flex flex-col lg:flex-row items-center justify-between gap-10 sm:mt-6">
        {/* Left Text */}
        <div className="lg:w-1/2 space-y-9 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:text-center " data-aos="fade-right">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[55px] text-primary font-bold  leading-tight">Let's Celebrate this Exam Festival</h1>
            <p className="text-gray-600 mt-4  md:text-lg">First ever in History of UPSC!!! Revolutionizing UPSC Prelims with AI and Advanced Reporting.</p>
          </div>

          {/* App Buttons */}
          <div className="flex gap-5 max-lg:justify-center">
            <Link to={APP_LINKS.APP_STORE} className="relative border-2 border-success rounded-xl px-3 py-2 sm:px-6 sm:py-3 bg-white hover:bg-success transition group ">
              <img src={`${ImagePath}common/appstore_blue.png`} alt="App Store" className="h-8 block group-hover:hidden" />
              <img src={`${ImagePath}common/appstore_white.png`} alt="App Store" className="h-8 hidden group-hover:block" />
            </Link>

            <Link to={APP_LINKS.PLAY_STORE} className="relative border-2 border-success  rounded-xl px-3 py-2 sm:px-6 sm:py-3 bg-white hover:bg-success transition group">
              <img src={`${ImagePath}common/googleplay_blue.png`} alt="Play Store" className="h-8 block group-hover:hidden" />
              <img src={`${ImagePath}common/googleplay_white.png`} alt="Play Store" className="h-8 hidden group-hover:block" />
            </Link>
          </div>

          {/* Users */}
          <div className="flex max-lg:justify-center items-center ">
            <div className="flex -space-x-3 mr-4">
              {users?.map((u, i) => (
                <img key={i} src={u} alt="user" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full " />
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-tight">
              50K+ <br /> user this app
            </p>
          </div>
        </div>

        <div className="relative w-fit px-24 flex justify-center items-center " data-aos="fade-left">
          <div className=" absolute w-[450px] h-[450px] bg-primary rounded-full -z-10"></div>

          <img src={`${ImagePath}home/message_icon.png`} alt="message" className="hidden sm:block absolute left-0 z-100  bottom-16 " />
          <img src={`${ImagePath}home/shield_icon.png`} alt="shield" className="hidden sm:block absolute right-0  top-16 " />

          <div className="relative w-[300px] h-[700px] flex items-center justify-center ">
            <Swiper modules={[Pagination, A11y, Autoplay, EffectCards]} slidesPerView={1} speed={700} loop={true} effect="fade" autoplay={{ delay: 2000 }} className=" absolute  z-0 rounded-[30px] !overflow-hidden  bg-white ">
              {interfaces?.map((slide, i) => (
                <SwiperSlide key={i} className="">
                  <img src={slide.image} alt={`slide-${i}`} className="w-full h-full object-cover !px-0.5" />
                </SwiperSlide>
              ))}
            </Swiper>
            <img src={`${ImagePath}/home/f1.png`} alt="frame" className="absolute top-14 left-0 w-full h-fit z-10 pointer-events-none select-none !overflow-hidden scale-110 " />
          </div>
        </div>
      </div>

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
