// src/Components/Common/PaymentModule.tsx
import { useEffect } from "react";
import { usePostApiMutation } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { CourseWorkshopRegisterPayload, RazorpayOptions, RazorpayResponse, FormValues } from "../../Types";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayResponse) => void) => void;
    };
  }
}

interface PaymentModuleProps {
  values: FormValues;
  title: string;
  amount: number;
}

const PaymentModule = ({ values, title, amount }: PaymentModuleProps) => {
  const [PostApi] = usePostApiMutation({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (response: RazorpayResponse, status: "COMPLETED" | "FAILED") => {
    try {
      const payload: CourseWorkshopRegisterPayload = {
        name: values.name,
        phone: values.phone,
        city: values.city,
        paymentDate: new Date().toISOString(),
        email: values.email,
        merchantId: import.meta.env.VITE_RAZOR_PAY_KEY,
        paymentId: response.razorpay_payment_id,
        referralCode: values.referral,
        reachFrom: values.reachFrom,
        status,
      };
      await PostApi({ url: URL_KEYS.WORKSHOP.REGISTER, data: payload });
    } catch (err) {
      console.error(err);
    }
  };

  const startPayment = () => {
    if (!window.Razorpay) return;

    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "HET R",
      description: title,
      handler: (response: RazorpayResponse) => handlePayment(response, "COMPLETED"),
      prefill: {
        name: values.name,
        email: values.email,
        contact: values.phone,
      },
      notes: { course: title, referral: values.referral || "N/A" },
      theme: { color: "#eb8844" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", (response: RazorpayResponse) => {
      handlePayment({ razorpay_payment_id: response?.error?.metadata?.payment_id }, "FAILED");
    });

    rzp1.open();
  };

  return (
    <button
      onClick={startPayment}
      className="btn primary_btn w-full h-12 font-semibold mt-4"
    >
      Enroll Now
    </button>
  );
};

export default PaymentModule;
