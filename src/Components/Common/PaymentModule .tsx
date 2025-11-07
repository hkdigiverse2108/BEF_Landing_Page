import { useEffect, useRef } from "react";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import type {
  CourseWorkshopRegisterPayload,
  RazorpayOptions,
  RazorpayResponse,
  FormValues,
  CourseType,
  WorkshopType,
} from "../../Types";
import { useNavigate } from "react-router-dom";
import { ROUTES, URL_KEYS } from "../../Constants";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: RazorpayResponse) => void
      ) => void;
    };
  }
}

interface PaymentModuleProps {
  values: FormValues;
  title: string;
  amount: {
    payingPrice: number;
    discountPrice: number;
    price: number;
  };
  apiUrl: string;
  referralCode: string;
  type: "course" | "workshop";
  itemData?: CourseType | WorkshopType;
}

const PaymentModule = ({
  values,
  title,
  amount,
  apiUrl,
  type,
  itemData,
  referralCode,
}: PaymentModuleProps) => {
  const [PostApi] = usePostApiMutation({});
  const navigate = useNavigate();
  const hasHandledPayment = useRef<string | null>(null);

  const { data: settingData } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const RazorPayKey = settingData?.data?.apiKey;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const createPayload = (
    response: RazorpayResponse,
    status: "COMPLETED" | "FAILED"
  ): CourseWorkshopRegisterPayload => {
    if (type === "course") {
      const course = itemData as CourseType;
      return {
        courseId: course._id,
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: values.city,
        pincode: values.pincode,
        amount: amount?.payingPrice,
        paymentId: response.razorpay_payment_id,
        referralCode: referralCode,
        reachFrom: values.reachFrom,
        status,
      };
    } else {
      // workshop payload
      return {
        workshopId: itemData?._id,
        name: values.name,
        payingPrice: amount?.payingPrice,
        discountPrice: amount?.discountPrice,
        price: amount?.price,
        phone: values.phone,
        city: values.city,
        paymentDate: new Date().toISOString(),
        email: values.email,
        merchantId: RazorPayKey,
        paymentId: response.razorpay_payment_id,
        referralCode: referralCode,
        reachFrom: values.reachFrom,
        status,
      };
    }
  };

  const handlePayment = async (
    response: RazorpayResponse,
    status: "COMPLETED" | "FAILED"
  ) => {
    const currentPaymentId = response?.razorpay_payment_id || "FAILED_ATTEMPT";

    if (hasHandledPayment.current === currentPaymentId) return;
    hasHandledPayment.current = currentPaymentId;
    try {
      const payload = createPayload(response, status);
      const res = await PostApi({ url: apiUrl, data: payload });
      if (res && status === "COMPLETED") {
        navigate(ROUTES.PAYMENT.SUCCESS);
      }
      // else if (res && status === "FAILED") {
      //   navigate(ROUTES.PAYMENT.FAILED);
      // }
    } catch (err) {
      console.error("Payment submission failed:", err);
    }
  };

  const startPayment = () => {
    if (!window.Razorpay) return;

    hasHandledPayment.current = null;

    const options = {
      key: RazorPayKey,
      amount: amount?.payingPrice * 100,
      currency: "INR",
      name: "BHARAT EXAM FEST",
      description: title,
      handler: (response: RazorpayResponse) =>
        handlePayment(response, "COMPLETED"),
      prefill: {
        name: values.name,
        email: values.email,
        contact: values.phone,
      },
      notes: { title, referral: values.referral || "N/A" },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: RazorpayResponse) => {
      handlePayment(
        { razorpay_payment_id: response?.error?.metadata?.payment_id },
        "FAILED"
      );
    });

    rzp.open();
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
