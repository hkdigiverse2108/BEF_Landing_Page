import React from "react";
import { LuCheck, LuBookOpen } from "react-icons/lu";

interface FormattedSolutionProps {
  solution?: any;
  correctAnswer?: string;
  className?: string;
}

const extractSolutionText = (val: any): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    if (typeof val.combined === "string") return val.combined;
    if (typeof val.text === "string") return val.text;
    if (typeof val.solution === "string") return val.solution;
    if (Array.isArray(val)) return val.map(extractSolutionText).join("\n");
  }
  return String(val);
};

export const FormattedSolution: React.FC<FormattedSolutionProps> = ({
  solution,
  correctAnswer,
  className = "",
}) => {
  const rawText = extractSolutionText(solution);
  if (!rawText || !rawText.trim()) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/70 p-4 text-xs text-gray-500">
        Detailed solution is currently being updated for this question according to official UPSC answer keys.
      </div>
    );
  }

  // Parse structured blocks if text contains standard markers
  const cleanSolution = rawText.trim();

  // Highlight helper for options like (a), (b), (c), (d) or numbered sections
  const formatParagraph = (text: string) => {
    // Break into lines and render paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

    return (
      <div className="space-y-2.5 text-xs sm:text-sm text-[#1F2937] leading-relaxed">
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim();

          // Check if it's a section header
          if (
            trimmed.startsWith("1)") ||
            trimmed.startsWith("2)") ||
            trimmed.startsWith("3)") ||
            trimmed.startsWith("4)") ||
            trimmed.toLowerCase().includes("why other options are wrong") ||
            trimmed.toLowerCase().includes("linkages to pyqs") ||
            trimmed.toLowerCase().includes("linkages to current affairs") ||
            trimmed.toLowerCase().includes("aptitude (clues)")
          ) {
            return (
              <div
                key={idx}
                className="mt-3 pt-2 border-t border-blue-100/70 font-heading font-extrabold text-[#124699] flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F48224]" />
                <span>{trimmed}</span>
              </div>
            );
          }

          // Check for option callouts like (a), (b), (c), (d)
          if (/^\([a-d]\)/i.test(trimmed)) {
            return (
              <div
                key={idx}
                className="rounded-lg bg-white/80 border border-gray-200/70 p-2.5 shadow-2xs font-medium"
              >
                {trimmed}
              </div>
            );
          }

          // Check for image URL
          if (/^https?:\/\/.*\.(png|jpg|jpeg|webp|gif)/i.test(trimmed)) {
            return (
              <div key={idx} className="my-2 rounded-xl overflow-hidden border border-gray-200 bg-white">
                <img src={trimmed} alt="Solution diagram" className="max-h-64 object-contain mx-auto" />
              </div>
            );
          }

          return (
            <p key={idx} className="whitespace-pre-wrap">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`rounded-2xl border border-blue-200/80 bg-[#F4F8FE] p-4 sm:p-5 shadow-xs transition-all ${className}`}>
      {/* Solution Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-blue-200/60">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#124699] text-white text-sm shadow-xs">
            <LuBookOpen className="text-sm" />
          </span>
          <span className="font-heading text-sm font-bold text-[#124699]">
            Detailed Solution &amp; Elimination Rationale
          </span>
        </div>

        {correctAnswer && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A] px-3 py-1 text-xs font-extrabold text-white shadow-2xs">
            <LuCheck className="text-sm" /> Correct Option: {correctAnswer.toUpperCase()}
          </span>
        )}
      </div>

      {/* Formatted Solution Body */}
      {formatParagraph(cleanSolution)}
    </div>
  );
};

export default FormattedSolution;
