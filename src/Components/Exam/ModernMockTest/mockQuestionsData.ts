export type LanguageKey = "englishQuestion" | "hindiQuestion";

export interface StatementQuestionObject {
  combined: string;
}

export interface PairQuestionObject {
  combined: string;
}

export interface QuestionContent {
  question?: string;
  statementQuestion?: StatementQuestionObject[];
  pairQuestion?: PairQuestionObject[];
  lastQuestion?: string;
  link?: string;
  options?: Record<string, string>; // { A: string; B: string; C: string; D: string; }
  answer?: string; // 'A' | 'B' | 'C' | 'D'
  correctAnswer?: string;
  solution?: string;
  explanation?: string;
}

export interface BackendQuestionItem {
  _id: string;
  questionType?: string; // 'normal' | 'statement' | 'pair' | 'normal-csat' | 'statement-csat' | 'pair-csat'
  type?: string;
  subjectId?: any;
  subject?: any;
  subtopicId?: any;
  subtopic?: any;
  title?: string;
  cloneOf?: string;
  positiveMarks?: number;
  negativeMarks?: number;
  englishQuestion?: QuestionContent;
  hindiQuestion?: QuestionContent;
  // Optional flattened question fields
  question?: string;
  options?: Record<string, string>;
  answer?: string;
  correctAnswer?: string;
  solution?: string;
  explanation?: string;
}

export const isStatementType = (type?: string): boolean => {
  return type === "statement" || type === "statement-csat";
};

export const isPairType = (type?: string): boolean => {
  return type === "pair" || type === "pair-csat";
};

export const isNormalType = (type?: string): boolean => {
  return !isStatementType(type) && !isPairType(type);
};

export {
  type MockTestSet,
  MOCK_TEST_SET_1,
  MOCK_TEST_SETS,
  getRandomMockTestSet,
  getMockTestSetById,
  getActiveSessionMockTestSet,
  resetSessionMockTestSet,
} from "./mockTestSets";

import { MOCK_TEST_SET_1, getRandomMockTestSet } from "./mockTestSets";

/**
 * Standard Curated UPSC Mock Questions from Clone PYQs Free Mock Test
 */
export const FALLBACK_BACKEND_QUESTIONS: BackendQuestionItem[] = MOCK_TEST_SET_1.questions;
export const ALL_SUBJECT_QUESTIONS = FALLBACK_BACKEND_QUESTIONS;

export const getRandomMockQuestions = (count?: number): BackendQuestionItem[] => {
  const active = getRandomMockTestSet();
  if (typeof count === "number" && count > 0) {
    return active.questions.slice(0, count);
  }
  return active.questions;
};


export type MockQuestionItem = BackendQuestionItem;
export interface StatementItem {
  id: number;
  text: string;
}
export interface MockQuestionOption {
  key: string;
  text: string;
}

export const isImage = (value: string = ""): boolean => {
  if (!value) return false;
  try {
    const url = new URL(value);
    const ext = url.pathname.split(".").pop()?.toLowerCase();
    const imageExt = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "svg"];
    return imageExt.includes(ext || "");
  } catch {
    return false;
  }
};
