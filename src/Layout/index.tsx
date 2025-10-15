import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <GoTop />
      <Footer />
    </>
  );
};

export default Layout;
