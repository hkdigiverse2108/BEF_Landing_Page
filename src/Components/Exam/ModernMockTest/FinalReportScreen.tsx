import React, { useState, useMemo } from "react";
import "./FinalReport.css";
import type { BackendQuestionItem } from "./mockQuestionsData";
import type { UserQuestionAnswerState } from "./MockTestQuestionView";
import FormattedSolution from "../../Common/FormattedSolution";
import ModernVideoPlayer from "../../Common/ModernVideoPlayer";
import { REPORT_VIDEOS } from "../../../Constants";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { saveMockTestReward, type MockTestReward } from "../../../Utils/mockTestReward";

const isImage = (str?: any): boolean => {
  return typeof str === "string" && /^https?:\/\/.*\.(png|jpg|jpeg|webp|gif)/i.test(str.trim());
};

export const isMongoId = (val?: any): boolean => {
  return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val.trim());
};

export const getSubjectName = (q: any): string => {
  if (!q) return "General Studies";
  const s = q.subject || q.subjectId;
  if (typeof s === "object" && s !== null) {
    const name = String(s.name || s.title || "").trim();
    if (name && !isMongoId(name)) return name;
  }
  if (typeof s === "string" && s.trim() && !isMongoId(s.trim())) {
    return s.trim();
  }
  if (typeof q.type === "string" && q.type.trim() && !isMongoId(q.type.trim())) {
    return q.type.trim();
  }
  return "General Studies";
};

export const getSubtopicName = (q: any, fallbackIndex?: number): string => {
  if (!q) {
    return fallbackIndex !== undefined ? `General Studies (Q${fallbackIndex + 1})` : "General Studies";
  }

  const rawSub = (q as any)?.subtopic;
  const rawSubId = (q as any)?.subtopicId;

  // 1. Check object with .name or .title
  if (typeof rawSub === "object" && rawSub !== null) {
    const n = String(rawSub.name || rawSub.title || "").trim();
    if (n && !isMongoId(n)) return n;
  }
  if (typeof rawSubId === "object" && rawSubId !== null) {
    const n = String(rawSubId.name || rawSubId.title || "").trim();
    if (n && !isMongoId(n)) return n;
  }

  // 2. Check string that is NOT an ObjectId
  if (typeof rawSub === "string" && rawSub.trim() && !isMongoId(rawSub)) {
    return rawSub.trim();
  }
  if (typeof rawSubId === "string" && rawSubId.trim() && !isMongoId(rawSubId)) {
    return rawSubId.trim();
  }

  // 3. Fallback to Subject Name (e.g. Polity, History)
  const subj = getSubjectName(q);
  if (subj && subj !== "General Studies" && !isMongoId(subj)) {
    return subj;
  }

  // 4. Safe user-friendly fallback
  if (fallbackIndex !== undefined) {
    return `General Studies (Q${fallbackIndex + 1})`;
  }
  return "General Studies";
};

export const getCorrectAnswer = (q?: BackendQuestionItem): string => {
  if (!q) return "";
  const ans =
    q.correctAnswer ||
    q.answer ||
    q.englishQuestion?.answer ||
    q.hindiQuestion?.answer ||
    (q as any)?.correctOption ||
    "";
  return String(ans).trim().toUpperCase();
};

export type MistakeCategoryKey =
  | "sillyMistake"
  | "conceptMistake"
  | "revisionLacking"
  | "outOfMaterial"
  | "currentAffairNotRead";

export const MISTAKE_CATEGORIES: {
  key: MistakeCategoryKey;
  title: string;
  color: string;
  headerBg: string;
  pillBg: string;
  desc: string;
}[] = [
  {
    key: "sillyMistake",
    title: "Silly Mistakes",
    color: "#b91c1c",
    headerBg: "bg-red-800",
    pillBg: "bg-red-50 text-red-700 border-red-200",
    desc: "Misread statements, calculation slips, or marked answer in haste.",
  },
  {
    key: "conceptMistake",
    title: "Concept Mistakes",
    color: "#dc2626",
    headerBg: "bg-red-600",
    pillBg: "bg-rose-50 text-rose-700 border-rose-200",
    desc: "Misunderstood the underlying constitutional article or core theory.",
  },
  {
    key: "revisionLacking",
    title: "Revision Mistakes",
    color: "#d97706",
    headerBg: "bg-amber-600",
    pillBg: "bg-amber-50 text-amber-700 border-amber-200",
    desc: "Topic previously prepared but forgotten due to lack of revision.",
  },
  {
    key: "outOfMaterial",
    title: "Out of Material",
    color: "#15803d",
    headerBg: "bg-emerald-700",
    pillBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "Peripheral facts outside standard NCERT & reference books.",
  },
  {
    key: "currentAffairNotRead",
    title: "Current Affairs Not Read",
    color: "#0f766e",
    headerBg: "bg-teal-700",
    pillBg: "bg-teal-50 text-teal-700 border-teal-200",
    desc: "Recent bills, Supreme Court verdicts, or annual reports missed.",
  },
];

export interface FinalReportScreenProps {
  questions: BackendQuestionItem[];
  answersState: Record<number, UserQuestionAnswerState>;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeTakenSeconds: number;
  earnedDiscount?: number;
  candidateName?: string;
  candidatePhone?: string;
  onReviewSolutions?: () => void;
  onRestartTest?: () => void;
  onEnrollCourse: () => void;
}

export const FinalReportScreen: React.FC<FinalReportScreenProps> = ({
  questions,
  answersState,
  score,
  totalMarks,
  correctCount,
  incorrectCount,
  unattemptedCount,
  timeTakenSeconds,
  earnedDiscount = 0,
  candidateName,
  candidatePhone,
  onEnrollCourse,
}) => {
  const [activeTab, setActiveTab] = useState<
    "ai" | "summary" | "compare" | "elimination" | "solution" | "mistakemap"
  >("ai");
  const [mobileVideoModalOpen, setMobileVideoModalOpen] = useState(false);

  const handleTabClick = (
    tabKey: "ai" | "summary" | "compare" | "elimination" | "solution" | "mistakemap"
  ) => {
    setActiveTab(tabKey);
    // On mobile view (< 768px), auto-open video modal walkthrough for that tab
    if (typeof window !== "undefined" && window.innerWidth < 768 && REPORT_VIDEOS[tabKey]) {
      setMobileVideoModalOpen(true);
    }
  };
  const [summarySubTab, setSummarySubTab] = useState<"sub" | "strategy">("sub");
  const [compareSubTab, setCompareSubTab] = useState<"sub" | "strategy">("sub");
  const [eliminationSubTab, setEliminationSubTab] = useState<"fiftyFifty" | "oneEliminate">("fiftyFifty");
  const [solutionFilter, setSolutionFilter] = useState<"all" | "correct" | "incorrect" | "skipped">("all");
  const [viewLang, setViewLang] = useState<"englishQuestion" | "hindiQuestion">(() => {
    try {
      const saved = sessionStorage.getItem("mock_test_lang");
      return saved === "hindiQuestion" ? "hindiQuestion" : "englishQuestion";
    } catch (e) {
      return "englishQuestion";
    }
  });

  // User-classified Mistake Map state (starts empty - counts are 0 until student classifies each mistake)
  const [userMistakeMap, setUserMistakeMap] = useState<Record<number, MistakeCategoryKey>>({});

  const totalQuestions = questions.length;
  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;

  // Format Time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  // =========================================================================
  // 1. Calculations matching backend `report.ts`
  // =========================================================================

  // Strategy Analysis (100% Sure, Logic Play, Intuition Hit, Blind Fire, Fear Skip, Skip)
  const strategyStats = useMemo(() => {
    const stratDefs = [
      { key: "100%Sure", id: "100sure", label: "100% Sure" },
      { key: "logicPlay", id: "logicPlay", label: "Logic play" },
      { key: "intuitionHit", id: "intuitionHit", label: "Intuition Hit" },
      { key: "blindFire", id: "blindFire", label: "Blind fire" },
    ];

    let fearSkipsCount = 0;
    let normalSkipsCount = 0;

    const data = stratDefs.map((def) => {
      let total = 0;
      let correct = 0;
      let directTotal = 0;
      let directCorrect = 0;
      let fiftyFiftyTotal = 0;
      let fiftyFiftyCorrect = 0;
      let oneEliminateTotal = 0;
      let oneEliminateCorrect = 0;

      questions.forEach((q, idx) => {
        const ans = answersState[idx];
        if (!ans) return;

        // Match strategy key
        const userStrat = ans.strategy;
        const matches =
          (def.id === "100sure" && (userStrat === "100sure" || userStrat === "100%Sure")) ||
          (def.id === "logicPlay" && userStrat === "logicPlay") ||
          (def.id === "intuitionHit" && userStrat === "intuitionHit") ||
          (def.id === "blindFire" && userStrat === "blindFire");

        if (matches) {
          total++;
          const isRight = ans.selectedOption === getCorrectAnswer(q);
          if (isRight) correct++;

          const excludedCount = ans.excludedOptions
            ? Object.values(ans.excludedOptions).filter(Boolean).length
            : 0;

          if (excludedCount === 0) {
            directTotal++;
            if (isRight) directCorrect++;
          } else if (excludedCount === 2) {
            fiftyFiftyTotal++;
            if (isRight) fiftyFiftyCorrect++;
          } else if (excludedCount === 1) {
            oneEliminateTotal++;
            if (isRight) oneEliminateCorrect++;
          }
        }
      });

      const percent = totalQuestions > 0 ? Math.round((total / totalQuestions) * 100) : 0;
      const directPct = directTotal > 0 ? Math.round((directCorrect / directTotal) * 100) : 0;
      const fiftyFiftyPct = fiftyFiftyTotal > 0 ? Math.round((fiftyFiftyCorrect / fiftyFiftyTotal) * 100) : 0;
      const oneEliminatePct = oneEliminateTotal > 0 ? Math.round((oneEliminateCorrect / oneEliminateTotal) * 100) : 0;

      return {
        label: def.label,
        total,
        correct,
        percent,
        direct: { total: directTotal, correct: directCorrect, pct: directPct },
        fiftyFifty: { total: fiftyFiftyTotal, correct: fiftyFiftyCorrect, pct: fiftyFiftyPct },
        oneEliminate: { total: oneEliminateTotal, correct: oneEliminateCorrect, pct: oneEliminatePct },
      };
    });

    questions.forEach((_, idx) => {
      const strat = answersState[idx]?.strategy;
      if (strat === "fearDriverSkip") fearSkipsCount++;
      if (strat === "skip") normalSkipsCount++;
    });

    return { data, fearSkipsCount, normalSkipsCount };
  }, [questions, answersState, totalQuestions]);

  // Fear Driver Skip Metrics & Formula matching BEF_APP_WEB AiPowered.tsx
  const fearDriverMetrics = useMemo(() => {
    let directCorrect = 0;
    let directTotal = 0;
    let fiftyFiftyCorrect = 0;
    let fiftyFiftyTotal = 0;
    let oneEliminateCorrect = 0;
    let oneEliminateTotal = 0;

    questions.forEach((q, idx) => {
      const ans = answersState[idx];
      if (!ans) return;
      const strat = String(ans.strategy || "").toLowerCase();
      const isFearSkip = strat.includes("fear");

      if (isFearSkip) {
        const isRight = ans.selectedOption === getCorrectAnswer(q);
        const excludedCount = ans.excludedOptions
          ? Object.values(ans.excludedOptions).filter(Boolean).length
          : 0;

        if (excludedCount === 2) {
          fiftyFiftyTotal++;
          if (isRight) fiftyFiftyCorrect++;
        } else if (excludedCount === 1) {
          oneEliminateTotal++;
          if (isRight) oneEliminateCorrect++;
        } else {
          directTotal++;
          if (isRight) directCorrect++;
        }
      }
    });

    return {
      direct: { correct: directCorrect, total: directTotal },
      fiftyFifty: { correct: fiftyFiftyCorrect, total: fiftyFiftyTotal },
      oneEliminate: { correct: oneEliminateCorrect, total: oneEliminateTotal },
    };
  }, [questions, answersState]);

  const positiveWeight = totalMarks > 0 && questions.length > 0 ? totalMarks / questions.length : 2;
  const negativeWeight = Number((positiveWeight / 3).toFixed(2)) || 0.67;

  const calcFinalScore = (
    attempt?: { correct?: number; total?: number },
    correctWeight = positiveWeight,
    wrongWeight = negativeWeight
  ): number => {
    const correct = attempt?.correct ?? 0;
    const total = attempt?.total ?? 0;
    const wrong = total - correct;
    const scoreVal = correct * correctWeight - wrong * wrongWeight;
    return Number(scoreVal.toFixed(2));
  };

  const TotalFearSkips = Number((
    calcFinalScore(fearDriverMetrics.direct) +
    calcFinalScore(fearDriverMetrics.fiftyFifty) +
    calcFinalScore(fearDriverMetrics.oneEliminate)
  ).toFixed(2));

  const fearCards = [
    {
      title: "Fear Skips",
      topText: undefined,
      bottomValue: TotalFearSkips,
      bottomText: "Total",
    },
    {
      title: undefined,
      topText: `${fearDriverMetrics.direct.correct}/${fearDriverMetrics.direct.total}`,
      bottomValue: calcFinalScore(fearDriverMetrics.direct),
      bottomText: "Marks Chance",
    },
    {
      title: undefined,
      topText: `${fearDriverMetrics.fiftyFifty.correct}/${fearDriverMetrics.fiftyFifty.total}`,
      bottomValue: calcFinalScore(fearDriverMetrics.fiftyFifty),
      bottomText: "Marks Chance",
    },
    {
      title: undefined,
      topText: `${fearDriverMetrics.oneEliminate.correct}/${fearDriverMetrics.oneEliminate.total}`,
      bottomValue: calcFinalScore(fearDriverMetrics.oneEliminate),
      bottomText: "Marks Chance",
    },
  ];

  // List of all incorrect questions for Mistake Map classification
  const incorrectQuestions = useMemo(() => {
    return questions
      .map((q, idx) => {
        const ans = answersState[idx];
        const correctAns = getCorrectAnswer(q);
        const isAttempted = Boolean(ans && ans.selectedOption);
        const isRight = isAttempted && ans.selectedOption === correctAns;
        return {
          question: q,
          index: idx,
          ans,
          correctAns,
          isAttempted,
          isRight,
          isIncorrect: isAttempted && !isRight,
        };
      })
      .filter((item) => item.isIncorrect);
  }, [questions, answersState]);

  // Guaranteed Merit Discount (at least ₹7,499 if earnedDiscount is 0 or unassigned)
  const effectiveDiscount = earnedDiscount && earnedDiscount > 0 ? earnedDiscount : 7499;

  const handleEnrollWithDiscount = () => {
    const reward: MockTestReward = {
      score,
      totalMarks,
      scoreDiscount: effectiveDiscount,
      active: true,
      timestamp: Date.now(),
    };
    saveMockTestReward(reward);
    if (onEnrollCourse) {
      onEnrollCourse();
    }
  };

  // Subject Wise Breakdown
  const subjectBreakdown = useMemo(() => {
    const map = new Map<string, { total: number; correct: number }>();
    questions.forEach((q, idx) => {
      const sub = getSubjectName(q);
      const current = map.get(sub) || { total: 0, correct: 0 };
      current.total++;
      if (answersState[idx]?.selectedOption === getCorrectAnswer(q)) {
        current.correct++;
      }
      map.set(sub, current);
    });

    const categories: Record<"veryWeak" | "weak" | "average" | "strong" | "veryStrong", string[]> = {
      veryWeak: [],
      weak: [],
      average: [],
      strong: [],
      veryStrong: [],
    };

    map.forEach((stat, sub) => {
      const pct = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      if (pct <= 20) categories.veryWeak.push(sub);
      else if (pct <= 40) categories.weak.push(sub);
      else if (pct <= 60) categories.average.push(sub);
      else if (pct <= 80) categories.strong.push(sub);
      else categories.veryStrong.push(sub);
    });

    return { map, categories };
  }, [questions, answersState]);

  // Strategy Wise Categories for Summary Tab
  const strategySummaryCategories = useMemo(() => {
    const categories: Record<"veryWeak" | "weak" | "average" | "strong" | "veryStrong", string[]> = {
      veryWeak: [],
      weak: [],
      average: [],
      strong: [],
      veryStrong: [],
    };

    strategyStats.data.forEach((s) => {
      const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;
      if (s.total === 0 || pct <= 20) categories.veryWeak.push(s.label);
      else if (pct <= 40) categories.weak.push(s.label);
      else if (pct <= 60) categories.average.push(s.label);
      else if (pct <= 80) categories.strong.push(s.label);
      else categories.veryStrong.push(s.label);
    });

    return categories;
  }, [strategyStats]);

  // Elimination Accuracy Calculations separating 50-50 and 1-Opt Eliminate
  const eliminationReport = useMemo(() => {
    // 50-50 metrics (count of eliminated options >= 2)
    let totalFiftyQuestions = 0;
    let fiftyRightEliminatedYes = 0; // correct option was NOT eliminated
    let fiftyRightChosenAfterEliminationYes = 0; // question answered correctly
    let fiftyOptionsCrossedOut = 0;

    // 1-Opt metrics (count of eliminated options == 1)
    let totalOneEliminateQuestions = 0;
    let oneEliminateCorrectEliminationYes = 0; // correct option was NOT eliminated
    let oneEliminateRightAnswerFromCorrectEliminationYes = 0; // question answered correctly
    let oneOptionsCrossedOut = 0;

    // Strategy metrics per elimination mode
    type StratAccumulator = {
      totalFifty: number;
      fiftySafe: number;
      fiftyCorrect: number;
      totalOne: number;
      oneSafe: number;
      oneCorrect: number;
    };

    const stratMap: Record<string, StratAccumulator> = {
      "100%Sure": { totalFifty: 0, fiftySafe: 0, fiftyCorrect: 0, totalOne: 0, oneSafe: 0, oneCorrect: 0 },
      logicPlay: { totalFifty: 0, fiftySafe: 0, fiftyCorrect: 0, totalOne: 0, oneSafe: 0, oneCorrect: 0 },
      intuitionHit: { totalFifty: 0, fiftySafe: 0, fiftyCorrect: 0, totalOne: 0, oneSafe: 0, oneCorrect: 0 },
      blindFire: { totalFifty: 0, fiftySafe: 0, fiftyCorrect: 0, totalOne: 0, oneSafe: 0, oneCorrect: 0 },
    };

    const normalizeStrat = (raw?: string): string => {
      const s = String(raw || "").toLowerCase();
      if (s.includes("sure") || s.includes("100")) return "100%Sure";
      if (s.includes("logic")) return "logicPlay";
      if (s.includes("intuition")) return "intuitionHit";
      if (s.includes("blind")) return "blindFire";
      return "logicPlay";
    };

    questions.forEach((q, idx) => {
      const ans = answersState[idx];
      if (!ans) return;

      const eliminatedList = Object.entries(ans.excludedOptions || {})
        .filter(([_, isEx]) => Boolean(isEx))
        .map(([optKey]) => optKey.toUpperCase());
      const elimCount = eliminatedList.length;
      if (elimCount === 0) return;

      const correctAns = getCorrectAnswer(q);
      const safeElimination = !eliminatedList.includes(correctAns);
      const isCorrect = ans.selectedOption === correctAns;
      const stratKey = normalizeStrat(ans.strategy);

      if (elimCount >= 2) {
        totalFiftyQuestions++;
        fiftyOptionsCrossedOut += elimCount;
        if (safeElimination) fiftyRightEliminatedYes++;
        if (isCorrect) fiftyRightChosenAfterEliminationYes++;

        stratMap[stratKey].totalFifty++;
        if (safeElimination) stratMap[stratKey].fiftySafe++;
        if (isCorrect) stratMap[stratKey].fiftyCorrect++;
      } else if (elimCount === 1) {
        totalOneEliminateQuestions++;
        oneOptionsCrossedOut += elimCount;
        if (safeElimination) oneEliminateCorrectEliminationYes++;
        if (isCorrect) oneEliminateRightAnswerFromCorrectEliminationYes++;

        stratMap[stratKey].totalOne++;
        if (safeElimination) stratMap[stratKey].oneSafe++;
        if (isCorrect) stratMap[stratKey].oneCorrect++;
      }
    });

    const fiftyFiftyCorrectPct =
      totalFiftyQuestions > 0
        ? Math.round((fiftyRightEliminatedYes / totalFiftyQuestions) * 100)
        : 0;
    const fiftyFiftyRightAnswerPct =
      fiftyRightEliminatedYes > 0
        ? Math.round((fiftyRightChosenAfterEliminationYes / fiftyRightEliminatedYes) * 100)
        : (totalFiftyQuestions > 0 ? Math.round((fiftyRightChosenAfterEliminationYes / totalFiftyQuestions) * 100) : 0);

    const oneEliminateCorrectPct =
      totalOneEliminateQuestions > 0
        ? Math.round((oneEliminateCorrectEliminationYes / totalOneEliminateQuestions) * 100)
        : 0;
    const oneEliminateRightAnswerPct =
      oneEliminateCorrectEliminationYes > 0
        ? Math.round((oneEliminateRightAnswerFromCorrectEliminationYes / oneEliminateCorrectEliminationYes) * 100)
        : (totalOneEliminateQuestions > 0 ? Math.round((oneEliminateRightAnswerFromCorrectEliminationYes / totalOneEliminateQuestions) * 100) : 0);

    const strategies = [
      { key: "100%Sure", label: "100% Sure" },
      { key: "logicPlay", label: "Logic Play" },
      { key: "intuitionHit", label: "Intuition Hit" },
      { key: "blindFire", label: "Blind Fire" },
    ];

    const strategyFiftyData = strategies.map((s) => {
      const data = stratMap[s.key];
      const elimAcc = data.totalFifty > 0 ? Math.round((data.fiftySafe / data.totalFifty) * 100) : 0;
      const ansAcc = data.fiftySafe > 0 ? Math.round((data.fiftyCorrect / data.fiftySafe) * 100) : 0;
      return {
        ...s,
        total: data.totalFifty,
        safe: data.fiftySafe,
        correct: data.fiftyCorrect,
        elimAccuracy: elimAcc,
        rightAnswerAccuracy: ansAcc,
      };
    });

    const strategyOneData = strategies.map((s) => {
      const data = stratMap[s.key];
      const elimAcc = data.totalOne > 0 ? Math.round((data.oneSafe / data.totalOne) * 100) : 0;
      const ansAcc = data.oneSafe > 0 ? Math.round((data.oneCorrect / data.oneSafe) * 100) : 0;
      return {
        ...s,
        total: data.totalOne,
        safe: data.oneSafe,
        correct: data.oneCorrect,
        elimAccuracy: elimAcc,
        rightAnswerAccuracy: ansAcc,
      };
    });

    return {
      fiftyFifty: {
        totalQuestions: totalFiftyQuestions,
        safeCount: fiftyRightEliminatedYes,
        rightAnswerCount: fiftyRightChosenAfterEliminationYes,
        correctPercentage: fiftyFiftyCorrectPct,
        rightAnswerPercentage: fiftyFiftyRightAnswerPct,
        totalOptionsCrossed: fiftyOptionsCrossedOut,
        marksSaved: (fiftyRightChosenAfterEliminationYes * 2.0).toFixed(1),
        strategies: strategyFiftyData,
      },
      oneEliminate: {
        totalQuestions: totalOneEliminateQuestions,
        safeCount: oneEliminateCorrectEliminationYes,
        rightAnswerCount: oneEliminateRightAnswerFromCorrectEliminationYes,
        correctPercentage: oneEliminateCorrectPct,
        rightAnswerPercentage: oneEliminateRightAnswerPct,
        totalOptionsCrossed: oneOptionsCrossedOut,
        marksSaved: (oneEliminateRightAnswerFromCorrectEliminationYes * 1.5).toFixed(1),
        strategies: strategyOneData,
      },
    };
  }, [questions, answersState]);

  const activeElimData = eliminationReport[eliminationSubTab];

  // Filtered Questions for Solution View
  const filteredSolutions = useMemo(() => {
    return questions.map((q, idx) => {
      const ans = answersState[idx];
      const selected = ans?.selectedOption;
      const isRight = selected === getCorrectAnswer(q);
      const isSkip = ans?.strategy === "skip" || ans?.strategy === "fearDriverSkip" || !selected;

      let status: "correct" | "incorrect" | "skipped" = "skipped";
      if (!isSkip) {
        status = isRight ? "correct" : "incorrect";
      }

      return {
        question: q,
        index: idx,
        ans,
        status,
      };
    }).filter((item) => {
      if (solutionFilter === "all") return true;
      return item.status === solutionFilter;
    });
  }, [questions, answersState, solutionFilter]);

  // Aggregated Mistake Map stats matching BEF_APP_WEB
  const mistakeMapStats = useMemo(() => {
    let totalIncorrect = 0;
    let totalFearDriverSkip = 0;
    let mappedCount = 0;

    const catMap: Record<
      MistakeCategoryKey,
      { total: number; subtopics: Record<string, number> }
    > = {
      sillyMistake: { total: 0, subtopics: {} },
      conceptMistake: { total: 0, subtopics: {} },
      revisionLacking: { total: 0, subtopics: {} },
      outOfMaterial: { total: 0, subtopics: {} },
      currentAffairNotRead: { total: 0, subtopics: {} },
    };

    questions.forEach((q, idx) => {
      const ans = answersState[idx];
      const correctAns = getCorrectAnswer(q);
      const isAttempted = Boolean(ans && ans.selectedOption);
      const isRight = isAttempted && ans.selectedOption === correctAns;
      const isIncorrect = isAttempted && !isRight;
      const isFearSkip =
        ans?.strategy === "fearDriverSkip" ||
        (!isAttempted && ans?.selectedOption === undefined);

      if (isIncorrect) {
        totalIncorrect++;
        const assignedCat = userMistakeMap[idx];
        if (assignedCat && catMap[assignedCat]) {
          mappedCount++;
          catMap[assignedCat].total++;
          const subtopic = getSubtopicName(q, idx);
          catMap[assignedCat].subtopics[subtopic] =
            (catMap[assignedCat].subtopics[subtopic] || 0) + 1;
        }
      } else if (isFearSkip) {
        totalFearDriverSkip++;
      }
    });

    return {
      totalIncorrect,
      totalFearDriverSkip,
      mappedCount,
      categories: catMap,
    };
  }, [questions, answersState, userMistakeMap]);

  return (
    <div className="final-report-wrapper">
      <div className="final-report-container">
        {/* Title */}
        <div className="final-report-title flex flex-wrap items-center justify-between gap-3">
          <span>Result</span>
          {candidateName && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#EFF6FF] text-[#124699] px-4 py-1.5 rounded-full border border-[#BFDBFE] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Candidate: {candidateName}</span>
              {candidatePhone && (
                <span className="text-[#64748B] font-mono font-medium">({candidatePhone})</span>
              )}
            </div>
          )}
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="final-report-layout">
          {/* Left Column: Trophy Hero & 5 Key Score Metrics */}
          <aside className="final-report-left">
            {/* Result Hero with Trophy */}
            <section className="final-result-hero" aria-label="Exam result highlights">
              <div className="final-hero-art" aria-hidden="true">
                <div className="final-hero-spotlight final-spot-one" />
                <div className="final-hero-spotlight final-spot-two" />
                <div className="final-hero-spotlight final-spot-three" />
                <div className="final-hero-coin final-coin-one">₹</div>
                <div className="final-hero-coin final-coin-two">₹</div>
                <div className="final-hero-coin final-coin-three">₹</div>

                {/* SVG Golden Trophy */}
                <svg
                  className="final-hero-trophy"
                  viewBox="0 0 300 260"
                  role="img"
                  aria-label="Golden trophy"
                >
                  <defs>
                    <linearGradient id="goldCup" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#fff2a3" />
                      <stop offset=".35" stopColor="#e6a62e" />
                      <stop offset=".68" stopColor="#8f4b09" />
                      <stop offset="1" stopColor="#ffdc65" />
                    </linearGradient>
                    <linearGradient id="podiumRed" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#ff2929" />
                      <stop offset="1" stopColor="#b60000" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="150" cy="243" rx="128" ry="10" fill="#00123c" opacity=".5" />
                  <path d="M20 215 L86 215 L120 250 L0 250Z" fill="#d60008" />
                  <path d="M102 196 L198 196 L236 250 L64 250Z" fill="url(#podiumRed)" />
                  <path d="M214 215 L280 215 L300 250 L180 250Z" fill="#d60008" />
                  <rect x="24" y="186" width="70" height="34" rx="3" fill="url(#podiumRed)" stroke="#d5e0ef" strokeWidth="5" />
                  <rect x="100" y="169" width="100" height="52" rx="3" fill="url(#podiumRed)" stroke="#d5e0ef" strokeWidth="5" />
                  <rect x="206" y="186" width="70" height="34" rx="3" fill="url(#podiumRed)" stroke="#d5e0ef" strokeWidth="5" />
                  <text x="59" y="211" fontSize="24" fontWeight="800" fill="#fff">2</text>
                  <text x="143" y="207" fontSize="36" fontWeight="800" fill="#fff">1</text>
                  <text x="230" y="211" fontSize="24" fontWeight="800" fill="#fff">3</text>
                  <path d="M111 47 Q88 26 77 54 Q70 79 111 93 L121 76 Q94 68 100 55 Q105 48 117 63Z" fill="url(#goldCup)" stroke="#8b510b" strokeWidth="3" />
                  <path d="M189 47 Q212 26 223 54 Q230 79 189 93 L179 76 Q206 68 200 55 Q195 48 183 63Z" fill="url(#goldCup)" stroke="#8b510b" strokeWidth="3" />
                  <path d="M103 43 Q150 63 197 43 L187 104 Q178 127 150 137 Q122 127 113 104Z" fill="url(#goldCup)" stroke="#f9d56b" strokeWidth="4" />
                  <ellipse cx="150" cy="44" rx="47" ry="10" fill="#ffe99a" stroke="#a86612" strokeWidth="4" />
                  <path d="M127 111 L173 111 L166 145 L134 145Z" fill="url(#goldCup)" />
                  <rect x="128" y="143" width="44" height="12" rx="3" fill="#c9861d" />
                  <path d="M119 155 L181 155 L194 172 L106 172Z" fill="url(#goldCup)" stroke="#e9b84e" strokeWidth="3" />
                  <path d="M40 112 Q18 98 18 120 Q18 144 48 148 L59 132 Q35 130 37 119Z" fill="url(#goldCup)" stroke="#d99b29" strokeWidth="4" />
                  <path d="M30 110 L68 110 L63 152 Q55 169 49 169 Q40 164 35 150Z" fill="url(#goldCup)" stroke="#e9b84e" strokeWidth="3" />
                  <rect x="42" y="166" width="16" height="18" fill="url(#goldCup)" />
                  <path d="M31 183 L69 183 L75 190 L25 190Z" fill="url(#goldCup)" />
                  <path d="M240 112 Q262 98 262 120 Q262 144 232 148 L221 132 Q245 130 243 119Z" fill="url(#goldCup)" stroke="#d99b29" strokeWidth="4" />
                  <path d="M222 110 L260 110 L255 152 Q247 169 241 169 Q232 164 227 150Z" fill="url(#goldCup)" stroke="#e9b84e" strokeWidth="3" />
                  <rect x="234" y="166" width="16" height="18" fill="url(#goldCup)" />
                  <path d="M223 183 L261 183 L267 190 L217 190Z" fill="url(#goldCup)" />
                </svg>
              </div>

              <div className="final-hero-content">
                <span className="final-hero-eyebrow">
                  <span className="final-hero-check">✓</span> TEST COMPLETED
                </span>
                <h2>Your effort. Your progress.</h2>
                <p>Review your performance, understand your strengths, and plan your next attempt.</p>
                <div className="final-hero-test-meta">
                  <strong>Free UPSC Practice Test</strong>
                  <span>Full Length Test (FLT)</span>
                </div>
                <div className="final-hero-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("solution");
                      setTimeout(() => {
                        document.getElementById("solution-panel-anchor")?.scrollIntoView({ behavior: "smooth" });
                      }, 60);
                    }}
                    className="final-hero-btn final-hero-btn-primary"
                  >
                    View Solution <span>→</span>
                  </button>
                  {/* <button
                    type="button"
                    onClick={onRestartTest}
                    className="final-hero-btn border border-white/30 text-white bg-white/10 hover:bg-white/20"
                  >
                    Retake Test ↺
                  </button> */}
                </div>
              </div>
            </section>

            {/* Score Metrics Column */}
            <div className="final-score-column" aria-label="Test score metrics">
              <article className="final-metric">
                <div className="final-metric-label">
                  <span className="final-metric-icon">◔</span>
                  Total Marks Scored
                </div>
                <div className="final-metric-value">
                  {score.toFixed(2)} <small>/ {totalMarks} Marks</small>
                </div>
              </article>

              <article className="final-metric correct">
                <div className="final-metric-label">
                  <span className="final-metric-icon">✓</span>
                  Correct
                </div>
                <div className="final-metric-value">
                  {correctCount} <small>Questions</small>
                </div>
              </article>

              <article className="final-metric incorrect">
                <div className="final-metric-label">
                  <span className="final-metric-icon">✕</span>
                  Incorrect
                </div>
                <div className="final-metric-value">
                  {incorrectCount} <small>Questions</small>
                </div>
              </article>

              <article className="final-metric unanswered">
                <div className="final-metric-label">
                  <span className="final-metric-icon">▤</span>
                  Unanswered / Skipped
                </div>
                <div className="final-metric-value">
                  {unattemptedCount} <small>Questions</small>
                </div>
              </article>

              <article className="final-metric time">
                <div className="final-metric-label">
                  <span className="final-metric-icon">◷</span>
                  Time Taken
                </div>
                <div className="final-metric-value">
                  {formatTime(timeTakenSeconds)}
                </div>
              </article>
            </div>
          </aside>

          {/* Right Column: 5 Tabs & Associated Report Panels */}
          <section className="final-report-right">
            {/* Full-Width Merit Reward Discount Banner (placed BEFORE all 6 buttons) */}
            {/* Full-Width Merit Reward Discount Banner (always visible on result page) */}
            <div className="discount-cta-container">
              <div
                className="discount-cta"
                onClick={handleEnrollWithDiscount}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleEnrollWithDiscount();
                  }
                }}
                title="Claim discount for Last Prelims course"
              >
                <div className="discount-icon" aria-hidden="true">✓</div>

                <div className="discount-content">
                  <div className="discount-label">YOUR SPECIAL ADMISSION FEE IS UNLOCKED!</div>
                  <div className="discount-amount">Pay ₹{effectiveDiscount.toLocaleString()} Only</div>
                  <div className="discount-subtitle">
                    Save ₹{Math.max(0, 20000 - effectiveDiscount).toLocaleString()} on Last Prelims course based on your mock score.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrollWithDiscount();
                  }}
                  className="enroll-btn"
                >
                  ENROLL FOR LAST PRELIMS (₹{effectiveDiscount.toLocaleString()})
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>

            {/* Tab Bar (6 buttons in 2 rows of 3) */}
            <div className="final-tab-rows" role="tablist">
              <div className="final-tab-row final-tab-row-top">
                <button
                  type="button"
                  onClick={() => handleTabClick("ai")}
                  className={`final-tab ${activeTab === "ai" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">↗</span>
                  <span>AI Powered Report Analysis</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick("summary")}
                  className={`final-tab ${activeTab === "summary" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">▤</span>
                  <span>Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick("compare")}
                  className={`final-tab ${activeTab === "compare" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">▧</span>
                  <span>Compare Competitor</span>
                </button>
              </div>

              <div className="final-tab-row final-tab-row-bottom">
                <button
                  type="button"
                  onClick={() => handleTabClick("elimination")}
                  className={`final-tab ${activeTab === "elimination" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">⚠</span>
                  <span>Elimination Skill Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick("solution")}
                  className={`final-tab ${activeTab === "solution" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">📖</span>
                  <span>View Solution</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick("mistakemap")}
                  className={`final-tab ${activeTab === "mistakemap" ? "active" : ""}`}
                >
                  <span className="final-tab-vector">🗺</span>
                  <span>Mistake Map Report</span>
                </button>
              </div>
            </div>

            {/* Clean Divider Line below the 6 buttons */}
            <div className="w-full border-b border-[#e2e8f0]" />

            {/* Mobile Video Walkthrough Popup Modal (triggered when clicking any of the 6 buttons on mobile) */}
            {mobileVideoModalOpen && REPORT_VIDEOS[activeTab] && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-xs md:hidden"
                onClick={() => setMobileVideoModalOpen(false)}
              >
                <div
                  className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#124699]/10 text-[#124699] font-bold text-xs">
                        🎬
                      </span>
                      <div>
                        <h3 className="text-xs font-bold text-slate-800 m-0">
                          {REPORT_VIDEOS[activeTab].title}
                        </h3>
                        <p className="text-[10px] text-slate-500 m-0">
                          {REPORT_VIDEOS[activeTab].badge || "Walkthrough Tutorial"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileVideoModalOpen(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Video Player */}
                  <div className="p-3">
                    <ModernVideoPlayer
                      key={`mobile-modal-${activeTab}`}
                      src={REPORT_VIDEOS[activeTab].src}
                      title={REPORT_VIDEOS[activeTab].title}
                      subtitle={REPORT_VIDEOS[activeTab].subtitle}
                      badge={REPORT_VIDEOS[activeTab].badge}
                      points={REPORT_VIDEOS[activeTab].points}
                      bannerMode={true}
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 bg-slate-50">
                    <span className="text-[11px] text-slate-500">
                      Tap close to view detailed report data
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileVideoModalOpen(false)}
                      className="rounded-lg bg-[#124699] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0e3575] transition cursor-pointer"
                    >
                      View Report ↓
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tutorial Walkthrough Video for Active Report Tab */}
            {REPORT_VIDEOS[activeTab] && (
              <div className="p-4 sm:p-5 pb-0">
                <ModernVideoPlayer
                  key={activeTab}
                  src={REPORT_VIDEOS[activeTab].src}
                  title={REPORT_VIDEOS[activeTab].title}
                  subtitle={REPORT_VIDEOS[activeTab].subtitle}
                  badge={REPORT_VIDEOS[activeTab].badge}
                  points={REPORT_VIDEOS[activeTab].points}
                  bannerMode={true}
                />
              </div>
            )}

            {/* Panel 1: AI Powered Report Analysis */}
            {activeTab === "ai" && (
              <section className="final-panel">
                <h2 className="final-panel-heading">AI Powered Report Analysis</h2>
                <p className="final-subheading">Free Mock Test Full Report</p>

                <div className="final-table-wrap">
                  <table className="final-analysis-table">
                    <thead>
                      <tr>
                        <th>Progress</th>
                        <th>Direct</th>
                        <th>50-50</th>
                        <th>1-Opt Eliminate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategyStats.data.map((st, i) => (
                        <tr key={i}>
                          <td className="final-strategy">
                            <strong>{st.label}</strong>
                            <span className="final-percent">{st.percent}%</span>
                            <div className="final-bar">
                              <span style={{ width: `${st.percent}%` }} />
                            </div>
                          </td>
                          <td>
                            <span
                              className="final-ring"
                              style={{ "--value": `${st.direct.pct}%` } as React.CSSProperties}
                            >
                              <span>
                                {st.direct.correct}/{st.direct.total}
                              </span>
                            </span>
                            <b className="final-cell-pct">{st.direct.pct}%</b>
                          </td>
                          <td>
                            <span
                              className="final-ring"
                              style={{ "--value": `${st.fiftyFifty.pct}%` } as React.CSSProperties}
                            >
                              <span>
                                {st.fiftyFifty.correct}/{st.fiftyFifty.total}
                              </span>
                            </span>
                            <b className="final-cell-pct">{st.fiftyFifty.pct}%</b>
                          </td>
                          <td>
                            <span
                              className="final-ring"
                              style={{ "--value": `${st.oneEliminate.pct}%` } as React.CSSProperties}
                            >
                              <span>
                                {st.oneEliminate.correct}/{st.oneEliminate.total}
                              </span>
                            </span>
                            <b className="final-cell-pct">{st.oneEliminate.pct}%</b>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 4 Cards matching BEF_APP_WEB AiPowered.tsx */}
                <div className="final-insight-grid">
                  {fearCards.map((card, idx) => {
                    const val = Number(card.bottomValue);
                    const isPositive = val >= 0.1;
                    const isZero = Math.abs(val) < 0.01;
                    const isUp = isPositive || isZero;
                    const formattedVal = val > 0 ? `+${val}` : `${val}`;

                    return (
                      <div
                        key={idx}
                        className={`relative rounded-xl p-4 flex flex-col justify-between min-h-[96px] border ${
                          idx === 0
                            ? "bg-[#fff7ed] border-[#fed7aa] text-[#1e293b]"
                            : "bg-[#f8fafc] border-[#e2e8f0] text-[#0f172a]"
                        }`}
                      >
                        {/* Left vertical accent bar */}
                        <div
                          className={`w-1 h-3/5 rounded-r absolute left-0 top-1/2 -translate-y-1/2 ${
                            idx === 0 ? "bg-black" : "bg-[#124699]"
                          }`}
                        />

                        {/* Top Header */}
                        <div className={`pb-1.5 border-b ${idx === 0 ? "border-[#fed7aa]" : "border-[#e2e8f0]"}`}>
                          {card.title && (
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800">
                              {card.title}
                            </div>
                          )}
                          {card.topText && (
                            <div className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                              {card.topText}
                            </div>
                          )}
                        </div>

                        {/* Bottom Score & Label */}
                        <div className="pt-2 flex items-center justify-between">
                          <div
                            className={`flex items-center text-base sm:text-lg font-bold ${
                              isPositive ? "text-emerald-600" : isZero ? "text-gray-700" : "text-rose-600"
                            }`}
                          >
                            {isUp ? (
                              <IoMdArrowDropup className="text-xl" />
                            ) : (
                              <IoMdArrowDropdown className="text-xl" />
                            )}
                            <span>{formattedVal}</span>
                          </div>
                          <span className="text-[11px] font-medium text-gray-500 ps-2">
                            {card.bottomText}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Panel 2: Summary */}
            {activeTab === "summary" && (
              <section className="final-panel">
                <h2 className="final-panel-heading">Summary</h2>
                <p className="final-subheading">Free Mock Test Full Report</p>

                <div className="final-subtabs">
                  <button
                    type="button"
                    onClick={() => setSummarySubTab("sub")}
                    className={`final-subtab ${summarySubTab === "sub" ? "active" : ""}`}
                  >
                    SUB WISE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummarySubTab("strategy")}
                    className={`final-subtab ${summarySubTab === "strategy" ? "active" : ""}`}
                  >
                    ATTEMPTING STRATEGY WISE
                  </button>
                </div>

                {summarySubTab === "sub" ? (
                  <div className="final-summary-grid">
                    <article className="final-summary-card veryweak">
                      <h3>Very Weak <span>0% - 20%</span></h3>
                      {subjectBreakdown.categories.veryWeak.length > 0 ? (
                        <ul>
                          {subjectBreakdown.categories.veryWeak.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card weak">
                      <h3>Weak <span>20% - 40%</span></h3>
                      {subjectBreakdown.categories.weak.length > 0 ? (
                        <ul>
                          {subjectBreakdown.categories.weak.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card average">
                      <h3>Average <span>40% - 60%</span></h3>
                      {subjectBreakdown.categories.average.length > 0 ? (
                        <ul>
                          {subjectBreakdown.categories.average.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card strong">
                      <h3>Strong <span>60% - 80%</span></h3>
                      {subjectBreakdown.categories.strong.length > 0 ? (
                        <ul>
                          {subjectBreakdown.categories.strong.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card verystrong">
                      <h3>Very Strong <span>80% - 100%</span></h3>
                      {subjectBreakdown.categories.veryStrong.length > 0 ? (
                        <ul>
                          {subjectBreakdown.categories.veryStrong.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>
                  </div>
                ) : (
                  <div className="final-summary-grid">
                    <article className="final-summary-card veryweak">
                      <h3>Very Weak <span>0% - 20%</span></h3>
                      {strategySummaryCategories.veryWeak.length > 0 ? (
                        <ul>
                          {strategySummaryCategories.veryWeak.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card weak">
                      <h3>Weak <span>20% - 40%</span></h3>
                      {strategySummaryCategories.weak.length > 0 ? (
                        <ul>
                          {strategySummaryCategories.weak.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card average">
                      <h3>Average <span>40% - 60%</span></h3>
                      {strategySummaryCategories.average.length > 0 ? (
                        <ul>
                          {strategySummaryCategories.average.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card strong">
                      <h3>Strong <span>60% - 80%</span></h3>
                      {strategySummaryCategories.strong.length > 0 ? (
                        <ul>
                          {strategySummaryCategories.strong.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>

                    <article className="final-summary-card verystrong">
                      <h3>Very Strong <span>80% - 100%</span></h3>
                      {strategySummaryCategories.veryStrong.length > 0 ? (
                        <ul>
                          {strategySummaryCategories.veryStrong.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="empty-space">None in this tier</div>
                      )}
                    </article>
                  </div>
                )}
              </section>
            )}

            {/* Panel 3: Compare Competitor */}
            {activeTab === "compare" && (
              <section className="final-panel">
                <h2 className="final-panel-heading">Compare Competitor</h2>
                <p className="final-subheading">Full Length Test Benchmark</p>

                <div className="final-compare-stats">
                  <article className="final-compare-stat">
                    <h3>Correct</h3>
                    <p>You <b>{correctCount}</b></p>
                    <p>Others <b>0</b></p>
                    <p>Toppers <b>0</b></p>
                  </article>
                  <article className="final-compare-stat">
                    <h3>Incorrect</h3>
                    <p>You <b>{incorrectCount}</b></p>
                    <p>Others <b>0</b></p>
                    <p>Toppers <b>0</b></p>
                  </article>
                  <article className="final-compare-stat">
                    <h3>Skip</h3>
                    <p>You <b>{unattemptedCount}</b></p>
                    <p>Others <b>0</b></p>
                    <p>Toppers <b>0</b></p>
                  </article>
                  <article className="final-compare-stat">
                    <h3>Accuracy</h3>
                    <p>You <b>{Math.round(accuracy)}%</b></p>
                    <p>Others <b>0%</b></p>
                    <p>Toppers <b>0%</b></p>
                  </article>
                </div>

                <div className="final-subtabs">
                  <button
                    type="button"
                    onClick={() => setCompareSubTab("sub")}
                    className={`final-subtab ${compareSubTab === "sub" ? "active" : ""}`}
                  >
                    SUB WISE
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompareSubTab("strategy")}
                    className={`final-subtab ${compareSubTab === "strategy" ? "active" : ""}`}
                  >
                    STRATEGY WISE
                  </button>
                </div>

                <div className="final-subject-grid">
                  {compareSubTab === "sub" ? (
                    Array.from(subjectBreakdown.map.entries()).map(([sub, stat], i) => {
                      const userPct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                      return (
                        <article key={i} className="final-subject-card">
                          <h4>{sub}</h4>
                          <div className="final-subject-bars">
                            <div className="final-mini-bar" title="You">
                              <span style={{ width: `${userPct}%` }} />
                            </div>
                            <div className="final-mini-bar" title="Average">
                              <span style={{ width: `0%` }} />
                            </div>
                            <div className="final-mini-bar" title="Toppers">
                              <span style={{ width: `0%` }} />
                            </div>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    strategyStats.data.map((st, i) => {
                      const youPct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
                      return (
                        <article key={i} className="final-subject-card">
                          <h4>{st.label}</h4>
                          <div className="final-subject-bars">
                            <div className="final-mini-bar" title="You">
                              <span style={{ width: `${youPct}%` }} />
                            </div>
                            <div className="final-mini-bar" title="Average">
                              <span style={{ width: `0%` }} />
                            </div>
                            <div className="final-mini-bar" title="Toppers">
                              <span style={{ width: `0%` }} />
                            </div>
                          </div>
                        </article>
                      );
                    })
                  )}
                </div>
              </section>
            )}

            {/* Panel 4: Elimination Skill Report */}
            {activeTab === "elimination" && (
              <section className="final-panel">
                <h2 className="final-panel-heading">Elimination Skill Report</h2>
                <p className="final-subheading">Evaluates your option-elimination tactics</p>

                <div className="final-subtabs">
                  <button
                    type="button"
                    onClick={() => setEliminationSubTab("fiftyFifty")}
                    className={`final-subtab ${eliminationSubTab === "fiftyFifty" ? "active" : ""}`}
                  >
                    50 - 50 ELIMINATION
                  </button>
                  <button
                    type="button"
                    onClick={() => setEliminationSubTab("oneEliminate")}
                    className={`final-subtab ${eliminationSubTab === "oneEliminate" ? "active" : ""}`}
                  >
                    1-OPT ELIMINATE
                  </button>
                </div>

                <div className="final-gauge-row">
                  {/* Gauge 1: Elimination Accuracy */}
                  <article className="final-gauge-card">
                    <div className="final-svg-gauge-wrap">
                      <svg viewBox="0 0 160 95">
                        <path
                          d="M 18 85 A 62 62 0 0 1 142 85"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 18 85 A 62 62 0 0 1 142 85"
                          fill="none"
                          stroke="#124699"
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeDasharray="195"
                          strokeDashoffset={195 - (195 * Math.min(100, Math.max(0, activeElimData.correctPercentage))) / 100}
                          style={{ transition: "stroke-dashoffset 0.6s ease" }}
                        />
                        <text
                          x="80"
                          y="80"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="26"
                          fontWeight="800"
                        >
                          {activeElimData.correctPercentage}%
                        </text>
                      </svg>
                    </div>
                    <span className="final-gauge-count">
                      {activeElimData.safeCount} / {activeElimData.totalQuestions} questions safe
                    </span>
                    <p>Your Correct Elimination Accuracy</p>
                  </article>

                  {/* Gauge 2: Right Answer Accuracy After Elimination */}
                  <article className="final-gauge-card orange">
                    <div className="final-svg-gauge-wrap">
                      <svg viewBox="0 0 160 95">
                        <path
                          d="M 18 85 A 62 62 0 0 1 142 85"
                          fill="none"
                          stroke="#ffedd5"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 18 85 A 62 62 0 0 1 142 85"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeDasharray="195"
                          strokeDashoffset={195 - (195 * Math.min(100, Math.max(0, activeElimData.rightAnswerPercentage))) / 100}
                          style={{ transition: "stroke-dashoffset 0.6s ease" }}
                        />
                        <text
                          x="80"
                          y="80"
                          textAnchor="middle"
                          fill="#c2410c"
                          fontSize="26"
                          fontWeight="800"
                        >
                          {activeElimData.rightAnswerPercentage}%
                        </text>
                      </svg>
                    </div>
                    <span className="final-gauge-count">
                      {activeElimData.rightAnswerCount} / {activeElimData.totalQuestions} right
                    </span>
                    <p>Right Answer Accuracy After Elimination</p>
                  </article>

                  {/* Strategy-Wise Dual Column Chart */}
                  <div className="final-chart-box">
                    <div className="final-chart-header">
                      <h3>Strategy-wise elimination impact</h3>
                      <div className="final-chart-legend">
                        <span className="legend-item"><span className="legend-dot blue" /> Elim. Acc.</span>
                        <span className="legend-item"><span className="legend-dot orange" /> Right Ans.</span>
                      </div>
                    </div>

                    <div className="final-chart-metrics-strip">
                      <div className="metric-chip emerald">
                        <small>Attempted</small>
                        <strong>{activeElimData.totalQuestions}</strong>
                      </div>
                      <div className="metric-chip sky">
                        <small>Crossed</small>
                        <strong>{activeElimData.totalOptionsCrossed}</strong>
                      </div>
                      <div className="metric-chip amber">
                        <small>Marks Saved</small>
                        <strong>+{activeElimData.marksSaved}</strong>
                      </div>
                    </div>

                    {/* Dual-bar columns */}
                    <div className="final-dual-bar-chart">
                      {activeElimData.strategies.map((strat) => (
                        <div key={strat.key} className="final-strategy-col">
                          <div className="final-bars-pair">
                            {/* Blue Bar: Elimination Accuracy */}
                            <div className="final-vbar-wrap" title={`Elimination Accuracy: ${strat.elimAccuracy}%`}>
                              {strat.total > 0 && <span className="vbar-label">{strat.elimAccuracy}%</span>}
                              <div
                                className="final-vbar blue"
                                style={{ height: strat.total > 0 ? `${Math.max(8, strat.elimAccuracy)}%` : "4px" }}
                              />
                            </div>
                            {/* Orange Bar: Right Answer Accuracy */}
                            <div className="final-vbar-wrap" title={`Right Answer Accuracy: ${strat.rightAnswerAccuracy}%`}>
                              {strat.total > 0 && <span className="vbar-label">{strat.rightAnswerAccuracy}%</span>}
                              <div
                                className="final-vbar orange"
                                style={{ height: strat.total > 0 ? `${Math.max(8, strat.rightAnswerAccuracy)}%` : "4px" }}
                              />
                            </div>
                          </div>
                          <div className="final-strat-meta">
                            <span className="final-strat-label">{strat.label}</span>
                            <span className="final-strat-sub">{strat.correct}/{strat.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {activeElimData.totalQuestions === 0 && (
                      <div className="final-elim-tip-card">
                        <span className="tip-badge">💡</span>
                        <p>
                          No {eliminationSubTab === "fiftyFifty" ? "50-50" : "1-Opt"} options were eliminated in this test.
                          During mock tests, click the strike-through icon (✕) on uncertain choices to track your elimination accuracy here!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Panel 5: View Solution */}
            {activeTab === "solution" && (
              <section id="solution-panel-anchor" className="final-panel">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="final-panel-heading">View Solution &amp; Explanations</h2>
                    <p className="final-subheading">Comprehensive UPSC Prelims standard explanations &amp; elimination rationale</p>
                  </div>

                  {/* Language Toggle */}
                  <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-2xs self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setViewLang("englishQuestion")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        viewLang === "englishQuestion"
                          ? "bg-[#124699] text-white shadow-xs"
                          : "text-gray-600 hover:text-[#124699]"
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewLang("hindiQuestion")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        viewLang === "hindiQuestion"
                          ? "bg-[#124699] text-white shadow-xs"
                          : "text-gray-600 hover:text-[#124699]"
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <div className="final-solution-card">
                  <h3>Full Test Solution Guide</h3>
                  <p>
                    Review each statement, understand why options were eliminated, and see the verified UPSC CSE Prelims standard rationale.
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSolutionFilter("all")}
                      className={`text-xs px-3 py-1 rounded-full font-bold border transition ${
                        solutionFilter === "all"
                          ? "bg-[#124699] text-white border-[#124699]"
                          : "bg-white text-[#475569] border-[#CBD5E1]"
                      }`}
                    >
                      All ({totalQuestions})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSolutionFilter("correct")}
                      className={`text-xs px-3 py-1 rounded-full font-bold border transition ${
                        solutionFilter === "correct"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-emerald-700 border-emerald-300"
                      }`}
                    >
                      Correct ({correctCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSolutionFilter("incorrect")}
                      className={`text-xs px-3 py-1 rounded-full font-bold border transition ${
                        solutionFilter === "incorrect"
                          ? "bg-rose-600 text-white border-rose-600"
                          : "bg-white text-rose-700 border-rose-300"
                      }`}
                    >
                      Incorrect ({incorrectCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSolutionFilter("skipped")}
                      className={`text-xs px-3 py-1 rounded-full font-bold border transition ${
                        solutionFilter === "skipped"
                          ? "bg-slate-600 text-white border-slate-600"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      Skipped ({unattemptedCount})
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("mistakemap")}
                      className="ml-auto text-xs px-3 py-1 rounded-full font-bold border border-[#b9cdf1] bg-[#edf3ff] text-[#124699] hover:bg-[#dce8fe] flex items-center gap-1.5 transition cursor-pointer"
                      title="View diagnostic Mistake Map Report"
                    >
                      <span>🗺 Mistake Map Report</span>
                      <span className="bg-white text-[#124699] text-[10px] px-1.5 py-0.5 rounded-full font-extrabold shadow-xs">
                        {mistakeMapStats.mappedCount}/{mistakeMapStats.totalIncorrect}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Question List */}
                <div className="space-y-5">
                  {filteredSolutions.map((item) => {
                    const q = item.question;
                    const ans = item.ans;
                    const isRight = item.status === "correct";
                    const isIncorrect = item.status === "incorrect";

                    // Language specific content
                    const content = (q as any)?.[viewLang] || q.englishQuestion || q.hindiQuestion || {};
                    const qText = content.question || q.question || "";
                    const statements: any[] = content.statementQuestion || [];
                    const pairs: any[] = content.pairQuestion || [];
                    const lastQuestion = content.lastQuestion;
                    const correctAns = getCorrectAnswer(q);
                    const solutionText =
                      content.solution ||
                      q.englishQuestion?.solution ||
                      q.hindiQuestion?.solution ||
                      q.solution ||
                      q.explanation;

                    const subjectBadge = getSubjectName(q);

                    return (
                      <div
                        key={item.index}
                        className={`rounded-2xl border p-4 sm:p-6 transition shadow-xs ${
                          isRight
                            ? "border-emerald-300 bg-emerald-50/20"
                            : isIncorrect
                            ? "border-rose-300 bg-rose-50/20"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        {/* Header Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200/80">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-extrabold text-sm sm:text-base text-[#124699]">
                              Question {item.index + 1}
                            </span>
                            <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-[11px] font-bold text-[#124699]">
                              {subjectBadge}
                            </span>
                            {(q.subtopic || (q as any).subtopicId) && (
                              <span className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                                {typeof q.subtopic === "object"
                                  ? q.subtopic?.name
                                  : q.subtopic || (typeof (q as any).subtopicId === "object" ? (q as any).subtopicId?.name : (q as any).subtopicId)}
                              </span>
                            )}
                            {q.title && (
                              <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                                {q.title}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full ${
                                isRight
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : isIncorrect
                                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                                  : "bg-slate-100 text-slate-700 border border-slate-300"
                              }`}
                            >
                              {isRight ? "✓ Correct" : isIncorrect ? "✕ Incorrect" : "○ Skipped"}
                            </span>
                            <span className="text-xs font-bold text-[#64748B]">
                              {isRight ? "+2.0" : isIncorrect ? "-0.67" : "0.0"} Marks
                            </span>
                          </div>
                        </div>

                        {/* Clone Reference Callout if present */}
                        {q.cloneOf && (
                          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs text-purple-900 shadow-2xs">
                            <span className="font-extrabold text-purple-700">Clone Reference:</span>
                            <span>{q.cloneOf}</span>
                          </div>
                        )}

                        {/* Question Text */}
                        <div className="mt-3 text-sm sm:text-base font-semibold text-[#0F172A] leading-relaxed">
                          {isImage(qText) ? (
                            <img src={qText} alt="Question" className="max-h-64 object-contain rounded-lg" />
                          ) : (
                            <p className="whitespace-pre-wrap">{qText}</p>
                          )}
                        </div>

                        {/* Statements (if any) */}
                        {statements && statements.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {statements.map((stmt, sIdx) => {
                              const sText = typeof stmt === "string" ? stmt : stmt.combined || stmt.statement || "";
                              return (
                                <div
                                  key={sIdx}
                                  className="flex items-start gap-2.5 rounded-xl border border-gray-200/80 bg-white/90 p-2.5 text-xs sm:text-sm font-medium text-[#1E293B]"
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#124699]">
                                    {sIdx + 1}
                                  </span>
                                  <span className="flex-1 whitespace-pre-wrap leading-relaxed">{sText}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Pairs (if any) */}
                        {pairs && pairs.length > 0 && (
                          <div className="mt-3 space-y-1.5">
                            {pairs.map((pair, pIdx) => {
                              const pText = typeof pair === "string" ? pair : pair.combined || "";
                              return (
                                <div
                                  key={pIdx}
                                  className="rounded-lg bg-gray-50 border border-gray-200 p-2 text-xs sm:text-sm font-medium text-gray-800"
                                >
                                  {pText}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Last Question Prompt */}
                        {lastQuestion && (
                          <p className="mt-3 text-xs sm:text-sm font-bold text-[#334155] italic">
                            {lastQuestion}
                          </p>
                        )}

                        {/* Options */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(["A", "B", "C", "D"] as const).map((optKey) => {
                            const optText =
                              (content?.options as any)?.[optKey] ||
                              (q.englishQuestion?.options as any)?.[optKey] ||
                              (q.options as any)?.[optKey];
                            if (!optText) return null;

                            const isUserSelected = ans?.selectedOption === optKey;
                            const isCorrectOpt = correctAns === optKey;

                            let optBorder = "border-gray-200 bg-white text-gray-800";
                            if (isCorrectOpt) {
                              optBorder = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold shadow-xs";
                            } else if (isUserSelected && !isRight) {
                              optBorder = "border-rose-500 bg-rose-50/90 text-rose-950 line-through";
                            }

                            return (
                              <div
                                key={optKey}
                                className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs sm:text-sm transition ${optBorder}`}
                              >
                                <span className="font-mono font-bold flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black/5">
                                  {optKey}
                                </span>
                                <div className="flex-1 min-w-0 break-words leading-relaxed">
                                  {isImage(optText) ? (
                                    <img src={optText} alt={`Option ${optKey}`} className="max-h-20 object-contain" />
                                  ) : (
                                    <span>{optText}</span>
                                  )}
                                </div>
                                {isCorrectOpt && (
                                  <span className="shrink-0 rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-extrabold text-white">
                                    ✓ Correct
                                  </span>
                                )}
                                {isUserSelected && !isCorrectOpt && (
                                  <span className="shrink-0 rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-extrabold text-white">
                                    ✕ Your Ans
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Solution Box */}
                        <FormattedSolution
                          solution={solutionText}
                          correctAnswer={correctAns}
                          className="mt-4"
                        />

                        {/* Why False Reason Tagging (Mistake Mapping) */}
                        {isIncorrect && (
                          <div className="mt-3.5 rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                                <span>🗺️</span> Why False Reason (Mistake Mapping):
                              </span>
                              {userMistakeMap[item.index] && (
                                <span className="text-[11px] font-semibold text-rose-800 bg-white px-2 py-0.5 rounded-md border border-rose-200 shadow-xs">
                                  Current: {MISTAKE_CATEGORIES.find((c) => c.key === userMistakeMap[item.index])?.title}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {MISTAKE_CATEGORIES.map((cat) => {
                                const isSelected = userMistakeMap[item.index] === cat.key;
                                return (
                                  <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => {
                                      setUserMistakeMap((prev) => ({
                                        ...prev,
                                        [item.index]: cat.key,
                                      }));
                                    }}
                                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-[#124699] text-white border-[#124699] shadow-sm font-bold scale-[1.02]"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                    }`}
                                  >
                                    {isSelected ? "✓ " : ""}{cat.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleEnrollWithDiscount}
                    className="final-btn-explore"
                  >
                    <span>Explore Courses &amp; Offers for Last Prelims →</span>
                  </button>
                </div>
              </section>
            )}

            {/* Panel 6: Mistake Map Report (matching BEF_APP_WEB) */}
            {activeTab === "mistakemap" && (
              <section className="final-panel">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                  <div>
                    <h2 className="final-panel-heading">Mistake Map Report</h2>
                    <p className="final-subheading mb-1">
                      Categorize your incorrect attempts to identify and overcome preparation blind spots
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSolutionFilter("incorrect");
                      setActiveTab("solution");
                    }}
                    className="self-start sm:self-auto text-xs font-bold text-[#124699] bg-[#edf3ff] hover:bg-[#dce8fe] px-3.5 py-2 rounded-lg border border-[#b9cdf1] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Tag Mistakes in View Solution</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Instructional Notice Banner */}
                <div className="mistake-notice-banner">
                  <span className="mistake-notice-icon">💡</span>
                  <div className="mistake-notice-text">
                    Please first select the <strong>Why False</strong> reason for each incorrect question in the <strong>View Solution</strong> tab. Your categorization automatically groups questions into the diagnostic zones below.
                  </div>
                </div>

                {/* 3 Metric Overview Cards (matching BEF_APP_WEB) */}
                <div className="mistake-overview-grid">
                  <div className="mistake-overview-card">
                    <div className="mistake-overview-bar" />
                    <div className="mistake-overview-img-wrap">
                      <img
                        className="mistake-overview-img"
                        src="/assets/images/mistakeMap/Incorrect.png"
                        alt="Total Incorrect"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="mistake-overview-content">
                      <div className="mistake-overview-label">Total Incorrect</div>
                      <div className="mistake-overview-val">{mistakeMapStats.totalIncorrect}</div>
                      <div className="mistake-overview-sub">Review &amp; tag in solutions</div>
                    </div>
                  </div>

                  <div className="mistake-overview-card">
                    <div className="mistake-overview-bar" />
                    <div className="mistake-overview-img-wrap">
                      <img
                        className="mistake-overview-img"
                        src="/assets/images/mistakeMap/Fear-driver-skip-incorrect.png"
                        alt="Fear Driver Skip"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="mistake-overview-content">
                      <div className="mistake-overview-label">Total Fear Driver Skip Incorrect</div>
                      <div className="mistake-overview-val">{mistakeMapStats.totalFearDriverSkip}</div>
                      <div className="mistake-overview-sub">Questions skipped due to doubt</div>
                    </div>
                  </div>

                  <div className="mistake-overview-card">
                    <div className="mistake-overview-bar" />
                    <div className="mistake-overview-img-wrap">
                      <img
                        className="mistake-overview-img"
                        src="/assets/images/mistakeMap/MistakeMapped.png"
                        alt="Mistakes Mapped"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="mistake-overview-content">
                      <div className="mistake-overview-label">Mistakes Mapped</div>
                      <div className="mistake-overview-val">
                        {mistakeMapStats.mappedCount} / {mistakeMapStats.totalIncorrect}
                      </div>
                      <div className="mistake-overview-sub">
                        {mistakeMapStats.totalIncorrect > 0
                          ? Math.round((mistakeMapStats.mappedCount / mistakeMapStats.totalIncorrect) * 100)
                          : 100}% categorized
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Question Mistake Classification */}
                {incorrectQuestions.length > 0 && (
                  <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
                          <span>🗺️</span> Categorize Your Incorrect Questions ({mistakeMapStats.mappedCount}/{incorrectQuestions.length} Mapped)
                        </h3>
                        <p className="text-xs text-gray-500">
                          Select the reason for each mistake below to update your diagnostic counters in real time:
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {incorrectQuestions.map((item) => {
                        const qNum = item.index + 1;
                        const assignedCat = userMistakeMap[item.index];
                        const qText = item.question.englishQuestion?.question || item.question.question || `Question ${qNum}`;
                        const snippet = qText.length > 120 ? qText.slice(0, 120) + "..." : qText;

                        return (
                          <div
                            key={item.index}
                            className={`p-3 rounded-lg border transition ${
                              assignedCat ? "bg-gray-50 border-gray-200" : "bg-rose-50/40 border-rose-200"
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="text-xs font-semibold text-gray-800">
                                <span className="font-bold text-[#124699] mr-2">Q{qNum}:</span>
                                <span className="text-gray-600 font-normal">{snippet}</span>
                              </div>
                              {assignedCat && (
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  ✓ {MISTAKE_CATEGORIES.find((c) => c.key === assignedCat)?.title}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {MISTAKE_CATEGORIES.map((cat) => {
                                const isSelected = assignedCat === cat.key;
                                return (
                                  <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => {
                                      setUserMistakeMap((prev) => ({
                                        ...prev,
                                        [item.index]: cat.key,
                                      }));
                                    }}
                                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-[#124699] text-white border-[#124699] shadow-xs font-bold"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                    }`}
                                  >
                                    {isSelected ? "✓ " : ""}{cat.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5 Mistake Categories Grid */}
                <div className="mistake-categories-grid">
                  {MISTAKE_CATEGORIES.map((cat) => {
                    const data = mistakeMapStats.categories[cat.key];
                    const subtopicEntries = Object.entries(data?.subtopics || {});

                    return (
                      <div key={cat.key} className="mistake-cat-card">
                        <div
                          className="mistake-cat-header"
                          style={{ backgroundColor: cat.color }}
                        >
                          <span className="mistake-cat-title">{cat.title}</span>
                          <span className="mistake-cat-count">{data?.total || 0}</span>
                        </div>
                        <div className="mistake-cat-body">
                          <p className="mistake-cat-desc">{cat.desc}</p>
                          <ul className="mistake-subtopic-list">
                            {subtopicEntries.map(([subtopic, count]) => (
                              <li key={subtopic} className="mistake-subtopic-item">
                                <span className="mistake-subtopic-name" title={subtopic}>
                                  {subtopic}
                                </span>
                                <span className="mistake-subtopic-badge">{count}</span>
                              </li>
                            ))}

                            {subtopicEntries.length === 0 && (
                              <li className="mistake-empty-state">
                                <span>✓</span>
                                <p>No questions categorized here yet</p>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSolutionFilter("incorrect");
                      setActiveTab("solution");
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-[#124699] text-white hover:bg-[#0e377a] transition-colors text-center cursor-pointer shadow-sm"
                  >
                    Tag or Change Mistake Reasons in View Solution →
                  </button>
                  <button
                    type="button"
                    onClick={handleEnrollWithDiscount}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-colors text-center cursor-pointer shadow-sm"
                  >
                    Explore Courses &amp; Offers for Last Prelims →
                  </button>
                </div>
              </section>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FinalReportScreen;
