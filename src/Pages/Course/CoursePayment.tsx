import { useLocation } from "react-router-dom";
import type { FormValues, CourseType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { ImagePath } from "../../Constants";
import FormInput from "../../Attribute/FormFields/FormInput";
import { Button } from "antd";

const CoursePayment = () => {
  const location = useLocation();
  const { formValues, course }: { formValues: FormValues; course: CourseType } = location.state || {};

  const { title = "Course Name", payingPrice = 0 } = course;

  return (
    <section className="container flex max-md:flex-col justify-between py-10 px-4 gap-5 h-full">
      {/* Left Image Box */}
      <div data-aos="fade-right" className="w-full max-w-2xl flex items-center justify-center bg-gray-100 rounded-2xl p-6">
        <img src={`${ImagePath}course/CourseModule.png`} alt="Course" className="rounded-xl w-full h-auto object-cover" />
      </div>

      {/* Right Summary Box */}
      <div data-aos="fade-left" className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl">
        <div className="flex flex-col justify-between h-full text-gray-700 text-sm sm:text-base">
          <section className="space-y-4">
            <section className="space-y-2">
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <div>
                <strong>Module Name </strong>
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
            </section>
            <div className="flex flex-nowrap justify-between h-fit gap-2">
              <p className="font-medium ">Referral Code: </p>
              <FormInput name="referralCode" className="!py-1 placeholder:!font-medium !px-4 rounded-lg !w-full" rules={[{ required: true, message: " referral Code is Required " }]} placeholder="BHARATEXAMFEST" />
              <Button htmlType="button" type="primary" className="btn primary_btn square ">
                Apply
              </Button>
            </div>
            <div className="flex flex-nowrap justify-between h-fit gap-2">
              <p className="font-medium ">Offer Code: </p>
              <FormInput name="offerCode" className="!py-1 placeholder:!font-medium !px-4 rounded-lg !w-full" rules={[{ required: true, message: " Offer Code is Required " }]} placeholder="VICTORY26" />
              <Button htmlType="button" type="primary" className="btn primary_btn square ">
                Apply
              </Button>
            </div>

            <div className="bg-primary/10 border border-primary/30 p-3 space-y-1 rounded-lg">
              <p className="text-gray-500">Offer Applied</p>
              <p className="text-primary font-medium">Pay just enrollment fee — Remaining after prelims cleared.</p>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-2 ">
            <p className="flex justify-between">
              <strong>Subscription Fee:</strong> <span className="font-semibold">₹{payingPrice}</span>
            </p>
            <p className="flex justify-between mt-1 mb-3 font-semibold text-lg">
              Total (Incl. of all taxes): <span className="text-primary">₹{payingPrice}</span>
            </p>
            <PaymentModule values={formValues} title={title} amount={payingPrice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePayment;
