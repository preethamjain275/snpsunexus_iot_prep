import { Bookmark, Trash2 } from 'lucide-react';
import { allMCQs } from '@/data/mcq';
import { MCQCard } from '@/components/MCQCard';
import { useBookmarks, useProgress } from '@/hooks/useLocalStorage';
import { navigate } from '@/hooks/useRouter';

export function BookmarksPage() {
  const { ids, toggle } = useBookmarks();
  const { reset } = useProgress();
  const bookmarked = allMCQs.filter((m) => ids.includes(m.id));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Bookmark size={26} /> Bookmarks
          </h1>
          <p className="text-slate-500 mt-1">{bookmarked.length} saved questions across all subjects.</p>
        </div>
        {ids.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Remove all bookmarks?')) ids.forEach((id) => toggle(id));
            }}
            className="btn-outline text-red-600 dark:text-red-400 border-red-200 dark:border-red-900"
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      {bookmarked.length === 0 ? (
        <div className="card p-12 text-center">
          <Bookmark size={40} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-500 mb-4">No bookmarks yet. Tap the bookmark icon on any question to save it here.</p>
          <button onClick={() => navigate('/subjects')} className="btn-primary">Browse Questions</button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarked.map((m, i) => (
            <MCQCard key={m.id} mcq={m} index={i} showSubject />
          ))}
        </div>
      )}
    </div>
  );
}
