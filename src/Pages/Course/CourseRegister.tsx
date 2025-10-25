import { useEffect } from "react";
import { Form, Button, Select } from "antd";
import { useLocation } from "react-router-dom";
import SectionHeader from "../../Components/Home/SectionHeader";
import FormInput from "../../Attribute/FormFields/FormInput";
import { usePostApiMutation } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { CourseWorkshopRegisterPayload, CourseType, FormValues, RazorpayOptions, RazorpayResponse } from "../../Types";
const { Option } = Select;

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayResponse) => void) => void;
    };
  }
}

const CourseRegister = () => {
  const [form] = Form.useForm();
  const location = useLocation();

  const [PostApi] = usePostApiMutation({});

  const course: CourseType = location.state || {};

  const { title = "Have questions about this batch?", price = 0, payingPrice = 0 } = course;

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Called after successful payment
  const handlePayment = async (response: RazorpayResponse, values: FormValues, status: "COMPLETED" | "FAILED") => {
    console.log("Razorpay  Response:", response , status);
    console.log("Form Values:", values, course);

    try {
      const payload: CourseWorkshopRegisterPayload = {
        courseId: course._id ,
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: values.city,
        pincode: values.pincode,
        amount: course.payingPrice,
        paymentId: response.razorpay_payment_id,
        referralCode: values.referral,
        reachFrom: values.reachFrom,
        status: status,
      };
      // console.log("payload : ", payload);
      const res = await PostApi({ url: URL_KEYS.COURSE.REGISTER, data: payload });
      console.log("res : ", res);
    } catch (err) {
      console.error(err);
      // message.error("Payment success but failed to send data to server.");
    }
  };

  //  Called when form is submitted
  const onFinish = async (values: FormValues) => {
    console.log("Form Submitted:", values);

    if (!window.Razorpay) {
      // message.error("Razorpay SDK not loaded yet");
      return;
    }

    //   dynamically calculate amount or use payingPrice directly
    const amount = payingPrice * 100;

    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_KEY,
      amount: amount,
      currency: "INR",
      name: "HET R",
      description: title,
      handler: (response: RazorpayResponse) => handlePayment(response, values, "COMPLETED"),
      prefill: {
        name: values.name,
        email: values.email,
        contact: values.phone,
      },
      notes: {
        course: title,
        referral: values.referral || "N/A",
      },
      theme: { color: "#eb8844" },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response: RazorpayResponse) {
      handlePayment({ razorpay_payment_id: response?.error?.metadata?.payment_id }, values, "FAILED");
      console.error("Payment Failed 11:", response?.error?.metadata);
    });

    rzp1.open();
  };

  // console.log("key", import.meta.env.VITE_RAZOR_PAY_KEY);

  return (
    <section id="purchase" className="container flex max-md:flex-col justify-between py-10 px-4 gap-5 h-full">
      <div data-aos="fade-right" className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl">
        <SectionHeader title="Course" desc="Purchase Now" className="pb-6 text-center" />

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
              { len: 10, message: "Phone number must be 10 digits" },
            ]}
            placeholder="Phone"
          />

          <FormInput name="city" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" rules={[{ required: true, message: "Please enter your city" }]} placeholder="City" />

          <FormInput name="pincode" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" placeholder="Pincode" />

          <FormInput name="referral" className="!py-3 placeholder:!font-medium !px-4 rounded-lg" placeholder="Referral Code" />

          <Form.Item name="reachFrom">
            <Select placeholder="Reach From" allowClear className="rounded-lg  ">
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
            <Button htmlType="submit" type="primary" className="btn primary_btn !h-12 w-full">
              Pay Now
            </Button>
          </div>
        </Form>
      </div>

      {/* ================= RIGHT SUMMARY ================= */}
      <div data-aos="fade-left" className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl">
        <div className="space-y-9 text-gray-700 text-sm sm:text-base">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-primary">{title}</h2>
            <div>
              <strong>Module Name </strong>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
          </section>

          <div className="bg-primary/10 border border-primary/30 p-3 space-y-1 rounded-lg">
            <p className="text-gray-500">Offer Applied</p>
            <p className="text-primary font-medium">Pay just enrollment fee — Remaining after prelims cleared.</p>
          </div>

          <div>
            <p className="font-medium">
              Offer Code: <span className="text-success font-bold">BEF2026</span>
            </p>
            <p className="text-xs text-gray-500">If 60 marks min. Not from our course — 100% Money Back</p>
          </div>

          <div className="border-t border-gray-200 pt-2">
            <p className="flex justify-between">
              <strong>Subscription Fee:</strong> <span className="font-semibold">₹{payingPrice}</span>
            </p>
            <p className="flex justify-between mt-1 font-semibold text-lg">
              Total (Incl. of all taxes):{" "}
              <span className="text-primary">
                ₹{payingPrice} / {price}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseRegister;
