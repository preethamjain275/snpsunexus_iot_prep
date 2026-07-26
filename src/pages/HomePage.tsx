import { Clock, ListChecks, Code2, TrendingUp, Building2, ShieldCheck, ArrowRight, Zap, BookOpen, ClipboardCheck, StickyNote, MessageCircleQuestion, Link2, Shuffle } from 'lucide-react';
import { navigate } from '@/hooks/useRouter';
import { allMCQs } from '@/data/mcq';
import { allCodingQuestions } from '@/data/coding-index';
import { subjects } from '@/data/subjects';
import * as Icons from 'lucide-react';

export function HomePage() {
  const totalMCQs = allMCQs.length;
  const totalCoding = allCodingQuestions.length;

  const companies = ['Tap Academy', 'HCL GUVI', 'PrepInsta', 'Atom', 'HCL Tech', 'Tripillar'];

  const quickLinks = [
    { label: 'Subjects', desc: 'Theory + MCQs', path: '/subjects', icon: BookOpen, color: 'from-sky-500 to-blue-600' },
    { label: 'Coding Practice', desc: `${totalCoding} questions`, path: '/coding', icon: Code2, color: 'from-pink-500 to-rose-600' },
    { label: 'Mock Tests', desc: '6 subject tests', path: '/mock', icon: ClipboardCheck, color: 'from-emerald-500 to-teal-600' },
    { label: 'Random MCQ', desc: '20 / 50 / 100', path: '/random', icon: Shuffle, color: 'from-violet-500 to-purple-600' },
    { label: 'Revision Notes', desc: '2 / 5 / 10 min', path: '/revision', icon: StickyNote, color: 'from-amber-500 to-orange-600' },
    { label: 'Interview Qs', desc: 'Most asked', path: '/interview', icon: MessageCircleQuestion, color: 'from-cyan-500 to-blue-600' },
    { label: 'Resources', desc: 'External links', path: '/resources', icon: Link2, color: 'from-slate-500 to-gray-700' },
    { label: 'Last Minute', desc: 'Exam booster', path: '/last-minute', icon: Zap, color: 'from-red-500 to-orange-600' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden card p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border-0 text-white">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative">
          <span className="chip bg-white/10 text-sky-200 border border-white/10 backdrop-blur">
            <ShieldCheck size={14} /> B.E. 2028 Batch
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            IOT Diagnostic Assessment<br className="hidden sm:block" /> Crash Prep
          </h1>
          <p className="mt-3 text-lg text-sky-100/80 font-medium">
            Prepare for all 6 Diagnostic Assessments in just 2 days.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold text-sky-100">Built by Team SNPSU NEXUS</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate('/subjects')} className="btn bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/30">
              Start Preparation <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/last-minute')} className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20">
              <Zap size={18} /> Last Minute Mode
            </button>
          </div>
        </div>
      </section>

      {/* Assessment pattern */}
      <section>
        <h2 className="section-title mb-4">Assessment Pattern</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 mb-3">
              <Clock size={22} />
            </div>
            <p className="text-3xl font-bold">2 Hours</p>
            <p className="text-sm text-slate-500 mt-1">Total duration</p>
          </div>
          <div className="card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 mb-3">
              <ListChecks size={22} />
            </div>
            <p className="text-3xl font-bold">50 MCQs</p>
            <p className="text-sm text-slate-500 mt-1">Multiple choice questions</p>
          </div>
          <div className="card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 mb-3">
              <Code2 size={22} />
            </div>
            <p className="text-3xl font-bold">2 Coding</p>
            <p className="text-sm text-slate-500 mt-1">Programming questions</p>
          </div>
        </div>
        <div className="card p-5 mt-4 flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-900">
          <TrendingUp className="text-emerald-600 dark:text-emerald-400 shrink-0" size={22} />
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            Difficulty: Easy to Medium. You only need to know the fundamentals. This is NOT a placement interview.
          </p>
        </div>
      </section>

      {/* Companies */}
      <section>
        <h2 className="section-title mb-4 flex items-center gap-2">
          <Building2 size={24} /> Companies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {companies.map((c) => (
            <div key={c} className="card p-4 text-center">
              <p className="font-semibold text-sm">{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="section-title mb-4">Start Here</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((q) => {
            const Icon = q.icon;
            return (
              <button
                key={q.path}
                onClick={() => navigate(q.path)}
                className="card p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${q.color} text-white mb-3`}>
                  <Icon size={22} />
                </div>
                <p className="font-semibold">{q.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{q.desc}</p>
                <ArrowRight size={16} className="mt-3 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Subjects */}
      <section>
        <h2 className="section-title mb-4">Subjects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const Icon = (Icons as unknown as Record<string, typeof Icons.BookOpen>)[s.icon] || Icons.BookOpen;
            return (
              <button
                key={s.id}
                onClick={() => navigate(`/subject/${s.id}`)}
                className="card p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white`}>
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold">{s.name}</p>
                </div>
                <p className="text-sm text-slate-500">{s.description}</p>
                <p className="text-xs text-slate-400 mt-2">{s.topics.length} topics · {allMCQs.filter((m) => m.subject === s.id).length} MCQs</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="card p-6 bg-gradient-to-br from-sky-600 to-blue-700 text-white border-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold">{totalMCQs}+</p>
            <p className="text-sm text-sky-100">MCQs with explanations</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">{totalCoding}+</p>
            <p className="text-sm text-sky-100">Coding questions</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">6</p>
            <p className="text-sm text-sky-100">Mock tests</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">100%</p>
            <p className="text-sm text-sky-100">Free · No login</p>
          </div>
        </div>
      </section>
    </div>
  );
}
