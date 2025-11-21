import { useEffect, useState } from "react";
import { ImagePath, ROUTES } from "../../Constants";
import { useLocation } from "react-router-dom";

const GoTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const isCourseDetails = pathname.startsWith(
    ROUTES.COURSE.DETAILS.replace(":id", "")
  );
  const isWorkshopDetails = pathname.startsWith(
    ROUTES.WORKSHOP.DETAILS.replace(":id", "")
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isScrolled) {
    return (
      <div
        className={`fixed right-2 sm:bottom-17 sm:right-8 z-10 ${
          isCourseDetails || isWorkshopDetails
            ? "bottom-15 sm:bottom-20"
            : "bottom-0"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img
            src={`${ImagePath}go_top.png`}
            alt=""
            className="hover:-translate-y-1 transition-all duration-200 "
          />
        </button>
      </div>
    );
  }
};

export default GoTop;
