import { useState } from 'react';
import { MessageCircleQuestion, ChevronDown, ChevronUp } from 'lucide-react';
import { interviewQuestions } from '@/data/interview';

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
        <h1 className="section-title flex items-center gap-2">
          <MessageCircleQuestion size={26} /> Interview Questions
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
        {filtered.map((q, i) => (
          <div key={q.id} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 p-5 text-left"
            >
              <p className="font-semibold">{q.question}</p>
              {open === i ? <ChevronUp size={20} className="text-slate-400 shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
