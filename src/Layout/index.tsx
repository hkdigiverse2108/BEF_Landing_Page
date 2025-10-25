import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";
import { useEffect } from "react";
import Aos from "aos";
import { ROUTES } from "../Constants";

const Layout = () => {
  const location = useLocation();

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

  return (
    <>
      <Header />
      <div className="!mt-30 sm:!mt-36 mb-12">
        <Outlet />
      </div>
      <GoTop />
      {location.pathname === ROUTES.COURSE.DETAILS ||
      location.pathname === ROUTES.WORKSHOP.WORKSHOP? (
        <div className="mt-45 sm:mt-55 md:mt-30  "></div>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
