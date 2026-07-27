import { ExternalLink } from 'lucide-react';
import { externalResources } from '@/data/misc';

export function ResourcesPage() {
  const categories = [...new Set(externalResources.map((r) => r.category))];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          EXTERNAL RESOURCES
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Best free study links
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
          Direct links to the most trusted free platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const items = externalResources.filter((r) => r.category === cat);
          return (
            <div
              key={cat}
              className="card-3d p-6 bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                  {cat}
                </h2>
                <div className="space-y-3">
                  {items.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-800/90 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all duration-200 group"
                    >
                      <span className="font-medium text-sm text-slate-700 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {r.name}
                      </span>
                      <ExternalLink
                        size={16}
                        className="text-slate-400 dark:text-slate-500 group-hover:text-sky-500 group-hover:scale-110 transition-all shrink-0 ml-2"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
