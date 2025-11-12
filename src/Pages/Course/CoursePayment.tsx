import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, CourseType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { Input, Skeleton } from "antd";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

const CoursePayment = () => {
  const [refferCode, setRefferCode] = useState("");
  const [isApplyed, setIsApplyed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [PostApi] = usePostApiMutation();

  const { data: CouponData, isLoading: isCouponLoading } = useGetApiQuery({
    url: `${URL_KEYS.REFERRAL.ALL}?audienceFilter=default`,
  });
  const defaultCoupon = CouponData?.data?.coupon_data[0]?.code;
  // console.log("Coupon All", defaultCoupon);

  const { formValues, course }: { formValues: FormValues; course: CourseType } =
    location.state || {};

  const { data: modulesData, isLoading: isModuleLoading } = useGetApiQuery(
    { url: `${URL_KEYS.MODULE.ALL}?courseFilter=${course?._id}` },
    { skip: !course?._id }
  );

  const Modules = modulesData?.data?.module_data || [];

  let {
    title = "Course Name",
    discountPrice = 0,
    payingPrice = 0,
    price = 0,
  } = course || {};

  const isDiscountPrice = !!discountPrice;
  discountPrice = discountPrice === 0 ? price : discountPrice;
  // console.log("isDis", formValues, course);

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
        amount: course?.payingPrice,
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
    if (!formValues || !course) {
      navigate(ROUTES.COURSE.COURSE);
    }
  }, []);

  useEffect(() => {
    if (refferCode) {
      const timer = setTimeout(() => {
        if (refferCode) handleAplyyReferCode();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [refferCode]);

  useEffect(() => {
    if (defaultCoupon) {
      setRefferCode(defaultCoupon);
    }
  }, [defaultCoupon]);

  return (
    <section className="container flex max-lg:flex-col max-lg:items-center justify-between py-10 px-4 gap-5 h-full">
      {/* Left Image Box */}
      <div
        data-aos="fade-right"
        className="order-2 lg:order-1 w-full max-w-2xl flex items-center justify-center rounded-2xl"
      >
        <img
          src={`${ImagePath}Register/Payment_1.jpg`}
          alt={"Payment"}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full rounded-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Right Summary Box */}
      <div
        data-aos="fade-left"
        className="order-1 lg:order-2  bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-4 sm:p-10 w-full max-w-2xl"
      >
        <div className="flex flex-col max-lg:min-h-[680px] justify-between h-full text-gray-700 gap-20 text-sm sm:text-base">
          {isCouponLoading || isModuleLoading ? (
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
                <div className={`${isApplyed ? "paymentSuccess" : ""}`}>
                  <Search
                    placeholder="Referral Code"
                    value={refferCode}
                    onChange={handleReferralChange}
                    className="!py-1 placeholder:!font-medium  rounded-lg"
                    onClear={() => setIsApplyed(false)}
                    loading={loading}
                    enterButton={
                      isApplyed ? (
                        <span className={`flex items-center gap-1  `}>
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
                    <p className="text-red-500 text-xs mt-1 ">{error}</p>
                  )}
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
          )}
          <section className="space-y-4">
            {isApplyed && (
              <div className=" flex  justify-between gap-5">
                <p className=" font-semibold">Discount</p>
                <p className="text-success font-semibold">
                  -
                  {isDiscountPrice
                    ? Number(price) - Number(discountPrice)
                    : Number(price) - Number(payingPrice)}
                </p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 ">
              <p className="flex justify-between">
                <strong>Enrollment Fee:</strong>
                {isApplyed ? (
                  <span className="font-semibold">₹{payingPrice}</span>
                ) : (
                  <span>₹{price}</span>
                )}
              </p>
              <p className="flex justify-between mt-1 mb-3 font-semibold sm:text-lg">
                Total (Incl. of all taxes):
                {isApplyed ? (
                  <>
                    {isDiscountPrice ? (
                      <h1>
                        <span className="text-primary"> ₹{payingPrice}/</span>
                        <span className="text-sm">{discountPrice}</span>
                        <span className=" font-medium text-sm text-red-500 line-through ps-1">
                          {price}
                        </span>
                      </h1>
                    ) : (
                      <h1 className="  flex gap-[2px] items-end">
                        <span>₹{payingPrice}</span>
                        <span className=" text-red-500 text-base font-semibold line-through decoration-2 ps-1">
                          {price}
                        </span>
                      </h1>
                    )}
                  </>
                ) : (
                  <span>₹{price}</span>
                )}
              </p>
              <PaymentModule
                values={formValues}
                title={title}
                amount={{
                  payingPrice: isApplyed ? payingPrice : price,
                  discountPrice: discountPrice,
                  price: price,
                }}
                referralCode={refferCode}
                type="course"
                itemData={course}
                apiUrl={URL_KEYS.COURSE.REGISTER_EDIT}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CoursePayment;
