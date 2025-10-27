import { ImagePath } from "../Constants";
import { Link } from "react-router-dom";

import AnimationLine from "../Components/Common/AnimationLine";
import { Help_Support, Social_Icons } from "../Data";

const Footer = () => {
  return (
    <footer className="bg-primary text-white relative ">
      {/* Vertical Line Animation */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimationLine />
      </div>
      <div className=" container container-p mx-auto py-12 md:py-24 px-5 lg:px-10  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-12">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src={`${ImagePath}/logo/logo.png`} alt="BEF Logo" className="w-12 sm:w-16 object-contain" />
            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold">Bharat Exam Fest</h1>
              <p className="text-sm sm:text-base text-success">Learn & Earn</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5 text-sm sm:text-base">
            <p>info@bharatexamfest.com</p>
            <Link to="" className="flex items-center gap-2">
              +91 91063 60330
            </Link>
            <Link to="" className="flex items-center gap-2">
              S-251 Angle Business Center-2, Mota Varachha, Surat, Gujrat, India-394101
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {Social_Icons?.map((Icon, idx) => (
              <Link key={idx} to={""} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-orange-500 transition">
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Column: Help & Support */}
        <div className=" space-y-6 md:space-y-12">
          <h4 className="text-lg md:text-2xl font-bold">Help & Support</h4>
          <ul className="space-y-4 text-sm sm:text-base">
            {Help_Support.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: App Download */}
        <div className=" space-y-6 md:space-y-12">
          <h4 className="text-lg md:text-2xl font-bold">Let’s Try Out</h4>
          <div className="flex flex-col gap-4">
            <img src={`${ImagePath}common/appstore_blue.png`} alt="App Store" className="px-4 py-2 bg-white rounded-lg w-36 sm:w-40 cursor-pointer" />
            <img src={`${ImagePath}common/googleplay_blue.png`} alt="Google Play" className="px-4 py-2 bg-white rounded-lg w-36 sm:w-40 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm sm:text-base bg-black border-t border-white/20 py-4">
        © Copyrights 2024 All rights reserved by <span className="font-medium">HK DigiVerse LLP</span>.
      </div>
    </footer>
  );
};

export default Footer;
