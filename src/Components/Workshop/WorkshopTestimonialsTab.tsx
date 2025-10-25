import { Rate } from "antd";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const testimonials = [
  {
    id: 1,
    name: "David Smith",
    title: "Marketing Director",
    company: "DETOXY",
    msg: "Avada saves us time and money, we couldn’t have chosen a more effective reliable software.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "TECHIFY",
    msg: "An absolute game changer! Our team productivity increased by 40% after switching.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "CTO",
    company: "INNOVEX",
    msg: "Reliable, efficient, and beautifully designed — Avada has streamlined our workflows perfectly.",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: 4,
    name: "Emily Carter",
    title: "UX Designer",
    company: "CREOVO",
    msg: "I love how intuitive and smooth the experience is. It’s made my daily tasks effortless.",
    img: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 5,
    name: "Robert Wilson",
    title: "Operations Lead",
    company: "OPTIMAX",
    msg: "Their software integrates seamlessly with our tools. Support is top-notch too!",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const WorkshopTestimonialsTab = () => {
  const { data } = useGetApiQuery({ url: URL_KEYS.WORKSHOP.TESTIMONIAL });

  console.log("Workshop Testimonials : ", data);

  return (
    <div className="flex flex-col items-center justify-center gap-5 " data-aos="fade-up">
      {testimonials.map((t) => {
        const { msg, name, title, img } = t;
        return (
          <div className="bg-white flex flex-col sm:flex-row justify-between items-center rounded-xl p-4 sm:p-6 gap-2 sm:gap-6 border border-gray-200 w-full ">
            {/* Left Content */}
            <div className="order-2 sm:order-1 flex-1">
              {/* msg Icon */}
              <div className="text-3xl sm:text-6xl text-primary  font-serif ">
                <RiDoubleQuotesL />
              </div>

              {/* msg Text */}
              <p className="sm:text-lg mb-6">{msg}</p>

              {/* Author Info */}
              <div>
                <span className="flex max-sm:flex-col sm:gap-3 gap-1">
                  <p className="font-semibold ">{name}</p>
                  <span className="max-sm:hidden border-0.5 border-e border-gray-300  " />
                  <p className="text-sm ">{title}</p>
                </span>
                <p className="text-primary font-bold tracking-widest mt-2">
                  <Rate allowHalf defaultValue={5} className=" !text-primary" />
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-1 sm:order-2 flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary">
                <img src={img} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkshopTestimonialsTab;
