import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  LuPlay,
  LuPause,
  LuRotateCcw,
  LuMaximize2,
  LuX,
  LuVolume2,
  LuVolumeX,
} from "react-icons/lu";

export interface ModernVideoPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  points?: string[];
  bullets?: string[];
  bannerMode?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  poster?: string;
  accentColor?: string;
}

export const ModernVideoPlayer: React.FC<ModernVideoPlayerProps> = ({
  src,
  title,
  subtitle,
  badge = "Feature Walkthrough",
  points,
  bullets,
  bannerMode = false,
  autoPlay = false,
  muted = false,
  loop = false,
  className = "",
  poster,
}) => {
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const rawPoints = points || bullets || [];
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Sync src changes and autoplay compliance
  useEffect(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.currentTime = 0;
      inlineVideoRef.current.muted = isMuted;
      inlineVideoRef.current.defaultMuted = isMuted;
      if (autoPlay) {
        inlineVideoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
      setIsEnded(false);
    }
  }, [src, autoPlay, isMuted]);

  // Sync play / pause / ended events from active video
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  // Play / Pause / Restart toggle
  const togglePlayPause = useCallback(() => {
    const activeVid = isEnlarged ? modalVideoRef.current : inlineVideoRef.current;
    if (!activeVid) return;

    if (isEnded || activeVid.ended) {
      activeVid.currentTime = 0;
      setIsEnded(false);
      activeVid.play().catch(() => {});
      setIsPlaying(true);
    } else if (isPlaying) {
      activeVid.pause();
      setIsPlaying(false);
    } else {
      activeVid.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isEnded, isPlaying, isEnlarged]);

  // Restart video explicitly
  const handleRestart = useCallback(() => {
    const activeVid = isEnlarged ? modalVideoRef.current : inlineVideoRef.current;
    if (!activeVid) return;
    activeVid.currentTime = 0;
    setIsEnded(false);
    activeVid.play().catch(() => {});
    setIsPlaying(true);
  }, [isEnlarged]);

  // Open Enlarged Modal
  const openEnlargedModal = () => {
    if (inlineVideoRef.current) {
      setCurrentTime(inlineVideoRef.current.currentTime);
      inlineVideoRef.current.pause();
    }
    setIsEnlarged(true);
  };

  // Close Enlarged Modal
  const closeEnlargedModal = () => {
    if (modalVideoRef.current && inlineVideoRef.current) {
      const modalTime = modalVideoRef.current.currentTime;
      inlineVideoRef.current.currentTime = modalTime;
      setCurrentTime(modalTime);
      if (isPlaying) {
        inlineVideoRef.current.play().catch(() => {});
      }
    }
    setIsEnlarged(false);
  };

  // When modal opens, sync time and play if previously playing
  useEffect(() => {
    if (isEnlarged && modalVideoRef.current) {
      modalVideoRef.current.currentTime = currentTime;
      if (isPlaying && !isEnded) {
        modalVideoRef.current.play().catch(() => {});
      }
    }
  }, [isEnlarged]);

  // Keyboard shortcut: Escape to close modal, Space to play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEnlarged) {
        closeEnlargedModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnlarged, isPlaying]);

  // Video Frame JSX
  const renderVideoFrame = (
    ref: React.RefObject<HTMLVideoElement | null>,
    isModal = false
  ) => (
    <div
      className={`relative w-full aspect-video overflow-hidden bg-slate-950 select-none group ${
        isModal ? "rounded-3xl shadow-2xl border border-white/10" : "rounded-2xl sm:rounded-3xl shadow-md border border-slate-200/80"
      }`}
    >
      <video
        key={`vid-${isModal ? "modal" : "inline"}-${src}`}
        ref={ref}
        src={src}
        autoPlay={isModal ? true : autoPlay}
        poster={poster}
        playsInline
        preload="auto"
        muted={isMuted}
        loop={loop}
        controls={false} // NO native scrubber / cut bar
        onClick={togglePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => {
          setIsPlaying(true);
          setIsEnded(false);
        }}
        onPause={() => setIsPlaying(false)}
        className={`h-full w-full ${isModal ? "object-contain" : "object-cover"} cursor-pointer bg-black`}
      />

      {/* Top-Left: Play / Pause / Restart Circular Button */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isEnded) {
              handleRestart();
            } else {
              togglePlayPause();
            }
          }}
          title={isEnded ? "Restart Video" : isPlaying ? "Pause Video" : "Play Video"}
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg backdrop-blur-md transition-all hover:scale-108 hover:bg-white active:scale-95 cursor-pointer"
          aria-label={isEnded ? "Restart" : isPlaying ? "Pause" : "Play"}
        >
          {isEnded ? (
            <LuRotateCcw className="text-lg sm:text-xl text-slate-900" />
          ) : isPlaying ? (
            <LuPause className="text-lg sm:text-xl text-slate-900" />
          ) : (
            <LuPlay className="text-lg sm:text-xl text-slate-900 ml-0.5" />
          )}
        </button>
      </div>

      {/* Top-Right (Inside Modal): Close Button */}
      {isModal && (
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeEnlargedModal();
            }}
            title="Close Enlarged View"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg backdrop-blur-md transition-all hover:scale-108 hover:bg-white active:scale-95 cursor-pointer"
            aria-label="Close"
          >
            <LuX className="text-xl text-slate-900" />
          </button>
        </div>
      )}

      {/* Bottom Controls Row: Subtle Mute Toggle (Left) + Bottom-Right Enlarge Button */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Subtle Mute Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted((prev) => !prev);
          }}
          title={isMuted ? "Unmute" : "Mute"}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/75 cursor-pointer opacity-80 hover:opacity-100"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <LuVolumeX className="text-base" />
          ) : (
            <LuVolume2 className="text-base" />
          )}
        </button>

        {/* Bottom-Right Enlarge / Motu Karvanu Button (only in inline view) */}
        {!isModal && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEnlargedModal();
            }}
            title="Enlarge Video (Full View)"
            className="pointer-events-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg backdrop-blur-md transition-all hover:scale-108 hover:bg-white active:scale-95 cursor-pointer"
            aria-label="Enlarge Video"
          >
            <LuMaximize2 className="text-lg sm:text-xl text-slate-900" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Banner Mode Layout (Matching Image 1: Left Description, Right Video) */}
      {/* 1. Banner Mode Layout (Matching Image 1: Left Description, Right Video) */}
      {bannerMode ? (
        <>
          {/* Mobile View: Compact tutorial card that opens full video modal on click without pushing the report down */}
          <div className="lg:hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-sky-50/40 p-4 shadow-xs">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                {badge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#124699]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#124699] mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#124699] animate-pulse" />
                    {badge}
                  </span>
                )}
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                  {title || "Feature Walkthrough"}
                </h4>
              </div>

              <button
                type="button"
                onClick={openEnlargedModal}
                className="shrink-0 flex items-center gap-1.5 rounded-xl bg-[#124699] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d3473] active:scale-95 transition-all cursor-pointer"
              >
                <LuPlay className="text-sm ml-0.5" />
                <span>Watch Tutorial</span>
              </button>
            </div>

            {subtitle && (
              <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                {subtitle}
              </p>
            )}

            {rawPoints.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowMobileDetails(!showMobileDetails)}
                  className="text-[#124699] font-bold hover:underline cursor-pointer"
                >
                  {showMobileDetails ? "Hide walkthrough points ▲" : "View walkthrough points ▼"}
                </button>
                <button
                  type="button"
                  onClick={openEnlargedModal}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <LuMaximize2 className="text-xs" />
                  <span>Full Video</span>
                </button>
              </div>
            )}

            {showMobileDetails && rawPoints.length > 0 && (
              <ul className="mt-2 space-y-1.5 pt-1 text-xs text-slate-700">
                {rawPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[9px] font-bold">
                      ✓
                    </span>
                    <span className="leading-tight">{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop View: Full Side-by-Side Banner */}
          <div className="hidden lg:block relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 p-5 sm:p-7 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Title & Insights */}
              <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-3.5">
                {badge && (
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#124699]/10 px-3 py-1 text-xs font-bold text-[#124699]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#124699] animate-pulse" />
                    {badge}
                  </div>
                )}

                {title && (
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {title}
                  </h3>
                )}

                {subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {subtitle}
                  </p>
                )}

                {rawPoints.length > 0 && (
                  <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
                    {rawPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#124699] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#0d3473] cursor-pointer"
                  >
                    {isEnded ? (
                      <>
                        <LuRotateCcw className="text-base" />
                        <span>Replay Tutorial</span>
                      </>
                    ) : isPlaying ? (
                      <>
                        <LuPause className="text-base" />
                        <span>Pause Tutorial</span>
                      </>
                    ) : (
                      <>
                        <LuPlay className="text-base" />
                        <span>Watch Tutorial</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openEnlargedModal}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
                  >
                    <LuMaximize2 className="text-sm" />
                    <span>Enlarge</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Video Player Card */}
              <div className="lg:col-span-6 xl:col-span-7">
                {renderVideoFrame(inlineVideoRef, false)}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Standalone Inline Video */
        renderVideoFrame(inlineVideoRef, false)
      )}

      {/* 2. Enlarged Modal (Matching Image 2: Centered large popup with close X on top-right) */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 lg:p-10 transition-opacity animate-in fade-in duration-200"
          onClick={closeEnlargedModal}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {renderVideoFrame(modalVideoRef, true)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernVideoPlayer;
