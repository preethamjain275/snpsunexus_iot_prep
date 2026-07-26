import { useState } from 'react';
import { MessageCircleQuestion, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { interviewQuestions } from '@/data/interview';
import { getTopicComplexity } from '@/utils/complexity';

export function InterviewPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>('all');

  const subjects = ['all', 'general', 'java', 'python', 'dbms', 'os', 'dsa', 'cn'];
  const labels: Record<string, string> = {
    all: 'All', general: 'General', java: 'Java', python: 'Python',
    dbms: 'DBMS', os: 'OS', dsa: 'DSA', cn: 'Networks',
  };

  const filtered = filter === 'all' ? interviewQuestions : interviewQuestions.filter((q) => q.subject === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-3">
          <div className="icon-3d-box h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white">
            <MessageCircleQuestion size={22} className="icon-3d icon-3d-float" />
          </div>
          Interview Questions
        </h1>
        <p className="text-slate-500 mt-1">Most asked questions with short, exam-ready answers.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              filter === s ? 'bg-sky-600 text-white' : 'card text-slate-600 dark:text-slate-300'
            }`}
          >
            {labels[s]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q, i) => {
          const comp = getTopicComplexity({ name: q.question }, q.subject);
          return (
            <div key={q.id} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <p className="font-semibold">{q.question}</p>
                {open === i ? <ChevronUp size={20} className="text-slate-400 shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-fade-in space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{q.answer}</p>
                  {comp && (
                    <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-3 text-xs space-y-1">
                      <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-200 flex-wrap">
                        <span className="flex items-center gap-1 text-sky-700 dark:text-sky-300">
                          <Clock size={13} /> Time Complexity: <code className="font-mono bg-sky-100 dark:bg-sky-900/60 px-1.5 py-0.5 rounded">{comp.worstCase}</code>
                        </span>
                        <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                          💾 Space Complexity: <code className="font-mono bg-sky-100 dark:bg-sky-900/60 px-1.5 py-0.5 rounded">{comp.spaceComplexity}</code>
                        </span>
                      </div>
                      <p className="text-sky-800 dark:text-sky-200 mt-1">{comp.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
