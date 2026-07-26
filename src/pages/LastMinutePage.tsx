import { Zap, Clock, Target, Code2, Star, BookOpen, RotateCcw, ChevronRight } from 'lucide-react';
import { navigate } from '@/hooks/useRouter';
import { allMCQs } from '@/data/mcq';
import { allCodingQuestions } from '@/data/coding-index';
import { revisionNotes } from '@/data/revision';

export function LastMinutePage() {
  const modes = [
    {
      title: '2-Day Crash Course',
      desc: 'Day 1: Java, Python, DSA. Day 2: DBMS, OS, Networks + Mock tests.',
      icon: Clock,
      color: 'from-sky-500 to-blue-600',
      action: () => navigate('/subjects'),
      actionLabel: 'Start Day 1',
    },
    {
      title: 'Exam Booster Mode',
      desc: 'High-yield MCQs only — rapid-fire practice across all subjects.',
      icon: Zap,
      color: 'from-red-500 to-orange-600',
      action: () => navigate('/random'),
      actionLabel: 'Generate 50 MCQs',
    },
    {
      title: 'Important MCQs Only',
      desc: 'Hand-picked easy-medium MCQs most likely to appear.',
      icon: Target,
      color: 'from-violet-500 to-purple-600',
      action: () => navigate('/random'),
      actionLabel: 'Practice Now',
    },
    {
      title: 'Coding Questions Only',
      desc: `${allCodingQuestions.length} coding problems with solutions.`,
      icon: Code2,
      color: 'from-pink-500 to-rose-600',
      action: () => navigate('/coding'),
      actionLabel: 'Start Coding',
    },
    {
      title: 'Revision Mode',
      desc: '2, 5, and 10-minute revision notes for a quick recap.',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      action: () => navigate('/revision'),
      actionLabel: 'Revise Now',
    },
    {
      title: 'Unlimited Practice',
      desc: 'Take mock tests again and again — no limits, no timer.',
      icon: RotateCcw,
      color: 'from-emerald-500 to-teal-600',
      action: () => navigate('/mock'),
      actionLabel: 'Take a Mock',
    },
  ];

  const twoMin = revisionNotes.find((n) => n.mode === '2min' && n.subject === 'general');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title flex items-center gap-3">
          <div className="icon-3d-box h-10 w-10 rounded-xl bg-gradient-to-tr from-red-500 to-orange-600 text-white">
            <Zap size={22} className="icon-3d icon-3d-pulse" />
          </div>
          Last Minute Preparation
        </h1>
        <p className="text-slate-500 mt-1">Short on time? Pick a mode and maximize your score.</p>
      </div>

      {/* Modes */}
      <div className="grid sm:grid-cols-2 gap-4">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="card-3d p-6 group">
              <div className={`icon-3d-box h-12 w-12 rounded-2xl bg-gradient-to-br ${m.color} text-white mb-4`}>
                <Icon size={24} className="icon-3d group-hover:scale-110" />
              </div>
              <p className="font-bold text-lg">{m.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">{m.desc}</p>
              <button onClick={m.action} className="btn-primary w-full">
                {m.actionLabel} <ChevronRight size={16} className="icon-3d-spin-hover" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick 2-min revision */}
      {twoMin && (
        <div>
          <h2 className="section-title mb-4 flex items-center gap-2">
            <Star size={22} className="text-amber-500" /> 2-Minute Rapid Revision
          </h2>
          <div className="card p-6">
            <ul className="space-y-3">
              {twoMin.points.map((p, i) => (
                <li key={i} className="text-sm flex gap-2.5 leading-relaxed">
                  <span className="text-amber-500 shrink-0 font-bold">★</span>
                  <span className="text-slate-600 dark:text-slate-300">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="card p-6 bg-gradient-to-br from-slate-900 to-sky-950 border-0 text-white">
        <p className="font-bold text-lg mb-4">What you have access to</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-extrabold">{allMCQs.length}+</p>
            <p className="text-xs text-sky-200">MCQs</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">{allCodingQuestions.length}+</p>
            <p className="text-xs text-sky-200">Coding Qs</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">6</p>
            <p className="text-xs text-sky-200">Mock Tests</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">∞</p>
            <p className="text-xs text-sky-200">No Limits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
