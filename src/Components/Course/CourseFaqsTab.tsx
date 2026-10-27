import { useState, useMemo } from "react";
import type { FAQ } from "../../Types";
import FaqCard from "../Common/FaqCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const DEFAULT_COURSE_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "REFUND POLICY",
    answer:
      "Enrollment fees are non-refundable except under our official guarantees: the Minimum 60+ Marks Direct-Hit Guarantee (100% refund if criteria not met) and the Consistency Scheme (100% deposit back upon maintaining attendance and discipline).",
  },
  {
    question: "What does “Pay Full Fee Only After You Clear Prelims” mean?",
    answer:
      "Students only pay the token commitment fee upfront. The complete course fees become payable only once you successfully clear the UPSC/GPSC Prelims examination stage.",
  },
  {
    question: "What is the “Minimum 60+ Marks Direct-Hit Guarantee”?",
    answer:
      "Our structured GS and CSAT modules guarantee that at least 60 marks worth of direct or logically solvable questions in Prelims will be hit directly from our coverage, or 100% refund terms apply.",
  },
  {
    question: "What is the Refund in the Consistency Scheme?",
    answer:
      "Students maintaining 90%+ attendance and regular test submissions qualify for special consistency scholarship cashback schemes.",
  },
  {
    question: "How many questions in UPSC Prelims will directly Hit from Achiwon Aptitude Courses?",
    answer:
      "Over 30+ direct questions in GS Paper 1 and 25+ direct question types in CSAT are rigorously addressed through our question-solving frameworks.",
  },
  {
    question: "Will I get personal mentorship?",
    answer:
      "Yes, dedicated academic counsellors and expert faculties (Kartik Sir & Krina Ma'am) provide 1-on-1 performance reviews and strategy guidance.",
  },
  {
    question: "Are the courses bilingual?",
    answer:
      "Lectures and core conceptual discussions are delivered bilingually in English and Hindi/Gujarati with comprehensive English study PDFs.",
  },
  {
    question: "Can I access the courses on mobile or laptop?",
    answer:
      "Yes, seamless access is available on web browsers (desktop/laptop) as well as the mobile-optimized web application.",
  },
  {
    question: "How long will I get access to the courses?",
    answer:
      "Full access remains valid until the completion of the UPSC CSE Prelims 2026 examination.",
  },
];

const CourseFaqsTab = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const { data } = useGetApiQuery({
    url: `${URL_KEYS.FAQ.ALL}?typeFilter=course`,
  });

  const apiFaqs = data?.data?.faq_data;

  const faqsList = useMemo(() => {
    if (apiFaqs && apiFaqs.length > 0) {
      return apiFaqs.map((f: FAQ) => ({
        ...f,
        question: f.question.replace(/BEF/gi, "Achiwon").replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon"),
        answer: f.answer.replace(/BEF/gi, "Achiwon").replace(/Bharat\s*Exam\s*Fest/gi, "Achiwon"),
      }));
    }
    return DEFAULT_COURSE_FAQS;
  }, [apiFaqs]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="space-y-4">
        {faqsList.map((faq: any, index: number) => (
          <FaqCard
            key={faq.id || index}
            faq={faq}
            index={index}
            activeIndex={activeIndex}
            onToggle={toggleFAQ}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseFaqsTab;
