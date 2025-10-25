import type { FormItemProps, InputProps } from "antd";

export interface BaseEntity {
  _id?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}


export interface FormInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: any[];
  required?: boolean;
  type?: string;
  formItemProps?: FormItemProps;
}

export interface FormValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  pincode?: string;
  referralCode?: string;
  referral?: string;
  reachFrom?: string;
}


