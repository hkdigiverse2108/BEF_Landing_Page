export interface ReportVideoInfo {
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  points: string[];
}

export const REPORT_VIDEOS: Record<string, ReportVideoInfo> = {
  ai: {
    src: "/videos/report/ai-powered.mp4",
    title: "AI Powered Report Analysis",
    badge: "AI Diagnostic Walkthrough",
    subtitle:
      "Understand how our AI analyzes your performance across 100% Sure, Logic Play, Intuition Hit, and Blind Fire strategies.",
    points: [
      "Break down your attempts into 4 tactical decision-making strategies",
      "Check conversion accuracy for Direct vs 50-50 vs 1-Opt Eliminate",
      "Discover which guessing habit yields high rewards or negative marks",
    ],
  },
  summary: {
    src: "/videos/report/report-summary.mp4",
    title: "Performance Summary",
    badge: "Summary Report Walkthrough",
    subtitle:
      "Discover your strongest and weakest topics with automated percentage categorization from Very Weak to Very Strong.",
    points: [
      "Filter performance across Sub-Wise and Strategy-Wise breakdowns",
      "Spot accuracy bottlenecks in high-weightage Prelims subjects",
      "Receive tailored direction for subsequent revision cycles",
    ],
  },
  compare: {
    src: "/videos/report/compare-competitor.mp4",
    title: "Compare with Competitors",
    badge: "Peer Benchmark Walkthrough",
    subtitle:
      "Benchmark your scores, question pacing, and elimination tactics directly against top scorers and peer averages.",
    points: [
      "Side-by-side accuracy comparison with top test performers",
      "Identify where competitors gained an advantage over your score",
      "Calibrate your speed vs risk appetite for competitive edge",
    ],
  },
  elimination: {
    src: "/videos/report/elimination-skill-report.mp4",
    title: "Elimination Skill Report",
    badge: "Tactical Skills Walkthrough",
    subtitle:
      "Master the UPSC prelims option elimination technique and elevate your 50-50 decision accuracy.",
    points: [
      "Analyze your hit rate when narrowing questions to two options (50-50)",
      "Evaluate whether 1-Option elimination decisions yielded net marks",
      "Sharpen option elimination discipline to crack tough prelims papers",
    ],
  },
  solution: {
    src: "/videos/report/view-solution.mp4",
    title: "View Solutions & PYQ Clones",
    badge: "4-Layer Solution Walkthrough",
    subtitle:
      "Master the 4-layer explanation model: Core Concepts, MCQ Aptitude Elimination, Option Analysis, and Current Affairs Linkages.",
    points: [
      "Review the question statement-by-statement with detailed explanations",
      "Learn specific aptitude and elimination rules applied by toppers",
      "Explore why each incorrect option is wrong, plus current affairs linkages",
    ],
  },
  mistakemap: {
    src: "/videos/report/mistake-map.mp4",
    title: "Mistake Map Diagnostic",
    badge: "Error Diagnosis Walkthrough",
    subtitle:
      "Classify every mistake into Concept, Elimination, Silly, or Overthinking errors to permanently eliminate repeat blunders.",
    points: [
      "Categorize negative-mark questions into actionable error types",
      "Differentiate between knowledge gap and psychological exam slip-ups",
      "Build disciplined exam-hall habits to preserve precious marks",
    ],
  },
};
