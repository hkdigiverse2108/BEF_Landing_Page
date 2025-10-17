import type { FAQ } from "../../Types";
import { FaAngleDown } from "react-icons/fa";

const FaqCard = ({
  faq,
  index,
  activeIndex,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
}) => {
  return (
    <div
      key={faq.id}
      className="bg-white rounded-xl hover:shadow-md transition-all  border border-gray-200"
      data-aos="fade-up"
    >
      {/* Question Header */}
      <button
        onClick={() => onToggle(index)}
        className={`w-full flex justify-between items-center text-left p-4 sm:p-6 font-semibold  focus:outline-none text-primary `}
      >
        <span className="text-sm sm:text-lg ">{faq.question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            activeIndex === index
              ? "rotate-180 text-primary"
              : "rotate-0 text-gray-400"
          } text-xl font-bold`}
        >
          <FaAngleDown />
        </span>
      </button>

      <div
        className={`overflow-hidden transform  transition-all duration-400 ease-in-out origin-top ${
          activeIndex === index
            ? "max-h-96 opacity-100 scale-y-100 py-4 px-4 sm:px-6"
            : "max-h-0 opacity-0 scale-y-0 p-0"
        }`}
      >
        <p className="text-sm sm:text-base">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FaqCard;
