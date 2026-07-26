import { useState } from 'react';
import * as Icons from 'lucide-react';
import { ArrowLeft, BookText, ListChecks, StickyNote, MessageCircleQuestion, Clock, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { subjects } from '@/data/subjects';
import { extraTheory } from '@/data/theory-extra';
import { mcqsBySubject } from '@/data/mcq';
import { navigate } from '@/hooks/useRouter';
import { MCQCard } from '@/components/MCQCard';
import { getTopicComplexity } from '@/utils/complexity';

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
      <div className={`card-3d p-6 bg-gradient-to-br ${subject.color} border-0 text-white shadow-xl`}>
        <div className="flex items-center gap-4">
          <div className="icon-3d-box h-14 w-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur border border-white/20">
            <Icon size={30} className="icon-3d icon-3d-float" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{subject.name}</h1>
            <p className="text-white/90 text-sm font-medium">{subject.topics.length} topics · {mcqs.length} MCQs</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map((t) => {
          const TIcon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shrink-0 ${
                active
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'card text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <TIcon size={18} className={active ? 'icon-3d-pulse' : ''} />
              {t.label}
              <span className={`chip text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Theory tab */}
      {tab === 'theory' && (
        <div className="space-y-3">
          {topics.map((topic, i) => {
            const comp = getTopicComplexity(topic, subject.id);
            return (
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

                    {/* Time Complexity Section */}
                    <div>
                      <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Time Complexity</p>
                      <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-mono">
                          <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Best Case:</span> {comp.bestCase} &nbsp;·&nbsp; 
                          <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Average Case:</span> {comp.avgCase} &nbsp;·&nbsp; 
                          <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Worst Case:</span> {comp.worstCase}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{comp.explanation}</p>
                      </div>
                    </div>

                    {/* Space Complexity Section */}
                    <div>
                      <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-1">Space Complexity</p>
                      <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-mono">
                          <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Auxiliary Space:</span> {comp.spaceComplexity}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Space complexity accounts for the total memory consumed by variables, allocated structures, and recursion call stack frames.</p>
                      </div>
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
            );
          })}
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
          {topics.map((topic, i) => {
            const comp = getTopicComplexity(topic, subject.id);
            return (
              <div key={i} className="card p-5 space-y-3">
                <div>
                  <p className="font-semibold text-base mb-1">{topic.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{topic.shortAnswer}</p>
                </div>
                <ul className="space-y-1.5">
                  {topic.importantPoints.map((p, j) => (
                    <li key={j} className="text-sm flex gap-2">
                      <span className="text-sky-500 shrink-0">•</span>
                      <span className="text-slate-600 dark:text-slate-300">{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Short Notes Complexity Summary */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1">
                    <Clock size={13} /> Time: <code className="font-mono bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded text-sky-800 dark:text-sky-200">{comp.worstCase}</code>
                  </span>
                  <span className="font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1">
                    💾 Space: <code className="font-mono bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded text-sky-800 dark:text-sky-200">{comp.spaceComplexity}</code>
                  </span>
                  <span className="text-slate-500 italic">({comp.explanation})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interview tab */}
      {tab === 'interview' && (
        <div className="space-y-3">
          {subject.topics.flatMap((topic, ti) => {
            const comp = getTopicComplexity(topic, subject.id);
            return topic.interviewQuestions.map((iq, ii) => (
              <div key={`${ti}-${ii}`} className="card p-5 space-y-3">
                <div>
                  <p className="font-semibold text-base mb-1.5">{iq.q}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{iq.a}</p>
                </div>

                {/* Interview Complexity Note */}
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-200 flex-wrap">
                    <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                      <Clock size={13} /> Time Complexity: <code className="font-mono">{comp.worstCase}</code>
                    </span>
                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                      💾 Space Complexity: <code className="font-mono">{comp.spaceComplexity}</code>
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{comp.explanation}</p>
                </div>
              </div>
            ));
          })}
        </div>
      )}
    </div>
  );
}
