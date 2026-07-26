import type { CodingQuestion } from '@/types';
import { codingQuestions } from './coding';
import { codingQuestions2 } from './coding2';

export const allCodingQuestions: CodingQuestion[] = [
  ...codingQuestions,
  ...codingQuestions2,
];

export { codingQuestions, codingQuestions2 };
