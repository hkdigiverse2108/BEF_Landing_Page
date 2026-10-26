import "aos/dist/aos.css";
import { ImagePath, ROUTES } from "../../Constants";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Autoplay, EffectCards, Pagination } from "swiper/modules";
import AnimationLine from "../Common/AnimationLine";
import type { InterfaceType } from "./InterfaceSection";
import { Link } from "react-router-dom";
import { APP_LINKS } from "../../Data";
import { LuZap, LuArrowRight } from "react-icons/lu";

const FALLBACK_INTERFACES: InterfaceType[] = [
  { image: "https://api-bef.bharatexamfest.com/images/1762599725001_1..png" },
  { image: "https://api-bef.bharatexamfest.com/images/1762599735500_2..png" },
  { image: "https://api-bef.bharatexamfest.com/images/1762599762289_4..png" },
];

const HeroSection = ({ interfaces }: { interfaces: InterfaceType[] }) => {
  const users = [`${ImagePath}/home/user01.png`, `${ImagePath}/home/user02.png`, `${ImagePath}/home/user03.png`, `${ImagePath}/home/user04.png`];
  const slideList = interfaces && interfaces.length > 0 ? interfaces : FALLBACK_INTERFACES;

  return (
    <section id="hero" className="overflow-hidden">
      <AnimationLine />
      {/* Main Container */}
      <div className="container container-p z-10 mx-auto relative px-4 flex flex-col lg:flex-row items-center justify-between gap-10 sm:mt-6">
        {/* Left Text */}
        <div className="lg:w-1/2 space-y-9 max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:text-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[55px] text-primary font-bold leading-tight">Stay REGULAR & Enjoy 100% FREE Course</h1>
            <p className="text-gray-600 mt-4 md:text-lg">First ever in History of UPSC!!! Revolutionizing UPSC Prelims with AI and Advanced Reporting.</p>
          </div>

          {/* App Buttons & Free Mock Practice */}
          <div className="flex flex-wrap gap-4 max-lg:justify-center items-center">
            <Link
              to={ROUTES.FREE_PRACTICE}
              className="hero-animated-btn rounded-xl px-6 py-3.5 sm:px-7 sm:py-4 text-white text-sm sm:text-base font-bold tracking-wide shadow-md group cursor-pointer"
            >
              <LuZap className="hero-zap-icon text-lg sm:text-xl text-yellow-200 fill-yellow-300 shrink-0" />
              <span>Start Free Mock Test</span>
              <LuArrowRight className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link to={APP_LINKS} target="_blank" className="relative border-2 border-success rounded-xl px-3 py-2 sm:px-6 sm:py-3 bg-white hover:bg-success transition group">
              <img src={`${ImagePath}common/googleplay_blue.png`} alt="Play Store" className="h-8 block group-hover:hidden" />
              <img src={`${ImagePath}common/googleplay_white.png`} alt="Play Store" className="h-8 hidden group-hover:block" />
            </Link>
          </div>

          {/* Users */}
          <div className="flex max-lg:justify-center items-center">
            <div className="flex -space-x-3 mr-4">
              {users?.map((u, i) => (
                <img loading="lazy" key={i} src={u} alt="user" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-tight">
              50K+ <br /> user this platform
            </p>
          </div>
        </div>

        <div className="relative w-fit px-24 flex justify-center items-center">
          <div className="absolute w-[450px] h-[450px] bg-primary rounded-full -z-10"></div>

          <img src={`${ImagePath}home/message_icon.png`} alt="message" className="hidden sm:block absolute left-0 z-100 bottom-16" />
          <img src={`${ImagePath}home/shield_icon.png`} alt="shield" className="hidden sm:block absolute right-0 top-16" />

          <div className="relative w-[300px] h-[700px] flex items-center justify-center">
            <Swiper modules={[Pagination, A11y, Autoplay, EffectCards]} slidesPerView={1} speed={700} loop={true} effect="fade" autoplay={{ delay: 2000 }} className="absolute z-0 rounded-[30px] !overflow-hidden">
              {slideList?.map((slide, i) => (
                <SwiperSlide key={slide?.image || i}>
                  <img src={slide?.image} alt={`slide-${i}`} className="w-full h-full object-cover !px-0.5" />
                </SwiperSlide>
              ))}
            </Swiper>
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
