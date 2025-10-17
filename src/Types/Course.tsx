export interface CourseCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  lang?: string;
  type?: string;
  btnTitle?: string;
  onCallClick?: () => void;
  onViewDetails?: () => void;
}
