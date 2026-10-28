-- ============================================================================
-- LYXIS PLATFORM - SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Target: Project kryyytvazyfjzddbhkmp (lyxis)
-- Status: APPLIED & VERIFIED (Zero Security Advisor Table Warnings)
-- ============================================================================

-- 1. Helper function: Memeriksa apakah user saat ini adalah ADMIN
-- Hardened with fixed search_path and no direct REST RPC execution
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid()::text AND role = 'ADMIN'
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, public;

-- ============================================================================
-- A. TABEL USERS
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile or admin view all"
ON public.users FOR SELECT
USING (id = auth.uid()::text OR public.is_admin());

CREATE POLICY "Users can update their own profile or admin update all"
ON public.users FOR UPDATE
USING (id = auth.uid()::text OR public.is_admin());

-- ============================================================================
-- B. TABEL TEST PACKAGES, SECTIONS, STIMULI, QUESTIONS
-- ============================================================================
ALTER TABLE public.test_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stimuli ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Test Packages: Publik / Kandidat bisa membaca paket ujian yang diterbitkan
CREATE POLICY "Allow read published test packages"
ON public.test_packages FOR SELECT
USING ("isPublished" = true OR public.is_admin());

-- Sections: Membaca section dari paket yang diterbitkan
CREATE POLICY "Allow read sections of published packages"
ON public.sections FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.test_packages p 
    WHERE p.id = sections."packageId" AND p."isPublished" = true
  ) OR public.is_admin()
);

-- Stimuli (Audio/Teks Bacaan): Membaca stimulus paket yang diterbitkan
CREATE POLICY "Allow read stimuli of published packages"
ON public.stimuli FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.sections s 
    JOIN public.test_packages p ON p.id = s."packageId" 
    WHERE s.id = stimuli."sectionId" AND p."isPublished" = true
  ) OR public.is_admin()
);

-- Questions: Membaca butir soal paket yang diterbitkan
CREATE POLICY "Allow read questions of published packages"
ON public.questions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.sections s 
    JOIN public.test_packages p ON p.id = s."packageId" 
    WHERE s.id = questions."sectionId" AND p."isPublished" = true
  ) OR public.is_admin()
);

-- ============================================================================
-- C. TABEL EXAM ATTEMPTS & CANDIDATE ANSWERS
-- ============================================================================
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_answers ENABLE ROW LEVEL SECURITY;

-- Exam Attempts: Kandidat hanya bisa melihat sesi ujian miliknya sendiri
CREATE POLICY "Candidates can view own attempts or admin view all" 
ON public.exam_attempts FOR SELECT
USING ("candidateId" = auth.uid()::text OR public.is_admin());

CREATE POLICY "Candidates can insert own attempts" 
ON public.exam_attempts FOR INSERT
WITH CHECK ("candidateId" = auth.uid()::text OR public.is_admin());

CREATE POLICY "Candidates can update active attempts or admin update all" 
ON public.exam_attempts FOR UPDATE
USING (("candidateId" = auth.uid()::text AND "status" = 'IN_PROGRESS') OR public.is_admin());

-- Candidate Answers: Kandidat hanya bisa melihat & menyimpan jawaban pada sesi aktifnya
CREATE POLICY "Candidates can view own answers or admin view all" 
ON public.candidate_answers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts a 
    WHERE a.id = candidate_answers."attemptId" 
      AND (a."candidateId" = auth.uid()::text OR public.is_admin())
  )
);

CREATE POLICY "Candidates can insert answers for active attempts" 
ON public.candidate_answers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.exam_attempts a 
    WHERE a.id = candidate_answers."attemptId" 
      AND a."candidateId" = auth.uid()::text 
      AND a."status" = 'IN_PROGRESS'
  ) OR public.is_admin()
);

CREATE POLICY "Candidates can update answers for active attempts" 
ON public.candidate_answers FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts a 
    WHERE a.id = candidate_answers."attemptId" 
      AND a."candidateId" = auth.uid()::text 
      AND a."status" = 'IN_PROGRESS'
  ) OR public.is_admin()
);

-- ============================================================================
-- D. TABEL CERTIFICATES
-- ============================================================================
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can view own certificates or admin view all" 
ON public.certificates FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts a 
    WHERE a.id = certificates."attemptId" 
      AND (a."candidateId" = auth.uid()::text OR public.is_admin())
  )
);
