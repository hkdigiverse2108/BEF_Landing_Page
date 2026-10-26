import React from "react";
import { LuAlarmClock, LuCircleAlert, LuBookOpen } from "react-icons/lu";

interface MockTestHeaderProps {
  seriesTitle?: string;
  subjectTitle?: string;
  timeRemaining?: string;
  onOpenSettings?: () => void;
  onEndTest?: () => void;
}

export const MockTestHeader: React.FC<MockTestHeaderProps> = ({
  seriesTitle = "Achiwon mock series",
  subjectTitle = "Indian Polity & Gov.",
  timeRemaining = "01:57:35",
  onOpenSettings,
  onEndTest,
}) => {
  return (
    <div className="w-full sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E2E8F0]">
      {/* Top Header Bar */}
      <header className="mx-auto w-full max-w-[1360px] px-3.5 py-2.5 sm:px-6 sm:py-3.5 lg:px-8">
        {/* Mobile View (< sm): Subject full width, underneath is Timer + Settings + End Test */}
        <div className="flex flex-col gap-2 sm:hidden">
          {/* Row 1: Subject full width */}
          <div className="w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
              {seriesTitle}
            </p>
            <h1 className="mt-0.5 text-base font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {subjectTitle}
            </h1>
            <div className="mt-1 h-1 w-8 rounded-full bg-[#F48224]"></div>
          </div>

          {/* Row 2: Timer, Settings, End Test */}
          <div className="flex w-full items-center justify-between gap-1.5 pt-1 border-t border-[#F1F5F9]">
            {/* Timer Badge */}
            <div className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 shadow-2xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#124699]">
                <LuAlarmClock className="text-sm" />
              </span>
              <p className="font-mono text-xs font-bold tabular-nums text-[#0F172A]">
                {timeRemaining}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Instructions */}
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  aria-label="Test instructions"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#124699] transition cursor-pointer"
                  title="Test Instructions"
                >
                  <LuBookOpen className="text-sm" />
                </button>
              )}

              {/* End Test */}
              {onEndTest && (
                <button
                  type="button"
                  onClick={onEndTest}
                  className="flex items-center rounded-xl bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 text-xs font-bold shadow-2xs transition cursor-pointer"
                >
                  End Test
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop View (sm and up): Unified row with Subject on left, Timer + Settings + End Test on right */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
              {seriesTitle}
            </p>
            <h1 className="mt-0.5 text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
              {subjectTitle}
            </h1>
            <div className="mt-1.5 h-1 w-10 rounded-full bg-[#F48224]"></div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Time Remaining Badge */}
            <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 sm:px-4 sm:py-2 shadow-2xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#124699]">
                <LuAlarmClock className="text-base sm:text-lg" />
              </span>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748B]">
                  Time remaining
                </p>
                <p className="font-mono text-xs sm:text-base font-bold tabular-nums text-[#0F172A]">
                  {timeRemaining}
                </p>
              </div>
            </div>

            {/* Test Instructions Button */}
            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                aria-label="Test instructions"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#124699] hover:bg-[#EFF6FF] hover:text-[#124699] transition cursor-pointer"
                title="Test Instructions"
              >
                <LuBookOpen className="text-base sm:text-lg" />
              </button>
            )}

            {/* End Test Button */}
            {onEndTest && (
              <button
                type="button"
                onClick={onEndTest}
                className="flex items-center rounded-xl bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                End Test
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Safeguard Alert Banner */}
      <div className="mx-auto w-full max-w-[1360px] px-3.5 pt-2.5 pb-2.5 sm:px-6 sm:pt-3 sm:pb-3 lg:px-8">
        <div className="flex items-start gap-2 rounded-xl border border-[#F48224]/30 bg-[#FFF7ED] px-3 py-2 text-xs sm:text-sm text-[#0F172A]">
          <LuCircleAlert className="mt-0.5 shrink-0 text-sm sm:text-base text-[#F48224]" />
          <p className="leading-snug">
            {/* <span className="font-bold text-[#F48224]">Test safeguard.</span>{" "}
            Do not exit the test otherwise your test will end. Press{" "}
            <span className="font-semibold text-[#DC2626]">End Test</span> to submit. */}
            STAY REGULAR, STAY DISCIPLINED — GET 100% DEPOSIT BACK! - Press{" "}
            <span className="font-semibold text-[#DC2626]">Enjoy 100% Free COURSE</span>
          </p>
        </div>
      </div>
    </div>
  );
};
