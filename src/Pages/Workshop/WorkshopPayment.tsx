import { useLocation, useNavigate } from "react-router-dom";
import type { FormValues, LectureType, WorkshopType } from "../../Types";
import PaymentModule from "../../Components/Common/PaymentModule ";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import FormInput from "../../Attribute/FormFields/FormInput";
import { Button } from "antd";
import { useEffect } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";

const WorkshopPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formValues, workshop }: { formValues: FormValues; workshop: WorkshopType } = location.state || {};

  const { data } = useGetApiQuery({ url: `${URL_KEYS.LECTURE.ALL}?workshopFilter=${workshop._id}` });

  const Lectures = data?.data?.lecture_data;

  const { title = "Workshop", discountAmount = 0 } = workshop;

  useEffect(() => {
    if (!formValues || !workshop) {
      navigate(ROUTES.WORKSHOP.WORKSHOP);
    }
  }, []);

  return (
    <section className="container flex max-md:flex-col justify-between py-10 px-4 gap-5">
      {/* Left Image */}
      <div className="w-full max-w-2xl flex items-center justify-center rounded-2xl p-6">
        <img src={`${ImagePath}course/CourseModule.png`} alt="Workshop" className="rounded-xl w-full h-auto object-cover" />
      </div>

      {/* Right Details */}
      <div data-aos="fade-left" className="bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:p-10 w-full max-w-2xl">
        <div className="flex flex-col justify-between h-full text-gray-700 text-sm sm:text-base">
          <section className="space-y-4">
            <div>
              <strong className="text-2xl font-semibold text-primary">Lectures Name </strong>
              <ul>
                {Lectures?.map((lecture: LectureType) => (
                  <li className="text-sm text-gray-800">{lecture?.title}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-nowrap justify-between h-fit gap-2">
              <p className="font-medium ">Offer Code: </p>
              <FormInput name="offerCode" className="!py-1 placeholder:!font-medium !px-4 rounded-lg !w-full" rules={[{ required: true, message: " Offer Code is Required " }]} placeholder="VICTORY26" />
              <Button htmlType="button" type="primary" className="btn primary_btn square ">
                Apply
              </Button>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-2 ">
            <p className="flex justify-between">
              <strong>Subscription Fee:</strong> <span className="font-semibold">₹{discountAmount}</span>
            </p>
            <p className="flex justify-between mt-1 mb-3 font-semibold text-lg">
              Total (Incl. of all taxes): <span className="text-primary">₹{discountAmount}</span>
            </p>
            <PaymentModule values={formValues} title={title} amount={discountAmount} type="workshop" itemData={workshop} apiUrl={URL_KEYS.WORKSHOP.REGISTER} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopPayment;
