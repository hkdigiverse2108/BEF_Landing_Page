import React from "react";
import {
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuArrowRight,
  LuRotateCcw,
  LuSparkles,
  LuCheck,
} from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { CONTACT } from "../../../Data";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { URL_KEYS } from "../../../Constants";
import {
  matchScoreDiscount,
  saveMockTestReward,
  clearMockTestReward,
  type DiscountTier,
} from "../../../Utils/mockTestReward";

interface MockTestResultModalProps {
  isOpen: boolean;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  onReviewSolutions: () => void;
  onRestartTest: () => void;
  onEnrollCourse: () => void;
}

export const MockTestResultModal: React.FC<MockTestResultModalProps> = ({
  isOpen,
  score,
  totalMarks,
  correctCount,
  incorrectCount,
  unattemptedCount,
  onReviewSolutions,
  onRestartTest,
  onEnrollCourse,
}) => {
  // Fetch dynamic settings from Admin Panel
  const { data: settingApi } = useGetApiQuery({ url: URL_KEYS.SETTINGS.ALL });
  const settings = settingApi?.data;

  if (!isOpen) return null;

  const discountTiers: DiscountTier[] = settings?.mockTestDiscountTiers || [];
  const scoreDiscount = matchScoreDiscount(score, discountTiers);

  const handleClaimAndEnroll = () => {
    if (scoreDiscount > 0) {
      saveMockTestReward({
        score,
        totalMarks,
        scoreDiscount,
        active: true,
        timestamp: Date.now(),
      });
    } else {
      clearMockTestReward();
    }
    onEnrollCourse();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Achiwon Team! I completed the Free Practice Test with Score: ${score.toFixed(
      2
    )} / ${totalMarks}.${
      scoreDiscount > 0
        ? ` I unlocked ₹${scoreDiscount.toLocaleString()} Score Merit Discount on courses!`
        : ""
    } Please guide me for course admissions.`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${
    CONTACT?.NUMBER || "919999999999"
  }&text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <section className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]">
        {/* Header with Celebration Gradient */}
        <div className="bg-gradient-to-br from-[#124699] via-[#1E5FC9] to-[#0F3574] px-5 py-6 sm:px-7 sm:py-7 text-center text-white shrink-0 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-[#F48224]/20 blur-xl pointer-events-none" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-[#F48224] shadow-md">
            <LuTrophy className="text-3xl text-amber-300" />
          </div>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
            Free Practice Assessment · Result
          </p>
          <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-white">
            Performance Summary
          </h2>

          <div className="mt-3.5 inline-flex items-baseline gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-md border border-white/20">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
              {score.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-blue-200">/ {totalMarks} Marks</span>
            {scoreDiscount > 0 && (
              <span className="ml-2 rounded-full bg-[#16A34A] px-2.5 py-0.5 text-xs font-bold text-white flex items-center gap-1">
                <LuCheck className="text-xs" /> ₹{scoreDiscount.toLocaleString()} Merit Discount
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Quick Accuracy Counters */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-xl border border-[#16A34A]/25 bg-[#F0FDF4] p-2.5 sm:p-3">
              <span className="flex items-center justify-center text-[#16A34A] mb-0.5">
                <LuCircleCheck className="text-base sm:text-lg" />
              </span>
              <p className="text-lg sm:text-xl font-black text-[#166534]">{correctCount}</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#16A34A]">Correct</p>
            </div>

            <div className="rounded-xl border border-[#DC2626]/25 bg-[#FEF2F2] p-2.5 sm:p-3">
              <span className="flex items-center justify-center text-[#DC2626] mb-0.5">
                <LuCircleX className="text-base sm:text-lg" />
              </span>
              <p className="text-lg sm:text-xl font-black text-[#991B1B]">{incorrectCount}</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#DC2626]">Incorrect</p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 sm:p-3">
              <span className="flex items-center justify-center text-[#64748B] mb-0.5">
                <LuTrophy className="text-base sm:text-lg" />
              </span>
              <p className="text-lg sm:text-xl font-black text-[#334155]">{unattemptedCount}</p>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#64748B]">Skipped</p>
            </div>
          </div>

          {/* Score Discount Reward Card (Shown ONLY if discount is earned) */}
          {scoreDiscount > 0 ? (
            <div className="rounded-2xl border-2 border-[#16A34A] bg-gradient-to-br from-[#F0FDF4] via-white to-[#EFF6FF] p-4.5 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#BBF7D0]">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#16A34A] text-white">
                    <LuSparkles className="text-base" />
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#166534]">
                    Merit Reward Unlocked
                  </span>
                </div>
                <span className="rounded-md bg-[#16A34A] px-2.5 py-0.5 text-xs font-black text-white">
                  -₹{Math.max(0, 20000 - scoreDiscount).toLocaleString()} OFF
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#1E293B]">
                <p className="font-extrabold text-sm sm:text-base text-[#0F172A]">
                  Congratulations on scoring {score.toFixed(1)} marks!
                </p>
                <p className="text-[#475569] leading-relaxed">
                  Based on your test performance, you have unlocked an exclusive admission fee of{" "}
                  <strong className="text-[#166534]">₹{scoreDiscount.toLocaleString()}</strong>{" "}
                  (Save ₹{Math.max(0, 20000 - scoreDiscount).toLocaleString()} on Last Prelims course).
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs text-[#475569] leading-relaxed text-center">
              Practice regularly to sharpen your subject knowledge and improve your exam scores!
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={handleClaimAndEnroll}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#124699] via-[#1E5FC9] to-[#F48224] px-5 text-sm sm:text-base font-bold text-white shadow-md transition hover:brightness-105 active:scale-98 cursor-pointer"
            >
              {scoreDiscount > 0
                ? `Claim ₹${scoreDiscount.toLocaleString()} Offer on Last Prelims`
                : "Explore All Courses"}{" "}
              <LuArrowRight className="text-base" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#16A34A] bg-[#F0FDF4] px-3 text-xs font-bold text-[#16A34A] hover:bg-[#DCFCE7] transition cursor-pointer"
            >
              <IoLogoWhatsapp className="text-base" /> Connect on WhatsApp
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={onReviewSolutions}
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-[#124699] bg-white px-3 text-xs font-bold text-[#124699] hover:bg-[#EFF6FF] cursor-pointer"
              >
                View Detailed Solutions
              </button>
              <button
                type="button"
                onClick={() => (onRestartTest ? onRestartTest() : window.location.reload())}
                title="Refresh page to start fresh test"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3 text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:border-[#94A3B8] cursor-pointer"
              >
                <LuRotateCcw className="text-sm" /> Refresh to Retake
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
