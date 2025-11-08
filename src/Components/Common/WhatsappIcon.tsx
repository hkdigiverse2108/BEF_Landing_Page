import { ROUTES } from "../../Constants";
import { Link, useLocation } from "react-router-dom";
import { RiWhatsappFill } from "react-icons/ri";
import { CONTACT } from "../../Data";

const WhatsappIcon = () => {
  const location = useLocation();

  return (
    <div
      className={`fixed left-2 sm:bottom-17 sm:left-8 z-10 ${
        location.pathname === ROUTES.COURSE.DETAILS ||
        location.pathname === ROUTES.WORKSHOP.WORKSHOP
          ? "bottom-37"
          : "bottom-0"
      }`}
    >
      <Link
        to={`https://api.whatsapp.com/send?text=${CONTACT?.number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="!bg-amber- p-4"
      >
        <RiWhatsappFill className="text-5xl !text-green-500 cursor-pointer hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
};

export default WhatsappIcon;
