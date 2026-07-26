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

export const allMCQs: MCQ[] = [
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

export function mcqsBySubject(subject: string): MCQ[] {
  return allMCQs.filter((m) => m.subject === subject);
}

export function randomMCQs(count: number): MCQ[] {
  const shuffled = [...allMCQs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allMCQs.length));
}

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
