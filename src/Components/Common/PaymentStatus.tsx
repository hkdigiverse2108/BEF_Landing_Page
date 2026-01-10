import { InfoCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { IoCall, IoClose } from "react-icons/io5";
import { LuCircleDashed } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import { CONTACT, LOGIN_URL } from "../../Data";

const PaymentStatus = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const orderId = queryParam.get("orderId");
  const type = queryParam.get("type");

  const { data: workshop, isLoading: workshopLoading } = useGetApiQuery({ url: `${URL_KEYS.WORKSHOP.REGISTER}${orderId}` }, { skip: type !== "workshop" });
  const { data: courser, isLoading: courseLoading } = useGetApiQuery({ url: `${URL_KEYS.COURSE.PURCHASE}${orderId}` }, { skip: type !== "course" });
  const paymentId = workshop?.data?.paymentId || courser?.data?.paymentId;

  const { data: LectureData, isLoading: LectureLoading } = useGetApiQuery({ url: `${URL_KEYS.PHONEPE_ORDER.STATUS}${paymentId}` }, { skip: !paymentId });

  const { pageName = "", email = "", password = "", status = "" } = location?.state || {};

  const statusData = {
    pageName: pageName || workshop?.data?.userId?.pageName || courser?.data?.userId?.pageName,
    email: email || workshop?.data?.userId?.email || courser?.data?.userId?.email,
    password: password || workshop?.data?.userId?.showPassword || courser?.data?.userId?.showPassword,
    status: status || LectureData?.data,
  };

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
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl text-center border border-gray-200">
        {workshopLoading || courseLoading || LectureLoading ? (
          <div className="flex justify-center mb-3">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-4xl animate-spin">
                <LuCircleDashed  />
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Success Icon */}
            <div className="flex justify-center mb-3">
              {statusData.status === "COMPLETED" ? (
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-4xl">✔</span>
                </div>
              ) : (
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-4xl">
                    <IoClose />
                  </span>
                </div>
              )}
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl font-semibold text-gray-800">{statusData.status === "COMPLETED" ? "Payment Successful" : "Payment Failed"}</h1>

            {/* Login Details Box */}
            {statusData.status === "COMPLETED" && statusData?.email && statusData?.password && (
              <>
                <p className="text-gray-500 mt-2">Your login details are given below</p>
                <div className="mt-6 bg-green-50 px-4 py-3 rounded-lg border border-green-200 text-left">
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">LOGIN ID:</span> {statusData.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">PASSWORD:</span> {statusData.password}
                  </p>
                </div>
              </>
            )}
            {/* Info Note */}
            {statusData.status === "COMPLETED" ? (
              <div className="mt-3 bg-green-50 px-4 py-3 rounded-lg border border-green-200 flex justify-center items-center gap-2 text-gray-700">
                <InfoCircleFilled className="text-green-600! text-2xl" />
                <span className="font-medium">The same login details have also been sent to your WhatsApp.</span>
              </div>
            ) : (
              <div className="mt-3 bg-red-50 px-4 py-3 rounded-lg border border-red-200 flex justify-center items-center gap-2 text-gray-700">
                <InfoCircleFilled className="text-red-600! text-2xl" />
                <span className="font-medium">Back To Home Page And Try Again Later.</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              {statusData.status === "COMPLETED" ? (
                <>
                  <NavLink target="_blank" to={`${LOGIN_URL}login${statusData.email && statusData.password ? `?email=${statusData.email}&password=${statusData.password}` : ""}`}>
                    <Button type="primary" className="btn primary_btn !h-12 ">
                      Start {statusData.pageName || "Learning"}
                    </Button>
                  </NavLink>

                  <Link to={`tel:${CONTACT?.NUMBER}`} className="flex flex-nowrap gap-2 cursor-pointer !text-black">
                    <Button type="primary" className="btn border-primary_btn !h-12 ">
                      <IoCall className="me-2 text-lg text-success" />
                      Contact Us
                    </Button>
                  </Link>
                </>
              ) : (
                <NavLink to={ROUTES.HOME}>
                  <Button type="primary" className="btn primary_btn !h-12 ">
                    Back To Home
                  </Button>
                </NavLink>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
