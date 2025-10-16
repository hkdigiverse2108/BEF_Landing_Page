import { FaAngleDown } from "react-icons/fa";
import { ImagePath, ROUTES } from "../Constants";
import { HeaderItems } from "../Data";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50">
      <header
        className={`  ${
          isScrolled ? "bg-white/55 backdrop-blur-md" : "md:pt-6"
        } `}
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
            {HeaderItems.map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <NavLink
                  to={item?.link || ""}
                  className={`flex gap-1 items-center text-lg font-medium text-gray-800 hover:text-primary transition  px-3 py-2 rounded-t-lg  ${
                    item?.child ? "group-hover:bg-white hover:shadow-md  " : ""
                  } `}
                >
                  {item.Title}
                  {item.child && <FaAngleDown />}
                </NavLink>

                {item.child && (
                  <ul
                    className="absolute left-0 bg-white shadow-xl rounded-tl-none rounded-xl  py-2 w-56 opacity-0 group-hover:opacity-100 group-hover:visible invisible
                  transition-all duration-300  translate-y-2 group-hover:translate-y-0 z-50"
                  >
                    {item.child.map((sub, subIndex) => (
                      <NavLink key={subIndex} to={sub.link}>
                        <li className="!px-4 !py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition rounded-md">
                          {sub.Title}
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <button onClick={() => setMenuOpen(!menuOpen)} className="uppercase text-primary font-bold border px-5 py-1 rounded-2xl border-gray-500 ">
              Login
            </button>
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
        {HeaderItems.map((item, index) => (
          <div key={index} className="relative group cursor-pointer">
            {/* Main Menu Item */}
            <div
              className={`flex gap-1 items-center font-medium text-gray-800 hover:text-primary transition px-2 md:px-4 py-2 rounded-t-lg ${
                item?.child
                  ? "lg:group-hover:bg-white lg:hover:shadow-md justify-between"
                  : ""
              }`}
              onClick={() => setSubMenu(subMenu === index ? 0 : index)}
            >
              {item.Title}
              {item.child && <FaAngleDown />}
            </div>

            {/* Dropdown Menu (animated open/close) */}
            {item.child && (
              <ul
                className={`lg:hidden flex flex-col bg-white gap-1 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out origin-top ${
                  subMenu === index
                    ? "max-h-[500px] opacity-100 scale-y-100"
                    : "max-h-0 opacity-0 scale-y-0"
                }`}
              >
                {item.child.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition rounded-md"
                  >
                    {sub.Title}
                  </li>
                ))}
              </ul>
            )}

            {/* {item.child && (
              <ul className="absolute left-0 bg-white shadow-xl rounded-xl py-2 w-56 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                {item.child.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition rounded-md"
                  >
                    {sub.Title}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
