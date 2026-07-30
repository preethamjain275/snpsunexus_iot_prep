import { Clock, ListChecks, Code2, TrendingUp, Building2, ShieldCheck, ArrowRight, Zap, BookOpen, ClipboardCheck, StickyNote, MessageCircleQuestion, Link2, Shuffle } from 'lucide-react';
import { navigate } from '@/hooks/useRouter';
import { allMCQs } from '@/data/mcq';
import { allCodingQuestions } from '@/data/coding-index';
import { subjects } from '@/data/subjects';
import * as Icons from 'lucide-react';

export function HomePage() {
  const totalMCQs = allMCQs.length;
  const totalCoding = allCodingQuestions.length;

  const companies = [
    { name: 'Tap Academy', url: 'https://tapacademy.com/' },
    { name: 'HCL GUVI', url: 'https://www.guvi.in/' },
    { name: 'PrepInsta', url: 'https://prepinsta.com/' },
    { name: 'Atom', url: 'https://atom.work/' },
    { name: 'HCL Tech', url: 'https://www.hcltech.com/' },
    { name: 'Tripillar', url: 'https://www.tripillar.org/' },
  ];

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
      <section className="relative overflow-hidden card-3d p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border-0 text-white shadow-2xl">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative">
          <span className="chip bg-white/10 text-sky-200 border border-white/10 backdrop-blur">
            <ShieldCheck size={14} className="icon-3d-pulse text-sky-400" /> B.E. 2028 Batch
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            IOT Diagnostic Assessment<br className="hidden sm:block" /> Crash Prep
          </h1>
          <p className="mt-3 text-lg text-sky-100/80 font-medium">
            Prepare for all 6 Diagnostic Assessments in just 2 days.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold text-sky-100">Built by Team SNPSU NEXUS</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate('/subjects')} className="btn-primary">
              Start Preparation <ArrowRight size={18} className="icon-3d-spin-hover" />
            </button>
            <button onClick={() => navigate('/last-minute')} className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20">
              <Zap size={18} className="text-amber-400 icon-3d-pulse" /> Last Minute Mode
            </button>
          </div>
        </div>
      </section>

      {/* Assessment pattern */}
      <section>
        <h2 className="section-title mb-4">Assessment Pattern</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card-3d p-5 group">
            <div className="icon-3d-box h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white mb-4">
              <Clock size={24} className="icon-3d icon-3d-float" />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">2 Hours</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Total duration</p>
          </div>
          <div className="card-3d p-5 group">
            <div className="icon-3d-box h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-500 to-purple-600 text-white mb-4">
              <ListChecks size={24} className="icon-3d icon-3d-pulse" />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">50 MCQs</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Multiple choice questions</p>
          </div>
          <div className="card-3d p-5 group">
            <div className="icon-3d-box h-12 w-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white mb-4">
              <Code2 size={24} className="icon-3d icon-3d-float" />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">2 Coding</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Programming questions</p>
          </div>
        </div>
        <div className="card-3d p-5 mt-4 flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-900/60 shadow-sm">
          <div className="icon-3d-box h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white">
            <TrendingUp size={20} className="icon-3d icon-3d-pulse" />
          </div>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            Difficulty: Easy to Medium. You only need to know the fundamentals. This is NOT a placement interview.
          </p>
        </div>
      </section>

      {/* Companies */}
      <section>
        <h2 className="section-title mb-4 flex items-center gap-2">
          <div className="icon-3d-box h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
            <Building2 size={18} className="icon-3d icon-3d-pulse" />
          </div>
          Companies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {companies.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-3d p-4 text-center group cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 block transition-all"
            >
              <p className="font-semibold text-sm group-hover:scale-105 transition-transform">{c.name}</p>
            </a>
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
                className="card-3d p-5 text-left group"
              >
                <div className={`icon-3d-box h-12 w-12 rounded-2xl bg-gradient-to-br ${q.color} text-white mb-3`}>
                  <Icon size={24} className="icon-3d group-hover:scale-110" />
                </div>
                <p className="font-bold text-base">{q.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{q.desc}</p>
                <ArrowRight size={16} className="mt-3 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1.5 transition-all" />
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
                className="card-3d p-5 text-left group"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`icon-3d-box h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br ${s.color} text-white`}>
                    <Icon size={22} className="icon-3d group-hover:scale-110" />
                  </div>
                  <p className="font-bold text-base leading-snug">{s.name}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{s.description}</p>
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-3">{s.topics.length} topics · {allMCQs.filter((m) => m.subject === s.id).length} MCQs</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="card-3d p-8 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white border-0 shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="group">
            <p className="text-4xl font-extrabold tracking-tight group-hover:scale-110 transition-transform">{totalMCQs}+</p>
            <p className="text-xs font-semibold text-sky-100 uppercase tracking-wider mt-1">MCQs with explanations</p>
          </div>
          <div className="group">
            <p className="text-4xl font-extrabold tracking-tight group-hover:scale-110 transition-transform">{totalCoding}+</p>
            <p className="text-xs font-semibold text-sky-100 uppercase tracking-wider mt-1">Coding questions</p>
          </div>
          <div className="group">
            <p className="text-4xl font-extrabold tracking-tight group-hover:scale-110 transition-transform">6</p>
            <p className="text-xs font-semibold text-sky-100 uppercase tracking-wider mt-1">Mock tests</p>
          </div>
          <div className="group">
            <p className="text-4xl font-extrabold tracking-tight group-hover:scale-110 transition-transform">100%</p>
            <p className="text-xs font-semibold text-sky-100 uppercase tracking-wider mt-1">Free · No login</p>
          </div>
        </div>
      </section>
    </div>
  );
}
