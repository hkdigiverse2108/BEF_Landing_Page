import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";
import { useEffect } from "react";
import Aos from "aos";
import { ROUTES, URL_KEYS } from "../Constants";
import WhatsappIcon from "../Components/Common/WhatsappIcon";
import { useGetApiQuery } from "../Api/CommonApi";
import {
  setworkshopLoading,
  setWorkshops,
} from "../Store/Slices/WorkshopSlice";
import { useAppDispatch } from "../Store/Hook";

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { data: workshopData, isLoading: workshopLoading } = useGetApiQuery({
    url: `${URL_KEYS.WORKSHOP.ALL}`,
  });
  const workshop = workshopData?.data?.workshop_data || [];

  const isShow =
    location.pathname.startsWith(ROUTES.COURSE.DETAILS.replace("/:id", "")) ||
    location.pathname === ROUTES.WORKSHOP.WORKSHOP;

  useEffect(() => {
    dispatch(setWorkshops(workshop));
    dispatch(setworkshopLoading(workshopLoading));
  }, [workshopLoading]);

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
      <WhatsappIcon />
    </>
  );
};

export default Layout;
