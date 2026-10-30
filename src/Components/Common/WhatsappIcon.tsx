import { useState, useEffect } from "react";
import { ImagePath, ROUTES } from "../../Constants";
import { Link, useLocation } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { CONTACT } from "../../Data";
import { Popover } from "antd";
import { IoCall } from "react-icons/io5";

const GlobalContactContent = () => {
  return (
    <div
      className="flex flex-col gap-4 transition-all duration-200 max-w-65 sm:max-w-90"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between space-y-2">
        <section className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold">
            Talk to a counsellor
          </h1>
          <p className="font-medium">
            Have doubts? Our support team will be happy to assist you!
          </p>
        </section>
        <MdSupportAgent className="text-5xl sm:text-7xl" />
      </div>
      <div className="space-y-2 font-semibold">
        <Link
          to={`tel:${CONTACT?.NUMBER}`}
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400"
        >
          <IoCall className="me-2 text-xl text-success" />
          {CONTACT?.NUMBER.split("+91")}
        </Link>
        <Link
          to={`https://api.whatsapp.com/send?phone=${
            CONTACT?.NUMBER
          }&text=${encodeURIComponent(`I Need Help In Achiwon Web`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-nowrap gap-2 cursor-pointer text-black! border p-2 rounded-md border-gray-200 hover:border-gray-400"
        >
          <IoLogoWhatsapp className="me-2 text-xl text-success" /> Chat With Us
        </Link>
      </div>
    </div>
  );
};

const WhatsappIcon = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const isCourseDetails = pathname.startsWith(
    ROUTES.COURSE.DETAILS.replace(":id", "")
  );
  const isWorkshopDetails = pathname.startsWith(
    ROUTES.WORKSHOP.DETAILS.replace(":id", "")
  );
  const isBottomBarPage = isCourseDetails || isWorkshopDetails;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const baseBottom = isBottomBarPage
    ? "bottom-20 sm:bottom-24"
    : "bottom-4 sm:bottom-6";

  return (
    <div
      className={`fixed right-4 sm:right-6 ${baseBottom} z-30 w-[50px] h-[50px] sm:w-[52px] sm:h-[52px] pointer-events-none select-none`}
    >
      {/* Call Button (Counsellor / WhatsApp Popover) */}
      <Popover
        placement="topLeft"
        content={GlobalContactContent}
        trigger="click"
      >
        <div
          className={`absolute bottom-0 right-0 w-[50px] h-[50px] sm:w-[52px] sm:h-[52px] transition-all duration-300 ease-in-out pointer-events-auto ${
            isScrolled
              ? "-translate-y-[62px] sm:-translate-y-[66px]"
              : "translate-y-0"
          }`}
        >
          <button
            type="button"
            className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
            title="Talk to Counsellor"
            aria-label="Talk to Counsellor"
          >
            <IoCall className="text-xl sm:text-2xl text-white transition-transform duration-300" />
          </button>
        </div>
      </Popover>

      {/* Go To Top (Arrow) Button */}
      <div
        className={`absolute bottom-0 right-0 w-[50px] h-[50px] sm:w-[52px] sm:h-[52px] transition-all duration-300 ease-in-out ${
          isScrolled
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-50 translate-y-3 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="w-full h-full rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
        >
          <img
            src={`${ImagePath}go_top.png`}
            alt="Scroll to top"
            className="w-full h-full object-contain pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
};

export default WhatsappIcon;
