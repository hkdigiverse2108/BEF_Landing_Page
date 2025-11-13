import { Form, Button, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeader from "../../Components/Home/SectionHeader";
import FormInput from "../../Attribute/FormFields/FormInput";
import type { FormValues, WorkshopType } from "../../Types";
import {
  HTTP_STATUS,
  ImagePath,
  PAYMENT_STATUS,
  ROUTES,
  URL_KEYS,
} from "../../Constants";
import { useEffect } from "react";
import { usePostApiMutation } from "../../Api/CommonApi";
const { Option } = Select;

const WorkshopRegister = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [PostApi] = usePostApiMutation({});

  const workshop: WorkshopType = location.state || {};

  const onFinish = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        workshopId: workshop?._id,
        price: 0,
        status: PAYMENT_STATUS.PENDING,
      };
      const res = await PostApi({
        url: URL_KEYS.WORKSHOP.REGISTER_ADD,
        data: payload,
      });
      const resData = res?.data?.data;
      if (res?.data?.status === HTTP_STATUS.OK) {
        navigate(ROUTES.WORKSHOP.PAYMENT, {
          state: {
            formValues: { ...values, workshopRegisterId: resData?._id },
            workshop,
          },
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!workshop) {
      navigate(ROUTES.WORKSHOP.WORKSHOP);
    }
  }, []);

  return (
    <section
      id="purchase"
      className="container flex max-md:flex-col max-md:items-center justify-between py-10 px-4 gap-5"
    >
      {/* Left Box - Image */}
      <div
        data-aos="fade-right"
        className="order-2 md:order-1 w-full max-w-2xl flex items-center justify-center rounded-2xl "
      >
        <img
          src={`${ImagePath}Register/Register_1.jpg`}
          alt="Workshop"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      {/* Right Box - Form */}
      <div
        data-aos="fade-left"
        className="order-1 md:order-2 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:px-10 sm:py-7  w-full max-w-2xl h-fit"
      >
        <SectionHeader
          title="Workshop  "
          desc="Register Now"
          className="pb-6 text-center"
        />

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="space-y-4"
        >
          <FormInput
            name="name"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[{ required: true, message: "Please enter your name" }]}
            placeholder="Name"
          />

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
              { len: 10, message: "Phone number must be 10 digits" },
            ]}
            placeholder="Phone"
          />

          <FormInput
            name="city"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[{ required: true, message: "Please enter your city" }]}
            placeholder="City"
          />

          <Form.Item name="reachFrom">
            <Select
              placeholder="Reach From"
              allowClear
              className="rounded-lg  "
            >
              <Option value="youtube">Youtube</Option>
              <Option value="google">Google</Option>
              <Option value="facebook">Facebook</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="website">Website</Option>
              <Option value="app">App</Option>
              <Option value="friend">Friend</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <div className="pt-4 flex justify-center">
            <Button
              htmlType="submit"
              type="primary"
              className="btn primary_btn !h-12 w-full"
            >
              Enroll Now
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default WorkshopRegister;
