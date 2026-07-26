import { Link2, ExternalLink } from 'lucide-react';
import { externalResources } from '@/data/misc';

export function ResourcesPage() {
  const categories = [...new Set(externalResources.map((r) => r.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-3">
          <div className="icon-3d-box h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white">
            <Link2 size={22} className="icon-3d icon-3d-float" />
          </div>
          External Resources
        </h1>
        <p className="text-slate-500 mt-1">Direct links to trusted learning sites for deeper study.</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="font-bold text-lg mb-3">{cat}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalResources
              .filter((r) => r.category === cat)
              .map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-3d p-5 group"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.name}</p>
                    <ExternalLink size={18} className="text-slate-400 group-hover:text-sky-500 group-hover:scale-110 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 truncate font-mono">{r.url}</p>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
