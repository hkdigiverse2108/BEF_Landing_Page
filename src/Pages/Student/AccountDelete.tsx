import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteApiMutation, usePostApiMutation } from "../../Api/CommonApi";
import FormInput from "../../Attribute/FormFields/FormInput";
import SectionHeader from "../../Components/Home/SectionHeader";
import { HTTP_STATUS, ROUTES, URL_KEYS } from "../../Constants";
import type { DeleteFormValues } from "../../Types";

const AccountDelete = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [PostApi, { isLoading }] = usePostApiMutation({});
  const [DeleteApi, { isLoading: isLoadingDelete }] = useDeleteApiMutation({});
  const [isOpen, setIsOpen] = useState(false);
  const [isId, setIsId] = useState("");

  const onFinish = async (values: DeleteFormValues) => {
    try {
      const payload = {
        ...values,
        userType: "user",
        uniqueId: values.uniqueId.toLowerCase(),
      };
      const res = await PostApi({
        url: URL_KEYS.AUTH.LOGIN,
        data: payload,
      }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        setIsOpen(!isOpen);
        setIsId(res?.data?._id);
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const res = await DeleteApi({
        url: `${URL_KEYS.AUTH.DELETE}/${isId}`,
      }).unwrap();
      if (res?.status === HTTP_STATUS.OK) {
        setIsOpen(!isOpen);
        navigate(ROUTES.HOME)
      }
    } catch (error) {}
  };

  return (
    <section id="purchase" className="container flex items-center justify-center py-10 px-4 gap-5">
      {/* Right Box - Form */}
      <div data-aos="fade-left" className="order-1 md:order-2 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 sm:px-10 sm:py-7  w-full max-w-2xl h-fit">
        <SectionHeader title="Delete Account" className="pb-6 text-center" />

        <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-4">
          <FormInput
            name="uniqueId"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
            placeholder="Email"
          />
          <FormInput
            name="password"
            className="!py-3 placeholder:!font-medium !px-4 rounded-lg"
            rules={[
              {
                required: true,
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
            placeholder="Password"
          />

          <div className="pt-4 flex justify-center">
            <Button loading={isLoading} htmlType="submit" type="primary" className="btn primary_btn !h-12 w-full">
              Delete
            </Button>
          </div>
        </Form>
      </div>
      <Modal open={isOpen} onCancel={() => setIsOpen(!isOpen)} footer={null} centered>
        <div className="p-3 space-y-3">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-primary text-center">Delete Account</h2>

          {/* Confirmation Text */}
          <p className="text-gray-700 font-medium text-center">Are you sure you want to delete your account? This action cannot be undone.</p>

          {/* Action Button */}
          <Button type="primary" loading={isLoadingDelete} className="btn primary_btn !h-12 w-full mt-5" onClick={() => handleDelete()}>
            Yes, Delete My Account
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default AccountDelete;
