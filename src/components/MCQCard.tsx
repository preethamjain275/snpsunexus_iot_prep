import { useState } from 'react';
import { Bookmark, Check, X, Lightbulb } from 'lucide-react';
import type { MCQ } from '@/types';
import { useBookmarks, useProgress } from '@/hooks/useLocalStorage';
import { navigate } from '@/hooks/useRouter';

interface Props {
  mcq: MCQ;
  index?: number;
  showSubject?: boolean;
}

const subjectLabels: Record<string, string> = {
  java: 'Java',
  python: 'Python',
  dbms: 'DBMS',
  os: 'OS',
  dsa: 'DSA',
  cn: 'Networks',
  coding: 'Coding',
};

const subjectColors: Record<string, string> = {
  java: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  python: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  dbms: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  os: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  dsa: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  cn: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  coding: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
};

export function MCQCard({ mcq, index, showSubject }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const { has, toggle } = useBookmarks();
  const { mark } = useProgress();
  const bookmarked = has(mcq.id);

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    mark(mcq.id);
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {index !== undefined && (
            <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Q{index + 1}
            </span>
          )}
          {showSubject && (
            <button
              onClick={() => navigate(`/subject/${mcq.subject}`)}
              className={`chip ${subjectColors[mcq.subject]} hover:opacity-80`}
            >
              {subjectLabels[mcq.subject]}
            </button>
          )}
          <span className="chip bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {mcq.topic}
          </span>
          <span
            className={`chip ${
              mcq.difficulty === 'easy'
                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {mcq.difficulty}
          </span>
        </div>
        <button
          onClick={() => toggle(mcq.id)}
          aria-label="Bookmark"
          className={`p-1.5 rounded-lg transition-colors ${
            bookmarked
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
              : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="font-medium text-[15px] leading-relaxed mb-4">{mcq.question}</p>

      <div className="grid gap-2">
        {mcq.options.map((opt, i) => {
          const isCorrect = i === mcq.answer;
          const isSelected = i === selected;
          let cls =
            'border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/30';
          if (revealed) {
            if (isCorrect)
              cls = 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-200';
            else if (isSelected)
              cls = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200';
            else cls = 'border-slate-200 dark:border-slate-800 opacity-70';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${cls}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                {revealed && isCorrect ? (
                  <Check size={14} />
                ) : revealed && isSelected ? (
                  <X size={14} />
                ) : (
                  letters[i]
                )}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-3 animate-fade-in">
          <Lightbulb size={18} className="shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
          <p className="text-sm text-sky-900 dark:text-sky-200">{mcq.explanation}</p>
        </div>
      )}
    </div>
  );
}
