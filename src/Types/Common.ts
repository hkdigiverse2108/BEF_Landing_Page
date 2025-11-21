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
  purchaseId?: string;
  workshopRegisterId?: string;
}

export interface ModuleType {
  _id: string;
  courseId: string;
  name: string;
  subTitle: string;
  totalLecture: number;
  totalTest: number;
  image: string;
  link: string;
}

export interface LectureType {
  _id: string;
  courseId: string;
  moduleId: string;
  language: string;
  subjectName: string;
  title: string;
  subtitle: string;
  image: string;
  pdf: string;
  link: string;
  date?: string;
  isLocked: boolean;
}

export interface Testimonial {
  name: string;
  designation: string;
  description: string;
  rating: number;
  image: string;
}

export interface ContactType {
  NUMBER: string;
  EMAIL_INFO: string;
  EMAIL_HELP: string;
  EMAIL_SALES: string;
  ADDRESS: string;
}
