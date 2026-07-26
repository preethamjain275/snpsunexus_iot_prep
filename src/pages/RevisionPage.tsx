import { useState } from 'react';
import { StickyNote, Download, Clock } from 'lucide-react';
import { revisionNotes } from '@/data/revision';

export function RevisionPage() {
  const [mode, setMode] = useState<'2min' | '5min' | '10min'>('2min');

  const notes = revisionNotes.filter((n) => n.mode === mode);

  const downloadPDF = () => {
    const content = revisionNotes
      .map((n) => `=== ${n.title} (${n.mode}) ===\n\n${n.points.map((p) => `• ${p}`).join('\n')}`)
      .join('\n\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iot-crash-prep-revision-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const modes = [
    { id: '2min' as const, label: '2 Minute', desc: 'Quick scan' },
    { id: '5min' as const, label: '5 Minute', desc: 'Deep revision' },
    { id: '10min' as const, label: '10 Minute', desc: 'Full revision' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="section-title flex items-center gap-3">
            <div className="icon-3d-box h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white">
              <StickyNote size={22} className="icon-3d icon-3d-float" />
            </div>
            Revision Notes
          </h1>
          <p className="text-slate-500 mt-1">Only the important concepts. Pick a time budget and revise.</p>
        </div>
        <button onClick={downloadPDF} className="btn-outline">
          <Download size={16} className="icon-3d-pulse" /> Download Notes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-lg">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`card-3d p-4 text-center group ${
              mode === m.id ? 'ring-2 ring-sky-500 bg-sky-50 dark:bg-sky-950/40' : ''
            }`}
          >
            <div className="icon-3d-box h-9 w-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 mx-auto mb-2">
              <Clock size={18} className="icon-3d icon-3d-float" />
            </div>
            <p className="font-bold text-sm">{m.label}</p>
            <p className="text-xs text-slate-500 font-medium">{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="card p-5">
            <p className="font-bold text-lg mb-3">{note.title}</p>
            <ul className="space-y-2.5">
              {note.points.map((p, i) => (
                <li key={i} className="text-sm flex gap-2 leading-relaxed">
                  <span className="text-sky-500 shrink-0 font-bold">•</span>
                  <span className="text-slate-600 dark:text-slate-300">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
