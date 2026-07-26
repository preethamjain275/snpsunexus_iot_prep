import { useState } from 'react';
import { Shuffle, RefreshCw } from 'lucide-react';
import { randomMCQs } from '@/data/mcq';
import { MCQCard } from '@/components/MCQCard';

export function RandomMCQPage() {
  const [count, setCount] = useState<number | null>(null);
  const [seed, setSeed] = useState(0);

  const mcqs = count ? randomMCQs(count) : [];

  const generate = (n: number) => {
    setCount(n);
    setSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <Shuffle size={26} /> Random MCQ Generator
        </h1>
        <p className="text-slate-500 mt-1">Generate a random set of MCQs from all subjects. Unlimited practice.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-lg">
        {[20, 50, 100].map((n) => (
          <button
            key={n}
            onClick={() => generate(n)}
            className={`card p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${
              count === n ? 'ring-2 ring-sky-500' : ''
            }`}
          >
            <p className="text-3xl font-extrabold text-sky-600">{n}</p>
            <p className="text-sm text-slate-500 mt-1">MCQs</p>
          </button>
        ))}
      </div>

      {count && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{mcqs.length} random questions</p>
            <button onClick={() => generate(count)} className="btn-outline">
              <RefreshCw size={16} /> New Set
            </button>
          </div>
          {mcqs.map((m, i) => (
            <MCQCard key={`${m.id}-${seed}`} mcq={m} index={i} showSubject />
          ))}
        </div>
      )}
    </div>
  );
}
