import React from "react";
import { LuPanelRightClose, LuPanelRightOpen, LuCheck, LuFlag } from "react-icons/lu";
import "./ModernMockTest.css";

export type QuestionStatus = "answered" | "marked" | "skipped" | "notVisited";

interface MockTestPaletteProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  questionStatuses: Record<number, QuestionStatus>;
  markedIndices?: Set<number>;
  onSelectQuestion: (index: number) => void;
  onOpenInstructions: () => void;
  onOpenEndTest: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const MockTestPalette: React.FC<MockTestPaletteProps> = ({
  totalQuestions,
  currentQuestionIndex,
  questionStatuses,
  markedIndices,
  onSelectQuestion,
  onOpenInstructions,
  onOpenEndTest,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  // Count stats
  let answered = 0;
  let marked = 0;
  let skipped = 0;
  for (let i = 0; i < totalQuestions; i++) {
    const st = questionStatuses[i];
    if (st === "answered") answered++;
    if (st === "skipped") skipped++;
    if (markedIndices ? markedIndices.has(i) : st === "marked") marked++;
  }
  const notSeen = Math.max(0, totalQuestions - answered - marked - skipped);
  const remaining = Math.max(0, totalQuestions - answered);
  const progressPercent = totalQuestions > 0 ? (answered / totalQuestions) * 100 : 0;

  if (isCollapsed) {
    return (
      <div className="modern-glass-card rounded-2xl p-3 flex flex-col items-center">
        <button
          type="button"
          onClick={onToggleCollapse}
          title="Expand Palette"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#124699] hover:bg-[#DBEAFE] transition cursor-pointer"
        >
          <LuPanelRightOpen className="text-xl" />
        </button>
      </div>
    );
  }

  return (
    <div className="modern-glass-card rounded-2xl p-5 lg:sticky lg:top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#124699]">
            Mock test
          </p>
          <h2 className="mt-0.5 text-base sm:text-lg font-extrabold text-[#0F172A]">
            Question Palette
          </h2>
        </div>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse palette"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#124699] hover:bg-[#DBEAFE] transition cursor-pointer"
          >
            <LuPanelRightClose className="text-lg" />
          </button>
        )}
      </div>

      {/* 4 Stats Cards (from Achiwon_PYQ_Modern) */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <div className="rounded-xl border border-[#124699]/30 bg-[#124699]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
          <b className="block text-base sm:text-xl font-extrabold text-[#124699] leading-none">
            {answered}
          </b>
          <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
            Answered
          </span>
        </div>
        <div className="rounded-xl border border-[#F48224]/30 bg-[#F48224]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
          <b className="block text-base sm:text-xl font-extrabold text-[#F48224] leading-none">
            {marked}
          </b>
          <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
            Marked
          </span>
        </div>
        <div className="rounded-xl border border-[#64748B]/30 bg-[#64748B]/10 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
          <b className="block text-base sm:text-xl font-extrabold text-[#64748B] leading-none">
            {skipped}
          </b>
          <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
            Skipped
          </span>
        </div>
        <div className="rounded-xl border border-[#CBD5E1] bg-[#F1F5F9]/70 p-2 sm:p-2.5 text-center transition hover:-translate-y-0.5">
          <b className="block text-base sm:text-xl font-extrabold text-[#64748B] leading-none">
            {notSeen}
          </b>
          <span className="mt-1.5 block text-[10px] font-bold text-[#64748B]">
            Not seen
          </span>
        </div>
      </div>

      {/* Question Grid Buttons */}
      <div className="mt-4 max-h-[340px] overflow-y-auto p-3.5 sm:p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
        <div className="grid grid-cols-5 gap-2.5 p-1.5">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const status = questionStatuses[i] || "notVisited";
            const isCurrent = i === currentQuestionIndex;

            const isMarked = markedIndices ? markedIndices.has(i) : status === "marked";

            let statusClass = "pal-not-visited";
            if (isMarked) {
              statusClass = "pal-marked";
            } else if (status === "skipped") {
              statusClass = "pal-skipped";
            } else if (status === "answered") {
              statusClass = "pal-answered";
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectQuestion(i)}
                className={`modern-pal-btn ${statusClass} ${isCurrent ? "pal-current" : ""}`}
                title={`Question ${i + 1} (${status})`}
              >
                <span>{i + 1}</span>

                {/* Top-Right Badge for Answered (Checkmark) */}
                {status === "answered" && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] border-2 border-white text-white text-[9px] shadow-xs">
                    <LuCheck className="stroke-[3.5]" />
                  </span>
                )}

                {/* Top-Right Badge for Marked (Flag) */}
                {isMarked && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F48224] border-2 border-white text-white text-[8px] shadow-xs">
                    <LuFlag className="fill-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shimmer Progress Box */}
      <div className="mt-4 rounded-xl bg-[#EFF6FF] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
            Progress
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#124699]">
            {String(answered).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
          </span>
        </div>
        <div className="relative mt-2.5 h-2.5 overflow-hidden rounded-full bg-white border border-[#E2E8F0]">
          <div
            className="modern-shimmer-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] font-semibold text-[#64748B]">
          {remaining} questions remaining
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 grid gap-2.5">
        <button
          type="button"
          onClick={onOpenInstructions}
          className="min-h-11 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-extrabold text-[#0F172A] transition hover:border-[#124699] hover:text-[#124699] hover:bg-[#F8FAFC] cursor-pointer"
        >
          INSTRUCTIONS
        </button>
        <button
          type="button"
          onClick={onOpenEndTest}
          className="min-h-11 rounded-xl border-2 border-[#DC2626] bg-white text-xs sm:text-sm font-extrabold text-[#DC2626] transition hover:bg-[#FEF2F2] cursor-pointer"
        >
          END TEST
        </button>
      </div>
    </div>
  );
};
