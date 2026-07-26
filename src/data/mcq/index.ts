import type { MCQ } from '@/types';
import { javaMCQs } from './java';
import { pythonMCQs } from './python';
import { dbmsMCQs } from './dbms';
import { osMCQs } from './os';
import { dsaMCQs } from './dsa';
import { cnMCQs } from './cn';
import { javaMCQs2 } from './java2';
import { pythonMCQs2 } from './python2';
import { dbmsMCQs2 } from './dbms2';
import { osMCQs2 } from './os2';
import { dsaMCQs2 } from './dsa2';
import { cnMCQs2 } from './cn2';

/**
 * Generic Fisher-Yates array shuffle function.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Shuffles options for an MCQ while preserving the correct option text and updating the answer index.
 * This guarantees that correct options are evenly and randomly distributed among A, B, C, and D.
 */
export function shuffleOptions(mcq: MCQ): MCQ {
  const correctText = mcq.options[mcq.answer];
  const shuffledOptions = [...mcq.options];

  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  const newAnswer = shuffledOptions.indexOf(correctText);

  return {
    ...mcq,
    options: shuffledOptions as [string, string, string, string],
    answer: newAnswer >= 0 ? newAnswer : 0,
  };
}

const rawMCQs: MCQ[] = [
  ...javaMCQs,
  ...javaMCQs2,
  ...pythonMCQs,
  ...pythonMCQs2,
  ...dbmsMCQs,
  ...dbmsMCQs2,
  ...osMCQs,
  ...osMCQs2,
  ...dsaMCQs,
  ...dsaMCQs2,
  ...cnMCQs,
  ...cnMCQs2,
];

// All MCQs prepared with shuffled options so answer distribution is randomized across A, B, C, D
export const allMCQs: MCQ[] = rawMCQs.map(shuffleOptions);

/**
 * Returns MCQs for a given subject in shuffled order with shuffled option positions.
 */
export function mcqsBySubject(subject: string, shuffle: boolean = true): MCQ[] {
  const filtered = rawMCQs.filter((m) => m.subject === subject);
  if (!shuffle) return filtered.map(shuffleOptions);
  return shuffleArray(filtered).map(shuffleOptions);
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function randomMCQs(count: number): MCQ[] {
  const shuffled = shuffleArray(rawMCQs).map(shuffleOptions);
  return shuffled.slice(0, Math.min(count, rawMCQs.length));
}

/**
 * Time Complexity: O(n * L)
 * Space Complexity: O(r)
 */
export function searchMCQs(query: string): MCQ[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allMCQs.filter(
    (m) =>
      m.question.toLowerCase().includes(q) ||
      m.topic.toLowerCase().includes(q) ||
      m.explanation.toLowerCase().includes(q) ||
      m.options.some((o) => o.toLowerCase().includes(q))
  );
}
