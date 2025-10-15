import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, EffectCards } from "swiper/modules";
import AOS from "aos";
import { Swiper as SwiperType } from "swiper";
import "aos/dist/aos.css";
import SectionHeader from "./SectionHeader";
import { ImagePath } from "../../Constants";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { Rate } from "antd";

const reviews = [
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: " into strengths with its reports. Bharat Exam Fest turned my weak areas The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}/home/user01.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "festival vibe kept me motivated throughout! Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and ",
    image: `${ImagePath}/home/user02.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}/home/user03.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}/home/user04.png`,
  },
  // Add more review objects here...
];

const ReviewSection = () => {
  const swiperRefs = useRef<SwiperType>(null);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const averageRating =
    reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length;

  return (
    <section id="review" className=" text-center ">
      <div className="container mx-auto px-4">
        {/* Title */}
        <SectionHeader
          title=" What our customer say"
          desc=" What Makes Bharat Exam Fest a Game-Changer—In Their Words!
            See How We’re Transforming UPSC Preparation for Students and
            Institutes!"
          className="space-y-6"
        />
        <button
          type="button"
          className="bg-primary uppercase text-white px-6 py-2 rounded-md font-semibold mt-7"
        >
          Add REVIEW
        </button>

        {/* Swiper Section */}
        <div data-aos="fade-in" className="  relative py-8">
          <Swiper
            modules={[Pagination, A11y, Autoplay, EffectCards]}
            slidesPerView={1}
            spaceBetween={10}
            centeredSlides={true}
            effect="fade"
            loop={true}
            speed={1000}
            autoplay={{ delay: 3000 }}
            // pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRefs.current = swiper;
            }}
            className="!overflow-hidden max-w-md mx-auto flex justify-center"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className=" bg-white flex flex-col items-center p-3 sm:p-10 rounded-lg ">
                  <div className="flex items-center justify-center my-5 gap-1">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      className="!text-sm !text-primary"
                    />
                  </div>
                  <p className="text-center ">“ {review.msg} ”</p>
                  <img
                    className="h-35 w-35 rounded-full mt-7"
                    src={review.image}
                    alt="userImage1"
                  />
                  <h2 className="text-lg font-medium my-2 ">{review.name}</h2>
                  <p className="text-sm ">{review.position}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="hidden sm:block">
            <button
              onClick={() => {
                swiperRefs.current?.slidePrev();
              }}
              className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => {
                swiperRefs.current?.slideNext();
              }}
              className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Total Reviews */}
        <div className=" ">
          <div className="flex justify-center items-center !space-x-3  text-lg">
            <Rate
              allowHalf
              defaultValue={2.5}
              className="!text-2xl !text-primary"
            />

            <p className="text-primary font-semibold">
              5.0 / {averageRating.toFixed(1)}
            </p>
          </div>
          <h3 className="text-5xl font-bold text-success mt-2">
            {reviews.length}
          </h3>
          <p className="flex justify-center items-center gap-1 mt-2">
            TOTAL USER REVIEWS <TiArrowRightThick />
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
