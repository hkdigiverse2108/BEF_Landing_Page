import React, { useState } from "react";
import {
  LuUser,
  LuMail,
  LuAward,
  LuArrowRight,
  LuClock,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";


interface MockTestLeadModalProps {
  isOpen: boolean;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  earnedDiscount: number;
  onSubmit: (lead: { name: string; phone: string; email?: string }) => Promise<void> | void;
  onClose: () => void;
  isLoading?: boolean;
  isTimeUp?: boolean;
}

export const MockTestLeadModal: React.FC<MockTestLeadModalProps> = ({
  isOpen,
  score,
  totalMarks,
  correctCount,
  incorrectCount,
  unattemptedCount,
  earnedDiscount,
  onSubmit,
  onClose,
  isLoading = false,
  isTimeUp = false,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your 10-digit mobile number";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Mobile number must be exactly 10 digits";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid Indian mobile number starting with 6, 7, 8, or 9";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanPhone = phone.trim().replace(/\D/g, "");
    onSubmit({
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
    });
  };

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={!isTimeUp && !isLoading ? onClose : undefined} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-200">
        {/* Top Gradient Bar */}
        <div className="h-2 w-full bg-linear-to-r from-[#124699] via-[#F48224] to-[#16A34A]" />

        {/* Modal Header */}
        <div className="bg-linear-to-b from-[#F8FAFC] to-white px-6 pt-6 pb-4 border-b border-[#E2E8F0] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#124699] shadow-inner mb-3">
            {isTimeUp ? (
              <LuClock className="text-2xl text-[#F48224]" />
            ) : earnedDiscount > 0 ? (
              <LuAward className="text-2xl text-[#16A34A]" />
            ) : (
              <LuSparkles className="text-2xl text-[#124699]" />
            )}
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.16em] bg-[#EFF6FF] text-[#124699]">
            {isTimeUp ? "Time's Up" : "Mock Test Completed"}
          </span>

          <h2 className="mt-2 text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Unlock Your Detailed Scorecard
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
            Enter your details to view solutions, detailed subject-wise analysis, and claim your scholarship discount.
          </p>

          {/* Quick Score Preview Banner */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-[#F1F5F9]/80 border border-[#E2E8F0] text-xs">
            <span className="font-extrabold text-[#0F172A]">
              Score: <span className="text-[#124699] font-black">{score.toFixed(1)}</span> / {totalMarks}
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#16A34A] font-bold">
              ✓ {correctCount} Correct
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#DC2626] font-bold">
              ✗ {incorrectCount} Incorrect
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B] font-bold">
              ○ {unattemptedCount} Skipped
            </span>
            {earnedDiscount > 0 && (
              <>
                <span className="text-[#94A3B8]">•</span>
                <span className="inline-flex items-center gap-1 font-black text-[#15803D] bg-emerald-100 px-2 py-0.5 rounded-full">
                  ₹{earnedDiscount.toLocaleString()} OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#334155] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <LuUser className="text-base" />
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                disabled={isLoading}
                className={`w-full rounded-xl border bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] outline-hidden transition focus:bg-white focus:border-[#124699] focus:ring-3 focus:ring-[#124699]/10 ${
                  errors.name ? "border-red-400 bg-red-50/50" : "border-[#CBD5E1]"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs font-semibold text-red-500 animate-in fade-in">
                {errors.name}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#334155] mb-1.5">
              Mobile Number (WhatsApp) <span className="text-red-500">*</span>
            </label>
            <div className="relative flex rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] overflow-hidden focus-within:bg-white focus-within:border-[#124699] focus-within:ring-3 focus-within:ring-[#124699]/10 transition">
              <span className="flex items-center gap-1 bg-[#E2E8F0]/60 px-3.5 py-3 text-xs font-extrabold text-[#475569] border-r border-[#CBD5E1] shrink-0">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPhone(val);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                disabled={isLoading}
                className="w-full bg-transparent px-3.5 py-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] outline-hidden font-mono"
              />
            </div>
            {errors.phone ? (
              <p className="mt-1 text-xs font-semibold text-red-500 animate-in fade-in">
                {errors.phone}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-[#64748B]">
                We will send your scorecard and discount voucher code to this number.
              </p>
            )}
          </div>

          {/* Email Address (Optional) */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#334155] mb-1.5">
              Email Address <span className="text-[10px] text-[#94A3B8] font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <LuMail className="text-base" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                disabled={isLoading}
                className={`w-full rounded-xl border bg-[#F8FAFC] pl-10 pr-4 py-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] outline-hidden transition focus:bg-white focus:border-[#124699] focus:ring-3 focus:ring-[#124699]/10 ${
                  errors.email ? "border-red-400 bg-red-50/50" : "border-[#CBD5E1]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-semibold text-red-500 animate-in fade-in">
                {errors.email}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] pt-1">
            <LuShieldCheck className="text-sm text-[#16A34A] shrink-0" />
            <span>Your details are completely safe. No spam, ever.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            {!isTimeUp && (
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-1/3 min-h-12 rounded-xl border-2 border-[#CBD5E1] bg-white text-xs font-bold text-[#475569] hover:bg-[#F1F5F9] transition cursor-pointer"
              >
                Resume Test
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 min-h-12 rounded-xl bg-linear-to-r from-[#124699] to-[#1E5FC9] hover:from-[#0E387A] hover:to-[#124699] text-white text-sm font-extrabold shadow-lg shadow-[#124699]/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Submitting Test...</span>
                </>
              ) : (
                <>
                  <span>Submit & View Results</span>
                  <LuArrowRight className="text-base" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
