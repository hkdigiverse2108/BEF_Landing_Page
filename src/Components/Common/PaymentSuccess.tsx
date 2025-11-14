import { Button, Result } from "antd";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { CONTACT } from "../../Data";
import { IoCall } from "react-icons/io5";
import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    // 🔙 Block Back Button only
    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();
      // alert("Please click One Button!");
      window.history.pushState(null, "", window.location.href);
    };
    // Back button trap
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Result
        status="success"
        title="Payment Success"
        subTitle="Back To Home Page And Start Learning"
        extra={[
          <div className="flex justify-center gap-2 ">
            <NavLink to={ROUTES.HOME}>
              <Button type="primary" className="btn primary_btn !h-12 ">
                Back To Home
              </Button>
            </NavLink>

            <Link
              to={`tel:${CONTACT?.number}`}
              className="flex flex-nowrap gap-2 cursor-pointer !text-black"
            >
              <Button type="primary" className="btn border-primary_btn !h-12 ">
                <IoCall className="me-2 text-lg text-success" />
                Contact Us
              </Button>
            </Link>
          </div>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
