import { useState } from "react";
import type { FAQ } from "../../Types";
import FaqCard from "../Common/FaqCard";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";

const WorkshopFaqTab = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const { data } = useGetApiQuery({ url: `${URL_KEYS.FAQ.ALL}?typeFilter=workshop` });

  const Faqs = data?.data?.faq_data;

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="space-y-4">
        {Faqs?.map((faq: FAQ, index: number) => (
          <FaqCard faq={faq} index={index} activeIndex={activeIndex} onToggle={toggleFAQ} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopFaqTab;

