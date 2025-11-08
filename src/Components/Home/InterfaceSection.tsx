import { useState } from "react";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionHeader from "./SectionHeader";


export interface InterfaceType {
  image: string;
}

const InterfaceSection = ({ interfaces }: { interfaces: InterfaceType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="interface" className=" container container-p">
      {/* Section Title */}
      <SectionHeader
        title="Beautiful interface"
        desc="Experience a beautifully crafted interface that makes UPSC preparation
        smooth, engaging, and effortless."
        className="pb-8 "
      />

      {/* Swiper Slider */}
      <div data-aos="fade-up">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="!py-12 !pb-15 sm:!py-24 sm:!pb-25  !px-3"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 40 },
            320: { slidesPerView: 2, spaceBetween: 20 },
            500: { slidesPerView: 3, spaceBetween: 20 },
            1000: { slidesPerView: 5, spaceBetween: 50 },
            1100: { spaceBetween: 70 },
          }}
        >
          {interfaces?.map((item: InterfaceType, i: number) => (
            <SwiperSlide key={i} className="flex justify-center">
              <div className={`transition-all duration-700 ease-in-out transform  rounded-2xl overflow-hidden ${i === activeIndex ? "scale-120 lg:scale-150 " : " lg:scale-120  opacity-80"}`}>
                <img src={item?.image} alt={`App screen ${i + 1}`} className="w-full h-full object-cover " />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InterfaceSection;
