import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, EffectCards } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "aos/dist/aos.css";
import SectionHeader from "./SectionHeader";
import { ImagePath } from "../../Constants";
import { TiArrowRightThick } from "react-icons/ti";
import { Button, Rate } from "antd";

const reviews = [
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: " into strengths with its reports. Bharat Exam Fest turned my weak areas The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}review/Review1.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "festival vibe kept me motivated throughout! Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and ",
    image: `${ImagePath}review/Review2.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}review/Review3.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}review/Review4.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}review/Review5.png`,
  },
  {
    name: "Het Kukadiya",
    position: "Student",
    rating: 5,
    msg: "Bharat Exam Fest turned my weak areas into strengths with its reports. The rewards and festival vibe kept me motivated throughout!",
    image: `${ImagePath}review/Review6.png`,
  },
  // Add more review objects here...
];

const TestimonialSection = () => {
  const swiperRefs = useRef<SwiperType>(null);

  const averageRating =
    reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length;

  useEffect(() => {
    if (!swiperRefs.current) return;

    const swiper = swiperRefs.current;

    swiper.on("slideChange", () => {
      const bullets = swiper.pagination.bullets;
      const index = swiper.realIndex % 3;
      bullets.forEach((b, i) => {
        b.classList.toggle("swiper-pagination-bullet-active", i === index);
      });
    });
  }, []);

  return (
    <section id="review" className=" text-center ">
      {/* Title */}
      <SectionHeader
        title=" What our customer say"
        desc=" What Makes Bharat Exam Fest a Game-Changer—In Their Words!
            See How We’re Transforming UPSC Preparation for Students and
            Institutes!"
        className="space-y-6"
      />

      <div className="container" data-aos="fade-up">
        {/* Swiper Section */}
        <div className=" max-w-5xl mx-auto relative !my-12  ">
          <Swiper
            modules={[Pagination, A11y, Autoplay, EffectCards]}
            slidesPerView={1}
            spaceBetween={10}
            centeredSlides={true}
            effect="fade"
            loop={true}
            speed={1000}
            autoplay={{ delay: 3000 }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                if (index < 3) {
                  // only show first 3 dots
                  return `<span class="${className}"></span>`;
                }
                return ""; // hide remaining dots
              },
            }}
            onSwiper={(swiper) => {
              swiperRefs.current = swiper;
            }}
            className="!overflow-hidden max-w-md mx-auto flex justify-center !pb-2"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className=" flex flex-col items-center p-3 sm:p-10 rounded-lg ">
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
            <div className=" h-full absolute left-0 top-0 flex flex-col justify-between items-end">
              {reviews?.slice(0, 3).map((url, index) => {
                return (
                  <img
                    src={url.image}
                    alt=""
                    key={index}
                    className={` ${index === 1 ? "me-15 w-20" : "w-14"} `}
                  />
                );
              })}

              {/* <button
                onClick={() => {
                  swiperRefs.current?.slidePrev();
                }}
                className="swiper-button-prev   -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center "
              >
                <FaAngleLeft />
              </button>  */}
            </div>

            <div className=" h-full absolute right-0 top-0 flex flex-col justify-between items-start">
              {reviews?.slice(3, 6).map((url, index) => {
                return (
                  <img
                    src={url.image}
                    alt=""
                    key={index}
                    className={` ${index === 1 ? "ms-15 w-20" : "w-14"} `}
                  />
                );
              })}

              {/* <button
                onClick={() => {
                  swiperRefs.current?.slidePrev();
                }}
                className="swiper-button-prev   -translate-y-1/2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center "
              >
                <FaAngleLeft />
              </button>  */}
            </div>
          </div>
        </div>

        {/* Total Reviews */}
        <div>
          <div className="flex justify-center items-center !space-x-3  text-lg mt-6 ">
            <Rate
              allowHalf
              defaultValue={5}
              className="!text-sm !text-primary"
            />

            <p className="text-success font-semibold">
              5.0 / {averageRating.toFixed(1)}
            </p>
          </div>
          <h3 className="text-5xl font-bold text-success mt-2">
            {reviews.length}
          </h3>
          <p className="text-primary font-bold flex justify-center items-center gap-1 mt-2">
            TOTAL USER REVIEWS <TiArrowRightThick />
          </p>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          className="btn primary_btn !h-12 !rounded-full !mt-7"
        >
          Add REVIEW
        </Button>
      </div>
    </section>
  );
};

export default TestimonialSection;
