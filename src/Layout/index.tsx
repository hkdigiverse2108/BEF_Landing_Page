import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GoTop from "../Components/Common/GoTop";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="!mt-24 mb-12">
        <Outlet />
      </div>
      <GoTop />
      <Footer />
    </>
  );
};

export default Layout;
