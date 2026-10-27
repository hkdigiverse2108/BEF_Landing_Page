import { ImagePath } from "../Constants";
import { ROUTES } from "../Constants/Routes";
import { Link } from "react-router-dom";
import AnimationLine from "../Components/Common/AnimationLine";
import { CONTACT, Help_Support, HK_DIGIVERSE_URL, SOCIAL_MEDIA, FOOTER_COURSES, FOOTER_BLOG_CATEGORIES } from "../Data";

const Footer = () => {
  return (
    <footer className="bg-primary text-white relative ">
      {/* Vertical Line Animation */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimationLine />
      </div>
      <div className=" container container-p mx-auto py-12 md:py-20 px-5 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {/* Column 1: Brand & Contact Info */}
        <div className="space-y-6 md:space-y-10">
          {/* Logo */}
          <div className="flex flex-col items-start gap-2">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <img src={`${ImagePath}logo/logo.png`} alt="Achiwon" className="h-7 sm:h-8 w-auto object-contain" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-white">UPSC & GPSC CSE</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-sm sm:text-base">
            <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT?.EMAIL_INFO}`} target="_blank" rel="noopener noreferrer" className="block hover:underline">
              {CONTACT?.EMAIL_INFO}
            </Link>
            <Link to={`tel:${CONTACT?.NUMBER}`} className="flex items-center gap-2 hover:underline">
              {CONTACT?.NUMBER}
            </Link>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT?.ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              {CONTACT?.ADDRESS}
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {SOCIAL_MEDIA?.map((item) => {
              const Icon = item?.icon;
              return (
                <Link key={item?.title} to={item?.link} target="_blank" rel="noopener noreferrer" aria-label={item?.title} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition">
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2: UPSC Courses */}
        <div className="space-y-6 md:space-y-10">
          <h4 className="text-lg md:text-2xl font-bold">UPSC Courses</h4>
          <ul className="space-y-3.5 text-sm sm:text-base">
            {FOOTER_COURSES.map((course, idx) => (
              <li key={idx}>
                <Link to={course.path} className="hover:text-[#F48224] transition-colors">
                  {course.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={ROUTES.COURSE.COURSE} className="inline-flex items-center gap-1 font-semibold text-[#F48224] hover:underline">
                <span>View All Courses</span>
                <span>→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links & Blogs */}
        <div className="space-y-6 md:space-y-10">
          <h4 className="text-lg md:text-2xl font-bold">Quick Links</h4>
          <ul className="space-y-3.5 text-sm sm:text-base">
            <li>
              <Link to={ROUTES.PYQ} className="inline-flex items-center gap-2 font-bold text-[#F48224] hover:text-white transition">
                <span>Previous Year Questions</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#F48224] text-white">
                  NEW
                </span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.FREE_PRACTICE} className="hover:underline">
                Free Mock Test
              </Link>
            </li>
            <li>
              <Link to={ROUTES.WORKSHOP.WORKSHOP} className="hover:underline">
                Workshops
              </Link>
            </li>
            {FOOTER_BLOG_CATEGORIES.map((blog, idx) => (
              <li key={idx}>
                <Link to={blog.path} className="hover:underline">
                  {blog.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Help & Support */}
        <div className="space-y-6 md:space-y-10">
          <h4 className="text-lg md:text-2xl font-bold">Help & Support</h4>
          <ul className="space-y-3.5 text-sm sm:text-base">
            {Help_Support.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: App Download */}
        {/* <div className=" space-y-6 md:space-y-12">
          <h4 className="text-lg md:text-2xl font-bold">Let’s Try Out</h4>
          <div className="flex flex-col gap-4">
            <img src={`${ImagePath}common/appstore_blue.png`} alt="App Store" className="px-4 py-2 bg-white rounded-lg w-36 sm:w-40 cursor-pointer" />
            <img src={`${ImagePath}common/googleplay_blue.png`} alt="Google Play" className="px-4 py-2 bg-white rounded-lg w-36 sm:w-40 cursor-pointer" />
          </div>
        </div> */}
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm sm:text-base bg-black border-t border-white/20 py-4">
        © Copyrights {new Date().getFullYear()} All rights reserved by{" "}
        <Link target="_blank" to={HK_DIGIVERSE_URL} className="font-medium underline ps-1">
          HK DigiVerse LLP.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
