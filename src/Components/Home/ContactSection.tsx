import { Button, Form, Input } from "antd";
import { HTTP_STATUS, ImagePath, URL_KEYS } from "../../Constants";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import FormInput from "../../Attribute/FormFields/FormInput";
import { usePostApiMutation } from "../../Api/CommonApi";
import type { ContactFormData } from "../../Types";
import { CONTACT } from "../../Data";

const ContactSection = () => {
  const [form] = Form.useForm();

  const [PostApi, { isLoading }] = usePostApiMutation({});

  const onFinish = async (values: ContactFormData) => {
    try {
      const res = await PostApi({ url: URL_KEYS.CONTACT_US.ADD, data: values }).unwrap();
      if (res?.data?.status === HTTP_STATUS.OK) {
        form.resetFields();
      }
      console.log(res);
    } catch (error) {
      console.error(error);
      const err = error as { data: { message: string } };
      console.log("test", err.data.message);
      form.setFields([
        {
          name: "message",
          errors: [err.data.message],
        },
      ]);
    }
  };

  return (
    <section id="contact" className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 items-center  container container-p !overflow-hidden py-6 ">
      {/* Left Form Section */}
      <div data-aos="fade-right" className="bg-white hover:shadow-lg transition-all duration-100 rounded-2xl p-5 sm:p-10 w-full max-w-lg">
        <SectionHeader title="Leave a message" desc="Fill up the form below, our team will get back soon." className="pb-6 " />

        <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
          <FormInput name="name" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your name" }]} placeholder="Name" />

          <FormInput
            name="email"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            placeholder="Email"
          />

          <FormInput name="company" rules={[{ required: true, message: "Please enter Company Name" }]} className="!py-3 placeholder:!font-medium !px-4 rounded-lg" placeholder="Company" />

          <FormInput
            name="phone"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              { required: true, message: "Please enter your phone number" },
              { len: 10, message: "Phone number must be 10 digits" },
            ]}
            placeholder="Phone"
          />

          <FormInput name="website" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your name" }]} placeholder="Website" />

          <Form.Item name="message" rules={[{ required: true, message: "Please enter your message" }]}>
            <Input.TextArea rows={4} placeholder="Your message*" className=" !py-3 placeholder:!font-medium !px-4 rounded-lg" />
          </Form.Item>
          <div className=" flex justify-center">
            <Button loading={isLoading} htmlType="submit" type="primary" className="btn primary_btn !h-12 w-full ">
              SEND MESSAGE
            </Button>
          </div>
        </Form>
      </div>

      {/* Right Contact Info Section */}
      <div data-aos="fade-left" className="max-w-lg ">
        <h2 className=" text-2xl md:text-5xl font-semibold text-primary my-6">Have any question?</h2>

        <ul className="space-y-6 md:space-y-12">
          <li className="flex items-start gap-4">
            <img src={`${ImagePath}/contact/mail_icon.png`} alt="icon" className="max-sm:w-12 border border-primary/15 rounded-full" />
            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">Email Us</span>
              <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT?.emailHelp}`} target="_blank" rel="noopener noreferrer" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                Student: {CONTACT?.emailHelp}
              </Link>
              <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT?.emailInfo}`} target="_blank" rel="noopener noreferrer" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                Know More: {CONTACT?.emailInfo}
              </Link>
              <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT?.emailSales}`} target="_blank" rel="noopener noreferrer" className="block max-sm:text-sm text-gray-600 hover:text-primary">
                Institute: {CONTACT?.emailSales}
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <img src={`${ImagePath}/contact/call_icon.png`} alt="icon" className="max-sm:w-12 border border-primary/15 rounded-full" />

            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">Call Us</span>
              <Link to={`tel:${CONTACT?.number}`} className="max-sm:text-sm text-gray-600 hover:text-primary">
                {CONTACT?.number}
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <img src={`${ImagePath}/contact/location_icon.png`} alt="icon" className="max-sm:w-12 border border-primary/15 rounded-full" />

            <div>
              <span className="font-semibold block text-lg lg:text-2xl text-primary">Visit Us</span>
              <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT?.address)}`} target="_blank" rel="noopener noreferrer" className="max-sm:text-sm text-gray-600">
                {CONTACT?.address}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactSection;
