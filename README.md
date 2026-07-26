<div align="center">

<!-- Futuristic Animated SVG Header Banner -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>

    <!-- Neon Glow Blue-Purple -->
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <!-- Cyan Glow -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>

    <!-- Filters -->
    <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="intenseGlow">
      <feGaussianBlur stdDeviation="10" result="blur1" />
      <feGaussianBlur stdDeviation="4" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <style>
    @keyframes gridPulse {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.35; }
    }
    @keyframes scanline {
      0% { transform: translateY(-240px); }
      100% { transform: translateY(240px); }
    }
    @keyframes textGlow {
      0%, 100% { filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8)); }
      50% { filter: drop-shadow(0 0 25px rgba(192, 132, 252, 0.95)); }
    }
    @keyframes circuitFlow {
      0% { stroke-dashoffset: 600; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes particleFloat {
      0% { transform: translateY(0px) scale(1); opacity: 0.3; }
      50% { transform: translateY(-15px) scale(1.3); opacity: 0.9; }
      100% { transform: translateY(0px) scale(1); opacity: 0.3; }
    }
    @keyframes borderPulse {
      0%, 100% { stroke: #38bdf8; opacity: 0.6; }
      50% { stroke: #c084fc; opacity: 1; }
    }

    .grid-bg { animation: gridPulse 4s infinite ease-in-out; }
    .scan-line { animation: scanline 8s linear infinite; }
    .main-title { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 900; animation: textGlow 3s infinite ease-in-out; }
    .circuit-path { stroke-dasharray: 20 10; animation: circuitFlow 20s linear infinite; }
    .p1 { animation: particleFloat 3s infinite ease-in-out; }
    .p2 { animation: particleFloat 4.5s infinite ease-in-out 1s; }
    .p3 { animation: particleFloat 3.8s infinite ease-in-out 2s; }
    .outer-border { animation: borderPulse 4s infinite ease-in-out; }
  </style>

  <!-- Base Card -->
  <rect width="900" height="240" rx="16" fill="url(#bgGrad)" />
  <rect width="896" height="236" x="2" y="2" rx="14" fill="none" class="outer-border" stroke-width="2" />

  <!-- Cyber Grid Background -->
  <g class="grid-bg" stroke="#38bdf8" stroke-width="0.5" opacity="0.2">
    <path d="M0 30 H900 M0 60 H900 M0 90 H900 M0 120 H900 M0 150 H900 M0 180 H900 M0 210 H900" />
    <path d="M60 0 V240 M120 0 V240 M180 0 V240 M240 0 V240 M300 0 V240 M360 0 V240 M420 0 V240 M480 0 V240 M540 0 V240 M600 0 V240 M660 0 V240 M720 0 V240 M780 0 V240 M840 0 V240" />
  </g>

  <!-- Futuristic Circuit Lines -->
  <path class="circuit-path" d="M 30,40 L 150,40 L 190,80 L 710,80 L 750,40 L 870,40 M 30,200 L 220,200 L 260,160 L 640,160 L 680,200 L 870,200" fill="none" stroke="url(#cyanGrad)" stroke-width="1.5" opacity="0.5" />

  <!-- Glowing Particles -->
  <circle cx="120" cy="70" r="3" fill="#38bdf8" class="p1" filter="url(#neonBlur)" />
  <circle cx="780" cy="170" r="4" fill="#c084fc" class="p2" filter="url(#neonBlur)" />
  <circle cx="450" cy="30" r="2.5" fill="#22d3ee" class="p3" filter="url(#neonBlur)" />
  <circle cx="230" cy="190" r="3.5" fill="#818cf8" class="p1" filter="url(#neonBlur)" />
  <circle cx="670" cy="50" r="3" fill="#38bdf8" class="p2" filter="url(#neonBlur)" />

  <!-- Main Title -->
  <text x="450" y="115" text-anchor="middle" class="main-title" font-size="38" fill="url(#glowGrad)" letter-spacing="4">
    SNPSU NEXUS // IOT PREP
  </text>

  <!-- Subtitle -->
  <text x="450" y="155" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="15" fill="#94a3b8" font-weight="600" letter-spacing="3">
    ⚡ NEXT-GEN DIAGNOSTIC ASSESSMENT CRASH PLATFORM
  </text>

  <!-- Cyber Decorative Accents -->
  <g fill="#38bdf8" opacity="0.8">
    <!-- Top Left Corner Marker -->
    <path d="M 20,20 L 40,20 L 40,23 L 23,23 L 23,40 L 20,40 Z" />
    <!-- Top Right Corner Marker -->
    <path d="M 880,20 L 860,20 L 860,23 L 877,23 L 877,40 L 880,40 Z" />
    <!-- Bottom Left Corner Marker -->
    <path d="M 20,220 L 40,220 L 40,217 L 23,217 L 23,200 L 20,200 Z" />
    <!-- Bottom Right Corner Marker -->
    <path d="M 880,220 L 860,220 L 860,217 L 877,217 L 877,200 L 880,200 Z" />
  </g>

  <!-- Live Status Badge in Header -->
  <rect x="365" y="180" width="170" height="26" rx="13" fill="#0f172a" stroke="#38bdf8" stroke-width="1" opacity="0.9" />
  <circle cx="383" cy="193" r="4" fill="#22c55e" class="p1" />
  <text x="400" y="198" font-family="sans-serif" font-size="11" fill="#38bdf8" font-weight="700" letter-spacing="1">SYSTEM ONLINE</text>
</svg>

<br/>

[![Deployment](https://img.shields.io/badge/Vercel-Live%20Website-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://snpsunexus-iot-prep.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

### 🌐 Live Platform: [https://snpsunexus-iot-prep.vercel.app/](https://snpsunexus-iot-prep.vercel.app/)

</div>

<br/>

## 🌌 Overview

**SNPSU Nexus: IoT Preparation Platform** is a futuristic, high-performance web application engineered to accelerate preparation for **6 Diagnostic Assessments in just 2 Days**. 

Built with React 18, TypeScript, Tailwind CSS, and Vite, the platform provides an ultra-responsive, offline-first experience packed with 600+ curated MCQs, interactive algorithm visualizers, timed mock exams, revision cheat sheets, and technical interview preparation modules.

---

## ⚡ Key Modules & Features

```
  🛸 SNPSU NEXUS CORE ARCHITECTURE
  ├── 🎯 Subject Mastery Module       --> 600+ Categorized MCQs with Explanations
  ├── 💻 Interactive Code Studio      --> Live Algorithm & Circuit Logic Visualizers
  ├── 📝 Timed Mock Assessment        --> Simulated Real-Exam Environment with Analytics
  ├── 🎲 Dynamic MCQ Quizzer          --> Random Assessment Generator & Drill System
  ├── 🚀 Last-Minute Revision Cards   --> High-Yield Concept Cheat Sheets & Formula Cards
  ├── 💼 Technical & HR Interview     --> Real-world Industry Interview Q&A Bank
  ├── 📚 Resource Hub                 --> Curated Notes, Diagrams & Reference Material
  └── 🔖 Local Bookmark System        --> Save Hard Questions Offline (No Login Needed)
```

<br/>

<div align="center">

### 🔮 Interactive Cyber Terminal Simulation

```
[SYSTEM BOOT] Initializing SNPSU Nexus IoT Diagnostic Prep v2.0...
[NETWORK] Connected to https://snpsunexus-iot-prep.vercel.app/
[ANALYTICS] Telemetry & Vercel Web Analytics Online
[DATABASE] 600+ Diagnostic MCQs Loaded into Memory Cache
[STATUS] Ready to Crash Prep 6 Subjects in 48 Hours 🚀
```

</div>

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 18.3` | UI Component Library |
| **Language** | `TypeScript 5.5` | Strict Static Typing |
| **Build System** | `Vite 5.4` | Ultra-fast HMR Bundler |
| **Styling** | `Tailwind CSS 3.4` | Cyber Dark Aesthetic & Micro-animations |
| **Icons** | `Lucide React` | Clean Modern Vector Icons |
| **Database Integration** | `Supabase JS` | Cloud Synchronization Capabilities |
| **Analytics** | `@vercel/analytics` | Real-time Visitor & Engagement Tracking |
| **Deployment** | `Vercel` | Global Edge Network Hosting |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/preethamjain275/snpsunexus_iot_prep.git
   cd project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Futuristic Dev Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📈 Analytics & Performance

This project integrates `@vercel/analytics` for zero-config real-time performance and usage metrics when deployed on Vercel:

```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Layout>{page}</Layout>
      <Analytics />
    </>
  );
}
```

---

<div align="center">

### 🌟 Designed & Built for Maximum Learning Speed 🌟

[🌐 Visit Live Website](https://snpsunexus-iot-prep.vercel.app/) • [🐛 Report Issue](https://github.com/preethamjain275/snpsunexus_iot_prep/issues) • [⭐ Star Repository](https://github.com/preethamjain275/snpsunexus_iot_prep)

---

*SNPSU Nexus © 2026. All rights reserved.*

</div>
