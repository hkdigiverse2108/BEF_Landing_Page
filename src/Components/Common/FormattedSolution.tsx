import React from "react";
import {
  LuCheck,
  LuBookOpen,
  LuZap,
  LuLayers,
  LuGlobe,
  LuLightbulb,
} from "react-icons/lu";

interface FormattedSolutionProps {
  solution?: any;
  correctAnswer?: string;
  className?: string;
}

const extractSolutionText = (val: any): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    if (typeof val.combined === "string") return val.combined;
    if (typeof val.text === "string") return val.text;
    if (typeof val.solution === "string") return val.solution;
    if (Array.isArray(val)) return val.map(extractSolutionText).join("\n");
  }
  return String(val);
};

// Inline parser for bold (**text**), italics (*text*), and code (`text`)
const renderFormattedInline = (text: string) => {
  // Regex matches **bold**, *italic*, `code`
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-[#0F172A]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-[#1E293B]">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-[#124699]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

interface SectionBlock {
  type: "detailed" | "technique" | "otherOptions" | "currentAffairs" | "general";
  title: string;
  lines: string[];
}

export const FormattedSolution: React.FC<FormattedSolutionProps> = ({
  solution,
  correctAnswer,
  className = "",
}) => {
  const rawText = extractSolutionText(solution);
  if (!rawText || !rawText.trim()) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/70 p-4 text-xs text-gray-500">
        Detailed solution is currently being updated for this question according to official UPSC answer keys.
      </div>
    );
  }

  const cleanSolution = rawText.trim();

  // Segment text into sections if headers like #### 1., #### 2., etc. exist
  const parseSections = (text: string): SectionBlock[] => {
    const rawLines = text.split("\n");
    const sections: SectionBlock[] = [];
    let currentBlock: SectionBlock = {
      type: "general",
      title: "Detailed Explanation",
      lines: [],
    };

    const headerRegex =
      /^(?:#{1,4}\s*)?(?:(?:\*{1,2})?\s*([1-4])\.\s*(.*?)(?:\*{1,2})?)$/i;

    rawLines.forEach((line) => {
      const trimmed = line.trim();
      const match = trimmed.match(headerRegex);

      if (match) {
        const num = match[1];
        const restTitle = match[2]?.replace(/[#*]/g, "").trim() || "";

        let secType: SectionBlock["type"] = "general";
        if (num === "1" || /detailed|समाधान|solution/i.test(restTitle)) {
          secType = "detailed";
        } else if (num === "2" || /technique|aptitude|योग्यता|method/i.test(restTitle)) {
          secType = "technique";
        } else if (num === "3" || /other options|विकल्पों का विश्लेषण|options/i.test(restTitle)) {
          secType = "otherOptions";
        } else if (num === "4" || /current affairs|समसामयिक/i.test(restTitle)) {
          secType = "currentAffairs";
        }

        // Push previous block if it has content
        if (currentBlock.lines.length > 0) {
          sections.push(currentBlock);
        }

        currentBlock = {
          type: secType,
          title: restTitle ? `${num}. ${restTitle}` : trimmed.replace(/[#*]/g, "").trim(),
          lines: [],
        };
      } else {
        currentBlock.lines.push(line);
      }
    });

    if (currentBlock.lines.length > 0) {
      sections.push(currentBlock);
    }

    return sections;
  };

  const sections = parseSections(cleanSolution);

  const getSectionTheme = (type: SectionBlock["type"]) => {
    switch (type) {
      case "detailed":
        return {
          icon: LuBookOpen,
          badgeBg: "bg-blue-100 text-[#124699] border-blue-200",
          cardBorder: "border-blue-200",
          cardBg: "bg-blue-50/30",
          accentColor: "text-[#124699]",
        };
      case "technique":
        return {
          icon: LuZap,
          badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
          cardBorder: "border-amber-300",
          cardBg: "bg-amber-50/40",
          accentColor: "text-amber-800",
        };
      case "otherOptions":
        return {
          icon: LuLayers,
          badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
          cardBorder: "border-slate-200",
          cardBg: "bg-slate-50/50",
          accentColor: "text-slate-800",
        };
      case "currentAffairs":
        return {
          icon: LuGlobe,
          badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          cardBorder: "border-emerald-200",
          cardBg: "bg-emerald-50/40",
          accentColor: "text-emerald-800",
        };
      default:
        return {
          icon: LuLightbulb,
          badgeBg: "bg-blue-100 text-[#124699] border-blue-200",
          cardBorder: "border-blue-200",
          cardBg: "bg-white",
          accentColor: "text-[#124699]",
        };
    }
  };

  const renderLines = (lines: string[]) => {
    const rawContent = lines.join("\n").trim();
    const paragraphs = rawContent.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

    return (
      <div className="space-y-3 text-xs sm:text-sm text-[#1F2937] leading-relaxed">
        {paragraphs.map((p, pIdx) => {
          const trimmed = p.trim();

          // Sub-headings like **Why (c) is correct** or **Facts to remember** or **Study next:**
          if (
            trimmed.startsWith("**Why ") ||
            trimmed.startsWith("**Facts ") ||
            trimmed.startsWith("**Study ") ||
            trimmed.startsWith("**Rule:") ||
            trimmed.startsWith("**Mark the parts") ||
            trimmed.startsWith("**Must-know") ||
            trimmed.startsWith("**Background:") ||
            trimmed.startsWith("***UPSC twists")
          ) {
            return (
              <div
                key={pIdx}
                className="mt-2.5 rounded-lg border border-slate-200 bg-white/90 px-3 py-1.5 font-bold text-xs sm:text-sm text-[#124699] shadow-2xs inline-block"
              >
                {renderFormattedInline(trimmed)}
              </div>
            );
          }

          // Bullet list block (lines starting with * or -)
          const pLines = trimmed.split("\n");
          const isAllBullets = pLines.every(
            (l) => l.trim().startsWith("* ") || l.trim().startsWith("- ")
          );

          if (isAllBullets) {
            return (
              <ul key={pIdx} className="space-y-1.5 pl-1">
                {pLines.map((bulletLine, bIdx) => {
                  const bulletText = bulletLine
                    .trim()
                    .replace(/^[*•-]\s*/, "");
                  return (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F2937] leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F48224]" />
                      <span className="flex-1 min-w-0">
                        {renderFormattedInline(bulletText)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          // Standard paragraph
          return (
            <p key={pIdx} className="whitespace-pre-wrap leading-relaxed">
              {renderFormattedInline(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border border-blue-200/90 bg-[#F8FAFC] p-4 sm:p-6 shadow-xs transition-all ${className}`}
    >
      {/* Solution Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-blue-200/60">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#124699] text-white text-sm shadow-xs">
            <LuBookOpen className="text-sm" />
          </span>
          <span className="font-heading text-sm sm:text-base font-extrabold text-[#124699]">
            Detailed Solution &amp; Elimination Rationale
          </span>
        </div>

        {correctAnswer && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A] px-3.5 py-1 text-xs font-black text-white shadow-2xs">
            <LuCheck className="text-sm" /> Correct Option: {correctAnswer.toUpperCase()}
          </span>
        )}
      </div>

      {/* Render structured section cards */}
      <div className="space-y-4">
        {sections.map((sec, sIdx) => {
          const theme = getSectionTheme(sec.type);
          const Icon = theme.icon;

          return (
            <div
              key={sIdx}
              className={`rounded-xl border p-4 sm:p-5 shadow-2xs transition-all ${theme.cardBorder} ${theme.cardBg}`}
            >
              {/* Section Header with Icon */}
              <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-black/5">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs ${theme.badgeBg}`}
                >
                  <Icon className="text-xs" />
                </span>
                <h4 className={`font-heading font-extrabold text-xs sm:text-sm tracking-tight ${theme.accentColor}`}>
                  {sec.title}
                </h4>
              </div>

              {/* Section Content */}
              {renderLines(sec.lines)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormattedSolution;
