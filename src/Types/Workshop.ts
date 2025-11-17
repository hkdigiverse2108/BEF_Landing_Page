import type { BaseEntity } from "./Common";
import type { Syllabus } from "./Course";

export interface WorkshopType extends BaseEntity {
  title?: string;
  image?: string;
  language?: string;
  syllabus?: Syllabus;
  courseMoneyBack?: boolean;
  totalLecture?: number;
  totalTest?: number;
  description?: string;
  pdf?: string;
  payingPrice?: number;
  moneyBack: string;
  discountAmount?: number;
  totalAmount?: number;
  courseUpgradePrice?: number;
  type?: string;
  onCallClick?: () => void;
  onViewDetails?: () => void;
}
