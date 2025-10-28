import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";
import { useEffect } from "react";
import Aos from "aos";
import { ROUTES } from "../Constants";

const Layout = () => {
  const location = useLocation();

  const isShow = location.pathname.startsWith(ROUTES.COURSE.DETAILS.replace("/:id", "")) || location.pathname === ROUTES.WORKSHOP.WORKSHOP;

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: "ease-in-out",
      offset: 150,
    });

    setTimeout(() => Aos.refresh(), 500);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className={`${isShow ? "!mt-3" : "!mt-30 sm:!mt-36 mb-12"} `}>
        <Outlet />
      </div>
      {isShow ? <div className="mt-45 sm:mt-55 md:mt-30  "></div> : <Footer />}
      <GoTop />
    </>
  );
};

export default Layout;
