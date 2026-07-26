import { Link2, ExternalLink } from 'lucide-react';
import { externalResources } from '@/data/misc';

export function ResourcesPage() {
  const categories = [...new Set(externalResources.map((r) => r.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <Link2 size={26} /> External Resources
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
                  className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.name}</p>
                    <ExternalLink size={18} className="text-slate-400 group-hover:text-sky-500" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 truncate">{r.url}</p>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
