import AboutSection from "../../Components/Home/AboutSection";
import ContactSection from "../../Components/Home/ContactSection";
// import DownloadSection from "../../Components/Home/DownloadSection";
import FeatureSection from "../../Components/Home/FeatureSection";
import HeroSection from "../../Components/Home/HeroSection";
import StepsSection from "../../Components/Home/StepsSection";
import InterfaceSection from "../../Components/Home/InterfaceSection";
import BlogSection from "../../Components/Home/BlogSection";
import FAQSection from "../../Components/Home/FAQSection";
import TestimonialSection from "../../Components/Home/TestimonialSection";
import Loader from "../../Components/Common/Loader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const Home = () => {
  const { data: featuresData, isLoading: featureLoading } = useGetApiQuery({
    url: URL_KEYS.FEATURE.ALL,
  });
  const features = featuresData?.data?.feature_data || [];

  const { data: stepsData, isLoading: stepsLoading } = useGetApiQuery({
    url: URL_KEYS.HOW_IT_WORK.ALL,
  });
  const steps = stepsData?.data?.how_it_work_data || [];

  const { data: testimonialsData, isLoading: testimonialLoading } =
    useGetApiQuery({ url: URL_KEYS.WORKSHOP.TESTIMONIAL });
  const testimonials = testimonialsData?.data?.webinar_testimonial_data || [];

  const { data: blogData, isLoading: blogLoading } = useGetApiQuery({
    url: URL_KEYS.BLOG.ALL,
  });
  const blogs = blogData?.data?.blog_data || [];

  const { data: faqsData, isLoading: faqLoading } = useGetApiQuery({
    url: `${URL_KEYS.FAQ.ALL}?typeFilter=landing-page`,
  });
  const faqs = faqsData?.data?.faq_data;

  const { data: interfaceData, isLoading: interfaceLoading } = useGetApiQuery({
    url: URL_KEYS.INTERFACE.ALL,
  });
  const interfaces = interfaceData?.data?.interface_data;

  const { data: aboutData, isLoading: aboutLoading } = useGetApiQuery({
    url: `${URL_KEYS.ABOUT.ALL}?type=course`,
  });
  const aboutUs = aboutData?.data?.aboutUs;

  // if (
  //   featureLoading ||
  //   stepsLoading ||
  //   testimonialLoading ||
  //   blogLoading ||
  //   faqLoading ||
  //   interfaceLoading ||
  //   aboutLoading
  // )
  //   return <Loader />;
  if (featureLoading) return <Loader />;

  return (
    <>
      <div className="space-y-18">
        <HeroSection />
        <FeatureSection features={features} />
        <AboutSection aboutUs={aboutUs} />
        <StepsSection steps={steps} />
        <TestimonialSection testimonials={testimonials} />
        <BlogSection blogs={blogs} />
        <FAQSection faqs={faqs} />
        <InterfaceSection interfaces={interfaces} />
        {/* <DownloadSection /> */}
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
