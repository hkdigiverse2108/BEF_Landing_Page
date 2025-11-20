import { ROUTES } from "../../Constants";
import { Link, useLocation } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { CONTACT } from "../../Data";
import { Popover } from "antd";
import { IoCall } from "react-icons/io5";

const GlobalContactContent = () => {
  return (
    <div
      className="flex flex-col gap-4  transition-all duration-200 max-w-65  sm:max-w-90"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between space-y-2">
        <section className="space-y-1">
          <h1 className=" text-lg sm:text-xl font-semibold">
            Talk to a counsellor
          </h1>
          <p className="font-medium   ">
            Have doubts? Our support team will be happy to assist you!
          </p>
        </section>
        <MdSupportAgent className="text-5xl sm:text-7xl " />
      </div>
      <div className="space-y-2 font-semibold">
        <Link
          to={`tel:${CONTACT?.number}`}
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400 "
        >
          <IoCall className="me-2 text-xl text-success" />
          {CONTACT?.number.split("+91")}
        </Link>
        <Link
          to={`https://api.whatsapp.com/send?phone=${
            CONTACT?.number
          }&text=${encodeURIComponent(`I Need Help In Bharat Exam Fest Web`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400 "
        >
          <IoLogoWhatsapp className="me-2 text-xl text-success" /> Chat With Us
        </Link>
      </div>
    </div>
  );
};

const WhatsappIcon = () => {
  const { pathname } = useLocation();

  const isCourseDetails = pathname.startsWith(
    ROUTES.COURSE.DETAILS.replace(":id", "")
  );
  const isWorkshopDetails = pathname.startsWith(
    ROUTES.WORKSHOP.DETAILS.replace(":id", "")
  );

  return (
    <Popover
      placement="topRight"
      content={GlobalContactContent}
      trigger="click"
    >
      <div
        className={`fixed left-2 sm:bottom-17 sm:left-8 z-10  bg-primary p-3 sm:p-4 rounded-full group shadow-lg ${
          isCourseDetails || isWorkshopDetails
            ? "bottom-35 sm:bottom-20"
            : "bottom-0"
        }`}
      >
        <IoCall className="text-xl sm:text-3xl group-hover:animate-spin text-white! cursor-pointer  transition-transform" />
      </div>
    </Popover>
  );
};

export default WhatsappIcon;

// const WhatsappIcon = () => {
//   const location = useLocation();

//   return (
//     <div
//       className={`fixed left-2 sm:bottom-17 sm:left-8 z-10 ${
//         location.pathname === ROUTES.COURSE.DETAILS ||
//         location.pathname === ROUTES.WORKSHOP.WORKSHOP
//           ? "bottom-37"
//           : "bottom-0"
//       }`}
//     >
//       <Link
//         to={`https://api.whatsapp.com/send?phone=${
//           CONTACT?.number
//         }&text=${encodeURIComponent(
//           `I Need Help In Bharat Exam Fest Landing Page`
//         )}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="!bg-amber-300 relative"
//       >
//         <span className="absolute bottom-3 left-2 -z-10 bg-white p-4 rounded-full"></span>
//         <RiWhatsappFill className="text-5xl  !text-green-500 cursor-pointer hover:scale-110 transition-transform" />
//       </Link>
//     </div>
//   );
// };

// export default WhatsappIcon;
