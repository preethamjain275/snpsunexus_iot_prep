import type { FaqItem, ExternalResource } from '@/types';

export const faqs: FaqItem[] = [
  { q: 'What is the IOT Diagnostic Assessment pattern?', a: '2 hours total: 50 MCQs and 2 coding questions, with easy to medium difficulty across Java, Python, DBMS, OS, DSA, and Computer Networks.' },
  { q: 'How much time do I need to prepare?', a: 'This site is designed for 1-2 days of last-minute preparation. Use the 2-Day Crash Course and Last Minute Preparation modes.' },
  { q: 'Do I need to login or sign up?', a: 'No. The entire site is free and requires no account. Your bookmarks and progress are saved on your device only.' },
  { q: 'Which companies conduct this assessment?', a: 'Tap Academy, HCL GUVI, PrepInsta, Atom, HCL Tech, and Tripillar.' },
  { q: 'How many MCQs are available?', a: 'Over 600 MCQs across all six subjects, each with a correct answer and a short explanation.' },
  { q: 'Can I take mock tests?', a: 'Yes. There are subject-wise mock tests of 50 questions each, plus a random MCQ generator for 20, 50, or 100 questions.' },
  { q: 'Does the site work offline?', a: 'Yes. It is a PWA with offline support — once loaded, you can study without an internet connection.' },
  { q: 'Will my progress be saved?', a: 'Yes. Bookmarks and your progress tracker are stored locally in your browser, so they persist between visits on the same device.' },
  { q: 'Is this a placement interview?', a: 'No. You only need the fundamentals. This is a diagnostic assessment, not a placement interview — focus on basics.' },
  { q: 'Can I download the notes?', a: 'Yes. Use the Download Notes as PDF feature on the Revision Notes page to save notes for offline study.' },
];

export const externalResources: ExternalResource[] = [
  { name: 'LeetCode - Easy Problems', url: 'https://leetcode.com/problemset/all/?difficulty=EASY', category: 'Coding Practice' },
  { name: 'HackerRank - 10 Days of Python', url: 'https://www.hackerrank.com/domains/tutorials/10-days-of-python', category: 'Coding Practice' },
  { name: 'GeeksforGeeks - Explore', url: 'https://www.geeksforgeeks.org/explore', category: 'Coding Practice' },
  { name: 'W3Schools - Java', url: 'https://www.w3schools.com/java/', category: 'Java' },
  { name: 'GeeksforGeeks - Java', url: 'https://www.geeksforgeeks.org/java/', category: 'Java' },
  { name: 'W3Schools - Python', url: 'https://www.w3schools.com/python/', category: 'Python' },
  { name: 'GeeksforGeeks - Python', url: 'https://www.geeksforgeeks.org/python-programming-language-tutorial/', category: 'Python' },
  { name: 'GeeksforGeeks - DBMS', url: 'https://www.geeksforgeeks.org/dbms/', category: 'DBMS' },
  { name: 'GeeksforGeeks - Operating Systems', url: 'https://www.geeksforgeeks.org/operating-systems/', category: 'Operating Systems' },
  { name: 'GeeksforGeeks - Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/', category: 'Data Structures' },
  { name: 'GeeksforGeeks - Computer Networks', url: 'https://www.geeksforgeeks.org/computer-network-tutorials/', category: 'Computer Networks' },
  { name: 'W3Schools - SQL', url: 'https://www.w3schools.com/sql/', category: 'SQL' },
];
