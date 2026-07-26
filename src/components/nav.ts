import {
  Home, BookOpen, Code, ClipboardCheck, Shuffle, StickyNote,
  MessageCircleQuestion, Link2, HelpCircle, Zap, GraduationCap, Bookmark,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: typeof Home;
}

export const mainNav: NavItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Subjects', path: '/subjects', icon: BookOpen },
  { label: 'Coding', path: '/coding', icon: Code },
  { label: 'Mock Tests', path: '/mock', icon: ClipboardCheck },
  { label: 'Random MCQ', path: '/random', icon: Shuffle },
  { label: 'Revision', path: '/revision', icon: StickyNote },
  { label: 'Interview', path: '/interview', icon: MessageCircleQuestion },
  { label: 'Resources', path: '/resources', icon: Link2 },
  { label: 'FAQ', path: '/faq', icon: HelpCircle },
  { label: 'Last Minute', path: '/last-minute', icon: Zap },
];

export const subjectNav = [
  { label: 'Java', path: '/subject/java', icon: GraduationCap },
  { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
];
