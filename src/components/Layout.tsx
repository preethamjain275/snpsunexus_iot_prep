import { useState, type ReactNode } from 'react';
import { Menu, Moon, Sun, Search, X, GraduationCap, Bookmark } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useRouter, navigate } from '@/hooks/useRouter';
import { mainNav } from './nav';
import { SearchModal } from './SearchModal';
import { Footer } from './Footer';
import { useProgress } from '@/hooks/useLocalStorage';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const { route } = useRouter();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useProgress();

  const isActive = (path: string) =>
    path === '/' ? route.path === '/' : route.path.startsWith(path);

  return (
    <div className="min-h-screen">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
                <GraduationCap size={20} />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold leading-tight">IOT Crash Prep</p>
                <p className="text-[11px] text-slate-500 leading-tight">Built by Team SNPSU NEXUS</p>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.slice(0, 7).map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Menu"
                className="lg:hidden p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile progress bar */}
      {count > 0 && (
        <div className="fixed top-16 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 z-30">
          <div
            className="h-full bg-sky-500 transition-all"
            style={{ width: `${Math.min(100, (count / 600) * 100)}%` }}
          />
        </div>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 pb-24 lg:pb-12 animate-fade-in">
        {children}
        <Footer />
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg">
        <div className="grid grid-cols-5">
          {[
            mainNav[0], mainNav[1], mainNav[3], mainNav[5], mainNav[9],
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${
                  isActive(item.path)
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[80%] bg-white dark:bg-slate-950 shadow-2xl animate-fade-in overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <p className="font-bold">Menu</p>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={20} />
              </button>
            </div>
            <div className="p-2">
              {mainNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                      isActive(item.path)
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  navigate('/bookmarks');
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Bookmark size={18} />
                Bookmarks
              </button>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
