export type HomeLoadingProps = {
  setHomeLoading: (loading: boolean) => void;
};

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

export interface BlogType {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  message: string;
}
