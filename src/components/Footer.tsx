export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 pb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            IOT Diagnostic Assessment Crash Prep
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Prepare for all 6 Diagnostic Assessments in just 2 days.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            Built by Team SNPSU NEXUS
          </p>
        </div>
      </div>
    </footer>
  );
}
