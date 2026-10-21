import React, { useState } from "react";
import {
  LuX,
  LuCircleAlert,
  LuLayers,
  LuCircleCheck,
  LuCircleX,
  LuCircle,
  LuForward,
  LuBookmark,
  LuArrowLeft,
  LuPower,
} from "react-icons/lu";

export interface MockTestStats {
  total: number;
  answered: number;
  unanswered: number;
  notVisited: number;
  skip: number;
  marked: number;
}

interface MockTestSubmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stats: MockTestStats;
  onConfirmEndTest: () => void;
}

export const MockTestSubmissionDrawer: React.FC<MockTestSubmissionDrawerProps> = ({
  isOpen,
  onClose,
  stats,
  onConfirmEndTest,
}) => {
  const [step, setStep] = useState<"review" | "confirm">("review");

  if (!isOpen) return null;

  const percent = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;

  const handleClose = () => {
    setStep("review");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submissionTitle"
    >
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      <section className="relative z-10 flex h-full w-full max-w-[460px] flex-col overflow-hidden bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4 shrink-0 bg-white">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close test submission drawer"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] cursor-pointer"
          >
            <LuX className="text-xl" />
          </button>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#64748B]">
            Test Submission
          </span>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {step === "review" ? (
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-xs">
              {/* Review Banner */}
              <div className="border-b border-[#E2E8F0] bg-[#EFF6FF] px-5 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7ED] text-[#F48224] shadow-xs">
                  <LuCircleAlert className="text-2xl" />
                </div>
                <p className="mt-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#124699]">
                  Submission review
                </p>
                <h2
                  id="submissionTitle"
                  className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0F172A]"
                >
                  Want to End the Test?
                </h2>
                <p className="mx-auto mt-2 max-w-xs text-xs sm:text-sm leading-5 text-[#64748B]">
                  No changes would be allowed after submission. Take a moment to review your test progress.
                </p>
              </div>

              {/* Progress & Stat Cards */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* Progress bar pill */}
                <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
                      Test progress
                    </p>
                    <p className="mt-0.5 text-base font-extrabold text-[#0F172A]">
                      {stats.answered} of {stats.total}{" "}
                      <span className="text-xs font-normal text-[#64748B]">answered</span>
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#124699]/20 bg-[#EFF6FF] font-mono text-xs font-bold text-[#124699]">
                    {percent}%
                  </div>
                </div>

                {/* 6 Metric Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Total Questions */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#124699]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFF6FF]">
                        <LuLayers className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Total Questions</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.total}</p>
                  </div>

                  {/* Answered */}
                  <div className="rounded-xl border border-[#16A34A]/30 bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#16A34A]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4]">
                        <LuCircleCheck className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Answered</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.answered}</p>
                  </div>

                  {/* Unanswered */}
                  <div className="rounded-xl border border-[#DC2626]/30 bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#DC2626]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FEF2F2]">
                        <LuCircleX className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Unanswered</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.unanswered}</p>
                  </div>

                  {/* Not Visited */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F1F5F9]">
                        <LuCircle className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Not Visited</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.notVisited}</p>
                  </div>

                  {/* Skip */}
                  <div className="rounded-xl border border-[#F48224]/30 bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#F48224]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7ED]">
                        <LuForward className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Skip</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.skip}</p>
                  </div>

                  {/* Marked */}
                  <div className="rounded-xl border border-[#F48224]/30 bg-white p-3.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#F48224]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7ED]">
                        <LuBookmark className="text-sm" />
                      </span>
                      <span className="text-xs font-bold">Marked</span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{stats.marked}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Confirmation step */
            <div className="py-8 text-center animate-in fade-in duration-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
                <LuCircleAlert className="text-3xl" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#DC2626]">
                Final confirmation
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#0F172A]">
                Are you absolutely sure?
              </h2>
              <p className="mt-2 text-sm text-[#64748B]">
                Once submitted, you cannot modify your answers.
              </p>

              <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left">
                <p className="text-sm font-bold text-[#0F172A]">Your test will be locked</p>
                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Answered: <span className="font-bold text-[#0F172A]">{stats.answered}</span> of{" "}
                  <span className="font-bold text-[#0F172A]">{stats.total}</span> questions. Review
                  your progress before making this final decision.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-[#E2E8F0] bg-white p-5 shrink-0">
          {step === "review" ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#124699] bg-white px-4 text-sm font-bold text-[#124699] transition hover:bg-[#EFF6FF] cursor-pointer"
              >
                <LuArrowLeft className="text-base" /> RESUME
              </button>
              <button
                type="button"
                onClick={() => setStep("confirm")}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-4 text-sm font-bold text-white shadow-xs transition hover:bg-[#B91C1C] cursor-pointer"
              >
                <LuPower className="text-base" /> END TEST
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStep("review")}
                className="min-h-12 rounded-xl border-2 border-[#124699] bg-white px-4 text-sm font-bold text-[#124699] transition hover:bg-[#EFF6FF] cursor-pointer"
              >
                GO BACK
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirmEndTest();
                  handleClose();
                }}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-4 text-sm font-bold text-white shadow-xs transition hover:bg-[#B91C1C] cursor-pointer"
              >
                <LuPower className="text-base" /> END TEST
              </button>
            </div>
          )}
        </footer>
      </section>
    </div>
  );
};
