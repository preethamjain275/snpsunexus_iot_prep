import { jsPDF } from 'jspdf';
import type { RevisionNote } from '@/types';
import { getTopicComplexity } from '@/utils/complexity';
import { allMCQs } from '@/data/mcq';

export function generateRevisionPDF(mode: '2min' | '5min' | '10min', notes: RevisionNote[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin; // 180
  let y = 20;

  // Helper to check page boundary and insert page breaks
  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin + 10;
      drawPageBorder();
    }
  };

  const drawPageBorder = () => {
    // Top accent bar
    doc.setFillColor(14, 165, 233); // Sky-500 (#0ea5e9)
    doc.rect(margin, margin, contentWidth, 1.5, 'F');
  };

  // Helper to write styled text block
  const writeText = (
    text: string,
    options: {
      fontSize?: number;
      fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
      color?: [number, number, number];
      spacing?: number;
      indent?: number;
    } = {}
  ) => {
    const {
      fontSize = 10,
      fontStyle = 'normal',
      color = [51, 65, 85], // Slate-700
      spacing = 5,
      indent = 0,
    } = options;

    doc.setFont('Helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const activeWidth = contentWidth - indent;
    const lines = doc.splitTextToSize(text, activeWidth);
    const lineHeight = (fontSize * 0.352778) * 1.3; // Convert pt to mm and add multiplier
    const totalHeight = lines.length * lineHeight;

    checkPageOverflow(totalHeight);

    lines.forEach((line: string) => {
      doc.text(line, margin + indent, y);
      y += lineHeight;
    });

    y += spacing;
  };

  // Helper for bullet points
  const writeBulletPoint = (text: string, spacing = 3) => {
    const fontSize = 10;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(fontSize);
    doc.setTextColor(14, 165, 233); // Sky-500 bullet
    
    checkPageOverflow(5);
    doc.text('•', margin + 2, y);

    writeText(text, {
      fontSize,
      fontStyle: 'normal',
      color: [71, 85, 105], // Slate-600
      spacing,
      indent: 8,
    });
  };

  // Helper for complexity section
  const writeComplexityInfo = (worst: string, space: string, explanation: string) => {
    const boxHeight = 15;
    checkPageOverflow(boxHeight + 5);

    // Draw background block
    doc.setFillColor(248, 250, 252); // Slate-50 (#f8fafc)
    doc.setDrawColor(226, 232, 240); // Slate-200 (#e2e8f0)
    doc.rect(margin, y, contentWidth, boxHeight, 'FD');

    // Inner text positioning
    const textY = y + 5;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(3, 105, 161); // Sky-700
    doc.text('Time Complexity:', margin + 4, textY);
    doc.setFont('Helvetica', 'normal');
    doc.text(worst, margin + 32, textY);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(109, 40, 217); // Purple-700
    doc.text('Space Complexity:', margin + 90, textY);
    doc.setFont('Helvetica', 'normal');
    doc.text(space, margin + 118, textY);

    // Explanation line
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Analysis: ${explanation}`, margin + 4, textY + 5);

    y += boxHeight + 6;
  };

  // 1. PAGE 1 HEADER
  drawPageBorder();
  y = margin + 10;

  // Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text('IoT Crash Prep', margin, y);
  y += 8;

  // Subtitle
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139); // Slate-500
  const modeLabel = mode === '2min' ? '2-Minute' : mode === '5min' ? '5-Minute' : '10-Minute';
  doc.text(`Revision Notes & Practice Questions — Mode: ${modeLabel}`, margin, y);
  y += 6;

  // Date line
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.text(`Generated on ${dateStr}`, margin, y);
  
  // Divider
  y += 4;
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.line(margin, y, margin + contentWidth, y);
  y += 8;

  // 2. REVISION NOTES SECTION
  writeText('1. Revision Summary Points', { fontSize: 14, fontStyle: 'bold', color: [15, 23, 42] });
  y += 2;

  notes.forEach((note) => {
    writeText(note.title, { fontSize: 11, fontStyle: 'bold', color: [14, 165, 233], spacing: 4 });

    note.points.forEach((p) => {
      writeBulletPoint(p);
    });

    const comp = getTopicComplexity({ name: note.title }, note.subject);
    if (comp) {
      writeComplexityInfo(comp.worstCase, comp.spaceComplexity, comp.explanation);
    }
    y += 3;
  });

  // Page break to start Questions on a clean page
  doc.addPage();
  y = margin + 10;
  drawPageBorder();

  // 3. PRACTICE QUESTIONS SECTION
  writeText('2. Practice Questions & Explanations', { fontSize: 14, fontStyle: 'bold', color: [15, 23, 42] });
  writeText('Detailed multiple choice questions with highlighted answers and explanations to test your concept mastery.', {
    fontSize: 9.5,
    fontStyle: 'normal',
    color: [100, 116, 139],
    spacing: 8,
  });

  // Extract unique subjects from notes (excluding 'general')
  const subjects = Array.from(new Set(notes.map((n) => n.subject).filter((s) => s !== 'general')));
  
  // If no subjects found or only general, use a standard set of subjects to fetch questions
  const subjectsToFetch = subjects.length > 0 ? subjects : ['java', 'python', 'dbms', 'os', 'dsa', 'cn'];

  let questionCounter = 1;

  subjectsToFetch.forEach((subj) => {
    // Find questions for this subject
    const subjQs = allMCQs.filter((q) => q.subject === subj);
    if (subjQs.length === 0) return;

    // Take top 3 questions for this subject
    const selectedQs = subjQs.slice(0, 3);

    const subjectLabels: Record<string, string> = {
      java: 'Java Programming',
      python: 'Python Programming',
      dbms: 'Database Management Systems',
      os: 'Operating Systems',
      dsa: 'Data Structures & Algorithms',
      cn: 'Computer Networks',
    };
    
    writeText(`Subject: ${subjectLabels[subj as string] || subj.toUpperCase()}`, {
      fontSize: 12,
      fontStyle: 'bold',
      color: [79, 70, 229], // Indigo-600
      spacing: 6,
    });

    selectedQs.forEach((q) => {
      // Print Question Text
      writeText(`Q${questionCounter}. ${q.question}`, {
        fontSize: 10,
        fontStyle: 'bold',
        color: [15, 23, 42],
        spacing: 4,
        indent: 2,
      });

      // Print Options
      q.options.forEach((opt, idx) => {
        const isCorrect = idx === q.answer;
        const prefix = isCorrect ? '[✓]' : '[ ]';
        const optLetter = String.fromCharCode(65 + idx); // A, B, C, D
        
        doc.setFont('Helvetica', isCorrect ? 'bold' : 'normal');
        doc.setFontSize(9);
        doc.setTextColor(isCorrect ? 16 : 71, isCorrect ? 185 : 85, isCorrect ? 129 : 105); // green or slate

        const optText = `${prefix} ${optLetter}) ${opt}`;
        writeText(optText, {
          fontSize: 9,
          fontStyle: isCorrect ? 'bold' : 'normal',
          color: isCorrect ? [16, 185, 129] : [71, 85, 105],
          spacing: 2,
          indent: 6,
        });
      });

      y += 1.5;

      // Print Correct Option confirmation
      writeText(`Correct Option: ${String.fromCharCode(65 + q.answer)}`, {
        fontSize: 9,
        fontStyle: 'bold',
        color: [16, 185, 129], // emerald-600
        spacing: 2,
        indent: 6,
      });

      // Print Explanation
      writeText(`Explanation: ${q.explanation}`, {
        fontSize: 9,
        fontStyle: 'italic',
        color: [71, 85, 105], // Slate-600
        spacing: 8,
        indent: 6,
      });

      questionCounter++;
    });

    y += 4; // Spacing between subjects
  });

  // 4. DRAW FOOTERS AND WATERMARKS ON ALL PAGES
  const totalPages = doc.internal.pages.length - 1; // last entry is empty/system index in jsPDF
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Draw watermark (25% opacity)
    doc.saveGraphicsState();
    const gState = new (doc as any).GState({ opacity: 0.25 });
    doc.setGState(gState);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(60);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text('SNPSU Nexus', 105, 148, {
      align: 'center',
      angle: 45,
    });
    doc.restoreGraphicsState();
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate-400
    
    // Bottom line divider
    doc.setDrawColor(241, 245, 249); // Slate-100
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);
    
    // Footer text
    doc.text('IoT Crash Prep — Revision Notes & Practice Questions', margin, pageHeight - 8);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 15, pageHeight - 8);
  }

  // Save PDF
  doc.save(`iot-crash-prep-revision-notes-${mode}.pdf`);
}
