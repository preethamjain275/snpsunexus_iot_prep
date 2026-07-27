import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from '@/hooks/useRouter';
import { Layout } from '@/components/Layout';

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const SubjectsPage = lazy(() => import('@/pages/SubjectsPage').then(m => ({ default: m.SubjectsPage })));
const SubjectPage = lazy(() => import('@/pages/SubjectPage').then(m => ({ default: m.SubjectPage })));
const CodingPage = lazy(() => import('@/pages/CodingPage').then(m => ({ default: m.CodingPage })));
const MockTestPage = lazy(() => import('@/pages/MockTestPage').then(m => ({ default: m.MockTestPage })));
const RandomMCQPage = lazy(() => import('@/pages/RandomMCQPage').then(m => ({ default: m.RandomMCQPage })));
const RevisionPage = lazy(() => import('@/pages/RevisionPage').then(m => ({ default: m.RevisionPage })));
const InterviewPage = lazy(() => import('@/pages/InterviewPage').then(m => ({ default: m.InterviewPage })));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const LastMinutePage = lazy(() => import('@/pages/LastMinutePage').then(m => ({ default: m.LastMinutePage })));
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage').then(m => ({ default: m.BookmarksPage })));

function App() {
  const { route } = useRouter();
  const path = route.path;

  let page;
  if (path === '/' || path === '') page = <HomePage />;
  else if (path === '/subjects') page = <SubjectsPage />;
  else if (path.startsWith('/subject/')) page = <SubjectPage subjectId={path.split('/subject/')[1]} />;
  else if (path === '/coding') page = <CodingPage />;
  else if (path === '/mock') page = <MockTestPage />;
  else if (path === '/random') page = <RandomMCQPage />;
  else if (path === '/revision') page = <RevisionPage />;
  else if (path === '/interview') page = <InterviewPage />;
  else if (path === '/resources') page = <ResourcesPage />;
  else if (path === '/faq') page = <FAQPage />;
  else if (path === '/last-minute') page = <LastMinutePage />;
  else if (path === '/bookmarks') page = <BookmarksPage />;
  else page = <HomePage />;

  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <div className="h-10 w-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading Page...</p>
            </div>
          }
        >
          {page}
        </Suspense>
      </Layout>
      <Analytics />
    </>
  );
}

export default App;
