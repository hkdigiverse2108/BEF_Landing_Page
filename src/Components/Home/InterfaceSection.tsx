import { useState } from "react";
import "aos/dist/aos.css";
import { URL_KEYS } from "../../Constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionHeader from "./SectionHeader";
import { useGetApiQuery } from "../../Api/CommonApi";

// const images = [`${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`, `${ImagePath}download/download-screen01.png`];

const InterfaceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useGetApiQuery({ url: URL_KEYS.INTERFACE.ALL });

  const interfaceData = data?.data?.interface_data;

  console.log("featureData : ", data?.data?.interface_data);

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
          {interfaceData?.map((item: { image: string }, i:number) => (
            <SwiperSlide key={i} className="flex justify-center">
              <div className={`transition-all duration-700 ease-in-out transform  rounded-2xl overflow-hidden ${i === activeIndex ? "scale-110 lg:scale-140 " : " lg:scale-110  opacity-80"}`}>
                <img
                  src={item?.image}
                  alt={`App screen ${i + 1}`}
                  className="w-full h-full object-cover "
                  // className="rounded-2xl w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InterfaceSection;
