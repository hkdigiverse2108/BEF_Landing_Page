import type { BaseEntity } from "./Common";

export interface WorkshopType extends BaseEntity {
  title?: string;
  image?: string;
  language?: string;
  syllabus?: String;
  courseMoneyBack?: boolean;
  totalLecture?: number;
  totalTest?: number;
  description?: string;
  pdf?: string;
  payingPrice?: number;
  discountAmount?: number;
  totalAmount?: number;
  courseUpgradePrice?: number;
  type?: string;
  onCallClick?: () => void;
  onViewDetails?: () => void;
}
