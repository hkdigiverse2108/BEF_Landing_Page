import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";
import { useEffect } from "react";
import Aos from "aos";

const Layout = () => {
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
      <div className="!mt-36 mb-12">
        <Outlet />
      </div>
      <GoTop />
      <Footer />
    </>
  );
};

export default Layout;
