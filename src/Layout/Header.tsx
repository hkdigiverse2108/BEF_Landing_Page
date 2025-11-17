import { ImagePath, ROUTES } from "../Constants";
// import { HeaderItems, LOGIN_URL } from "../Data";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getHeaderItems } from "../Utils/getHeaderItems";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const menuItems = getHeaderItems();

  const isFixedException =
    location.pathname.startsWith(ROUTES.COURSE.DETAILS.replace("/:id", "")) ||
    location.pathname === ROUTES.WORKSHOP.WORKSHOP;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${isFixedException ? "relative" : "fixed top-0 w-full z-50"}`}
    >
      <header
        className={` ${
          !isFixedException && isScrolled
            ? "bg-white/55 backdrop-blur-md"
            : !isFixedException
            ? "md:pt-6"
            : ""
        }`}
      >
        <div className="container container-p py-4 flex justify-between items-center  ">
          {/* Logo */}
          <NavLink to={ROUTES.HOME} className="flex gap-4 items-center">
            <figure className="w-12 sm:w-18 h-full">
              <img
                src={`${ImagePath}/logo/logo.png`}
                alt="BEF-Logo"
                className="w-full h-full object-contain"
              />
            </figure>
            <section className="flex flex-col justify-center">
              <h1 className="text-sm sm:text-xl text-primary font-extrabold">
                Bharat Exam Fest
              </h1>
              <p className="text-xs sm:text-sm text-success">Learn & Earn</p>
            </section>
          </NavLink>

          {/* Menu Items */}
          <nav className="hidden lg:flex gap-6 items-center">
            {menuItems?.map((item, index) => (
              <NavLink
                onClick={() => setMenuOpen(!menuOpen)}
                key={index}
                to={item?.link || ""}
                className={`flex gap-1 cursor-pointer items-center text-lg font-medium text-gray-800 hover:text-primary transition  px-3 py-2 rounded-t-lg `}
              >
                {item.Title}
              </NavLink>
            ))}
            {/* <NavLink to={LOGIN_URL} target="_blank" rel="noopener noreferrer">
              <button onClick={() => setMenuOpen(!menuOpen)} className="btn primary_btn  w-full ">
                Login
              </button>
            </NavLink> */}
          </nav>

          <div className="block lg:hidden gap-1 items-center text-2xl ">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IoClose /> : <RiMenu3Fill />}
            </button>
          </div>
        </div>
      </header>
      {/* Animated Mobile Menu */}
      <div
        className={`lg:hidden flex flex-col bg-white gap-1 mt-2 mx-3 md:mx-5 p-4 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } origin-top`}
      >
        {menuItems?.map((item, index) => (
          <NavLink
            onClick={() => setMenuOpen(!menuOpen)}
            key={index}
            to={item?.link || ""}
            className={`flex gap-1 cursor-pointer items-center font-medium text-gray-800 hover:text-primary transition px-2 md:px-4 py-2 rounded-t-lg`}
          >
            {item.Title}
          </NavLink>
        ))}
        {/* <NavLink to={LOGIN_URL} target="_blank" rel="noopener noreferrer">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn primary_btn  w-fit ">
            Login
          </button>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Header;
