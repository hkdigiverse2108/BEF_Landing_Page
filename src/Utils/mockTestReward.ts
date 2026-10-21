export interface MockTestReward {
  score: number;
  totalMarks: number;
  scoreDiscount: number;
  active: boolean;
  timestamp: number;
}

const STORAGE_KEY = "ACHIWON_MOCK_TEST_SCORE_DISCOUNT";

export const saveMockTestReward = (reward: MockTestReward) => {
  try {
    const serialized = JSON.stringify(reward);
    localStorage.setItem(STORAGE_KEY, serialized);
    sessionStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error("Failed to save mock test reward", e);
  }
};

export const getMockTestReward = (): MockTestReward | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.active || !parsed.scoreDiscount) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const clearMockTestReward = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
};

export interface DiscountTier {
  minScore: number;
  maxScore: number;
  discount?: number;
  scoreDiscount?: number;
}

/**
 * Returns the score discount amount matched from settings.
 *
 * Rules:
 * 1. If score is <= 0 (including negative marks) or < 0.50 (e.g. 0.49),
 *    it is counted as 0 score, and receives the discount defined for 0 (e.g. tier 0 to 0).
 * 2. If score is >= 0.50, it is rounded to 1 (0.50 -> 1, 1.33 -> 1, 1.50 -> 2, etc.) and
 *    receives the corresponding range tier discount (e.g. 1 to 4).
 * 3. Returns 0 if tiers are empty, not set, or no range matches.
 */
export const matchScoreDiscount = (score: number, tiers?: DiscountTier[]): number => {
  if (!Array.isArray(tiers) || tiers.length === 0) {
    return 0;
  }

  // Threshold & Rounding:
  // - 0.49 or lower (including 0 and negative numbers) counts as 0
  // - 0.50 or higher counts as 1 (or rounded to the nearest integer)
  const effectiveScore = score < 0.5 ? 0 : Math.round(score);

  const matched = tiers.find((t) => {
    const min = Number(t.minScore);
    const max = Number(t.maxScore);

    if (effectiveScore === 0) {
      return (min <= 0 && max >= 0) || (min === 0 && max === 0);
    }
    return effectiveScore >= min && effectiveScore <= max;
  });

  if (!matched) {
    // Fallback: if score is 0, check if there's any tier with minScore <= 0
    if (effectiveScore === 0) {
      const zeroTier = tiers.find((t) => Number(t.minScore) <= 0);
      if (zeroTier) {
        return Number(zeroTier.discount ?? zeroTier.scoreDiscount) || 0;
      }
    }
    return 0;
  }

  return Number(matched.discount ?? matched.scoreDiscount) || 0;
};

/**
 * Checks whether a course is the 'LAST PRELIMS' course that is eligible
 * for the Free Mock Test score merit discount.
 */
export const isLastPrelimsCourse = (course?: { title?: string; _id?: string } | null): boolean => {
  if (!course) return false;
  const t = (course.title || "").toLowerCase();
  const id = String(course._id || "").toLowerCase();
  return (
    t.includes("last prelims") ||
    (t.includes("last") && t.includes("prelims")) ||
    id === "690ccd4aafdfb3c841183295" ||
    id === "last-prelims"
  );
};
