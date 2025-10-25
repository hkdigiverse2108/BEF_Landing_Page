import { Form, Input } from "antd";
import { type FC } from "react";
import type { FormInputProps } from "../../Types";

const FormInput: FC<FormInputProps> = ({ name, label, placeholder, rules, required, type = "text", formItemProps, ...inputProps }) => {
  return (
    <Form.Item name={name} label={label} rules={rules || (required ? [{ required: true, message: `${name} Is Required` }] : [])} {...formItemProps}>
      <Input type={type} placeholder={placeholder} {...inputProps} />
    </Form.Item>
  );
};

export default FormInput;
