import { Button, Form, Input } from "antd";
import { ImagePath } from "../../Constants";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
// import { PhoneInput } from "react-international-phone";

const ContactSection = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    // You can post the values to your API here
  };

  return (
    <section
      id="contact"
      className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 items-center  container container-p !overflow-hidden "
    >
      {/* Left Form Section */}
      <div
        data-aos="fade-right"
        data-aos-delay="200"
        className="bg-white shadow-md rounded-2xl p-5 sm:p-10 w-full max-w-lg"
      >
        <SectionHeader
          title="Leave a message"
          desc="Fill up the form below, our team will get back soon."
          className="pb-6 "
        />
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Name*"
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Email*"
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          <Form.Item name="company">
            <Input
              placeholder="Company Name"
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter your phone" }]}
          >
            <Input
              placeholder="Phone*"
              prefix={<span className="text-gray-500 mr-1">+91</span>}
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          {/* Phone Number */}
          {/* <Form.Item label="Phone Number" required>
              <Space.Compact block size="large">
                <Form.Item
                  name={["contact", "countryCode"]}
                  noStyle
                  rules={[
                    { required: true, message: "Please select country code" },
                  ]}
                >
                  <PhoneInput
                    defaultCountry="in"
                    value={form.getFieldValue("countryCode")}
                    onChange={(_, { country }) => {
                      form.setFieldsValue({
                        contact: { countryCode: `+${country.dialCode}` },
                      });
                    }}
                    className="w-[130px] p-2 border border-gray-300 rounded-s-lg bg-input-box"
                  />
                </Form.Item>
                <Form.Item
                  name={["contact", "mobile"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    { len: 10, message: "Phone number must be 10 digits" },
                    {
                      pattern: /^\d+$/,
                      message: "Phone number must contain only numbers",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mobile Number"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item> */}
          <Form.Item name="website">
            <Input
              placeholder="Website"
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="msg"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Your message*"
              className=" !py-2 sm:!py-4 placeholder:!font-bold !px-3 sm:!px-4 rounded-md sm:!rounded-xl"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className="w-full !py-7 !px-4  text-white !rounded-xl border-none"
          >
            SEND MESSAGE
          </Button>
        </Form>
      </div>

      {/* Right Contact Info Section */}
      <div data-aos="fade-left" data-aos-delay="300" className="max-w-lg ">
        <img
          src={`${ImagePath}/contact/contact_message_icon.png`}
          alt="icon"
          className="max-sm:w-12 border border-primary/15 rounded-full"
        />

        <h2 className=" text-2xl md:text-5xl font-semibold text-primary my-6">
          Have any question?
        </h2>

        <ul className="space-y-6 md:space-y-12">
          <li className="flex items-start gap-4">
            <img
              src={`${ImagePath}/contact/mail_icon.png`}
              alt="icon"
              className="max-sm:w-12 border border-primary/15 rounded-full"
            />
            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">
                Email Us
              </span>
              <Link
                to=""
                className="block max-sm:text-sm text-gray-600 hover:text-primary"
              >
                Student: help@bharatexamfest.com
              </Link>
              <Link
                to=""
                className="block max-sm:text-sm text-gray-600 hover:text-primary"
              >
                Know More: info@bharatexamfest.com
              </Link>
              <Link
                to=""
                className="block max-sm:text-sm text-gray-600 hover:text-primary"
              >
                Institute: sales@bharatexamfest.com
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <img
              src={`${ImagePath}/contact/call_icon.png`}
              alt="icon"
              className="max-sm:w-12 border border-primary/15 rounded-full"
            />

            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">
                Call Us
              </span>
              <Link
                to="tel:+919106360330"
                className="max-sm:text-sm text-gray-600 hover:text-primary"
              >
                +91 91063 60330
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <img
              src={`${ImagePath}/contact/location_icon.png`}
              alt="icon"
              className="max-sm:w-12 border border-primary/15 rounded-full"
            />

            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">
                Visit Us
              </span>
              <p className="max-sm:text-sm text-gray-600">
                S-251 Angle Business Center-2, Mota Varachha, Surat, Gujarat,
                India-394101
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactSection;
