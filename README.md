# **LYXIS — CBT Platform for TOEFL ITP® Prediction**

> **Status:** `LOCKED & OFFICIAL`  
> **Brand Name:** **`LYXIS`** *(Fanciful Mark derived from Lexis, Phonetic: [LEK-sis])*  
> **Official Brand Descriptor:** **`CBT Platform for TOEFL ITP® Prediction`**  
> **Standards:** `ISO/IEC 23988:2007` │ `ETS TOEFL ITP® Benchmark (310–677)` │ `USPTO Nominative Fair Use` │ `W3C WCAG 2.2 AAA` │ `CEFR (A2–C1)`

---

## **1. Official Production Tech Stack (Definitive Specification)**

All technologies are strictly selected from the official, modern, high-performance Next.js/React ecosystem with $0 OpEx and high-capacity free limits:

| Layer / Requirement       | Technology / Tool             | Version / Engine       | Operational Purpose                                                                      |
| :------------------------ | :---------------------------- | :--------------------- | :--------------------------------------------------------------------------------------- |
| **Framework & Engine**    | **Next.js (App Router)**      | `16.4.x`               | React Server Components (RSC) to prevent answer key leaks, Server Actions, Turbopack.    |
| **Language**              | **TypeScript**                | `5.9.x`                | Strict end-to-end type safety for 140 TOEFL items, psychometrics algorithms, and state.  |
| **UI Library**            | **React**                     | `19.x`                 | Modern component architecture, Suspense streaming boundaries.                            |
| **Database (BaaS)**       | **Supabase (PostgreSQL 15+)** | Cloud Serverless       | 500 MB free storage; stores questions, attempts, answers, audit logs.                    |
| **ORM**                   | **Prisma ORM**                | `@prisma/client`       | Type-safe declarative database modeling, automatic SQL migrations, Prisma Studio UI.     |
| **Audio CDN Storage**     | **Supabase Storage**          | Global Edge CDN        | 1 GB free storage for TOEFL Section 1 listening audio tracks (.mp3).                     |
| **Authentication**        | **Supabase Auth**             | Native RBAC            | 50,000 free MAU; handles `ADMIN` back-office and `CANDIDATE` session tokens.             |
| **Form Management**       | **React Hook Form**           | `^7.54.x`              | Uncontrolled form inputs, zero re-renders, ultra-fast candidate input response.          |
| **Schema Validation**     | **Zod**                       | `^3.24.x`              | Runtime schema validation for candidate forms, API inputs, and environment variables.    |
| **Form-Schema Bridge**    | **@hookform/resolvers**       | `^3.10.x`              | Seamless Zod resolver binding to React Hook Form.                                        |
| **Client State Machine**  | **Zustand**                   | `^5.0.x`               | Ultra-light (<1kB) CBT state store (Timer, 1–50 matrix, offline answer sync queue).      |
| **Local Persistence**     | **Zustand Persist**           | `localStorage`         | Offline-first crash and refresh tolerance (anti-data loss).                              |
| **Styling Engine**        | **Tailwind CSS v4**           | `@tailwindcss/postcss` | High-performance CSS utility styling with CSS variable design tokens.                    |
| **Accessible Primitives** | **Radix UI**                  | `@radix-ui/react-*`    | W3C WCAG 2.2 AAA accessibility, keyboard navigation (A/B/C/D option selectors, dialogs). |
| **UI Component System**   | **shadcn/ui**                 | Sovereign / Tailwind   | Unstyled, copy-paste sovereign React components (Button, Dialog, RadioGroup, Badge).     |
| **Iconography**           | **Lucide React**              | `lucide-react`         | Tree-shakeable, lightweight SVG icon system.                                             |
| **Toasts & Feedback**     | **Sonner**                    | `sonner`               | Toast feedback for autosave status, anti-cheat tab-switch alerts, network reconnection.  |
| **Audio Player Engine**   | **Web Audio API**             | Native Browser         | Single-playback lock, zero-scrubbing guard emulating official TOEFL conditions.          |
| **URL Query State**       | **nuqs**                      | `^2.4.x`               | Type-safe URL query parameters for section pagination.                                   |
| **Email Delivery**        | **Resend**                    | `resend` SDK           | 3,000 free emails/month for sending diagnostic score dossiers.                           |
| **Email Templates**       | **React Email**               | `@react-email/*`       | Component-based pixel-perfect email certificate layout.                                  |
| **Testing Engine**        | **Vitest**                    | `vitest`               | Unit & psychometrics testing for ETS scale invariants (310–677) and CEFR mapping.        |

---

## **2. Core CBT Workflow**

1. **Candidate Onboarding (`/`):** Friction-free name & email registration with instant session initialization.
2. **CBT Exam Engine (`/exam/[attemptId]`):** Full-screen, sequential section gating (Listening ➔ Structure ➔ Reading), server-authoritative timer, item navigator matrix (Grid 1–50), anti-cheat tab-switch detection, zero-latency local autosave.
3. **Diagnostic Dossier & Certificate (`/result/[attemptId]`):** Instant scaled score computation, radar sectional performance, CEFR benchmark, verifiable token, and printable PDF dossier.

---

## **3. Local Development**

```bash
# Install dependencies
pnpm install

# Run local development server
pnpm dev --port 3000
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
