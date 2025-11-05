import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, CourseType, ModuleType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { Input } from "antd";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

const audienceEnum = ["default", "telecaller", "user"];

const CoursePayment = () => {
  const [refferCode, setRefferCode] = useState("BHARATEXAMFEST");
  const [audience, setAudience] = useState(audienceEnum[0]);
  const [isApplyed, setIsApplyed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [postApi] = usePostApiMutation();

  const { formValues, course }: { formValues: FormValues; course: CourseType } =
    location.state || {};

  const { data: ModulesData } = useGetApiQuery({
    url: `${URL_KEYS.MODULE.COURSE_WISE}${course?._id}`,
  });

  const Modules = ModulesData?.data;

  const {
    title = "Course Name",
    payingPrice = 0,
    discountPrice = 0,
    price = 0,
  } = course || {};

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
        audience,
      };

      const res = await postApi({
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
    if (!formValues || !course) {
      navigate(ROUTES.COURSE.COURSE);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (refferCode) handleAplyyReferCode();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container flex max-md:flex-col justify-between py-10 px-4 gap-5 h-full">
      {/* Left Image Box */}
      <div
        data-aos="fade-right"
        className="w-full max-w-2xl flex items-center justify-center bg-gray-100 rounded-2xl p-6"
      >
        <img
          src={`${ImagePath}course/CourseModule.png`}
          alt="Course"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Summary Box */}
      <div
        data-aos="fade-left"
        className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl"
      >
        <div className="flex flex-col justify-between h-full text-gray-700 text-sm sm:text-base">
          <section className="space-y-4 ">
            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <div>
                <strong>Module Name </strong>
                <ul>
                  {Modules?.map((module: ModuleType) => (
                    <li className="text-sm text-gray-800">{module?.name}</li>
                  ))}
                </ul>
              </div>
            </section>
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
          <section className="space-y-4">
            {isApplyed && (
              <div className=" flex  justify-between gap-5">
                <p className=" font-semibold">Discount</p>
                <p className="">
                  {Number(price || 10) - Number(discountPrice || 20)}{" "}
                </p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 ">
              <p className="flex justify-between">
                <strong>Enrollment Fee:</strong>{" "}
                {isApplyed ? (
                  <span className="font-semibold">₹{payingPrice}</span>
                ) : (
                  <span>₹{price}</span>
                )}
              </p>
              <p className="flex justify-between mt-1 mb-3 font-semibold text-lg">
                Total (Incl. of all taxes):
                {isApplyed ? (
                  <span className="text-primary">
                    ₹{payingPrice}/
                    <span className="text-sm">{discountPrice}</span>
                  </span>
                ) : (
                  <span>₹{price}</span>
                )}
              </p>
              <PaymentModule
                values={formValues}
                title={title}
                amount={isApplyed ? payingPrice : price}
                type="course"
                itemData={course}
                apiUrl={URL_KEYS.COURSE.REGISTER}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CoursePayment;
