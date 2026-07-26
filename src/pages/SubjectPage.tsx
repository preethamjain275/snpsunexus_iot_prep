import { useState } from 'react';
import * as Icons from 'lucide-react';
import { ArrowLeft, BookText, ListChecks, StickyNote, MessageCircleQuestion, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { subjects } from '@/data/subjects';
import { extraTheory } from '@/data/theory-extra';
import { mcqsBySubject } from '@/data/mcq';
import { navigate } from '@/hooks/useRouter';
import { MCQCard } from '@/components/MCQCard';

interface Props {
  subjectId: string;
}

export function SubjectPage({ subjectId }: Props) {
  const subject = subjects.find((s) => s.id === subjectId);
  const [tab, setTab] = useState<'theory' | 'mcqs' | 'notes' | 'interview'>('theory');
  const [openTopic, setOpenTopic] = useState<number | null>(0);

  if (!subject) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Subject not found.</p>
        <button onClick={() => navigate('/subjects')} className="btn-primary mt-4">Back to Subjects</button>
      </div>
    );
  }

  const Icon = (Icons as unknown as Record<string, typeof Icons.BookOpen>)[subject.icon] || Icons.BookOpen;
  const mcqs = mcqsBySubject(subject.id);
  const topics = [...subject.topics, ...(extraTheory[subject.id] || [])];

  const tabs = [
    { id: 'theory' as const, label: 'Theory', icon: BookText, count: topics.length },
    { id: 'mcqs' as const, label: 'MCQs', icon: ListChecks, count: mcqs.length },
    { id: 'notes' as const, label: 'Short Notes', icon: StickyNote, count: topics.length },
    { id: 'interview' as const, label: 'Interview', icon: MessageCircleQuestion, count: topics.reduce((a, t) => a + t.interviewQuestions.length, 0) },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/subjects')} className="btn-ghost -ml-2">
        <ArrowLeft size={18} /> All Subjects
      </button>

      {/* Header */}
      <div className={`card p-6 bg-gradient-to-br ${subject.color} border-0 text-white`}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{subject.name}</h1>
            <p className="text-white/80 text-sm">{subject.topics.length} topics · {mcqs.length} MCQs</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map((t) => {
          const TIcon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'card text-slate-600 dark:text-slate-300'
              }`}
            >
              <TIcon size={16} /> {t.label}
              <span className={`text-xs ${tab === t.id ? 'text-white/70' : 'text-slate-400'}`}>({t.count})</span>
            </button>
          );
        })}
      </div>

      {/* Theory tab */}
      {tab === 'theory' && (
        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenTopic(openTopic === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold">{topic.name}</span>
                {openTopic === i ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openTopic === i && (
                <div className="px-5 pb-5 space-y-4 animate-fade-in">
                  <div>
                    <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Definition</p>
                    <p className="text-sm">{topic.definition}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Explanation</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{topic.explanation}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Short Exam Answer</p>
                    <p className="text-sm italic text-slate-600 dark:text-slate-300">{topic.shortAnswer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-2">Important Points</p>
                    <ul className="space-y-1.5">
                      {topic.importantPoints.map((p, j) => (
                        <li key={j} className="text-sm flex gap-2">
                          <span className="text-sky-500 shrink-0">•</span>
                          <span className="text-slate-600 dark:text-slate-300">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-green-600 dark:text-green-400 mb-1">Easy Example</p>
                      <pre className="text-xs bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 overflow-x-auto font-mono">{topic.easyExample}</pre>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 mb-1">Medium Example</p>
                      <pre className="text-xs bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 overflow-x-auto font-mono">{topic.mediumExample}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-2">Frequently Asked Questions</p>
                    <div className="space-y-2">
                      {topic.faqs.map((f, j) => (
                        <div key={j} className="text-sm">
                          <p className="font-medium">{f.q}</p>
                          <p className="text-slate-600 dark:text-slate-300">{f.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-violet-600 dark:text-violet-400 mb-2">Interview Questions</p>
                    <div className="space-y-2">
                      {topic.interviewQuestions.map((iq, j) => (
                        <div key={j} className="text-sm">
                          <p className="font-medium">{iq.q}</p>
                          <p className="text-slate-600 dark:text-slate-300">{iq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MCQs tab */}
      {tab === 'mcqs' && (
        <div className="space-y-4">
          {mcqs.map((m, i) => (
            <MCQCard key={m.id} mcq={m} index={i} />
          ))}
        </div>
      )}

      {/* Short Notes tab */}
      {tab === 'notes' && (
        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div key={i} className="card p-5">
              <p className="font-semibold mb-2">{topic.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{topic.shortAnswer}</p>
              <ul className="space-y-1.5">
                {topic.importantPoints.map((p, j) => (
                  <li key={j} className="text-sm flex gap-2">
                    <span className="text-sky-500 shrink-0">•</span>
                    <span className="text-slate-600 dark:text-slate-300">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Interview tab */}
      {tab === 'interview' && (
        <div className="space-y-3">
          {subject.topics.flatMap((topic, ti) =>
            topic.interviewQuestions.map((iq, ii) => (
              <div key={`${ti}-${ii}`} className="card p-5">
                <p className="font-semibold mb-1.5">{iq.q}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{iq.a}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
