import { useLocation, useNavigate } from "react-router-dom";
import type {
  FormValues,
  LectureType,
  PaymentStatusType,
  RazorpayResponse,
  WorkshopType,
} from "../../Types";
import {
  HTTP_STATUS,
  ImagePath,
  ROUTES,
  URL_KEYS,
} from "../../Constants";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import CouponCodeCheck from "../../Components/Common/CouponCodeCheck";
import PaymentModal from "../../Components/Common/PaymentModal";

const WorkshopPayment = () => {
  const [refferCode, setRefferCode] = useState("");
  const [isRefferLoading, setIsRefferLoading] = useState(false);
  const [isRefferApplyed, setIsRefferApplyed] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [PostApi] = usePostApiMutation({});

  const {
    formValues,
    workshop,
  }: { formValues: FormValues; workshop: WorkshopType } = location.state || {};
  console.log("formValues", formValues);

  const { data: LectureData, isLoading: isLecturesLoading } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${workshop?._id}`,
  });

  const Lectures = LectureData?.data?.lecture_data;

  const {
    title = "Workshop",
    discountAmount = 0,
    totalAmount = 0,
  } = workshop || {};

  const handlePaymentComplete = async (
    status: PaymentStatusType,
    response: RazorpayResponse,
    RazorPayKey?: string
  ) => {
    try {
      // console.log("Payment Status:", status);
      // console.log("Payment Response:", response);

      const payload = {
        workshopRegisterId: formValues?.workshopRegisterId,
        workshopId: workshop?._id,
        name: formValues?.name,
        payingPrice: amountToPay,
        discountPrice: discountAmount,
        price: totalAmount,

        phone: formValues?.phone,
        city: formValues?.city,
        paymentDate: new Date().toISOString(),
        email: formValues?.email,
        merchantId: RazorPayKey,
        paymentId: response.razorpay_payment_id,
        referralCode: refferCode,
        reachFrom: formValues?.reachFrom,
        status,
      };

      const res = await PostApi({
        url: URL_KEYS.WORKSHOP.REGISTER_EDIT,
        data: payload,
      }).unwrap();
      console.log("res : ", res);

      if (res?.status === HTTP_STATUS.OK) {
        navigate(ROUTES.PAYMENT.SUCCESS);
      }
    } catch (error) {}
  };

  const amountToPay = isRefferApplyed
    ? Number(discountAmount)
    : Number(totalAmount);

  // const amountToPay = 0;

  useEffect(() => {
    if (!formValues || !workshop) {
      navigate(ROUTES.WORKSHOP.WORKSHOP);
    }
  }, [refferCode]);

  return (
    <section className="container flex max-lg:flex-col max-lg:items-center justify-between py-10 px-4 gap-5 h-fit">
      {/* Left Image */}
      <div
        data-aos="fade-right"
        className="order-2 lg:order-1 w-full h-full max-w-2xl flex items-center justify-center rounded-2xl "
      >
        <img
          src={`${ImagePath}Register/Payment_2.jpg`}
          alt={"Payment"}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full rounded-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Right Details */}
      <div
        data-aos="fade-left"
        className="order-1 lg:order-2  bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-4 sm:p-10 w-full max-w-2xl "
      >
        <div className="flex flex-col max-lg:min-h-[680px] justify-between h-full text-gray-700 gap-20 text-sm sm:text-base">
          {isLecturesLoading ? (
            <Skeleton.Node active style={{ width: 590, height: 160 }} />
          ) : (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <div>
                <strong className="text-2xl font-semibold text-primary">
                  Lectures Name{" "}
                </strong>
                <ul>
                  {Lectures?.map((lecture: LectureType, index: number) => (
                    <li key={index} className="text-sm text-gray-800">
                      {index + 1}. {lecture?.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap justify-between h-fit gap-2">
                <p className="font-medium ">Referral Code: </p>
                <CouponCodeCheck
                  setIsRefferLoading={setIsRefferLoading}
                  price={totalAmount}
                  isRefferApplyed={isRefferApplyed}
                  setIsRefferApplyed={setIsRefferApplyed}
                  refferCode={refferCode}
                  setRefferCode={setRefferCode}
                />
              </div>
              {/* {isRefferApplyed && (
                <div className="bg-success/10 border border-success/30 p-3 space-y-1 rounded-lg">
                  <p className=" ">Offer Applied</p>
                  <p className="text-success font-medium">
                    Pay just enrollment fee — Remaining after prelims cleared.
                  </p>
                </div>
              )} */}
            </section>
          )}

          <section>
            {isRefferApplyed && (
              <div className=" flex  justify-between gap-5">
                <p className=" font-semibold">Discount</p>
                <p className="text-success font-semibold">
                  -{Number(totalAmount) - Number(discountAmount)}{" "}
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-2 ">
              <p className="flex justify-between">
                <strong>Enrollment Fee:</strong>{" "}
                <span className="font-semibold">
                  {" "}
                  {isRefferApplyed ? (
                    <span className="font-semibold">₹{discountAmount}</span>
                  ) : (
                    <span>₹{totalAmount}</span>
                  )}
                </span>
              </p>
              <div className="flex justify-between mt-1 mb-3 font-semibold sm:text-lg">
                Total (Incl. of all taxes):{" "}
                <span>
                  {isRefferApplyed ? (
                    <h1 className="  flex gap-[2px] items-end">
                      <span>₹{discountAmount}</span>
                      <span className=" text-red-500 text-base font-semibold line-through decoration-2 ps-1">
                        {totalAmount}
                      </span>
                    </h1>
                  ) : (
                    <span>₹{totalAmount}</span>
                  )}
                </span>
              </div>

              <PaymentModal
                btnText="Enroll Now"
                isLoading={isRefferLoading}
                amount={amountToPay}
                onPaymentComplete={handlePaymentComplete}
                userData={{
                  name: formValues?.name,
                  email: formValues?.email,
                  contact: formValues?.phone,
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default WorkshopPayment;
