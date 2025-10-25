import { useState } from "react";
import type { FAQ } from "../../Types";
import FaqCard from "../Common/FaqCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const faqs = [
  {
    id: 1,
    question: "What is Bharat Exam Fest?",
    answer: "Bharat Exam Fest is an online platform offering scholarships, learning tools, and educational opportunities.",
  },
  {
    id: 2,
    question: "How can I apply for scholarships?",
    answer: "Simply register, complete your profile, and browse the available scholarships to apply directly.",
  },
];

const CourseFaqsTab = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const { data } = useGetApiQuery({ url: URL_KEYS.FAQ.ALL });

  console.log("Faq : ", data);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="space-y-4">
        {faqs.map((faq: FAQ, index) => (
          <FaqCard faq={faq} index={index} activeIndex={activeIndex} onToggle={toggleFAQ} />
        ))}
      </div>
    </div>
  );
};

export default CourseFaqsTab;
