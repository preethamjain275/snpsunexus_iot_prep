import { useState } from 'react';
import { Code2, ChevronDown, ChevronUp, Clock, Lightbulb, Play } from 'lucide-react';
import { allCodingQuestions } from '@/data/coding-index';

export function CodingPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [lang, setLang] = useState<'java' | 'python'>('java');
  const questions = allCodingQuestions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <Code2 size={26} /> Coding Practice
        </h1>
        <p className="text-slate-500 mt-1">{questions.length} questions with approach, dry run, Java & Python solutions, and time complexity.</p>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={q.id} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{q.title}</p>
                  <span className={`chip mt-1 ${q.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'}`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
              {open === i ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>

            {open === i && (
              <div className="px-5 pb-5 space-y-4 animate-fade-in border-t border-slate-100 dark:border-slate-800/50 pt-4">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-1">Statement</p>
                  <p className="text-sm">{q.statement}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Approach</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{q.approach}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Logic</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{q.logic}</p>
                </div>
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3">
                  <p className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                    <Play size={12} /> Dry Run
                  </p>
                  <p className="text-sm text-amber-900 dark:text-amber-200 font-mono">{q.dryRun}</p>
                </div>

                {/* Language toggle */}
                <div>
                  <div className="flex gap-1 mb-2">
                    {(['java', 'python'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          lang === l ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {l === 'java' ? 'Java' : 'Python'}
                      </button>
                    ))}
                  </div>
                  <pre className="text-xs bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-4 overflow-x-auto font-mono leading-relaxed">
                    {lang === 'java' ? q.java : q.python}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="chip bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    <Clock size={12} /> {q.timeComplexity}
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-3">
                  <Lightbulb size={16} className="shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
                  <p className="text-sm text-sky-900 dark:text-sky-200">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
