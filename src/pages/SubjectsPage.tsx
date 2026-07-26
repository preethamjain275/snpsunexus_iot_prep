import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { subjects } from '@/data/subjects';
import { allMCQs } from '@/data/mcq';
import { navigate } from '@/hooks/useRouter';

export function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">All Subjects</h1>
        <p className="text-slate-500 mt-1">Theory, MCQs, short notes, and interview questions for each subject.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((s) => {
          const Icon = (Icons as unknown as Record<string, typeof Icons.BookOpen>)[s.icon] || Icons.BookOpen;
          const count = allMCQs.filter((m) => m.subject === s.id).length;
          return (
            <button
              key={s.id}
              onClick={() => navigate(`/subject/${s.id}`)}
              className="card p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white mb-4`}>
                <Icon size={24} />
              </div>
              <p className="font-bold text-lg">{s.name}</p>
              <p className="text-sm text-slate-500 mt-1">{s.description}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-slate-400">{s.topics.length} topics · {count} MCQs</p>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
