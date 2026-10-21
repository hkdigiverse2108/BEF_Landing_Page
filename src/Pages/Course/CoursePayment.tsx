import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, CourseType, PaymentStatusType, RazorpayResponse } from "../../Types";
import { HTTP_STATUS, ImagePath, PAYMENT_STATUS, ROUTES, URL_KEYS } from "../../Constants";
import { Button, Skeleton } from "antd";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { useEffect, useState } from "react";
import PaymentModal from "../../Components/Common/PaymentModal";
import CouponCodeCheck from "../../Components/Common/CouponCodeCheck";
import { getMockTestReward, isLastPrelimsCourse, type MockTestReward } from "../../Utils/mockTestReward";

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [PostApi] = usePostApiMutation();
  const { formValues, course }: { formValues: FormValues; course: CourseType } = location.state || {};

  const isLastPrelims = isLastPrelimsCourse(course);
  const mockReward: MockTestReward | null = isLastPrelims
    ? (course as any)?.mockReward || getMockTestReward()
    : null;
  const scoreDiscount = isLastPrelims && mockReward && mockReward.scoreDiscount ? Number(mockReward.scoreDiscount) : 0;

  const [refferCode, setRefferCode] = useState("");
  const [isRefferLoading, setIsRefferLoading] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isRefferApplyed, setIsRefferApplyed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: modulesData, isLoading: isModuleLoading } = useGetApiQuery({ url: `${URL_KEYS.MODULE.ALL}?courseFilter=${course?._id}` }, { skip: !course?._id });
  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const isRazorpay = settingData?.data?.isRazorpay;

  const Modules = modulesData?.data?.module_data || [];

  let { title = "Course Name", priceInStruction = "", discountPrice = 0, payingPrice = 0, price = 0 } = course || {};

  const isDiscountPrice = !!course?.discountPrice;
  discountPrice = discountPrice === 0 ? price : discountPrice;

  // Base payable:
  // If referral is applied: payingPrice
  // If no referral:
  //   For Last Prelims: payingPrice (₹6,999 base enrollment)
  //   Otherwise: discountPrice || price
  const basePayable = isRefferApplyed
    ? Number(payingPrice)
    : isLastPrelims
    ? Number(payingPrice || discountPrice || price)
    : Number(discountPrice || price);

  // Final amount to pay after deducting mock test score discount (Last Prelims only):
  const amountToPay = Math.max(0, basePayable - scoreDiscount);

  const handlePaymentComplete = async (status: PaymentStatusType, response: RazorpayResponse) => {
    try {
      const payload = {
        purchaseId: formValues?.purchaseId,
        paymentId: response.razorpay_payment_id,
        status,
        amount: amountToPay,
        referralCode: refferCode,
        courseId: course._id,
        name: formValues.name,
        phone: formValues.phone,
        email: formValues.email,
        city: formValues.city,
        pincode: formValues.pincode,
        reachFrom: formValues.reachFrom,
      };

      const res = await PostApi({
        url: URL_KEYS.COURSE.REGISTER_EDIT,
        data: payload,
      }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        navigate(`${ROUTES.PAYMENT.STATUS}?orderId=${formValues?.purchaseId}&type=course`);
      }
    } catch (error) {}
  };

  const handleStartPayment = async () => {
    setIsPaymentProcessing(true);
    try {
      if (amountToPay <= 0) {
        const payload = {
          purchaseId: formValues?.purchaseId,
          status: PAYMENT_STATUS.COMPLETED,
          amount: amountToPay,
          referralCode: refferCode,
          courseId: course._id,
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email,
          city: formValues.city,
          pincode: formValues.pincode,
          reachFrom: formValues.reachFrom,
        };

        const res = await PostApi({
          url: URL_KEYS.COURSE.REGISTER_EDIT,
          data: payload,
        }).unwrap();
        if (res?.status === HTTP_STATUS.OK) {
          navigate(`${ROUTES.PAYMENT.STATUS}?orderId=${formValues?.purchaseId}&type=course`);
        }
      } else {
        const res = await PostApi({
          url: URL_KEYS.PHONEPE_ORDER.ADD,
          data: {
            amount: amountToPay,
            orderId: formValues?.purchaseId,
            redirectUrl: `${window.location.origin + ROUTES.PAYMENT.STATUS}?orderId=${formValues?.purchaseId}&type=course`,
          },
        }).unwrap();
        const paymentUrl = res?.data?.paymentUrl;

        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          setIsPaymentProcessing(false);
          throw console.error("Payment URL not found");
        }
      }
    } catch (error) {
      setIsPaymentProcessing(false);
    }
  };

  useEffect(() => {
    if (!formValues || !course) {
      navigate(ROUTES.COURSE.COURSE);
    }
  }, []);

  return (
    <section className="container flex max-lg:flex-col max-lg:items-center justify-between py-10 px-4 gap-5 h-full">
      {/* Left Image Box */}
      <div data-aos="fade-right" className="order-2 lg:order-1 w-full max-w-2xl flex items-center justify-center rounded-2xl">
        <img src={`${ImagePath}Register/Payment_1.jpg`} alt={"Payment"} onLoad={() => setImageLoaded(true)} className={`w-full h-full rounded-xl transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Right Summary Box */}
      <div data-aos="fade-left" className="order-1 lg:order-2  bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-4 sm:p-10 w-full max-w-2xl">
        <div className="flex flex-col max-lg:min-h-[680px] justify-between h-full text-gray-700 gap-20 text-sm sm:text-base">
          {isModuleLoading ? (
            <Skeleton.Node active style={{ width: 590, height: 160 }} />
          ) : (
            <section className="space-y-6 ">
              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-primary">{title}</h2>
                <div>
                  <strong>Module Name </strong>
                  <ul className="w-full text-sm  grid grid-cols-1  sm:grid-cols-2 sm:flex-row gap-1 sm:gap-2">
                    {Modules?.map((module: { name: string }, i: number) => (
                      <li key={i}>
                        {i + 1}. {module.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              <div className="flex flex-wrap justify-between h-fit gap-2">
                <p className="font-medium ">Referral Code: </p>
                <CouponCodeCheck setIsRefferLoading={setIsRefferLoading} price={price} isRefferApplyed={isRefferApplyed} setIsRefferApplyed={setIsRefferApplyed} refferCode={refferCode} setRefferCode={setRefferCode} />
              </div>
              {scoreDiscount > 0 ? (
                <div className="bg-emerald-50 border border-emerald-300 p-3.5 space-y-1 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-emerald-950">
                      🏆 Mock Test Score Discount Applied
                    </span>
                    <span className="text-xs bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded-full">
                      -₹{scoreDiscount.toLocaleString()} OFF
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Candidate scored {mockReward?.score.toFixed(1)}/{mockReward?.totalMarks} in Mock Test
                  </p>
                </div>
              ) : isRefferApplyed && priceInStruction ? (
                <div className="bg-success/10 border border-success/30 p-3 space-y-1 rounded-lg">
                  <p className=" ">Offer Applied</p>
                  <p className="text-success font-medium">
                    {priceInStruction}
                  </p>
                </div>
              ) : null}
            </section>
          )}
          <section className="space-y-4">
            {isRefferApplyed && (
              <div className=" flex  justify-between gap-5">
                <p className=" font-semibold">Referral Discount</p>
                <p className="text-success font-semibold">-{isDiscountPrice ? Number(price) - Number(discountPrice) : Number(price) - Number(payingPrice)}</p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <p className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Enrollment Fee:</span>
                <span className="font-bold text-gray-900 text-lg">₹{basePayable.toLocaleString()}</span>
              </p>

              {scoreDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-800">
                  <span className="font-semibold">Mock Test Score Discount:</span>
                  <span className="font-bold text-emerald-700">-₹{scoreDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 font-semibold sm:text-lg">
                <span>Total (Incl. of all taxes):</span>
                <h1 className="flex gap-2 items-baseline">
                  <span className="text-primary font-black text-2xl">₹{amountToPay.toLocaleString()}</span>
                  {Number(price) > amountToPay && (
                    <span className="text-sm text-gray-400 line-through">₹{Number(price).toLocaleString()}</span>
                  )}
                </h1>
              </div>

              {isRazorpay ? (
                <PaymentModal
                  btnText="Enroll Now"
                  isLoading={isRefferLoading || isPaymentProcessing}
                  amount={amountToPay}
                  onPaymentComplete={handlePaymentComplete}
                  userData={{
                    name: formValues?.name,
                    email: formValues?.email,
                    contact: formValues?.phone,
                  }}
                />
              ) : (
                <Button
                  onClick={handleStartPayment}
                  disabled={isRefferLoading || isPaymentProcessing}
                  loading={isPaymentProcessing || isRefferLoading}
                  className="btn primary_btn w-full !h-12 font-semibold mt-4"
                >
                  Enroll Now
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CoursePayment;
