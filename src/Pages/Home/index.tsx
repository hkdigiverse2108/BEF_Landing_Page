import { lazy, Suspense, useEffect, useState, type FC, type ReactNode } from "react";
import Loader from "../../Components/Common/Loader";
import { URL_KEYS } from "../../Constants";

const AboutSection = lazy(() => import("../../Components/Home/AboutSection"));
const ContactSection = lazy(() => import("../../Components/Home/ContactSection"));
// const DownloadSection = lazy(() => import("../../Components/Home/DownloadSection")) ;
const FeatureSection = lazy(() => import("../../Components/Home/FeatureSection"));
const HeroSection = lazy(() => import("../../Components/Home/HeroSection"));
const StepsSection = lazy(() => import("../../Components/Home/StepsSection"));
const InterfaceSection = lazy(() => import("../../Components/Home/InterfaceSection"));
const BlogSection = lazy(() => import("../../Components/Home/BlogSection"));
const FAQSection = lazy(() => import("../../Components/Home/FAQSection"));
const TestimonialSection = lazy(() => import("../../Components/Home/TestimonialSection"));
import { useGetApiQuery } from "../../Api/CommonApi";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LazyTrackerProps {
  onLoaded?: () => void;
  children: ReactNode;
}

const Home = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const LazyTracker: FC<LazyTrackerProps> = ({ onLoaded, children }) => {
    useEffect(() => {
      onLoaded?.();
    }, []);

    return children;
  };

  const { data: featuresData } = useGetApiQuery({
    url: URL_KEYS.FEATURE.ALL,
  });
  const features = featuresData?.data?.feature_data || [];

  const { data: stepsData } = useGetApiQuery({
    url: URL_KEYS.HOW_IT_WORK.ALL,
  });
  const steps = stepsData?.data?.how_it_work_data || [];

  const { data: testimonialsData } = useGetApiQuery({ url: URL_KEYS.WORKSHOP.TESTIMONIAL });
  const testimonials = testimonialsData?.data?.webinar_testimonial_data || [];

  const { data: blogData } = useGetApiQuery({
    url: URL_KEYS.BLOG.ALL,
  });
  const blogs = blogData?.data?.blog_data || [];

  const { data: faqsData } = useGetApiQuery({
    url: `${URL_KEYS.FAQ.ALL}?typeFilter=landing-page`,
  });
  const faqs = faqsData?.data?.faq_data;

  const { data: interfaceData, isLoading: interfaceLoading } = useGetApiQuery({
    url: URL_KEYS.INTERFACE.ALL,
  });
  const interfaces = interfaceData?.data?.interface_data;

  const { data: aboutData } = useGetApiQuery({
    url: `${URL_KEYS.ABOUT.ALL}?type=course`,
  });
  const aboutUs = aboutData?.data?.aboutUs;

  if (interfaceLoading) return <Loader />;

  return (
    <>
      <div className="space-y-18">
        <Suspense fallback={<Loader />}>
          <LazyTracker onLoaded={() => setIsHeroLoaded(true)}>
            <HeroSection interfaces={interfaces} />
          </LazyTracker>
        </Suspense>
        <Suspense fallback={<div className="py-30! flex w-full justify-center items-center">{isHeroLoaded && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}</div>}>
          <FeatureSection features={features} />
          <AboutSection aboutUs={aboutUs} />
          <StepsSection steps={steps} />
          <TestimonialSection testimonials={testimonials} />
          <BlogSection blogs={blogs} />
          <FAQSection faqs={faqs} />
          <InterfaceSection interfaces={interfaces} />
          {/* <DownloadSection /> */}
          <ContactSection />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
