
export interface StepType {
  title: string;
  description: string;
  link: string;
  thumbnailImage: string;
}

export interface FeatureItem {
  title: string;
  thumbnailImage: string;
  description?: string;
  link: string;
}

export interface BlogQuizItem {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface BlogType {
  _id: string;
  title: string;
  slug?: string;
  subTitle?: string;
  image?: string;
  description: string;
  category?: string;
  isFeatured?: boolean;
  author?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
  readTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  isIndex?: boolean;
  tags?: string[];
  quiz?: BlogQuizItem[];
  relatedBlogIds?: BlogType[];
  createdAt: string;
  updatedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  message: string;
}
