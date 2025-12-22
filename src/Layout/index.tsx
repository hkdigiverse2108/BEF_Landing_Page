import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";
import { Suspense, useEffect } from "react";
import Aos from "aos";
import { ROUTES, URL_KEYS } from "../Constants";
import WhatsappIcon from "../Components/Common/WhatsappIcon";
import { useGetApiQuery } from "../Api/CommonApi";
import { setworkshopLoading, setWorkshops } from "../Store/Slices/WorkshopSlice";
import { useAppDispatch, useAppSelector } from "../Store/Hook";
import YoutubeVideoModal from "../Components/Common/YoutubeVideoModal";
import Loader from "../Components/Common/Loader";

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { modalVideoLink, modalVideoPlay } = useAppSelector((state) => state.VideoModal);

  const { data: workshopData, isLoading: workshopLoading } = useGetApiQuery({
    url: `${URL_KEYS.WORKSHOP.ALL}`,
  });
  const workshop = workshopData?.data?.workshop_data || [];

  const isShow = location.pathname.startsWith(ROUTES.COURSE.DETAILS.replace("/:id", "")) || location.pathname === ROUTES.WORKSHOP.WORKSHOP;

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
      <Suspense fallback={<Loader />}>
        <div className={`${isShow ? "!mt-10" : "!mt-30 sm:!mt-46 mb-12"} `}>
          <Outlet />
        </div>
      </Suspense>
      {isShow ? <div className="mt-45 sm:mt-55 md:mt-30  "></div> : <Footer />}
      <GoTop />
      <WhatsappIcon />
      <YoutubeVideoModal playVideo={modalVideoPlay} videoLink={modalVideoLink} />
    </>
  );
};

export default Layout;
