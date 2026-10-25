# **LYXIS — OFFICIAL PRODUCTION TECH STACK & SYSTEM SPECIFICATION**

> **Platform:** LYXIS — CBT Platform for TOEFL ITP® Prediction  
> **Status:** `LOCKED & OFFICIAL`  
> **Standard:** ISO/IEC 23988:2007 │ ETS TOEFL ITP Benchmark (310–677) │ W3C WCAG 2.2 AAA  
> **OpEx Target:** $0 / Month (Generous Enterprise-Grade Free Tiers)

---

## **1. Core Runtime & Language Engine**

| Layer               | Technology               | Version  | Justification & Standard                                                                              |
| :------------------ | :----------------------- | :------- | :---------------------------------------------------------------------------------------------------- |
| **Framework**       | **Next.js (App Router)** | `16.4.x` | React Server Components (RSC) to prevent answer key leakage; serverless API routes; Turbopack engine. |
| **Language**        | **TypeScript**           | `5.9.x`  | Strict type safety across database schemas, 140 question models, scoring formulas, and client state.  |
| **UI Library**      | **React**                | `19.x`   | Server Actions, React Compiler, Suspense streaming boundaries.                                        |
| **Package Manager** | **pnpm**                 | `12.x`   | Hard-link content-addressable storage, instant installs, zero phantom dependencies.                   |

---

## **2. Persistence, Database, Auth & Storage (All-in-One Cloud)**

| Service Layer      | Provider                          | Free Tier Quota ($0)         | Operational Function                                                                      |
| :----------------- | :-------------------------------- | :--------------------------- | :---------------------------------------------------------------------------------------- |
| **Database**       | **Supabase (PostgreSQL 15+)**     | 500 MB Storage               | Stores 140 TOEFL items, candidate attempt logs, raw & scaled scores, audit trail.         |
| **ORM**            | **Prisma ORM** (`@prisma/client`) | Open Source                  | Type-safe declarative schema, automated SQL migrations, Prisma Studio visual DB GUI.      |
| **Audio File CDN** | **Supabase Storage**              | 1 GB Storage, 5 GB Bandwidth | Houses compressed listening audio files (.mp3, 64kbps CBR) distributed via global CDN.    |
| **Authentication** | **Supabase Auth**                 | 50,000 MAU                   | Administrator role-based login (`ADMIN`), candidate session initialization (`CANDIDATE`). |

---

## **3. Frontend State, Forms, Validation & Audio**

| Functionality            | Standard Library                        | Version        | Technical Justification                                                                       |
| :----------------------- | :-------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| **Form Management**      | **React Hook Form** (`react-hook-form`) | `^7.54.x`      | Uncontrolled form inputs; zero re-renders; microsecond response for candidate inputs.         |
| **Schema Validation**    | **Zod** (`zod`)                         | `^3.24.x`      | Runtime validation for candidate registration, API payloads, and environment variables.       |
| **Form Resolver**        | **@hookform/resolvers**                 | `^3.10.x`      | Seamless bridging of Zod schemas into React Hook Form errors and state.                       |
| **Client State Machine** | **Zustand** (`zustand`)                 | `^5.0.x`       | Ultra-light (<1kB) store for CBT Exam State (Timer, 1–50 Item Matrix, Answers, Offline Sync). |
| **Storage Persistence**  | **Zustand Persist Middleware**          | Native         | Automatic hydration and sync to browser `localStorage` for crash & refresh resilience.        |
| **Audio Sub-Engine**     | **HTML5 Audio / Web Audio API**         | Native Web API | Single-play lock, zero scrub/fast-forward, hardware-accelerated playback.                     |
| **URL State Query**      | **nuqs**                                | `^2.4.x`       | Type-safe URL query parameters for section pagination and filter navigation.                  |

---

## **4. Design System, Styling & UI Primitives**

| UI Component Layer        | Library                            | Standard                                                                                |
| :------------------------ | :--------------------------------- | :-------------------------------------------------------------------------------------- |
| **CSS Utility**           | **Tailwind CSS v4**                | Hardware-accelerated CSS styling, CSS variables design tokens.                          |
| **Accessible Primitives** | **Radix UI** (`@radix-ui/react-*`) | W3C WCAG 2.2 AAA accessibility, full keyboard navigation (A/B/C/D radio group, modals). |
| **Design Components**     | **shadcn/ui**                      | Copy-paste sovereign React components (Button, Dialog, RadioGroup, Progress, Badge).    |
| **Icons**                 | **Lucide React** (`lucide-react`)  | Clean, consistent, tree-shakeable SVG icons.                                            |
| **Toasts & Feedback**     | **Sonner** (`sonner`)              | High-performance toast alerts for autosave notifications and anti-cheat blur warnings.  |

---

## **5. Transactional Communication & Verification**

| Feature                  | Tool                                        | Free Quota                                                              |
| :----------------------- | :------------------------------------------ | :---------------------------------------------------------------------- |
| **Email Dispatch**       | **Resend** (`resend`)                       | 3,000 emails/month (100/day)                                            |
| **Email Templates**      | **React Email** (`@react-email/components`) | Open Source                                                             |
| **QR Code Verification** | **qrcode.react** / SVG Generator            | Client/Server Native SVG rendering for certificate verification tokens. |

---

## **6. Quality Assurance & Verification**

| Testing Domain           | Engine         | Purpose                                                                           |
| :----------------------- | :------------- | :-------------------------------------------------------------------------------- |
| **Unit & Psychometrics** | **Vitest**     | Invariant testing for ETS 310–677 scoring formula and CEFR mapping.               |
| **End-to-End (E2E)**     | **Playwright** | Full simulation of Candidate Onboarding ➔ 3-Section CBT ➔ Certificate Generation. |
