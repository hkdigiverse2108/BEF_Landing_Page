import { Form, Button, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeader from "../../Components/Home/SectionHeader";
import FormInput from "../../Attribute/FormFields/FormInput";
import type { FormValues, CourseType } from "../../Types";
import { HTTP_STATUS, ImagePath, PAYMENT_STATUS, ROUTES, URL_KEYS } from "../../Constants";
import { useEffect } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { FINAL_DISTRICTS, REACH_FROM_OPTIONS } from "../../Data";
import { getMockTestReward, isLastPrelimsCourse } from "../../Utils/mockTestReward";

const { Option } = Select;

const CourseRegister = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const [PostApi, { isLoading }] = usePostApiMutation({});

  const course: CourseType = location.state || {};

  const { data: examTypeApi } = useGetApiQuery({
    url: URL_KEYS.EXAM.TYPE,
  });
  let examTypeData = examTypeApi?.data;

  const onFinish = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        courseId: course?._id,
        amount: 0,
        status: PAYMENT_STATUS.PENDING,
      };
      const res = await PostApi({
        url: URL_KEYS.COURSE.REGISTER_ADD,
        data: payload,
      }).unwrap();
      const resData = res?.data;
      if (res?.status === HTTP_STATUS.OK) {
        if (resData?.isExistUser === true) {
          return navigate(ROUTES.PAYMENT.SUCCESS);
        } else {
          navigate(ROUTES.COURSE.PAYMENT, {
            state: {
              formValues: { ...values, purchaseId: res?.data?._id },
              course,
            },
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!course) {
      navigate(ROUTES.COURSE.COURSE);
    }
  }, []);

  return (
    <section id="purchase" className="container flex max-md:flex-col max-md:items-center justify-between pt-2 pb-8 sm:py-10 px-4 gap-5 h-full">
      {/* Left Image Box */}
      <div data-aos="fade-right" className="order-2 md:order-1  w-full max-w-2xl flex items-center justify-center  rounded-2xl">
        <img src={`${ImagePath}Register/Register_2.jpg`} alt="Course" className="rounded-xl w-full h-auto object-cover" />
      </div>

      {/* Right Form Box */}
      <div data-aos="fade-left" className="order-1 md:order-2 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-4 sm:px-10 sm:py-7 w-full max-w-2xl h-fit">
        <SectionHeader title="Course" desc="Enroll Now" className="pb-3 sm:pb-6 text-center" />

        {/* Mock Test Score Discount alert */}
        {(() => {
          const isLastPrelims = isLastPrelimsCourse(course);
          if (!isLastPrelims) return null;
          const mockReward = (course as any)?.mockReward || getMockTestReward();
          if (!mockReward || !mockReward.scoreDiscount) return null;
          const coursePrice = Number(course?.price) || 20000;
          const targetPay = Number(mockReward.scoreDiscount);
          const saveAmount = Math.max(0, coursePrice - targetPay);
          return (
            <div className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center justify-between shadow-xs">
              <div>
                <span className="font-extrabold text-sm block text-emerald-900">
                  🏆 Mock Test Score Discount Applied!
                </span>
                <span className="text-[11px] text-emerald-700">
                  Score: {mockReward.score.toFixed(1)}/{mockReward.totalMarks} • Special Fee: ₹{targetPay.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-700">
                  -₹{saveAmount.toLocaleString()} OFF
                </span>
              </div>
            </div>
          );
        })()}

        <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
          <FormInput name="name" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your name" }]} placeholder="Name" />

          <FormInput
            name="email"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
            placeholder="Email"
          />

          <FormInput
            name="phone"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              { required: true, message: "Please enter your phone number" },
              { pattern: /^\d+$/, message: "Only numbers are allowed" },
              { len: 10, message: "Phone number must be 10 digits" },
            ]}
            inputMode="numeric"
            maxLength={10}
            placeholder="Phone"
          />

          {/* <FormInput name="city" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your city" }]} placeholder="City" /> */}

          {/* <FormInput
            name="pincode"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            placeholder="Pincode"
          /> */}
          <Form.Item name="examTypeId" rules={[{ required: true, message: "Please select Exam Type" }]}>
            <Select
              placeholder="Exam Type"
              allowClear
              className="rounded-lg  "
              mode="multiple"
              options={(examTypeData || [])?.map((type: any) => ({
                label: type?.name,
                value: type?._id,
              }))}
            ></Select>
          </Form.Item>

          {/* <FormInput name="city" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your city" }]} placeholder="City" /> */}

          <Form.Item name="city" rules={[{ required: true, message: "Please select your district" }]} className="mb-9!">
            <Select virtual showSearch placeholder="Select District" className="rounded-lg" optionFilterProp="children">
              {FINAL_DISTRICTS.map((district) => (
                <Option key={district} value={district}>
                  {district}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="reachFrom">
            <Select placeholder="Reach From" allowClear className="rounded-lg">
              {REACH_FROM_OPTIONS.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="pt-4 flex justify-center">
            <Button loading={isLoading} htmlType="submit" type="primary" className="btn primary_btn !h-12 w-full">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CourseRegister;
