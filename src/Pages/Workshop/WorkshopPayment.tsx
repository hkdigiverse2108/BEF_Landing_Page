import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, LectureType, WorkshopType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { HTTP_STATUS, ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import FormInput from "../../Attribute/FormFields/FormInput";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

const audienceEnum = ["default", "telecaller", "user"];

const WorkshopPayment = () => {
  const [refferCode, setRefferCode] = useState("BHARATEXAMFEST");
  const [audience, setAudience] = useState(audienceEnum[0]);
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
  console.log(workshop);
  // const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  // console.log("data", settingData);

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
        // amount: isApplyed ? discountAmount : totalAmount,
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
        audience,
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

  const handleReferralChange = (e) => {
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
    <section className="container flex max-md:flex-col justify-between py-10 px-4 gap-5">
      {/* Left Image */}
      <div className="w-full max-w-2xl flex items-center justify-center rounded-2xl p-6">
        <img
          src={`${ImagePath}course/CourseModule.png`}
          alt="Workshop"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Details */}
      <div
        data-aos="fade-left"
        className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl"
      >
        <div className="flex flex-col justify-between h-full text-gray-700 text-sm sm:text-base">
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

            <div className="flex flex-nowrap justify-between h-fit gap-2">
              <p className="font-medium ">Referral Code: </p>
              <div>
                <Search
                  placeholder="Referral Code"
                  value={refferCode}
                  onChange={handleReferralChange}
                  className="!py-1 placeholder:!font-medium !px-4 rounded-lg !w-fit"
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
                {error && (
                  <p className="text-red-500 text-xs mt-1 px-4 ">{error}</p>
                )}
              </div>
            </div>
            {isApplyed && (
              <div className="bg-primary/10 border border-primary/30 p-3 space-y-1 rounded-lg">
                <p className="text-gray-500 ">Offer Applied</p>
                <p className="text-primary font-medium">
                  Pay just enrollment fee — Remaining after prelims cleared.
                </p>
              </div>
            )}
          </section>
          <section>
            {isApplyed && (
              <div className=" flex  justify-between gap-5">
                <p className=" font-semibold">Discount</p>
                <p className="">
                  {Number(totalAmount) - Number(discountAmount)}{" "}
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
              <p className="flex justify-between mt-1 mb-3 font-semibold text-lg">
                Total (Incl. of all taxes):{" "}
                <span className="text-primary">
                  {isApplyed ? (
                    <span className="text-primary">
                      ₹{discountAmount}/
                      <span className="text-sm">{totalAmount}</span>
                    </span>
                  ) : (
                    <span>₹{totalAmount}</span>
                  )}
                  {/* ₹{discountAmount}/{totalAmount} */}
                </span>
              </p>
              {isApplyed && discountAmount > 0 ? (
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
              ) : !isApplyed && totalAmount > 0 ? (
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
