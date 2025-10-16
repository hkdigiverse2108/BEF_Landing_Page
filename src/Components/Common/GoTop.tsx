import { useEffect, useState } from "react";
import { ImagePath } from "../../Constants";

const GoTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isScrolled) {
    return (
      <div className="fixed bottom-0 right-2 sm:bottom-17 sm:right-8 z-10">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth", // makes it scroll smoothly
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
