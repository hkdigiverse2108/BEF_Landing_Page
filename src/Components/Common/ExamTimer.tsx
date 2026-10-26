import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE: Date = new Date("2027-05-23T09:30:00");

const ExamTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining());

  function getTimeRemaining(): TimeLeft {
    const now: Date = new Date();
    const diff: number = TARGET_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-primary text-white py-2">
      <div className="container container-p flex max-sm:flex-col gap-2 justify-center sm:justify-between items-center">
        <h1 className="max-sm:order-1 md:text-lg px-2 sm:px-4 font-bold flex-nowrap text-nowrap text-center sm:text-left">
          Stay REGULAR &amp; Enjoy 100% FREE Course
        </h1>

        <div className="max-sm:order-2 flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-3">
          {/* Running Live Countdown Timer */}
          <div className="flex items-center gap-1 sm:gap-1.5 font-mono font-bold text-[11px] sm:text-xs text-white/95">
            <span className="bg-white/15 px-2 py-1 rounded-md backdrop-blur-xs">
              {timeLeft.days} Days
            </span>
            <span className="bg-white/15 px-2 py-1 rounded-md backdrop-blur-xs">
              {String(timeLeft.hours).padStart(2, "0")} Hrs
            </span>
            <span className="bg-white/15 px-2 py-1 rounded-md backdrop-blur-xs">
              {String(timeLeft.minutes).padStart(2, "0")} Min
            </span>
            <span className="bg-[#F48224] text-white px-2 py-1 rounded-md shadow-xs">
              {String(timeLeft.seconds).padStart(2, "0")} Sec
            </span>
          </div>

          {/* FREE MOCK TEST Button */}
          <Link
            to={ROUTES.FREE_PRACTICE}
            className="relative font-bold whitespace-nowrap bg-white text-primary py-1 px-4 sm:px-5 rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-300 outline-none flex items-center gap-1.5 group cursor-pointer text-xs sm:text-sm"
          >
            <span className="tracking-wide uppercase">FREE MOCK TEST</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            <span className="absolute inset-0 rounded-full animate-ping bg-white/30 pointer-events-none"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExamTimer;
