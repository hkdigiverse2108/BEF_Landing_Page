import { lazy, Suspense } from "react";
import { URL_KEYS } from "../../Constants";
import Seo from "../../Components/Common/Seo";
import StructuredData from "../../Components/Common/StructuredData";

const AboutSection = lazy(() => import("../../Components/Home/AboutSection"));
const ContactSection = lazy(() => import("../../Components/Home/ContactSection"));
const FeatureSection = lazy(() => import("../../Components/Home/FeatureSection"));
import HeroSection from "../../Components/Home/HeroSection";
const InterfaceSection = lazy(() => import("../../Components/Home/InterfaceSection"));
const BlogSection = lazy(() => import("../../Components/Home/BlogSection"));
const FAQSection = lazy(() => import("../../Components/Home/FAQSection"));
const TestimonialSection = lazy(() => import("../../Components/Home/TestimonialSection"));
import { useGetApiQuery } from "../../Api/CommonApi";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Home = () => {

  const { data: featuresData } = useGetApiQuery({
    url: URL_KEYS.FEATURE.ALL,
  });
  const features = featuresData?.data?.feature_data || [];

  // const { data: stepsData } = useGetApiQuery({
  //   url: URL_KEYS.HOW_IT_WORK.ALL,
  // });
  // const steps = stepsData?.data?.how_it_work_data || [];

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

  const { data: interfaceData } = useGetApiQuery({
    url: URL_KEYS.INTERFACE.ALL,
  });
  const interfaces = interfaceData?.data?.interface_data;

  const { data: aboutData } = useGetApiQuery({
    url: `${URL_KEYS.ABOUT.ALL}?type=course`,
  });
  const aboutUs = aboutData?.data?.aboutUs;

  return (
    <>
      <Seo
        title="Achiwon - UPSC Prelims, Mains & AI Answer Writing Practice"
        description="Get free UPSC Prelims & Mains prep with mock tests, AI answer evaluation, tailored study plans & daily current affairs on Achiwon — your smart exam partner."
        keywords="upsc prelims, upsc mains, ai answer writing, upsc mock test, upsc preparation platform"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.achiwon.com/#organization",
              name: "Achiwon",
              url: "https://www.achiwon.com/",
              logo: "https://www.achiwon.com/logo.png",
              description:
                "Achiwon is an AI-powered UPSC and competitive exam preparation platform offering mock tests, courses, workshops, current affairs and smart study tools.",
              sameAs: [
                "https://www.facebook.com/achiwoncse",
                "https://www.instagram.com/achiwoncse/",
                "https://www.youtube.com/@achiwon",
                "https://t.me/+F5nF-pfPwpczNjZl",
              ],
            },
            {
              "@type": "EducationalOrganization",
              "@id": "https://www.achiwon.com/#education",
              name: "Achiwon",
              url: "https://www.achiwon.com/",
              description:
                "Online education platform for UPSC and competitive exams with AI-driven learning tools, expert-led courses and workshops.",
              parentOrganization: {
                "@id": "https://www.achiwon.com/#organization",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://www.achiwon.com/#website",
              url: "https://www.achiwon.com/",
              name: "Achiwon",
              publisher: {
                "@id": "https://www.achiwon.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.achiwon.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.achiwon.com/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Achiwon?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Achiwon is an AI-powered online platform designed for UPSC and competitive exam preparation, offering mock tests, courses, workshops, current affairs and smart learning tools.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Achiwon free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Achiwon offers free access to several learning resources including mock tests, current affairs and AI-powered study tools.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which exams does Achiwon support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Achiwon supports UPSC Civil Services and various other competitive and government exams through structured courses and practice tools.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Achiwon provide AI-based exam preparation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Achiwon uses AI-powered tools for smart study planning, performance analysis and exam-focused learning support.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <div className="space-y-18">
        <HeroSection interfaces={interfaces || []} />
        <Suspense fallback={<div className="py-20 flex w-full justify-center items-center"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}>
          <FeatureSection features={features} />
          <AboutSection aboutUs={aboutUs} />
          {/* <StepsSection steps={steps} /> */}
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
