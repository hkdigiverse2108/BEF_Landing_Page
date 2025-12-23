import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE: Date = new Date("2026-05-24T09:30:00");

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

  useEffect((): (() => void) => {
    const timer: number = window.setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-primary text-white py-2">
      <div className="container  container-p  flex max-sm:flex-col gap-1  justify-center sm:justify-between items-center   ">
        <h1 className="max-sm:order-1  md:text-lg px-4 font-bold flex-nowrap text-nowrap">
          Let’s Celebrate this <span className=" ">Exam Festival</span>
        </h1>
        <div className="flex">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hrs" value={timeLeft.hours} />
          <TimeBox label="Min" value={timeLeft.minutes} />
          <TimeBox label="Sec" value={timeLeft.seconds} />
        </div>
      </div>
    </section>
  );
};

type TimeBoxProps = {
  label: string;
  value: number;
};

const TimeBox: React.FC<TimeBoxProps> = ({ label, value }) => {
  return (
    <div className="flex gap-1 px-2 ">
      <div className=" sm:text-xl font-semibold sm:font-bold ">{String(value).padStart(2, "0")}</div>
      <div className="text-xs text-center flex items-end  sm:font-semibold  ">{label}</div>
    </div>
  );
};

export default ExamTimer;
