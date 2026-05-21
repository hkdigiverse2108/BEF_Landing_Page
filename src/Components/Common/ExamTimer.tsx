// import { useEffect, useState } from "react";

// type TimeLeft = {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// const TARGET_DATE: Date = new Date("2026-05-24T09:30:00");

const ExamTimer: React.FC = () => {
  // const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining());

  // function getTimeRemaining(): TimeLeft {
  //   const now: Date = new Date();
  //   const diff: number = TARGET_DATE.getTime() - now.getTime();

  //   if (diff <= 0) {
  //     return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  //   }

  //   return {
  //     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
  //     hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
  //     minutes: Math.floor((diff / (1000 * 60)) % 60),
  //     seconds: Math.floor((diff / 1000) % 60),
  //   };
  // }

  // useEffect((): (() => void) => {
  //   const timer: number = window.setInterval(() => {
  //     setTimeLeft(getTimeRemaining());
  //   }, 1000);

  //   return () => window.clearInterval(timer);
  // }, []);

  return (
    <section className="relative bg-primary text-white py-2">
      <div className="container  container-p  flex max-sm:flex-col gap-1  justify-center sm:justify-between items-center   ">
        <h1 className="max-sm:order-1  md:text-lg px-4 font-bold flex-nowrap text-nowrap">
          Let’s Celebrate this <span className=" ">Exam Festival</span>
        </h1>
        <a href="https://upscprelimscore.lovable.app/" target="_blank" rel="noopener noreferrer" className="max-sm:order-2 relative font-semibold whitespace-nowrap bg-white text-primary py-1.5 px-5 rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-300 outline-none">
          <span className="tracking-wide">PRELIMS ALL ANSWER KEY</span>
          <span className="absolute inset-0 rounded-full animate-ping bg-white/30"></span>
        </a>
        {/* <a href={"https://upscprelimscore.lovable.app/"} target="_blank" rel="noopener noreferrer" className="max-sm:order-2 font-semibold flex-nowrap text-nowrap bg-white text-primary py-1 px-4 rounded-full">
          <span className="animate-pulse">PRELIMS ALL ANSWER KEY</span>
        </a> */}
        {/* <div className="flex">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hrs" value={timeLeft.hours} />
          <TimeBox label="Min" value={timeLeft.minutes} />
          <TimeBox label="Sec" value={timeLeft.seconds} />
        </div> */}
      </div>
    </section>
  );
};

// type TimeBoxProps = {
//   label: string;
//   value: number;
// };

// const TimeBox: React.FC<TimeBoxProps> = ({ label, value }) => {
//   return (
//     <div className="flex gap-1 px-2 ">
//       <div className=" sm:text-xl font-semibold sm:font-bold ">{String(value).padStart(2, "0")}</div>
//       <div className="text-xs text-center flex items-end  sm:font-semibold  ">{label}</div>
//     </div>
//   );
// };

export default ExamTimer;
