import AboutSection from "../../Components/Home/AboutSection";
import ContactSection from "../../Components/Home/ContactSection";
import DownloadSection from "../../Components/Home/DownloadSection";
import FeatureSection from "../../Components/Home/FeatureSection";
import HeroSection from "../../Components/Home/HeroSection";
import StepsSection from "../../Components/Home/StepsSection";
import InterfaceSection from "../../Components/Home/InterfaceSection";
import BlogSection from "../../Components/Home/BlogSection";
import FAQSection from "../../Components/Home/FAQSection";
import TestimonialSection from "../../Components/Home/TestimonialSection";
// import Footer from "../../Layout/Footer";

const Home = () => {
  return (
    <>
      <div className="space-y-18">
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <StepsSection />
        <TestimonialSection />
        <BlogSection />
        <FAQSection />
        <InterfaceSection />
        <DownloadSection />
        <ContactSection />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
