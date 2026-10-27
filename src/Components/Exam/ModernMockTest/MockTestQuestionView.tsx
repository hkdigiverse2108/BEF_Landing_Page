import React from "react";
import {
  LuCheck,
  LuX,
  LuBookmark,
  LuBookOpen,
  LuChevronDown,
  LuRefreshCw,
  LuArrowLeft,
  LuArrowRight,
  LuCircleCheck,
  LuLightbulb,
  LuZap,
  LuTarget,
  LuShield,
  LuForward,
  LuPanelRightOpen,
  LuPanelRightClose,
} from "react-icons/lu";
import { IoLanguage } from "react-icons/io5";
import "./ModernMockTest.css";
import FormattedSolution from "../../Common/FormattedSolution";
import {
  type BackendQuestionItem,
  type LanguageKey,
  isStatementType,
  isPairType,
  isImage,
} from "./mockQuestionsData";

export interface UserQuestionAnswerState {
  selectedOption?: string; // 'A' | 'B' | 'C' | 'D'
  statementJudgments: Record<number, "true" | "false" | undefined>;
  excludedOptions: Record<string, boolean>; // 'A': true
  strategy?: string; // '100%Sure' | 'logicPlay' | 'intuitionHit' | 'blindFire' | 'fearDriverSkip' | 'skip'
  isMarked?: boolean;
}

interface MockTestQuestionViewProps {
  question: BackendQuestionItem;
  questionNumber: number;
  totalQuestions: number;
  language?: LanguageKey;
  onToggleLanguage?: () => void;
  answerState: UserQuestionAnswerState;
  onUpdateAnswerState: (updated: Partial<UserQuestionAnswerState>) => void;
  onPrev: () => void;
  onNext: () => void;
  showCorrectAnswerBanner?: boolean;
  onOpenSettings?: () => void;
  isPaletteCollapsed?: boolean;
  onTogglePalette?: () => void;
  validationWarning?: string | null;
}

export const MockTestQuestionView: React.FC<MockTestQuestionViewProps> = ({
  question,
  questionNumber,
  totalQuestions,
  language = "englishQuestion",
  onToggleLanguage,
  answerState,
  onUpdateAnswerState,
  onPrev,
  onNext,
  showCorrectAnswerBanner = false,
  onOpenSettings,
  isPaletteCollapsed = false,
  onTogglePalette,
  validationWarning,
}) => {
  const {
    selectedOption,
    statementJudgments = {},
    excludedOptions = {},
    strategy,
    isMarked = false,
  } = answerState;

  // Resolve language-specific content
  const content = question?.[language] || question?.englishQuestion || {};
  const questionText = content?.question || "";
  const statements = content?.statementQuestion || [];
  const pairs = content?.pairQuestion || [];
  const lastQuestion = content?.lastQuestion;
  const optionsMap: Record<string, string> = content?.options || {};
  const optionEntries = Object.entries(optionsMap).sort(([a], [b]) => a.localeCompare(b));
  const correctAns = content?.answer || "";
  const solution = content?.solution || "";

  const qType = question?.questionType || question?.type || "";
  const isStmt = isStatementType(qType) || (statements && statements.length > 0 && !isPairType(qType));
  const isPair = isPairType(qType) || (pairs && pairs.length > 0 && !isStatementType(qType));

  const subjectName =
    (typeof question?.subject === "object" ? question?.subject?.name : question?.subject) ||
    (typeof (question as any)?.subjectId === "object" ? ((question as any)?.subjectId as any)?.name : (question as any)?.subjectId) ||
    (typeof question?.type === "string" ? question?.type : "") ||
    "General Studies";
  const subtopicName =
    (typeof question?.subtopic === "object" ? question?.subtopic?.name : question?.subtopic) ||
    (typeof (question as any)?.subtopicId === "object" ? ((question as any)?.subtopicId as any)?.name : (question as any)?.subtopicId) ||
    "";
  const questionTitle = question?.title || "";
  const cloneOf = question?.cloneOf || "";
  const positiveMarks = question?.positiveMarks ?? 2;
  const negativeMarks = question?.negativeMarks ?? 0.67;

  // Toggle statement/pair True/False
  const handleToggleJudgment = (id: number, type: "true" | "false") => {
    const current = statementJudgments[id];
    const newJudgments = { ...statementJudgments };
    if (current === type) {
      delete newJudgments[id];
    } else {
      newJudgments[id] = type;
    }
    onUpdateAnswerState({ statementJudgments: newJudgments });
  };

  // Toggle option selection
  const handleSelectOption = (key: string) => {
    if (excludedOptions[key]) return; // Cannot select excluded option
    if (selectedOption === key) {
      onUpdateAnswerState({ selectedOption: undefined });
    } else {
      if (strategy === "skip" || strategy === "fearDriverSkip") {
        onUpdateAnswerState({ selectedOption: key, strategy: undefined });
      } else {
        onUpdateAnswerState({ selectedOption: key });
      }
    }
  };

  // Count currently excluded options
  const excludedCount = Object.values(excludedOptions).filter(Boolean).length;

  // Toggle option exclusion (Max 2 options allowed)
  const handleToggleExcludeOption = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    const isExcluded = Boolean(excludedOptions[key]);
    if (!isExcluded && excludedCount >= 2) {
      // Cannot exclude more than 2 options
      return;
    }
    const newExcluded = { ...excludedOptions, [key]: !isExcluded };
    let newSelected = selectedOption;
    if (!isExcluded && selectedOption === key) {
      newSelected = undefined;
    }
    onUpdateAnswerState({ excludedOptions: newExcluded, selectedOption: newSelected });
  };

  // Set strategy
  const handleSelectStrategy = (stratKey: string) => {
    if (strategy === stratKey) {
      onUpdateAnswerState({ strategy: undefined });
    } else {
      if (stratKey === "skip" || stratKey === "fearDriverSkip") {
        onUpdateAnswerState({ strategy: stratKey, selectedOption: undefined });
      } else {
        onUpdateAnswerState({ strategy: stratKey });
      }
    }
  };

  const strategies = [
    {
      id: "100%Sure",
      label: "100% Sure",
      icon: LuCircleCheck,
      color: "#2563eb",
      border: "rgba(37,99,235,0.45)",
      ring: "rgba(37,99,235,0.25)",
    },
    {
      id: "logicPlay",
      label: "Logic Play",
      icon: LuLightbulb,
      color: "#d97706",
      border: "rgba(217,119,6,0.45)",
      ring: "rgba(217,119,6,0.25)",
    },
    {
      id: "intuitionHit",
      label: "Intuition Hit",
      icon: LuZap,
      color: "#7c3aed",
      border: "rgba(124,58,237,0.45)",
      ring: "rgba(124,58,237,0.25)",
    },
    {
      id: "blindFire",
      label: "Blind Fire",
      icon: LuTarget,
      color: "#dc2626",
      border: "rgba(220,38,38,0.45)",
      ring: "rgba(220,38,38,0.25)",
    },
    {
      id: "fearDriverSkip",
      label: "Fear - Driver Skip",
      icon: LuShield,
      color: "#db2777",
      border: "rgba(219,39,119,0.45)",
      ring: "rgba(219,39,119,0.25)",
    },
    {
      id: "skip",
      label: "Skip",
      icon: LuForward,
      color: "#475569",
      border: "rgba(71,85,105,0.45)",
      ring: "rgba(71,85,105,0.25)",
    },
  ];

  return (
    <article className="w-full min-w-0 max-w-full rounded-2xl modern-glass-card p-3 sm:p-7 overflow-hidden">
      {/* Question Sub-Header (Responsive 2 rows on mobile) */}
      <div className="flex flex-col gap-2.5 border-b border-[#E2E8F0] pb-3 sm:pb-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Row 1: Question Number & Marks */}
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
          <span className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-xs sm:text-sm font-bold text-[#124699]">
            Question : {questionNumber}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-lg bg-[#16A34A]/10 px-2 py-1 text-xs font-bold text-[#16A34A]">
              +{positiveMarks}
            </span>
            <span className="rounded-lg bg-[#DC2626]/10 px-2 py-1 text-xs font-bold text-[#DC2626]">
              −{negativeMarks}
            </span>
          </div>
        </div>

        {/* Row 2: Language, Bookmark, Settings, Palette */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
          {/* Language toggle dropdown */}
          {onToggleLanguage && (
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex h-8 sm:h-10 items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2 sm:px-3 text-xs sm:text-sm font-bold text-[#124699] transition hover:border-[#124699] hover:bg-[#EFF6FF] cursor-pointer"
              title="Toggle English / Hindi"
            >
              <IoLanguage className="text-sm text-[#124699]" />
              <span>{language === "englishQuestion" ? "English" : "हिन्दी"}</span>
              <LuChevronDown className="ml-0.5 text-xs text-[#64748B]" />
            </button>
          )}

          <div className="flex items-center gap-1.5">
            {/* Bookmark */}
            <button
              type="button"
              onClick={() => onUpdateAnswerState({ isMarked: !isMarked })}
              title={isMarked ? "Marked for review" : "Bookmark question"}
              className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border transition cursor-pointer ${
                isMarked
                  ? "border-[#F48224] bg-[#FFF7ED] text-[#F48224]"
                  : "border-[#E2E8F0] text-[#64748B] hover:border-[#F48224] hover:text-[#F48224]"
              }`}
            >
              <LuBookmark className="text-sm" />
            </button>

            {/* Test Instructions */}
            <button
              type="button"
              onClick={onOpenSettings}
              title="Test Instructions (Click to view guidelines)"
              aria-label="Test Instructions"
              className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border-2 border-[#F48224] bg-[#FFF7ED] text-[#F48224] hover:bg-[#F48224] hover:text-white transition cursor-pointer shadow-2xs"
            >
              <LuBookOpen className="text-sm sm:text-base" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F48224] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#F48224]"></span>
              </span>
            </button>

            {/* Question Palette Toggle */}
            {onTogglePalette && (
              <button
                type="button"
                onClick={onTogglePalette}
                title={isPaletteCollapsed ? "Show Question Palette" : "Hide Question Palette"}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border transition cursor-pointer ${
                  isPaletteCollapsed
                    ? "border-[#124699] bg-[#EFF6FF] text-[#124699]"
                    : "border-[#E2E8F0] text-[#64748B] hover:border-[#124699] hover:text-[#124699]"
                }`}
              >
                {isPaletteCollapsed ? (
                  <LuPanelRightOpen className="text-sm" />
                ) : (
                  <LuPanelRightClose className="text-sm" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Body */}
      <div className="pt-6">
        {/* Topic / Subject & Subtopic Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#124699]">
            {subjectName} {subtopicName ? `· ${subtopicName}` : ""}
          </p>
          {questionTitle && (
            <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
              {questionTitle}
            </span>
          )}
          {cloneOf && (
            <span className="rounded-md bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-semibold text-purple-900">
              Clone: {cloneOf}
            </span>
          )}
        </div>

        {/* Question Text */}
        <div className="mt-2.5">
          {isImage(questionText) ? (
            <img
              src={questionText}
              alt="Question"
              className="max-h-72 w-auto rounded-xl object-contain border border-[#E2E8F0] p-2 bg-[#F8FAFC]"
            />
          ) : (
            <h2 className="text-lg sm:text-2xl font-bold leading-snug text-[#0F172A]">
              {questionText}
            </h2>
          )}
        </div>

        {/* TYPE 1: STATEMENT QUESTION */}
        {isStmt && statements.length > 0 && (
          <div className="mt-6 space-y-3">
            {statements.map((stmt, idx) => {
              const judgment = statementJudgments[idx];
              const isTrue = judgment === "true";
              const isFalse = judgment === "false";

              return (
                <div
                  key={idx}
                  className={`modern-stm-row flex items-center gap-4 rounded-2xl p-4 sm:p-5 border transition-all ${
                    isTrue
                      ? "border-[#16A34A] bg-[#F0FDF4]/50 shadow-2xs"
                      : isFalse
                      ? "border-[#DC2626] bg-[#FEF2F2]/50 shadow-2xs"
                      : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
                  }`}
                >
                  {/* Number Pill */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isTrue
                        ? "bg-[#16A34A] text-white"
                        : isFalse
                        ? "bg-[#DC2626] text-white"
                        : "bg-[#EFF6FF] text-[#124699]"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  {/* Statement Text */}
                  <div
                    className={`flex-1 text-xs sm:text-sm font-medium leading-relaxed ${
                      isTrue
                        ? "text-[#166534] font-semibold"
                        : isFalse
                        ? "text-[#991B1B] font-semibold"
                        : "text-[#0F172A]"
                    }`}
                  >
                    {isImage(stmt.combined) ? (
                      <img
                        src={stmt.combined}
                        alt={`Statement ${idx + 1}`}
                        className="max-h-32 object-contain rounded"
                      />
                    ) : (
                      <span>{stmt.combined}</span>
                    )}
                  </div>

                  {/* True / False Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleJudgment(idx, "true")}
                      title={isTrue ? "Marked as True" : "Mark as True"}
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        isTrue
                          ? "border-[#16A34A] bg-[#16A34A] text-white shadow-xs"
                          : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#16A34A] hover:text-[#16A34A]"
                      }`}
                    >
                      <LuCheck className="text-base" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleJudgment(idx, "false")}
                      title={isFalse ? "Marked as False" : "Mark as False"}
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        isFalse
                          ? "border-[#DC2626] bg-[#DC2626] text-white shadow-xs"
                          : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#DC2626] hover:text-[#DC2626]"
                      }`}
                    >
                      <LuX className="text-base" />
                    </button>
                  </div>
                </div>
              );
            })}

            {lastQuestion && (
              <p className="pt-2 text-sm sm:text-base font-semibold text-[#0F172A]">
                {lastQuestion}
              </p>
            )}
          </div>
        )}

        {/* TYPE 2: PAIR MATCHING QUESTION */}
        {isPair && pairs.length > 0 && (
          <div className="mt-6 space-y-4">
            {(() => {
              const pairTitle = pairs[0]?.combined || "";
              const headers = (pairTitle || "").split("---").map((t) => t.trim());
              const dataRows = pairs.slice(1);

              return (
                <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-2xs">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[270px] sm:min-w-[460px]">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#64748B]">
                        <th className="py-2 px-1.5 sm:py-3.5 sm:px-4 w-7 sm:w-12 text-center">#</th>
                        {headers.map((h, i) => (
                          <th key={i} className="py-2 px-2 sm:py-3.5 sm:px-4">
                            {h}
                          </th>
                        ))}
                        <th className="py-2 px-1.5 sm:py-3.5 sm:px-4 text-center w-16 sm:w-28">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {dataRows.map((p, idx) => {
                        const cols = p.combined.split("---").map((txt) => txt.trim());
                        const pairId = idx;
                        const isTrue = statementJudgments[pairId] === "true";
                        const isFalse = statementJudgments[pairId] === "false";

                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isTrue
                                ? "bg-[#F0FDF4]/50"
                                : isFalse
                                ? "bg-[#FEF2F2]/50"
                                : "hover:bg-[#F8FAFC]"
                            }`}
                          >
                            <td className="py-2 px-1.5 sm:py-3.5 sm:px-4 text-center font-bold text-[#64748B]">
                              {idx + 1}
                            </td>
                            {cols.map((val, j) => (
                              <td key={j} className="py-2 px-2 sm:py-3.5 sm:px-4 font-medium text-[#0F172A] break-words">
                                {val}
                              </td>
                            ))}
                            <td className="py-2 px-1.5 sm:py-3.5 sm:px-4 text-center">
                              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleJudgment(pairId, "true")}
                                  title={isTrue ? "Marked as True" : "Mark as True"}
                                  className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
                                    isTrue
                                      ? "border-[#16A34A] bg-[#16A34A] text-white shadow-xs"
                                      : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#16A34A] hover:text-[#16A34A]"
                                  }`}
                                >
                                  <LuCheck className="text-[11px] sm:text-sm" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleJudgment(pairId, "false")}
                                  title={isFalse ? "Marked as False" : "Mark as False"}
                                  className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
                                    isFalse
                                      ? "border-[#DC2626] bg-[#DC2626] text-white shadow-xs"
                                      : "border-[#CBD5E1] bg-white text-[#94A3B8] hover:border-[#DC2626] hover:text-[#DC2626]"
                                  }`}
                                >
                                  <LuX className="text-[11px] sm:text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}

            {lastQuestion && (
              <p className="pt-2 text-sm sm:text-base font-semibold text-[#0F172A]">
                {lastQuestion}
              </p>
            )}
          </div>
        )}

        {/* TYPE 3: NORMAL DIRECT QUESTION (no statements, no pairs) */}

        {/* Options Section */}
        <div className="mt-6 sm:mt-8">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <h3 className="text-sm sm:text-lg font-bold text-[#0F172A]">
              Choose your answer
            </h3>
            <span className="text-[11px] font-semibold text-[#64748B]">
              One best answer
            </span>
          </div>

          <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 group/options">
            {optionEntries.map(([optKey, optText]) => {
              const isSelected = selectedOption === optKey;
              const isExcluded = Boolean(excludedOptions[optKey]);

              if (isExcluded) {
                return (
                  <div
                    key={optKey}
                    className="modern-opt-btn excluded flex min-h-12 sm:min-h-16 items-center gap-2.5 sm:gap-3 rounded-xl border border-[#CBD5E1] bg-[#F1F5F9] px-3 sm:px-4 py-2 text-left opacity-65 transition-all duration-200"
                  >
                    <span className="modern-opt-letter !bg-[#94A3B8] !text-white !border-transparent">
                      {optKey}
                    </span>
                    <span className="flex-1 min-w-0 text-xs sm:text-sm font-semibold text-[#64748B] line-through break-words">
                      {isImage(optText) ? (
                        <img
                          src={optText}
                          alt={`Option ${optKey}`}
                          className="max-h-20 object-contain grayscale opacity-60"
                        />
                      ) : (
                        <span>{optText}</span>
                      )}
                    </span>
                    <span className="rounded-md bg-white border border-[#CBD5E1] px-1.5 py-0.5 text-[10px] font-bold text-[#64748B] shrink-0">
                      Excluded
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleExcludeOption(e, optKey)}
                      title="Restore this option"
                      className="modern-opt-exclude text-[#124699] hover:!bg-[#EFF6FF] hover:!text-[#124699] hover:!border-[#124699] cursor-pointer shrink-0"
                    >
                      <LuRefreshCw className="text-xs sm:text-sm" />
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={optKey}
                  type="button"
                  onClick={() => handleSelectOption(optKey)}
                  className={`modern-opt-btn ${isSelected ? "selected" : ""}`}
                >
                  {/* Option letter pill */}
                  <span className="modern-opt-letter">
                    {optKey}
                  </span>

                  {/* Option Text */}
                  <div className="flex-1 min-w-0 text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed break-words">
                    {isImage(optText) ? (
                      <img
                        src={optText}
                        alt={`Option ${optKey}`}
                        className="max-h-24 object-contain"
                      />
                    ) : (
                      <span>{optText}</span>
                    )}
                  </div>

                  {/* Eliminate (X) button (Max 2 options) */}
                  <span
                    onClick={(e) => handleToggleExcludeOption(e, optKey)}
                    title={
                      isExcluded
                        ? "Restore this option"
                        : excludedCount >= 2
                        ? "Maximum 2 options can be excluded"
                        : "Eliminate this option"
                    }
                    className={`modern-opt-exclude cursor-pointer ${
                      !isExcluded && excludedCount >= 2
                        ? "opacity-30 cursor-not-allowed text-gray-400"
                        : ""
                    }`}
                  >
                    <LuX className="text-base" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Validation Warning for Option */}
          {validationWarning && validationWarning.toLowerCase().includes("option") && (
            <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-amber-300 bg-[#FFFBEB] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#B45309] shadow-2xs animate-pulse">
              <span className="text-base">⚠️</span>
              <span>{validationWarning}</span>
            </div>
          )}

          {/* Correct answer callout banner (if enabled) */}
          {showCorrectAnswerBanner && (
            <FormattedSolution
              solution={solution}
              correctAnswer={correctAns}
              className="mt-4"
            />
          )}
        </div>

        {/* Answer Strategy Section */}
        <div className="mt-6 sm:mt-8 border-t border-[#E2E8F0] pt-5 sm:pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-lg font-bold text-[#0F172A]">
              Answer strategy
            </h3>
            <span className="text-[11px] sm:text-xs font-semibold text-[#64748B]">
              How confident were you?
            </span>
          </div>

          <div className="modern-strat-grid mt-3 sm:mt-4">
            {strategies.map((st) => {
              const Icon = st.icon;
              const isActive = strategy === st.id;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleSelectStrategy(st.id)}
                  style={
                    {
                      "--strat-color": st.color,
                      "--strat-border": st.border,
                      "--strat-ring": st.ring,
                    } as React.CSSProperties
                  }
                  className={`modern-strat-btn ${isActive ? "active" : ""}`}
                >
                  <Icon className="text-base shrink-0" />
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Validation Warning for Strategy */}
          {validationWarning && validationWarning.toLowerCase().includes("strategy") && (
            <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-amber-300 bg-[#FFFBEB] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#B45309] shadow-2xs animate-pulse">
              <span className="text-base">⚠️</span>
              <span>{validationWarning}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer (Sticky on Mobile, Standard on Desktop) */}
      <div className="sticky bottom-0 z-30 -mx-3 -mb-3 sm:mx-0 sm:mb-0 mt-6 sm:mt-8 flex items-center justify-between gap-1.5 sm:gap-3 border-t border-[#E2E8F0] bg-white/95 backdrop-blur-md p-2.5 sm:p-0 sm:pt-6 sm:border-t sm:static sm:bg-transparent">
        <button
          type="button"
          onClick={onPrev}
          disabled={questionNumber <= 1}
          className={`flex min-h-10 sm:min-h-12 items-center gap-1 sm:gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 sm:px-5 text-xs sm:text-sm font-bold text-[#0F172A] transition cursor-pointer ${
            questionNumber <= 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-[#124699] hover:text-[#124699]"
          }`}
        >
          <LuArrowLeft className="text-sm sm:text-base" /> PREVIOUS
        </button>

        <button
          type="button"
          onClick={onNext}
          className="modern-btn-p group flex min-h-10 sm:min-h-12 items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-6 text-xs sm:text-sm font-extrabold"
        >
          <span>{questionNumber === totalQuestions ? "SUBMIT" : "SAVE & NEXT"}</span>
          <LuArrowRight className="text-sm sm:text-base" />
        </button>
      </div>
    </article>
  );
};
