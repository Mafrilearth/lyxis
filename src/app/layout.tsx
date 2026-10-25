import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lyxis — CBT Platform for TOEFL ITP® Prediction",
    template: "%s | Lyxis",
  },
  description:
    "Independent Computer-Based Testing (CBT) platform for TOEFL ITP® score prediction. Diagnostic simulation of Listening (50 items), Structure (40 items), and Reading (50 items) using ETS scaled scoring (310–677) and CEFR proficiency mapping under Nominative Fair Use principles.",
  applicationName: "Lyxis",
  category: "Educational Assessment",
  classification: "Computer-Based Testing (CBT) & TOEFL ITP Prediction",
  keywords: [
    "Lyxis",
    "CBT Platform",
    "TOEFL ITP Prediction",
    "Computer-Based Testing",
    "Diagnostic Assessment",
    "ETS Scaled Score 310-677",
    "Listening Comprehension",
    "Structure and Written Expression",
    "Reading Comprehension",
    "CEFR A2 B1 B2 C1",
    "ISO/IEC 23988:2007 Guidelines",
    "Nominative Fair Use",
    "USPTO Lanham Act",
    "Diagnostic Score Report",
  ],
  authors: [{ name: "Lyxis" }],
  creator: "Lyxis",
  publisher: "Lyxis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },
  openGraph: {
    title: "Lyxis — CBT Platform for TOEFL ITP® Prediction",
    description:
      "Independent Computer-Based Testing (CBT) platform for TOEFL ITP® score prediction. Diagnostic simulation of Listening, Structure, and Reading sections using ETS scaled scoring (310–677) and CEFR proficiency mapping.",
    siteName: "Lyxis",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyxis — CBT Platform for TOEFL ITP® Prediction",
    description:
      "Independent Computer-Based Testing (CBT) platform for TOEFL ITP® score prediction. Diagnostic simulation of Listening, Structure, and Reading sections using ETS scaled scoring (310–677) and CEFR proficiency mapping.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "cbt-delivery-guidelines": "ISO/IEC 23988:2007 (Computer-Based Assessment Delivery)",
    "psychometrics-scoring": "ETS TOEFL ITP Metric (140 Items, 310-677 Scaled Score)",
    "proficiency-framework": "Council of Europe CEFR (A2, B1, B2, C1)",
    "legal-doctrine": "USPTO Lanham Act § 33(b)(4) / 15 U.S.C. § 1115(b)(4) Nominative Fair Use",
    "trademark-disclaimer":
      "TOEFL and TOEFL ITP are registered trademarks of Educational Testing Service (ETS). Lyxis is an independent diagnostic simulation platform and is not affiliated with, endorsed, or approved by ETS.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://lyxis.mafrilearth.com/#webapp",
      name: "Lyxis — CBT Platform for TOEFL ITP® Prediction",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires modern web browser with HTML5 Audio and JavaScript enabled",
      isAccessibleForFree: true,
      description:
        "Independent diagnostic Computer-Based Testing (CBT) platform for predicting TOEFL ITP® scores across Listening, Structure, and Reading sections using official ETS psychometric scales (310–677) and CEFR levels.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://lyxis.mafrilearth.com/#organization",
      name: "Lyxis",
      url: "https://lyxis.mafrilearth.com",
      description:
        "Independent provider of Computer-Based Testing (CBT) diagnostic assessment and score prediction platforms.",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
