import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { FaPlus } from "react-icons/fa";

interface FAQ {
  id: number | string;
  question: string;
  answer: string;
}

const faqs = [
  {
    id: 1,
    question: "What is Bharat Exam Fest?",
    answer:
      "Bharat Exam Fest is an online platform offering scholarships, learning tools, and educational opportunities.",
  },
  {
    id: 2,
    question: "How can I apply for scholarships?",
    answer:
      "Simply register, complete your profile, and browse the available scholarships to apply directly.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container container-p">
      {/* Section Header */}
      <SectionHeader
        title="FAQ  – Frequently Asked Questions"
        desc="Explore the Most Common Questions and Their Solutions."
        className="pb-12 "
      />

      {/* FAQ Container */}
      <div>
        <div className="space-y-4">
          {faqs.map((faq: FAQ, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left p-4 sm:p-6 font-semibold  focus:outline-none text-primary `}
              >
                <span className="text-sm sm:text-lg ">{faq.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index
                      ? "rotate-45 text-primary"
                      : "rotate-0 text-gray-400"
                  } text-xl font-bold`}
                >
                  <FaPlus />
                </span>
              </button>

              {/* Answer Content */}

              <div
                className={`overflow-hidden transform  transition-all duration-400 ease-in-out origin-top ${
                  activeIndex === index
                    ? "max-h-96 opacity-100 scale-y-100 py-4 px-4 sm:px-6"
                    : "max-h-0 opacity-0 scale-y-0 p-0"
                }`}
              >
                <p className="text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
