import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '@/data/misc';

export function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title flex items-center gap-2">
          <HelpCircle size={26} /> Frequently Asked Questions
        </h1>
        <p className="text-slate-500 mt-1">Everything you need to know about the diagnostic assessment.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 p-5 text-left"
            >
              <p className="font-semibold">{f.q}</p>
              {open === i ? <ChevronUp size={20} className="text-slate-400 shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
