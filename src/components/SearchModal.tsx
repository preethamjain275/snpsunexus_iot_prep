import { useEffect, useMemo, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchMCQs } from '@/data/mcq';
import { navigate } from '@/hooks/useRouter';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => (query ? searchMCQs(query).slice(0, 20) : []), [query]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl card p-0 overflow-hidden animate-fade-in">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <Search size={20} className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 600+ questions across all subjects..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              Type to search questions, topics, or answers across all subjects.
            </p>
          )}
          {query && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              No questions found for "{query}".
            </p>
          )}
          {results.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                navigate(`/subject/${m.subject}`);
                onClose();
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{m.question}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize">
                  {m.subject} · {m.topic}
                </p>
              </div>
              <ArrowRight size={16} className="shrink-0 mt-1 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
