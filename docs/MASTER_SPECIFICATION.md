# Lyxis — Master System Specification

> **Platform:** Lyxis  
> **Measurement Standard:** TOEFL ITP® Level 1 Benchmark (Scaled 310–677) │ CEFR (A2–C1)

---

## 1. Brand & Target Audience

* **Brand Name:** `Lyxis` (`LYXIS`)
* **Core Function:** Standardized diagnostic assessment simulating the official paper-based TOEFL ITP® Level 1 format in an institutional computer-based environment.
* **Target Audience:**
  1. **Scholarship Candidates:** Minimum cutoff scores (475, 500, 550+) for global funding programs (Fulbright, Chevening, AAS, DAAD, LPDP).
  2. **University Students:** Degree clearance and thesis/dissertation defense prerequisites (450–500).
  3. **Corporate & Public Sector:** Standardized institutional recruitment and promotional criteria.

---

## 2. Active Design System Tokens

### A. Color Palette
| Token | Name | HEX | HSL | Applied In |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas** | Obsidian Basalt | `#07090E` | `hsl(224, 71%, 4%)` | App background, exam console |
| **Primary** | Prussian Cobalt | `#1D4ED8` | `hsl(221, 83%, 53%)` | Primary buttons, active tabs, selected answers |
| **Text** | Pure Alabaster | `#F8FAFC` | `hsl(210, 40%, 98%)` | High-contrast copy and headings |
| **Success** | Verdigris Emerald | `#059669` | `hsl(160, 84%, 39%)` | Score qualification, verified credentials, QR tokens |
| **Border** | Slate Graphite | `#1E293B` | `hsl(217, 33%, 17%)` | Dividers, card borders, table outlines |

### B. Typography Hierarchy
Configured in `src/app/layout.tsx`:
* **Instrument Sans** (`--font-instrument-sans`): Headings, navigation, buttons, and UI controls.
* **Newsreader** (`--font-newsreader`): Reading comprehension stimulus passages and certificate body.
* **Geist Mono** (`--font-geist-mono`): Countdown timers, score values (310–677), and cryptographic verification hashes.

---

## 3. Examination Specification (Form A)

* **Total Duration:** 115 Minutes (Strict independent section countdown timers)
* **Total Questions:** 140 Items
* **Scoring Doctrine:** Zero-penalty (no negative deduction for incorrect answers)

| Section | Title | Questions | Duration | Rules |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Listening Comprehension | 50 items | 35 mins | Single-play audio stream; strictly no pause or replay |
| **2** | Structure & Written Expression | 40 items | 25 mins | 15 sentence completion + 25 error identification |
| **3** | Reading Comprehension | 50 items | 55 mins | 5 academic passages, 10 questions per passage |

### Psychometric Scoring Formula
$$\text{Final Score} = \left\lfloor \left( \frac{\text{Scaled}_L(R_L) + \text{Scaled}_S(R_S) + \text{Scaled}_R(R_R)}{3} \right) \times 10 + 0.5 \right\rfloor$$

* **Score Scale:** 310 – 677
* **CEFR Bands:** **C1** (≥ 627) │ **B2** (543–626) │ **B1** (460–542) │ **A2** (< 460)

---

## 4. Candidate Lifecycle & State Machine

```
[ NOT_STARTED ] ──> startExamAction() ──> [ IN_PROGRESS ]
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 │                                                             │
         Manual Submission                                              Timer Expiry
                 │                                                             │
                 ▼                                                             ▼
         submitExamAction()                                             submitExamAction()
                 │                                                             │
                 └──────────────────────────────┬──────────────────────────────┘
                                                ▼
                                         [ SUBMITTED ]
                                                │
                                                ▼
                                    Issued Certificate & QR
```

### Server Actions (`src/actions/exam.ts`)
* `startExamAction(input)`: Initializes `ExamAttempt`, binds start time, generates secure session.
* `saveAnswerAction(input)`: Persists selected answers (`A`, `B`, `C`, `D`) and question review flags.
* `submitExamAction(input)`: Runs psychometric engine, writes final score, and generates cryptographic certificate.

---

## 5. Security, Integrity & Anti-Cheat Architecture

### A. Automated Anti-Cheat Protocols
1. **Hardware & Environment Lockdown:**
   * **Enforced Fullscreen (Kiosk Mode):** Compulsory fullscreen state; auto-submits/flags if candidate exits or minimizes window.
   * **Dual-Monitor Detection:** Blocks external displays (`window.screen.isExtended`) to eliminate secondary screen mirroring.
   * **Clipboard & Key Lockdown:** Hardware neutralization of `Ctrl+C`, `Ctrl+V`, `Right Click`, text selection, and `F12 / DevTools`.
2. **Visual & AI Optical Proctoring (Webcam):**
   * **Identity Verification:** Pre-test candidate photo match against registered profile.
   * **Continuous Face Tracking:** Automated flags for "Multiple Faces" (proxy/joki detection) and "No Face Detected" (candidate absence).
   * **Gaze & Eye Tracking:** Flags prolonged off-screen downward or lateral gaze (suspected mobile phone or cheat sheet usage).
3. **Acoustic Surveillance (Microphone):**
   * **Voice Activity Detection (VAD):** Identifies whispering, background speech, or dictation during silent examination sections.
4. **Psychometric & Latency Forensics:**
   * **Item-Time Latency Analysis:** Flags abnormal sub-second answers on dense reading passages (indicates leaked answer keys).
   * **Single-Play Audio Monogamy:** Listening audio streams play strictly once; pause, scrub, and replay controls are disabled.
   * **Server-Authoritative Clock:** Countdown evaluated server-side (`expiresAt - now()`) to defeat client OS clock tampering.
   * **Single-Session Concurrency Lock:** One active test session per candidate; simultaneous logins are terminated immediately.
   * **Dynamic Option Shuffling:** Randomizes answer choice order (A, B, C, D) per candidate attempt to eliminate peer copying.
5. **Advanced Threat & Anti-Bypass Protections:**
   * **Virtual Machine & Sandbox Detection:** Blocks execution inside virtualized environments (VMware, VirtualBox) via WebGL renderer inspection.
   * **Remote Desktop Detection:** Identifies active screen-sharing and remote control software (TeamViewer, AnyDesk, WebRTC streams).
   * **Forensic Steganographic Watermarking:** Embeds invisible candidate ID zero-width tokens in question text to trace leaked photos.
   * **IP Geo-Velocity Anomaly:** Flags impossible geographic location shifts during active examination attempts.

### B. Verification & Credential Authenticity
* **Audit Telemetry Log:** Real-time tracking of tab-switching, window-blur, and focus loss events.
* **Integrity Trust Index (0–100%):** Automated honesty rating appended to administrative attempt records.
* **Cryptographic Signature:** Every certificate is sealed with an HMAC-SHA256 signature:
  `HMAC_SHA256(attemptId | candidateName | totalScore | cefrLevel | issuedAt, SecretKey)`
* **Public QR Verification:** Real-time validation at `/verify/[token]` using `crypto.timingSafeEqual` with strict buffer length guards.

---

## 6. Implementation Phasing & Roadmap

### Phase 1: Initial Core Release (Active — v1.0)
Fokus murni pada berfungsinya **Alur Utama (Happy Path)** dari awal sampai akhir tanpa hambatan:
1. **Candidate Onboarding:** Pendaftaran mudah nama & email di `/register` atau `/login` $\to$ masuk `/dashboard`.
2. **Session Launcher:** Klik *"Start Assessment"* $\to$ sesi ujian aktif terbuat di server $\to$ dialihkan ke `/exam/[attemptId]`.
3. **CBT Testing Engine:**
   * Tampil 140 soal dalam 3 seksi (Listening 50, Structure 40, Reading 50).
   * Audio seksi Listening dapat di-stream dan diputar.
   * Pemilihan opsi A, B, C, D otomatis tersimpan ke server (*optimistic auto-save*).
   * Timer hitung mundur seksi berjalan independen.
4. **Automated Psychometric Scoring:**
   * Tombol *"Submit"* (atau saat timer habis) langsung mengeksekusi engine skoring ETS.
   * Menghasilkan nilai terkalibrasi **310 – 677** dan peringkat CEFR (**A2 – C1**).
5. **Score Report & Credential Verification:**
   * Kandidat melihat rincian nilai dan sertifikat di `/result/[attemptId]`.
   * Sertifikat digital memiliki nomor seri dan QR code valid yang terverifikasi publik di `/verify/[token]`.

### Phase 2: Enhanced AI Proctoring (Roadmap — v2.0)
Peningkatan lapisan keamanan ketat tanpa mengubah fungsi inti:
* Enforced Kiosk Fullscreen Mode & Dual-Monitor Hardware Block.
* Automated AI Webcam Face Tracking (Multiple Faces & Candidate Absence).
* Eye/Gaze Tracking & Microphone Voice Activity Detection (VAD).
* Anti-VM & Remote Desktop Detection.
* Steganographic Question Watermarking.

---

## 7. Application Architecture & Active Routes

```
src/
├── actions/              # Server Actions: startExamAction, saveAnswerAction, submitExamAction
├── app/                  # Next.js 15 App Router pages & layouts
│   ├── /                 # Landing page (Floating Nav, Hero, Bento, Flow, FAQ, CTA, Footer)
│   ├── login/            # Candidate authentication
│   ├── register/         # Candidate registration
│   ├── dashboard/        # Candidate command center & test launcher
│   ├── exam/[attemptId]/ # Secure CBT examination console
│   ├── result/[attemptId]/ # Score report & printable certificate
│   ├── verify/[token]/   # Public QR certificate verification
│   └── admin/            # Admin console: /admin, /admin/packages, /admin/attempts
├── components/           # Domain-scoped UI components
│   ├── admin/            # Sidebar, data table, metric cards, attempt charts
│   ├── auth/             # Login and register forms, auth shell
│   ├── dashboard/        # Test launcher buttons and widgets
│   ├── exam/             # Audio player, timer, question card, item matrix, anti-cheat
│   ├── landing/          # Floating nav, bento grid, 3-step flow, FAQ
│   ├── providers/        # ThemeProvider
│   ├── result/           # Certificate, radar chart, score card, breakdown
│   ├── shared/           # ThemeToggle
│   └── ui/               # 25 shadcn/ui atomic components
├── lib/                  # Core logic, database, psychometrics, Zustand store
└── types/                # Central TypeScript domain interfaces (attempt.ts, exam.ts)
```

---

## 8. Development & Quality Commands

```bash
# Start local development server
pnpm dev

# Build production bundle
pnpm build

# Execute strict TypeScript validation (0 errors required)
pnpm exec tsc --noEmit

# Execute Biome linter and formatter (0 errors required)
pnpm biome check src/
```
