import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, EffectCards } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "aos/dist/aos.css";
import SectionHeader from "./SectionHeader";
import { Rate } from "antd";
import type { Testimonial } from "../../Types";

const TestimonialSection = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const swiperRefs = useRef<SwiperType>(null);

  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const averageRating =
    testimonials.length > 0
      ? Number((total / testimonials.length).toFixed(1))
      : 0;

  const startValue = Math.round(averageRating * 2) / 2;

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
                  return `<span class="${className}"></span>`;
                }
                return "";
              },
            }}
            onSwiper={(swiper) => {
              swiperRefs.current = swiper;
            }}
            className="!overflow-hidden max-w-md mx-auto flex justify-center !pb-2"
          >
            {testimonials?.map((review: Testimonial, index: number) => (
              <SwiperSlide key={index}>
                <div className=" flex flex-col items-center p-3 sm:p-10 rounded-lg ">
                  <div className="flex items-center justify-center my-5 gap-1">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={review?.rating}
                      className="!text-sm !text-primary"
                    />
                  </div>
                  <p className="text-center ">“ {review.description} ”</p>
                  <figure className="h-35 w-35 rounded-full mt-7 overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={review.image}
                      alt="userImage1"
                    />
                  </figure>
                  <h2 className="text-lg font-medium my-2 ">{review.name}</h2>
                  <p className="text-sm ">{review.designation}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="hidden sm:block">
            <div className=" h-full absolute left-0 top-0 flex flex-col justify-between items-end">
              {testimonials
                ?.slice(0, 3)
                .map((url: Testimonial, index: number) => {
                  return (
                    <img
                      src={url.image}
                      alt={url?.image}
                      key={index}
                      className={`rounded-full ${
                        index === 1 ? "me-15 w-20" : "w-14"
                      } `}
                    />
                  );
                })}
            </div>

            <div className=" h-full absolute right-0 top-0 flex flex-col justify-between items-start">
              {testimonials
                ?.slice(3, 6)
                .map((url: Testimonial, index: number) => {
                  return (
                    <img
                      src={url.image}
                      alt={url?.image}
                      key={index}
                      className={`rounded-full ${
                        index === 1 ? "ms-15 w-20" : "w-14"
                      } `}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* Total Reviews */}
        <div>
          <div className="flex justify-center items-center !space-x-3  text-lg mt-6 ">
            <Rate
              disabled
              allowHalf
              defaultValue={startValue}
              className="!text-sm !text-primary"
            />

            <p className="text-success font-semibold">{averageRating} /5.0 </p>
          </div>
          <h3 className="text-5xl font-bold text-success mt-2">
            {testimonials?.length}
          </h3>
          <p className="text-primary font-bold flex justify-center items-center gap-1 mt-2">
            TOTAL USER REVIEWS
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
