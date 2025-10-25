
export interface Syllabus {
  subjectLevel: string;
  fullSyllabus: string;
}

export interface CourseType {
  _id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  language?: string;
  syllabus?: Syllabus;
  courseMoneyBack?: boolean;
  totalLecture?: number;
  totalTest?: number;
  description?: string;
  pdf?: string;
  price?: number;
  discountPrice?: number;
  payingPrice?: number;
  priceInStruction?: string;
  courseUpgradePrice?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  type?: string;
  onCallClick?: () => void;
  onViewDetails?: () => void;
}

