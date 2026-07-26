import { useState, useMemo } from 'react';
import { ClipboardCheck, ArrowLeft, Clock, CheckCircle2, XCircle, RotateCcw, Award, Shuffle } from 'lucide-react';
import { subjects } from '@/data/subjects';
import { mcqsBySubject } from '@/data/mcq';
import { navigate } from '@/hooks/useRouter';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MockTestPage() {
  const [active, setActive] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seed, setSeed] = useState(0);

  const mcqs = useMemo(
    () => (active ? shuffle(mcqsBySubject(active)).slice(0, 50) : []),
    [active, seed]
  );

  const start = (subjectId: string) => {
    setActive(subjectId);
    setAnswers({});
    setSubmitted(false);
    setSeed((s) => s + 1);
  };

  const retake = () => {
    setAnswers({});
    setSubmitted(false);
    setSeed((s) => s + 1);
  };

  const reset = () => {
    setActive(null);
    setAnswers({});
    setSubmitted(false);
  };

  if (active) {
    const subject = subjects.find((s) => s.id === active)!;
    const answered = Object.keys(answers).length;
    const score = submitted ? mcqs.filter((m) => answers[m.id] === m.answer).length : 0;

    return (
      <div className="space-y-5">
        <button onClick={reset} className="btn-ghost -ml-2">
          <ArrowLeft size={18} /> Exit Test
        </button>

        <div className="card p-5 sticky top-16 lg:top-16 z-20">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="font-bold">{subject.name} Mock Test</p>
              <p className="text-sm text-slate-500">{answered}/{mcqs.length} answered</p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-sky-600">{score}/{mcqs.length}</p>
                  <p className="text-xs text-slate-500">{Math.round((score / mcqs.length) * 100)}%</p>
                </div>
                <button onClick={retake} className="btn-primary">
                  <Shuffle size={16} /> New Random Set
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={answered < mcqs.length}
                className="btn-primary"
              >
                <Award size={18} /> Submit Test
              </button>
            )}
          </div>
          {!submitted && (
            <div className="mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-sky-500 transition-all" style={{ width: `${(answered / mcqs.length) * 100}%` }} />
            </div>
          )}
        </div>

        {submitted && (
          <div className="card p-5 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 border-sky-200 dark:border-sky-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white">
                <Award size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Result: {score}/{mcqs.length} correct</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {score >= mcqs.length * 0.8 ? 'Excellent! You are exam-ready.' : score >= mcqs.length * 0.5 ? 'Good effort. Review the questions you missed.' : 'Keep practicing — focus on the fundamentals.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {mcqs.map((m, i) => {
            const userAns = answers[m.id];
            const correct = submitted && userAns === m.answer;
            const wrong = submitted && userAns !== undefined && userAns !== m.answer;
            return (
              <div key={m.id} className="card p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">Q{i + 1}</span>
                    <span className="chip bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">{m.topic}</span>
                  </div>
                  {submitted && correct && <CheckCircle2 className="text-green-500" size={20} />}
                  {submitted && wrong && <XCircle className="text-red-500" size={20} />}
                </div>
                <p className="font-medium text-[15px] mb-4">{m.question}</p>
                <div className="grid gap-2">
                  {m.options.map((opt, j) => {
                    const isSelected = userAns === j;
                    const isCorrect = j === m.answer;
                    let cls = 'border-slate-200 dark:border-slate-800 hover:border-sky-400';
                    if (submitted) {
                      if (isCorrect) cls = 'border-green-500 bg-green-50 dark:bg-green-950/40';
                      else if (isSelected) cls = 'border-red-500 bg-red-50 dark:bg-red-950/40';
                      else cls = 'border-slate-200 dark:border-slate-800 opacity-60';
                    } else if (isSelected) {
                      cls = 'border-sky-500 bg-sky-50 dark:bg-sky-950/40';
                    }
                    return (
                      <button
                        key={j}
                        onClick={() => !submitted && setAnswers((a) => ({ ...a, [m.id]: j }))}
                        disabled={submitted}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${cls}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                          {String.fromCharCode(65 + j)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-3">
                    <p className="text-sm text-sky-900 dark:text-sky-200">{m.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <ClipboardCheck size={26} /> Mock Tests
        </h1>
        <p className="text-slate-500 mt-1">Up to 50 randomized questions per test. Unlimited retakes — new questions each time, with instant results and explanations.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((s) => {
          const count = Math.min(50, mcqsBySubject(s.id).length);
          return (
            <button
              key={s.id}
              onClick={() => start(s.id)}
              className="card p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white mb-4`}>
                <ClipboardCheck size={24} />
              </div>
              <p className="font-bold text-lg">{s.name}</p>
              <p className="text-sm text-slate-500 mt-1">{count} questions · Easy-Medium · Unlimited retakes</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <Clock size={14} /> No time limit · <Shuffle size={14} /> Randomized
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
