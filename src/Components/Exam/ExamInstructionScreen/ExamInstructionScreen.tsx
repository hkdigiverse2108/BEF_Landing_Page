import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./ExamInstructionScreen.css";

export const DEFAULT_INSTRUCTION_VIDEOS = [
  "/videos/instruction/1.mp4",
  "/videos/instruction/2.mp4",
  "/videos/instruction/3.mp4",
  "/videos/instruction/4.mp4",
  "/videos/instruction/5.mp4",
];

export const getYouTubeVideoId = (_url?: string): string | null => {
  return null; // Clean static local MP4 videos used
};

export interface ExamInstructionScreenProps {
  onStartExam?: (selectedLanguage: "English" | "Hindi") => void;
  videoUrls?: string[];
  initialTab?: number;
  initialLanguage?: "English" | "Hindi";
  showHeader?: boolean;
  showFooter?: boolean;
  showStrip?: boolean;
  userName?: string;
  userRole?: string;
  examTitle?: string;
  actionButtonText?: string;
  homeLink?: string;
  isModal?: boolean;
  onClose?: () => void;
}

interface StepFeature {
  tab: string;
  emoji: string;
  bg: string;
  bd: string;
  video: string;
  eyebrow: string;
  title: string;
  isWide?: boolean;
  isLast?: boolean;
}

export const ExamInstructionScreen: React.FC<ExamInstructionScreenProps> = ({
  onStartExam,
  videoUrls,
  initialTab = 0,
  initialLanguage = "English",
  showHeader = true,
  showFooter = true,
  showStrip = true,
  userName = "Kartik Gondaliya",
  userRole = "Student",
  examTitle = "Exam Instructions",
  actionButtonText = "NEXT",
  homeLink = "/",
  isModal = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTextOut, setIsTextOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Interactive sample state
  const [selectedTrueFalse, setSelectedTrueFalse] = useState<"true" | "false" | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, boolean>>({
    1: true, // Second option starts eliminated as in original HTML
  });
  const [selectedLang, setSelectedLang] = useState<"English" | "Hindi">(initialLanguage);

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 219,
    hours: 18,
    minutes: 36,
    seconds: 13,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 5 Steps configuration with videos (clean static MP4 videos from /videos/instruction)
  const activeVideos =
    videoUrls &&
    videoUrls.length >= 5 &&
    !videoUrls.some((u) => u?.includes("youtube") || u?.includes("youtu.be"))
      ? videoUrls
      : DEFAULT_INSTRUCTION_VIDEOS;

  const FEATURES: StepFeature[] = [
    {
      tab: "1. True Or False",
      emoji: "✅",
      bg: "#dbe7fb",
      bd: "#124699",
      video: activeVideos[0] || DEFAULT_INSTRUCTION_VIDEOS[0],
      eyebrow: "Exam Instructions",
      title: "1. Practice Actively Label Each Statement True Or False!",
    },
    {
      tab: "2. Elimination Icon",
      emoji: "✂️",
      bg: "#fde8cf",
      bd: "#f48224",
      video: activeVideos[1] || DEFAULT_INSTRUCTION_VIDEOS[1],
      eyebrow: "Exam Instructions",
      title: "2. Improve accuracy : use the elimination icon for 50-50 or 33-33-33!",
    },
    {
      tab: "3. Button Actions",
      emoji: "🎯",
      bg: "#d3e8de",
      bd: "#50655e",
      video: activeVideos[2] || DEFAULT_INSTRUCTION_VIDEOS[2],
      eyebrow: "Exam Instructions",
      title: "3. Strategize Your Answers: Button Actions Explained",
      isWide: true,
    },
    {
      tab: "4. 2X The Stakes",
      emoji: "⚡",
      bg: "#e8dcfa",
      bd: "#7e22ce",
      video: activeVideos[3] || DEFAULT_INSTRUCTION_VIDEOS[3],
      eyebrow: "Exam Instructions",
      title: "4. “2X The Stakes, 2X The Thrill!”",
    },
    {
      tab: "5. Change Language",
      emoji: "🌐",
      bg: "#ffe0e0",
      bd: "#e5384f",
      video: activeVideos[4] || DEFAULT_INSTRUCTION_VIDEOS[4],
      eyebrow: "Exam Instructions",
      title: "5. You Can Change Language",
      isLast: true,
    },
  ];

  const currentFeature = FEATURES[activeTab] || FEATURES[0];

  // Select Tab
  const selectTab = useCallback(
    (index: number) => {
      if (index < 0 || index >= FEATURES.length || index === activeTab) return;
      setIsTextOut(true);
      setTimeout(() => {
        setActiveTab(index);
        setIsTextOut(false);
      }, 180);
    },
    [activeTab, FEATURES.length]
  );

  // Tab scroll and video sync on activeTab change
  useEffect(() => {
    // Scroll active tab to center
    const btn = tabButtonRefs.current[activeTab];
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      setUserPaused(false);
      setIsEnded(false);
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeTab, currentFeature.video]);

  // IntersectionObserver to pause when scrolled out of view
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!userPaused && videoRef.current && !videoRef.current.ended) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [userPaused, currentFeature.video]);

  // Keyboard navigation Left / Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        selectTab(activeTab + 1);
      } else if (e.key === "ArrowLeft") {
        selectTab(activeTab - 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, selectTab]);

  // Countdown timer tick
  useEffect(() => {
    const targetDate = Date.now() + (219 * 86400 + 18 * 3600 + 36 * 60 + 13) * 1000;
    const interval = setInterval(() => {
      const remainingSeconds = Math.max(0, Math.floor((targetDate - Date.now()) / 1000));
      const days = Math.floor(remainingSeconds / 86400);
      let rem = remainingSeconds % 86400;
      const hours = Math.floor(rem / 3600);
      rem %= 3600;
      const minutes = Math.floor(rem / 60);
      const seconds = rem % 60;
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Play / Pause toggle
  const togglePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.ended || isEnded) {
      vid.currentTime = 0;
      setUserPaused(false);
      setIsEnded(false);
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else if (vid.paused) {
      setUserPaused(false);
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      setUserPaused(true);
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleNextClick = () => {
    if (activeTab < FEATURES.length - 1) {
      selectTab(activeTab + 1);
    } else {
      if (isModal) {
        if (onClose) onClose();
      } else if (onStartExam) {
        onStartExam(selectedLang);
      }
    }
  };

  const toggleOptionEliminated = (optIndex: number) => {
    setEliminatedOptions((prev) => ({
      ...prev,
      [optIndex]: !prev[optIndex],
    }));
  };

  // Icons
  const playIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
  const pauseIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
  const replayIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" />
    </svg>
  );

  return (
    <div
      className={`exam-instruction-page ${isModal ? "modal-mode" : ""}`}
      style={
        {
          "--accent": currentFeature.bd,
          "--tab-bg": currentFeature.bg,
        } as React.CSSProperties
      }
    >
      {/* 1. Top Strip */}
      {showStrip && (
        <div className="strip">
          <div className="in">
            <div className="flex items-center">
              <span className="dot"></span>
              <span>Stay REGULAR & Enjoy 100% FREE Course</span>
            </div>
            <div className="cd">
              <b>{countdown.days} Days</b>
              <span>{countdown.hours} Hrs</span>
              <span>{countdown.minutes} Min</span>
              <span>{countdown.seconds} Sec</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Header */}
      {showHeader && (
        <header className="inst-header">
          <div className="in">
            <Link to={homeLink} className="logo">
              ACHIWON
              <small>UPSC &amp; GPSC CSE</small>
            </Link>
            <nav className="inst-nav">
              <Link to={homeLink}>Home</Link>
              <Link to="/my-contest">My Contest</Link>
              <Link to="/full-fest-report">Full Fest Report</Link>
              <Link to="/referral">Referral</Link>
              <Link to="/winner">Winner</Link>
              <Link to="/workshop">Workshop</Link>
              <Link to="/course">Course</Link>
              <Link to="/contact">Contact</Link>
            </nav>
            <div className="right">
              <button className="bell" aria-label="Notifications" type="button">
                🔔
              </button>
              <div className="user-badge">
                <div className="av">{(userName?.[0] || "K").toUpperCase()}</div>
                <div>
                  <b>{userName}</b>
                  <small>{userRole}</small>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* 3. Page Title Strip or Modal Header */}
      {isModal ? (
        <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#124699]/10 text-[#124699] font-bold text-lg">
              📋
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight m-0">
                {examTitle || "Test Instructions"}
              </h2>
              <p className="text-xs text-[#64748b] m-0 font-medium">
                Step {activeTab + 1} of 5 · {currentFeature.tab}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#cbd5e1] text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition cursor-pointer"
              aria-label="Close instructions"
              title="Close instructions"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <div className="ptitle">
          <h1>{examTitle}</h1>
          {onStartExam && (
            <button
              type="button"
              onClick={() => onStartExam(selectedLang)}
              className="skip-exam-link"
              title="Skip instructions and start test immediately"
            >
              <span>Skip to Exam</span>
              <span>→</span>
            </button>
          )}
        </div>
      )}

      {/* 4. Main Stage (Left Content + Right Video) */}
      <main className="stage">
        <div className="row">
          {/* Left Column: Explanations + Interactive Samples */}
          <div className={`text ${isTextOut ? "out" : ""}`}>
            <span className="eyebrow">{currentFeature.eyebrow}</span>
            <h2>{currentFeature.title}</h2>

            <div
              className={`sample ${currentFeature.isWide ? "wide compact" : ""}`}
            >
              {/* Tab 1: True / False */}
              {activeTab === 0 && (
                <>
                  <div className="qcard">
                    <p>
                      1. Both Statement-1 and statement-2 are correct and
                      Statement-2 explains Statement-1
                    </p>
                    <div className="ic">
                      <button
                        type="button"
                        className={`ok ${selectedTrueFalse === "true" ? "active-ic" : ""}`}
                        onClick={() => setSelectedTrueFalse("true")}
                        title="Mark True"
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        className={`no ${selectedTrueFalse === "false" ? "active-ic" : ""}`}
                        onClick={() => setSelectedTrueFalse("false")}
                        title="Mark False"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="bubs">
                    <span className="bub g">Click if statement is True</span>
                    <span className="bub r">Click if statement is False</span>
                  </div>
                </>
              )}

              {/* Tab 2: Elimination Icon */}
              {activeTab === 1 && (
                <>
                  <div
                    className={`opt ${eliminatedOptions[0] ? "gone" : ""}`}
                    onClick={() => toggleOptionEliminated(0)}
                  >
                    <span className="rd"></span>
                    <span className="tx">
                      Both Statement-1 and statement-2 are correct and
                      Statement-2 explains Statement-1
                    </span>
                    <button
                      type="button"
                      className="x"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOptionEliminated(0);
                      }}
                      title="Eliminate Option"
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    className={`opt ${eliminatedOptions[1] ? "gone" : ""}`}
                    onClick={() => toggleOptionEliminated(1)}
                  >
                    <span className="rd"></span>
                    <span className="tx">
                      Statement-1 is incorrect, but statement-2 is correct
                    </span>
                    <button
                      type="button"
                      className="x"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOptionEliminated(1);
                      }}
                      title="Eliminate Option"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bubs">
                    <span className="bub r">Click if you want to eliminate option</span>
                  </div>
                </>
              )}

              {/* Tab 3: Button Actions */}
              {activeTab === 2 && (
                <>
                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}
                    >
                      ✔ 100% Sure
                    </button>
                    <span className="bub b">
                      Confident about your answer? Select this when you’re absolutely certain it’s correct!
                    </span>
                  </div>

                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#be123c,#f43f5e)" }}
                    >
                      💡 Logic Play
                    </button>
                    <span className="bub b">
                      Use elimination or aptitude techniques to solve the question! Click here to showcase your tactical skills!
                    </span>
                  </div>

                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#0369a1,#0ea5e9)" }}
                    >
                      👁 Intuition Hit
                    </button>
                    <span className="bub b">
                      Trusting your gut? Select this when you feel the answer is in your reach, even without full certainty!
                    </span>
                  </div>

                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#c2410c,#f59e0b)" }}
                    >
                      🙈 Blind Fire
                    </button>
                    <span className="bub b">
                      Taking a wild guess? Choose this when you’re answering without any clue!
                    </span>
                  </div>

                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}
                    >
                      Fear - Skip
                    </button>
                    <span className="bub b">
                      “Want to attempt but afraid of taking the risk?” using this will help you decide if you should be bolder or if skipping is safer! (No mark deduction or gain)
                    </span>
                  </div>

                  <div className="bi">
                    <button
                      type="button"
                      className="btn-action"
                      style={{ background: "linear-gradient(135deg,#7e22ce,#a855f7)" }}
                    >
                      ⏭ Skip
                    </button>
                    <span className="bub b">
                      “Not feeling this one? Click to skip and move to the next question”
                    </span>
                  </div>
                </>
              )}

              {/* Tab 4: 2X The Stakes */}
              {activeTab === 3 && (
                <>
                  <div className="qrow">
                    <div className="qb">
                      Question : 01
                      <i>2X</i>
                    </div>
                    <span className="bub b">
                      Answer correctly: Earn double marks. Answer wrong: Lose double marks.
                    </span>
                  </div>
                </>
              )}

              {/* Tab 5: Change Language */}
              {activeTab === 4 && (
                <>
                  <div className="lrow">
                    <span>🌐 Language</span>
                    <div className="lpill">
                      <button
                        type="button"
                        className={selectedLang === "English" ? "on" : ""}
                        onClick={() => setSelectedLang("English")}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        className={selectedLang === "Hindi" ? "on" : ""}
                        onClick={() => setSelectedLang("Hindi")}
                      >
                        / Hindi
                      </button>
                    </div>
                  </div>
                  <div className="bubs mt-1">
                    <span className={`bub ${selectedLang === "Hindi" ? "r font-semibold" : "b"}`}>
                      {selectedLang === "Hindi"
                        ? "✓ प्रश्न हिन्दी में दिखाई देंगे (Exam will start in Hindi)"
                        : "✓ Questions will be shown in English (Exam will start in English)"}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Next / Start / Close Button */}
            <div className="btns">
              {activeTab > 0 && (
                <button
                  type="button"
                  className="pill"
                  onClick={() => selectTab(activeTab - 1)}
                  style={{ minWidth: "110px" }}
                >
                  ← Previous
                </button>
              )}

              {activeTab === FEATURES.length - 1 ? (
                <button
                  type="button"
                  className="pill go"
                  onClick={handleNextClick}
                  id="goBtn"
                >
                  {isModal ? "Got it ✓" : actionButtonText}
                </button>
              ) : (
                <button
                  type="button"
                  className="pill"
                  onClick={handleNextClick}
                  id="nextBtn"
                  style={{ minWidth: "110px" }}
                >
                  Next →
                </button>
              )}

              {isModal && onClose && activeTab < FEATURES.length - 1 && (
                <button
                  type="button"
                  className="pill !border-[#cbd5e1] !text-[#64748b] hover:!bg-[#f1f5f9]"
                  onClick={onClose}
                >
                  Close
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Video Player */}
          <div
            className="frame"
            ref={frameRef}
            id="frame"
            style={
              {
                "--tab-bg": currentFeature.bg,
              } as React.CSSProperties
            }
            onContextMenu={(e) => e.preventDefault()}
          >
            <video
              ref={videoRef}
              key={`inst-vid-${activeTab}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={currentFeature.video}
              controls={false}
              onClick={togglePlayPause}
              onEnded={() => {
                setIsPlaying(false);
                setIsEnded(true);
              }}
              onPlay={() => {
                setIsPlaying(true);
                setIsEnded(false);
              }}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play/Pause Button */}
            <button
              type="button"
              className="cbtn pp"
              id="pp"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayPause}
            >
              {isEnded ? replayIcon : isPlaying ? pauseIcon : playIcon}
            </button>

            {/* Bottom-Right Enlarge / Motu Karvanu Button */}
            <button
              type="button"
              className="cbtn fs"
              id="fs"
              aria-label="Enlarge Video"
              title="Enlarge Video"
              onClick={() => setIsEnlarged(true)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Enlarged Video Modal (matching Image 2) */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsEnlarged(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={`modal-vid-${activeTab}`}
              src={currentFeature.video}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              className="w-full h-full object-contain bg-black"
              onClick={togglePlayPause}
              onEnded={() => {
                setIsPlaying(false);
                setIsEnded(true);
              }}
              onPlay={() => {
                setIsPlaying(true);
                setIsEnded(false);
              }}
              onPause={() => setIsPlaying(false)}
            />

            {/* Top-Left Play/Pause/Restart */}
            <button
              type="button"
              className="cbtn pp !top-4 !left-4"
              onClick={togglePlayPause}
              title={isEnded ? "Restart" : isPlaying ? "Pause" : "Play"}
            >
              {isEnded ? replayIcon : isPlaying ? pauseIcon : playIcon}
            </button>

            {/* Top-Right Close Button */}
            <button
              type="button"
              className="cbtn fs !top-4 !right-4 !bottom-auto !bg-white/95 !text-slate-900 hover:!bg-white"
              onClick={() => setIsEnlarged(false)}
              title="Close Enlarged View"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 5. 5 Step Tabs + Navigation Arrows */}
      <div className="tabsrow">
        <div className="tabs" ref={tabsContainerRef} id="tabs">
          {FEATURES.map((item, index) => {
            const isActive = index === activeTab;
            return (
              <button
                key={index}
                type="button"
                ref={(el) => {
                  tabButtonRefs.current[index] = el;
                }}
                className={`tab ${isActive ? "active" : ""}`}
                style={
                  {
                    "--bg": item.bg,
                    "--bd": item.bd,
                  } as React.CSSProperties
                }
                onClick={() => selectTab(index)}
              >
                <span>{item.tab}</span>
                <span className="th">{item.emoji}</span>
              </button>
            );
          })}
        </div>

        <div className="arrows">
          <button
            type="button"
            className="arr"
            id="aPrev"
            aria-label="Previous Instruction"
            disabled={activeTab === 0}
            onClick={() => selectTab(activeTab - 1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="arr"
            id="aNext"
            aria-label="Next Instruction"
            disabled={activeTab === FEATURES.length - 1}
            onClick={() => selectTab(activeTab + 1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 6. Footer */}
      {showFooter && (
        <footer className="inst-footer">
          <div className="in">
            <div className="soc">
              <i>IG</i>
              <i>X</i>
              <i>YT</i>
              <i>FB</i>
              <i>IN</i>
              <i>TG</i>
            </div>
            <div>
              © Copyrights 2026 All rights reserved by <u>HK DigiVerse LLP</u>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ExamInstructionScreen;
