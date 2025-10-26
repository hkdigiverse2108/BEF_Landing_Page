import { Rate } from "antd";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { Testimonial } from "../../Types";



const WorkshopTestimonialsTab = () => {
  const { data } = useGetApiQuery({ url: URL_KEYS.WORKSHOP.TESTIMONIAL });

  const testimonials = data?.data?.webinar_testimonial_data;

  return (
    <div className="flex flex-col items-center justify-center gap-5 " data-aos="fade-up">
      {testimonials?.map((t: Testimonial) => {
        const { description, name, designation, image, rating } = t;
        return (
          <div className="bg-white flex flex-col sm:flex-row justify-between items-center rounded-xl p-4 sm:p-6 gap-2 sm:gap-6 border border-gray-200 w-full ">
            {/* Left Content */}
            <div className="order-2 sm:order-1 flex-1">
              {/* description Icon */}
              <div className="text-3xl sm:text-6xl text-primary  font-serif ">
                <RiDoubleQuotesL />
              </div>

              {/* description Text */}
              <p className="sm:text-lg mb-6">{description}</p>

              {/* Author Info */}
              <div>
                <span className="flex max-sm:flex-col sm:gap-3 gap-1">
                  <p className="font-semibold ">{name}</p>
                  <span className="max-sm:hidden border-0.5 border-e border-gray-300  " />
                  <p className="text-sm ">{designation}</p>
                </span>
                <p className="text-primary font-bold tracking-widest mt-2">
                  <Rate disabled allowHalf defaultValue={rating} className=" !text-primary" />
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-1 sm:order-2 flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary">
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkshopTestimonialsTab;
