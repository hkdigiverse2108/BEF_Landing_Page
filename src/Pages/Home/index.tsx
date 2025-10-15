import AboutSection from "../../Components/Home/AboutSection";
import ContactSection from "../../Components/Home/ContactSection";
import DownloadSection from "../../Components/Home/DownloadSection";
import FeatureSection from "../../Components/Home/FeatureSection";
import HeroSection from "../../Components/Home/HeroSection";
import StepsSection from "../../Components/Home/StepsSection";
import InterfaceSection from "../../Components/Home/InterfaceSection";
import BlogSection from "../../Components/Home/BlogSection";
import FAQSection from "../../Components/Home/FAQSection";
import ReviewSection from "../../Components/Home/ReviewSection";

const Home = () => {
  return (
    <div className="space-y-18 mt-24 mb-12">
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <StepsSection />
      <ReviewSection />
      <BlogSection />
      <FAQSection />
      <InterfaceSection />
      <DownloadSection />
      <ContactSection />
    </div>
  );
};

export default Home;
