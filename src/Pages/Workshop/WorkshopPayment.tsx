import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, LectureType, WorkshopType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { HTTP_STATUS, ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

const WorkshopPayment = () => {
  const [refferCode, setRefferCode] = useState("BHARATEXAMFEST");
  const [isApplyed, setIsApplyed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [PostApi] = usePostApiMutation({});

  const {
    formValues,
    workshop,
  }: { formValues: FormValues; workshop: WorkshopType } = location.state || {};

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${workshop?._id}`,
  });

  const Lectures = data?.data?.lecture_data;

  const {
    title = "Workshop",
    discountAmount = 0,
    totalAmount = 0,
  } = workshop || {};

  const RegisterWorkshop = async () => {
    try {
      const payload = {
        ...formValues,
        paymentDate: new Date().toISOString(),
        workshopId: workshop?._id,
        payingPrice: isApplyed ? discountAmount : totalAmount,
        discountPrice: discountAmount,
        price: totalAmount,
      };
      const res = await PostApi({
        url: URL_KEYS.WORKSHOP.REGISTER,
        data: payload,
      });
      if (res?.data?.status === HTTP_STATUS.OK) {
        navigate(ROUTES.PAYMENT.SUCCESS);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAplyyReferCode = async () => {
    if (!refferCode.trim()) {
      setIsApplyed(false);
      setError("Referral code is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        code: refferCode,
        amount: workshop?.totalAmount,
      };

      const res = await PostApi({
        url: URL_KEYS.REFERRAL.CHECK,
        data: payload,
      });

      const resData = res?.data?.data;

      if (resData?.isValid) {
        setIsApplyed(true);
        setError("");
      } else {
        setIsApplyed(false);
        setError("Invalid referral code");
      }
    } catch (error) {
      setIsApplyed(false);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReferralChange = (e: any) => {
    const value = e.target.value;
    setRefferCode(value);

    if (!value.trim()) {
      setIsApplyed(false);
      setError("");
    }
  };

  useEffect(() => {
    if (!formValues || !workshop) {
      navigate(ROUTES.WORKSHOP.WORKSHOP);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (refferCode) handleAplyyReferCode();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container flex max-lg:flex-col max-lg:items-center justify-between py-10 px-4 gap-5 h-fit">
      {/* Left Image */}
      <div className="order-2 lg:order-1 w-full h-full max-w-2xl flex items-center justify-center rounded-2xl ">
        <img
          src={`${ImagePath}Register/Payment_1.jpg`}
          alt="Workshop"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Right Details */}
      <div
        data-aos="fade-left"
        className="order-1 lg:order-2  bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-4 sm:p-10 w-full max-w-2xl "
      >
        <div className="flex flex-col max-lg:min-h-[680px] justify-between h-full text-gray-700 gap-20 text-sm sm:text-base">
          <section className="space-y-4">
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
              <div>
                <Search
                  placeholder="Referral Code"
                  value={refferCode}
                  onChange={handleReferralChange}
                  className="!py-1 placeholder:!font-medium rounded-lg !w-fit"
                  // allowClear
                  onClear={() => setIsApplyed(false)}
                  loading={loading}
                  // enterButton={isApplyed ? "Applied" : "Apply"}
                  enterButton={
                    isApplyed ? (
                      <span className="flex items-center gap-1">
                        <CheckCircleOutlined /> Applied
                      </span>
                    ) : (
                      "Apply"
                    )
                  }
                  size="large"
                  onSearch={() => {
                    if (!refferCode.trim()) {
                      setIsApplyed(false);
                      return;
                    }
                    handleAplyyReferCode();
                  }}
                />
                {error && <p className="text-red-500 text-xs mt-1 ">{error}</p>}
              </div>
            </div>
            {isApplyed && (
              <div className="bg-success/10 border border-success/30 p-3 space-y-1 rounded-lg">
                <p className=" ">Offer Applied</p>
                <p className="text-success font-medium">
                  Pay just enrollment fee — Remaining after prelims cleared.
                </p>
              </div>
            )}
          </section>
          <section>
            {isApplyed && (
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
                  {isApplyed ? (
                    <span className="font-semibold">₹{discountAmount}</span>
                  ) : (
                    <span>₹{totalAmount}</span>
                  )}
                </span>
              </p>
              <p className="flex justify-between mt-1 mb-3 font-semibold sm:text-lg">
                Total (Incl. of all taxes):{" "}
                <span className="">
                  {isApplyed ? (
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
              </p>
              {(isApplyed && discountAmount > 0) ||
              (!isApplyed && totalAmount > 0) ? (
                <PaymentModule
                  values={formValues}
                  title={title}
                  amount={{
                    payingPrice: isApplyed ? discountAmount : totalAmount,
                    discountPrice: discountAmount,
                    price: totalAmount,
                  }}
                  type="workshop"
                  itemData={workshop}
                  referralCode={refferCode}
                  apiUrl={URL_KEYS.WORKSHOP.REGISTER}
                />
              ) : (
                <button
                  onClick={RegisterWorkshop}
                  className="btn primary_btn w-full h-12 font-semibold mt-4"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default WorkshopPayment;
