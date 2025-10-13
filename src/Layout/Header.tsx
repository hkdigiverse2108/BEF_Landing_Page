import { FaAngleDown } from "react-icons/fa";
import { ImagePath } from "../Constants";
import { HeaderItems } from "../Data";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" ">
      <div className="container container-p py-6 flex justify-between items-center  ">
        {/* Logo */}
        <div className="flex gap-4 items-center">
          <figure className="w-12 sm:w-20 h-full">
            <img
              src={`${ImagePath}BEF_Logo.png`}
              alt="BEF-Logo"
              className="w-full h-full object-contain"
            />
          </figure>
          <section className="flex flex-col justify-center">
            <h1 className="text-sm sm:text-2xl text-primary font-extrabold">
              Bharat Exam Fest
            </h1>
            <p className="text-xs sm:text-sm text-success ">Learn & Earn</p>
          </section>
        </div>

        {/* Menu Items */}
        <nav className="hidden lg:flex gap-1 items-center">
          {HeaderItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Main Menu */}
              <div
                className={`flex gap-1 items-center text-lg font-medium text-gray-800 hover:text-primary transition  px-4 py-2 rounded-t-lg  ${
                  item?.child ? "group-hover:bg-white hover:shadow-md  " : ""
                } `}
              >
                {item.Title}
                {item.child && <FaAngleDown />}
              </div>

              {/* Dropdown Menu */}
              {item.child && (
                <ul
                  className="absolute left-0 bg-white shadow-xl rounded-tl-none rounded-xl  py-2 w-56 opacity-0 group-hover:opacity-100 group-hover:visible invisible
                  transition-all duration-300  translate-y-2 group-hover:translate-y-0 z-50"
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
            </div>
          ))}
        </nav>

        <div className="block lg:hidden gap-1 items-center text-2xl ">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoClose /> : <RiMenu3Fill />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col bg-white gap-1 mx-5 p-4 rounded-2xl">
          {HeaderItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Main Menu */}
              <div
                className={`flex gap-1 items-center text-lg font-medium text-gray-800 hover:text-primary transition  px-4 py-2 rounded-t-lg  ${
                  item?.child ? "lg:group-hover:bg-white lg:hover:shadow-md justify-between" : ""
                } `}
              >
                {item.Title}
                {item.child && <FaAngleDown />}
              </div>

              {/* Dropdown Menu */}
              {item.child && (
                <ul
                  className="absolute left-0 bg-white shadow-xl rounded-tl-none rounded-xl  py-2 w-56 opacity-0 group-hover:opacity-100 group-hover:visible invisible
                  transition-all duration-300  translate-y-2 group-hover:translate-y-0 z-50"
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
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
