import { useState } from "react";
import { LuSparkles, LuCircleCheck, LuCircleX, LuRotateCcw, LuCheck } from "react-icons/lu";
import type { BlogQuizItem } from "../../Types";

interface BlogInteractiveQuizProps {
  quizItems?: BlogQuizItem[];
  title?: string;
}

const DEFAULT_QUIZ: BlogQuizItem[] = [
  {
    question: "1. Which factors directly influence UPSC Civil Services allocation?",
    options: [
      "Only the final numerical rank",
      "Rank, category, vacancies, service preferences and medical eligibility",
      "Only personality test interview marks",
      "Only the candidate's age and state cadre",
    ],
    answer: "Rank, category, vacancies, service preferences and medical eligibility",
    explanation: "Service allocation is a multi-step formula considering category rank, available category-wise vacancies, and preference choices.",
  },
  {
    question: "2. Which is the correct chronological sequence of the UPSC CSE examination?",
    options: [
      "Mains Examination → Preliminary Screening → Personality Test",
      "Personality Test → Preliminary Exam → Mains Examination",
      "Preliminary Examination → Main Examination → Personality Test",
      "Preliminary Screening → Interview → Mains Written Examination",
    ],
    answer: "Preliminary Examination → Main Examination → Personality Test",
    explanation: "UPSC CSE begins with Prelims (GS + CSAT), qualifying candidates proceed to Mains (written), and then Personality Test (Interview).",
  },
  {
    question: "3. What should aspirants utilize previous year cut-off trends for?",
    options: [
      "Directional guidance and smart preference planning",
      "A guaranteed service allotment commitment",
      "Replacing official UPSC Gazette notifications",
      "Deciding to skip optional subject preparation",
    ],
    answer: "Directional guidance and smart preference planning",
    explanation: "Past cut-offs provide strategic perspective but can fluctuate significantly depending on paper difficulty and vacancies.",
  },
];

export const BlogInteractiveQuiz: React.FC<BlogInteractiveQuizProps> = ({
  quizItems = DEFAULT_QUIZ,
  title = "Quick Concept MCQ Test",
}) => {
  const questions = quizItems && quizItems.length > 0 ? quizItems : DEFAULT_QUIZ;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      // Compare option text or letter
      if (selected && (selected === q.answer || selected.startsWith(q.answer) || q.answer.startsWith(selected))) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const total = questions.length;

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <section id="achiwon-quiz" className="my-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#124699]">
            <LuSparkles className="text-[#F48224]" /> Interactive Knowledge Check
          </span>
          <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-[#0F172A]">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-[#EDF4FF] px-3 py-1 text-xs font-bold text-[#124699]">
          {questions.length} Questions
        </span>
      </div>

      {/* Questions list */}
      <div className="mt-5 space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[qIndex];
          const isCorrect = selected && (selected === q.answer || selected.startsWith(q.answer) || q.answer.startsWith(selected));

          return (
            <div key={qIndex} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="font-bold text-sm sm:text-base text-[#0F172A] leading-relaxed">
                {q.question}
              </p>

              <div className="mt-3 space-y-2">
                {q.options.map((opt, oIndex) => {
                  const isThisSelected = selected === opt;
                  const isThisCorrect = opt === q.answer || opt.startsWith(q.answer) || q.answer.startsWith(opt);

                  let optionClass = "border-gray-200 bg-white text-[#334155] hover:border-gray-300";
                  if (submitted) {
                    if (isThisCorrect) {
                      optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    } else if (isThisSelected && !isCorrect) {
                      optionClass = "border-red-400 bg-red-50 text-red-900";
                    }
                  } else if (isThisSelected) {
                    optionClass = "border-[#124699] bg-[#EDF4FF] text-[#124699] font-bold shadow-2xs";
                  }

                  return (
                    <label
                      key={oIndex}
                      onClick={() => handleSelect(qIndex, opt)}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-xs sm:text-sm cursor-pointer transition-all ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name={`quiz-q-${qIndex}`}
                        value={opt}
                        checked={isThisSelected}
                        onChange={() => handleSelect(qIndex, opt)}
                        disabled={submitted}
                        className="mt-0.5 accent-[#124699]"
                      />
                      <span className="flex-1 leading-snug">{opt}</span>
                      {submitted && isThisCorrect && (
                        <LuCircleCheck className="text-emerald-600 text-base shrink-0" />
                      )}
                      {submitted && isThisSelected && !isCorrect && (
                        <LuCircleX className="text-red-500 text-base shrink-0" />
                      )}
                    </label>
                  );
                })}
              </div>

              {submitted && q.explanation && (
                <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-xs text-blue-900 leading-relaxed">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result & Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex items-center gap-2 rounded-xl bg-[#124699] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#0E3678] cursor-pointer"
          >
            <LuCheck className="text-base" />
            <span>Submit Test</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-between w-full gap-4">
            <div className="rounded-xl bg-[#EDF4FF] border border-[#BFDBFE] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#124699]">
              Your Score: <span className="text-base font-extrabold">{score}</span> / {total} —{" "}
              {score === total
                ? "🏆 Outstanding! 100% Accuracy!"
                : score >= Math.ceil(total * 0.6)
                ? "👍 Good Job! Keep practising."
                : "💡 Review the concepts and try again."}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] hover:bg-gray-50 cursor-pointer"
            >
              <LuRotateCcw />
              <span>Retry Quiz</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogInteractiveQuiz;
