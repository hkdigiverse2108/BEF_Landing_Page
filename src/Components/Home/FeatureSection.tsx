import "aos/dist/aos.css";
import { ImagePath } from "../../Constants";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import type { FeatureItem } from "../../Types";
import YoutubeVideoModal from "../Common/YoutubeVideoModal";
import { useState } from "react";

const FeatureSection = ({ features }: { features: FeatureItem[] }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  return (
    <section
      id="features"
      className="relative overflow-hidden container container-p "
    >
      {/* Section Title */}
      <SectionHeader
        title="Features that makes app different!"
        desc=" Experience unparalleled AI-driven insights, detailed post-exam
            analysis,
            unique earning opportunities and features designed to simplify UPSC
            preparation."
        className="mb-8 lg:mb-32"
      />

      {/* Feature Layout */}
      <div className="bg-white rounded-2xl shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-start py-6 lg:py-16 px-4 lg:px-12 gap-8 relative">
        {/* Left Side */}
        <div className="lg:order-1 order-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 space-y-8 w-full lg:w-1/3">
          {features
            ?.filter((_: FeatureItem, i: number) => i % 2 === 0)
            ?.map((item: FeatureItem, i: number) => (
              <div
                key={i}
                data-aos="fade-right"
                className="flex flex-col md:items-end gap-3 w-full "
              >
                <div
                  onClick={() => {
                    setPlayVideo(true);
                    setVideoLink(item.link);
                  }}
                  className="block w-full  rounded-xl overflow-hidden"
                >
                  <img
                    src={item.thumbnailImage}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h4 className="text-lg font-semibold text-primary uppercase  md:text-right">
                  {item.title}
                </h4>
              </div>
            ))}
        </div>

        {/* Center Image (overlapping top) */}
        <div
          className="order-1 lg:order-2 w-full lg:w-1/3 p-3 flex justify-center relative lg:-translate-y-40 z-10 "
          data-aos="fade-up"
        >
          <img
            src={`${ImagePath}/features/Feature.png`}
            alt="Feature Illustration"
            className="w-fit h-fit lg:w-full md:h-auto "
          />
        </div>

        {/* Right Side */}
        <div className="order-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4  space-y-8 w-full lg:w-1/3">
          {features
            ?.filter((_: FeatureItem, i: number) => i % 2 !== 0)
            ?.map((item: FeatureItem, i: number) => (
              <div
                key={i}
                data-aos="fade-left"
                className="flex flex-col items-start gap-3 w-full "
              >
                <div
                  onClick={() => {
                    setPlayVideo(true);
                    setVideoLink(item.link);
                  }}
                  className="block w-full  rounded-xl overflow-hidden"
                >
                  <img
                    src={item.thumbnailImage}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h4 className="text-lg font-semibold text-primary uppercase text-right">
                  {item.title}
                </h4>
              </div>
            ))}
        </div>
      </div>
      <YoutubeVideoModal
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoLink={videoLink}
      />
    </section>
  );
};

export default FeatureSection;
