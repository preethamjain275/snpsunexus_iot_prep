import { Analytics } from '@vercel/analytics/react';
import { useRouter } from '@/hooks/useRouter';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { SubjectsPage } from '@/pages/SubjectsPage';
import { SubjectPage } from '@/pages/SubjectPage';
import { CodingPage } from '@/pages/CodingPage';
import { MockTestPage } from '@/pages/MockTestPage';
import { RandomMCQPage } from '@/pages/RandomMCQPage';
import { RevisionPage } from '@/pages/RevisionPage';
import { InterviewPage } from '@/pages/InterviewPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { FAQPage } from '@/pages/FAQPage';
import { LastMinutePage } from '@/pages/LastMinutePage';
import { BookmarksPage } from '@/pages/BookmarksPage';

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
      <Layout>{page}</Layout>
      <Analytics />
    </>
  );
}

export default App;
