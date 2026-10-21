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

/**
 * Fallback questions if backend is temporarily unreachable
 */
export const FALLBACK_BACKEND_QUESTIONS: BackendQuestionItem[] = [
  {
    _id: "fb-1",
    questionType: "statement",
    subject: { name: "Indian Polity & Gov." },
    positiveMarks: 2,
    negativeMarks: 0.67,
    englishQuestion: {
      question: "The Supreme Court has increased the ambit of the Right to Life (Article 21) to include which of the following?",
      statementQuestion: [
        { combined: "1. Right to life includes the right to live with human dignity." },
        { combined: "2. Right to life includes the right to livelihood." },
        { combined: "3. Right to life includes the right to receive minimum wages." },
        { combined: "4. Right to life includes guaranteed employment for 100 days under MGNREGA." },
      ],
      lastQuestion: "Select the correct answer using the code given below:",
      options: {
        A: "Only 4",
        B: "1 and 2 only",
        C: "1, 2 and 3 only",
        D: "1, 2, 3 and 4",
      },
      answer: "C",
      solution: "Right to Life under Article 21 includes dignity, livelihood, and clean environment. Guaranteed 100 days employment is a statutory entitlement under MGNREGA, not a fundamental right under Article 21.",
    },
    hindiQuestion: {
      question: "सर्वोच्च न्यायालय ने जीवन के अधिकार (अनुच्छेद 21) के दायरे में निम्नलिखित में से किसे शामिल किया है?",
      statementQuestion: [
        { combined: "1. जीवन के अधिकार में मानवीय गरिमा के साथ जीने का अधिकार शामिल है।" },
        { combined: "2. जीवन के अधिकार में आजीविका का अधिकार शामिल है।" },
        { combined: "3. जीवन के अधिकार में न्यूनतम मजदूरी प्राप्त करने का अधिकार शामिल है।" },
        { combined: "4. मनरेगा के तहत 100 दिनों के गारंटीकृत रोजगार का अधिकार।" },
      ],
      lastQuestion: "नीचे दिए गए कूट का प्रयोग कर सही उत्तर चुनिए:",
      options: {
        A: "केवल 4",
        B: "केवल 1 और 2",
        C: "केवल 1, 2 और 3",
        D: "1, 2, 3 और 4",
      },
      answer: "C",
      solution: "अनुच्छेद 21 के तहत जीवन के अधिकार में गरिमा और आजीविका शामिल है, जबकि मनरेगा एक वैधानिक अधिकार है, मौलिक अधिकार नहीं।",
    },
  },
  {
    _id: "fb-2",
    questionType: "normal",
    subject: { name: "Ancient & Medieval History" },
    positiveMarks: 2,
    negativeMarks: 0.67,
    englishQuestion: {
      question: "Who among the following was the French merchant and traveller who visited India six times during the reigns of Shah Jahan and Aurangzeb?",
      options: {
        A: "Jean-Baptiste Tavernier",
        B: "François Bernier",
        C: "Niccolao Manucci",
        D: "Jean de Thévenot",
      },
      answer: "A",
      solution: "Jean-Baptiste Tavernier was a 17th-century French gem merchant who visited India six times between 1630 and 1668.",
    },
    hindiQuestion: {
      question: "शाहजहां और औरंगजेब के शासनकाल के दौरान भारत में छह बार यात्रा करने वाला फ्रांसीसी जौहरी और यात्री कौन था?",
      options: {
        A: "जीन-बैप्टिस्ट टैवर्नियर",
        B: "फ्रेंकोइस बर्नियर",
        C: "निकोलो मैनुची",
        D: "जीन डी थेवेनो",
      },
      answer: "A",
      solution: "जीन-बैप्टिस्ट टैवर्नियर ने 1630 और 1668 के बीच छह बार भारत की यात्रा की थी।",
    },
  },
  {
    _id: "fb-3",
    questionType: "pair",
    subject: { name: "Geography & Environment" },
    positiveMarks: 2,
    negativeMarks: 0.67,
    englishQuestion: {
      question: "Consider the following pairs of famous waterfalls and the rivers on which they are located:",
      pairQuestion: [
        { combined: "Waterfall --- River --- State" },
        { combined: "1. Dhuandhar Falls --- Narmada River --- Madhya Pradesh" },
        { combined: "2. Hundru Falls --- Subarnarekha River --- Jharkhand" },
        { combined: "3. Gersoppa (Jog) Falls --- Sharavati River --- Karnataka" },
        { combined: "4. Dudhsagar Falls --- Mandovi River --- Goa" },
      ],
      lastQuestion: "How many of the above pairs are correctly matched?",
      options: {
        A: "Only one pair",
        B: "Only two pairs",
        C: "Only three pairs",
        D: "All four pairs",
      },
      answer: "D",
      solution: "All four pairs are correctly matched: Dhuandhar is on Narmada, Hundru on Subarnarekha, Jog on Sharavati, and Dudhsagar on Mandovi.",
    },
    hindiQuestion: {
      question: "प्रसिद्ध जलप्रपातों और उन नदियों के निम्नलिखित युग्मों पर विचार कीजिए जिन पर वे स्थित हैं:",
      pairQuestion: [
        { combined: "जलप्रपात --- नदी --- राज्य" },
        { combined: "1. धुआंधार जलप्रपात --- नर्मदा नदी --- मध्य प्रदेश" },
        { combined: "2. हुंडरू जलप्रपात --- सुवर्णरेखा नदी --- झारखंड" },
        { combined: "3. जोग (गेरसोप्पा) जलप्रपात --- शरावती नदी --- कर्नाटक" },
        { combined: "4. दूधसागर जलप्रपात --- मांडवी नदी --- गोवा" },
      ],
      lastQuestion: "उपर्युक्त में से कितने युग्म सही सुमेलित हैं?",
      options: {
        A: "केवल एक युग्म",
        B: "केवल दो युग्म",
        C: "केवल तीन युग्म",
        D: "सभी चार युग्म",
      },
      answer: "D",
      solution: "सभी चार युग्म सही सुमेलित हैं।",
    },
  },
  {
    _id: "fb-4",
    questionType: "statement-csat",
    subject: { name: "CSAT & Logical Reasoning" },
    positiveMarks: 2,
    negativeMarks: 0.67,
    englishQuestion: {
      question: "Examine the following statements regarding three friends A, B, and C:",
      statementQuestion: [
        { combined: "1. A is older than B." },
        { combined: "2. C is younger than B." },
        { combined: "3. A is younger than C." },
      ],
      lastQuestion: "If statement 1 and 2 are true, statement 3 is:",
      options: {
        A: "True",
        B: "False",
        C: "Uncertain",
        D: "None of the above",
      },
      answer: "B",
      solution: "If A > B and B > C, then A > C. Therefore, the statement 'A is younger than C' is definitely False.",
    },
    hindiQuestion: {
      question: "तीन मित्रों A, B और C के संबंध में निम्नलिखित कथनों की जांच कीजिए:",
      statementQuestion: [
        { combined: "1. A, B से बड़ा है।" },
        { combined: "2. C, B से छोटा है।" },
        { combined: "3. A, C से छोटा है।" },
      ],
      lastQuestion: "यदि कथन 1 और 2 सत्य हैं, तो कथन 3 है:",
      options: {
        A: "सत्य",
        B: "असत्य",
        C: "अनिश्चित",
        D: "उपर्युक्त में से कोई नहीं",
      },
      answer: "B",
      solution: "यदि A > B और B > C है, तो A > C होगा। अतः 'A, C से छोटा है' कथन असत्य है।",
    },
  },
  {
    _id: "fb-5",
    questionType: "normal",
    subject: { name: "Indian Economy" },
    positiveMarks: 2,
    negativeMarks: 0.67,
    englishQuestion: {
      question: "Which index is used by the Reserve Bank of India (RBI) as the key metric to measure headline retail inflation for monetary policy decisions?",
      options: {
        A: "Wholesale Price Index (WPI)",
        B: "Consumer Price Index Combined (CPI-C)",
        C: "Index of Industrial Production (IIP)",
        D: "GDP Deflator",
      },
      answer: "B",
      solution: "RBI targets Consumer Price Index (Combined) within a band of 4% (+/- 2%) under the flexible inflation targeting framework.",
    },
    hindiQuestion: {
      question: "मौद्रिक नीति निर्णयों के लिए खुदरा मुद्रास्फीति को मापने के लिए भारतीय रिजर्व बैंक (RBI) द्वारा किस सूचकांक का उपयोग किया जाता है?",
      options: {
        A: "थोक मूल्य सूचकांक (WPI)",
        B: "उपभोक्ता मूल्य सूचकांक संयुक्त (CPI-C)",
        C: "औद्योगिक उत्पादन सूचकांक (IIP)",
        D: "जीडीपी डिफ्लेटर",
      },
      answer: "B",
      solution: "आरबीआई उपभोक्ता मूल्य सूचकांक संयुक्त (CPI-C) को 4% (+/- 2%) के लक्ष्य के साथ अपना मुख्य आधार मानता है।",
    },
  },
];

export const ALL_SUBJECT_QUESTIONS = FALLBACK_BACKEND_QUESTIONS;

export const getRandomMockQuestions = (count: number = 10): BackendQuestionItem[] => {
  const shuffled = [...FALLBACK_BACKEND_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
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
