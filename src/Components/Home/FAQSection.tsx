import SectionHeader from "./SectionHeader";
import type { FAQ } from "../../Types";
import FaqCard from "../Common/FaqCard";
import { useState } from "react";


const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container container-p">
      {/* Section Header */}
      <SectionHeader title="FAQ  – Frequently Asked Questions" desc="Explore the Most Common Questions and Their Solutions." className="pb-12 " />

      {/* FAQ Container */}
      <div>
        <div className="space-y-4">
          {faqs?.map((faq: FAQ, index: number) => (
            <FaqCard key={index} faq={faq} index={index} activeIndex={activeIndex} onToggle={toggleFAQ} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
