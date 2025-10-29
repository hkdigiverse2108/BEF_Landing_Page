import { useEffect } from "react";
import { usePostApiMutation } from "../../Api/CommonApi";
import type { CourseWorkshopRegisterPayload, RazorpayOptions, RazorpayResponse, FormValues, CourseType, WorkshopType } from "../../Types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";

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
  apiUrl: string;
  type: "course" | "workshop";
  itemData?: CourseType | WorkshopType;
}

const PaymentModule = ({ values, title, amount, apiUrl, type, itemData }: PaymentModuleProps) => {
  const [PostApi] = usePostApiMutation({});
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //  handle payload based on type
  const createPayload = (response: RazorpayResponse, status: "COMPLETED" | "FAILED"): CourseWorkshopRegisterPayload => {
    if (type === "course") {
      const course = itemData as CourseType;
      return {
        courseId: course._id,
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: values.city,
        pincode: values.pincode,
        amount: course.payingPrice,
        paymentId: response.razorpay_payment_id,
        referralCode: values.referral,
        reachFrom: values.reachFrom,
        status,
      };
    } else {
      // workshop payload
      return {
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
    }
  };

  const handlePayment = async (response: RazorpayResponse, status: "COMPLETED" | "FAILED") => {
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
      notes: { title, referral: values.referral || "N/A" },
      theme: { color: "#eb8844" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: RazorpayResponse) => {
      handlePayment({ razorpay_payment_id: response?.error?.metadata?.payment_id }, "FAILED");
    });

    rzp.open();
  };

  return (
    <button onClick={startPayment} className="btn primary_btn w-full h-12 font-semibold mt-4">
      Enroll Now
    </button>
  );
};

export default PaymentModule;

// // src/Components/Common/PaymentModule.tsx
// import { useEffect } from "react";
// import { usePostApiMutation } from "../../Api/CommonApi";
// // import { URL_KEYS } from "../../Constants";
// import type { CourseWorkshopRegisterPayload, RazorpayOptions, RazorpayResponse, FormValues } from "../../Types";

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//       on: (event: string, callback: (response: RazorpayResponse) => void) => void;
//     };
//   }
// }

// interface PaymentModuleProps {
//   values: FormValues;
//   title: string;
//   amount: number;
//   apiUrl: string;
// }

// const PaymentModule = ({ values, title, amount, apiUrl }: PaymentModuleProps) => {
//   const [PostApi] = usePostApiMutation({});

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async (response: RazorpayResponse, status: "COMPLETED" | "FAILED") => {
//     try {
//       const payload: CourseWorkshopRegisterPayload = {
//         name: values.name,
//         phone: values.phone,
//         city: values.city,
//         paymentDate: new Date().toISOString(),
//         email: values.email,
//         merchantId: import.meta.env.VITE_RAZOR_PAY_KEY,
//         paymentId: response.razorpay_payment_id,
//         referralCode: values.referral,
//         reachFrom: values.reachFrom,
//         status,
//       };
//       await PostApi({ url: apiUrl, data: payload });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const startPayment = () => {
//     if (!window.Razorpay) return;

//     const options = {
//       key: import.meta.env.VITE_RAZOR_PAY_KEY,
//       amount: amount * 100,
//       currency: "INR",
//       name: "HET R",
//       description: title,
//       handler: (response: RazorpayResponse) => handlePayment(response, "COMPLETED"),
//       prefill: {
//         name: values.name,
//         email: values.email,
//         contact: values.phone,
//       },
//       notes: { course: title, referral: values.referral || "N/A" },
//       theme: { color: "#eb8844" },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.on("payment.failed", (response: RazorpayResponse) => {
//       handlePayment({ razorpay_payment_id: response?.error?.metadata?.payment_id }, "FAILED");
//     });

//     rzp1.open();
//   };

//   return (
//     <button onClick={startPayment} className="btn primary_btn w-full h-12 font-semibold mt-4">
//       Enroll Now
//     </button>
//   );
// };

// export default PaymentModule;
