import type { BaseEntity, FormValues } from "./Common";

export interface Syllabus {
  subjectLevel: string;
  fullSyllabus: string;
}

export interface CourseType extends BaseEntity {
  title?: string;
  subtitle?: string;
  image?: string;
  language?: string;
  syllabus?: Syllabus;
  courseMoneyBack?: boolean;
  totalLecture?: number;
  totalTest?: number;
  description: string | TrustedHTML;
  pdf?: string;
  price?: number;
  discountPrice?: number;
  payingPrice?: number;
  priceInStruction?: string;
  courseUpgradePrice?: number;
  type?: string;
  onCallClick?: () => void;
  onViewDetails?: () => void;
}

export interface CourseWorkshopRegisterPayload extends FormValues {
  courseId?: string;
  workshopId?: string;
  payingPrice?: number;
  discountPrice?: number;
  price?: number;
  amount?: number;
  paymentDate?: string;
  merchantId?: string;
  paymentId?: string;
  status: "COMPLETED" | "FAILED";
}
