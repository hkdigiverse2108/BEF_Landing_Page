import { Button } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONTACT, LOGIN_URL } from "../../Data";
import { IoCall } from "react-icons/io5";
import { useEffect } from "react";
import { InfoCircleFilled } from "@ant-design/icons";

const PaymentSuccess = () => {
  const location = useLocation();
  const { pageName = "", email = "", password = "" } = location?.state || {};
  console.log("pageName --> ", pageName);

  useEffect(() => {
    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();

      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center  px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center border border-gray-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-4xl">✔</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl font-semibold text-gray-800">Payment Successful</h1>

        {/* Login Details Box */}
        {email && password && (
          <>
            <p className="text-gray-500 mt-2">Your login details are given below:</p>
            <div className="mt-6 bg-green-50 px-4 py-3 rounded-lg border border-green-200 text-left">
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">LOGIN ID:</span> {email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">PASSWORD:</span> {password}
              </p>
            </div>
          </>
        )}

        {/* Info Note */}
        <div className="mt-3 bg-green-50 px-4 py-3 rounded-lg border border-green-200 flex items-center gap-2 text-gray-700">
          <InfoCircleFilled  className="text-green-600! text-2xl" />
          <span className="text-sm">The same login details have also been sent to your WhatsApp.</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <NavLink target="_blank" to={`${LOGIN_URL}login${email && password ? `?email=${email}&password=${password}` : ""}`}>
            <Button type="primary" className="btn primary_btn !h-12 ">
              Start {pageName || "Learning"}
            </Button>
          </NavLink>

          <Link to={`tel:${CONTACT?.NUMBER}`} className="flex flex-nowrap gap-2 cursor-pointer !text-black">
            <Button type="primary" className="btn border-primary_btn !h-12 ">
              <IoCall className="me-2 text-lg text-success" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
