export interface MCQ {
  id: string;
  subject: SubjectId;
  topic: string;
  question: string;
  options: [string, string, string, string];
  answer: number; // index 0-3
  explanation: string;
  difficulty: 'easy' | 'medium';
}

export type SubjectId =
  | 'java'
  | 'python'
  | 'dbms'
  | 'os'
  | 'dsa'
  | 'cn'
  | 'coding';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  description: string;
  topics: TopicContent[];
}

export interface TopicContent {
  name: string;
  definition: string;
  explanation: string;
  shortAnswer: string;
  importantPoints: string[];
  easyExample: string;
  mediumExample: string;
  faqs: { q: string; a: string }[];
  interviewQuestions: { q: string; a: string }[];
  timeComplexity?: string;
  bestCase?: string;
  avgCase?: string;
  worstCase?: string;
  spaceComplexity?: string;
  complexityExplanation?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  statement: string;
  approach: string;
  logic: string;
  dryRun: string;
  java: string;
  python: string;
  timeComplexity: string;
  bestCase?: string;
  avgCase?: string;
  worstCase?: string;
  spaceComplexity?: string;
  explanation: string;
  difficulty: 'easy' | 'medium';
}

}

export interface RevisionNote {
  id: string;
  mode: '2min' | '5min' | '10min';
  subject: SubjectId | 'general';
  title: string;
  points: string[];
}

export interface InterviewQuestion {
  id: string;
  subject: SubjectId | 'general';
  question: string;
  answer: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ExternalResource {
  name: string;
  url: string;
  category: string;
}
