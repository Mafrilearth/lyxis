# Lyxis — TOEFL ITP® Diagnostic Simulation

> Calibrated score prediction and verified institutional credentials.

---

## 1. System Overview

> **Current Status:** `v1.0.0 — Phase 1: Core Functional Release`  
> Focuses on the core end-to-end examination journey: Candidate onboarding, interactive CBT testing, automated 310–677 psychometric scoring, and instant cryptographic QR verification. (Advanced AI proctoring scheduled for Phase 2).

### Core Target Cohorts

- **Scholarship Candidates:** Minimum cutoffs (475, 500, 550+) for international funding programs (Fulbright, Chevening, AAS, DAAD, LPDP).
- **Degree Clearance:** Undergraduate comprehensive exam and postgraduate defense prerequisites (450–500).
- **Professional & Corporate:** Standardized workforce recruitment and career advancement benchmarks.

---

## 2. Active Design System Tokens

### A. Color Palette

| Token       | Name              | HEX       | HSL                  | Applied In                                           |
| :---------- | :---------------- | :-------- | :------------------- | :--------------------------------------------------- |
| **Canvas**  | Obsidian Basalt   | `#07090E` | `hsl(224, 71%, 4%)`  | App background, exam console                         |
| **Primary** | Prussian Cobalt   | `#1D4ED8` | `hsl(221, 83%, 53%)` | Primary buttons, active tabs, selected answers       |
| **Text**    | Pure Alabaster    | `#F8FAFC` | `hsl(210, 40%, 98%)` | High-contrast copy and headings                      |
| **Success** | Verdigris Emerald | `#059669` | `hsl(160, 84%, 39%)` | Score qualification, verified credentials, QR tokens |
| **Border**  | Slate Graphite    | `#1E293B` | `hsl(217, 33%, 17%)` | Dividers, card borders, table outlines               |

### B. Typography Hierarchy

Configured in `src/app/layout.tsx`:
- **Instrument Sans** (`--font-instrument-sans`): Headings, navigation, buttons, and UI controls.
- **Newsreader** (`--font-newsreader`): Reading comprehension stimulus passages and certificate body.
- **Geist Mono** (`--font-geist-mono`): Countdown timers, score values (310–677), and cryptographic verification hashes.

---

## 3. Examination Specification (Form A)

- **Total Duration:** 115 Minutes (Strict independent section countdowns)
- **Total Questions:** 140 Items
- **Scoring Doctrine:** Zero-penalty (no negative deduction for incorrect answers)

| Section | Title                          | Questions | Duration | Rules                                                 |
| :-----: | :----------------------------- | :-------: | :------: | :---------------------------------------------------- |
|  **1**  | Listening Comprehension        | 50 items  | 35 mins  | Single-play audio stream; strictly no pause or replay |
|  **2**  | Structure & Written Expression | 40 items  | 25 mins  | 15 sentence completion + 25 error identification      |
|  **3**  | Reading Comprehension          | 50 items  | 55 mins  | 5 academic passages, 10 questions per passage         |

### Psychometric Scoring Formula

$$\text{Final Score} = \left\lfloor \left( \frac{\text{Scaled}_L(R_L) + \text{Scaled}_S(R_S) + \text{Scaled}_R(R_R)}{3} \right) \times 10 + 0.5 \right\rfloor$$
- **Score Scale:** 310 – 677
- **CEFR Bands:** **C1** (≥ 627) │ **B2** (543–626) │ **B1** (460–542) │ **A2** (< 460)

---

## 4. Application Architecture & Active Routes

```
src/
├── actions/
│   └── exam.ts             # Server Actions: startExamAction, saveAnswerAction, submitExamAction
├── app/
│   ├── /                   # Landing page (Floating Nav, Hero, Bento, 3-Step Flow, FAQ, CTA)
│   ├── login/              # Candidate authentication
│   ├── register/           # Candidate registration
│   ├── dashboard/          # Candidate console & test launcher
│   ├── exam/[attemptId]/   # Secure CBT examination console
│   ├── result/[attemptId]/ # Score report & printable certificate
│   ├── verify/[token]/     # Public QR certificate verification
│   └── admin/              # Admin console (Metrics, test attempts, packages)
├── components/
│   ├── admin/              # Admin sidebar, attempt table, telemetry charts
│   ├── auth/               # Login & register forms, auth shell
│   ├── dashboard/          # Session cards and launcher widgets
│   ├── exam/               # Audio player, countdown timer, question card, matrix, anti-cheat
│   ├── landing/            # Floating navigation, bento features, 3-step flow, FAQ
│   ├── providers/          # ThemeProvider
│   ├── result/             # Certificate view, skill radar chart, breakdown
│   ├── shared/             # ThemeToggle
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── constants/          # Navigation and app constants
│   ├── data/               # Form A 140-item question bank & passages
│   ├── psychometrics/      # Scoring tables, conversion logic, HMAC-SHA256
│   ├── store/              # Zustand exam state machine
│   ├── supabase/           # Client/server database connection
│   └── utils.ts            # Class merging utility
└── types/
    ├── attempt.ts          # ExamAttempt, CertificateRecord, Action contracts
    └── exam.ts             # Section, Question, Stimulus types
```

---

## 5. Security & Anti-Cheat Architecture

- **Hardware & Kiosk Lockdown:** Enforced fullscreen mode, dual-monitor blocking, and neutralization of `Ctrl+C`, `Ctrl+V`, right-click, and DevTools (`F12`).
- **Visual & Acoustic AI Telemetry:** Continuous webcam face tracking (flags multiple faces / candidate absence), gaze tracking, and microphone Voice Activity Detection (VAD).
- **Forensic Analytics & Anti-Bypass:** Item-time latency forensics (flags sub-second reading responses), single-session concurrency enforcement, single-play audio locking, Virtual Machine (VM) detection, remote desktop detection, and forensic steganographic question watermarking.
- **Cryptographic Verification:** HMAC-SHA256 signature verification on every certificate record and public QR verification at `/verify/[token]` via `crypto.timingSafeEqual`.
- **Integrity Trust Index:** Automated 0–100% honesty score calculated from recorded telemetry events.

---

## 6. Commands

```bash
# Install dependencies
pnpm install

# Run local development server (http://localhost:3000)
pnpm dev

# Build production bundle
pnpm build

# Execute strict type check (0 errors required)
pnpm exec tsc --noEmit

# Execute Biome linter & formatter (0 errors required)
pnpm biome check src/
```
