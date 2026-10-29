import { ThemeProvider } from "./_components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lyxis.mafrilearth.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#07080B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Lyxis — TOEFL Diagnostic",
    template: "%s | Lyxis",
  },
  description: "Standardized score prediction and verified credentials.",
  applicationName: "Lyxis",
  category: "Education",
  classification: "Academic Assessment",
  keywords: ["Lyxis", "TOEFL Diagnostic", "CBT", "Assessment", "CEFR"],
  authors: [{ name: "Lyxis" }],
  creator: "Lyxis",
  publisher: "Lyxis",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },
  openGraph: {
    title: "Lyxis — TOEFL Diagnostic",
    description: "Standardized score prediction and verified credentials.",
    siteName: "Lyxis",
    url: baseUrl,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lyxis — TOEFL Diagnostic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyxis — TOEFL Diagnostic",
    description: "Standardized score prediction and verified credentials.",
    images: ["/og-image.jpg"],
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
    "scoring-metric": "TOEFL ITP Standard (140 Items, 310–677 Scale)",
    "proficiency-framework": "CEFR Scale (A2, B1, B2, C1)",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${baseUrl}/#webapp`,
      name: "Lyxis — TOEFL Diagnostic",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires modern web browser with HTML5 Audio and JavaScript enabled",
      isAccessibleForFree: true,
      description: "Standardized score prediction and verified credentials.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Lyxis",
      url: baseUrl,
      logo: `${baseUrl}/icon.svg`,
      description: "Standardized score prediction and verified credentials.",
    },
    {
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who can take this diagnostic test? Is it restricted to university students?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The platform is open to all candidates worldwide preparing for scholarship applications, graduate school admissions, corporate hiring, academic faculty benchmarks, and graduation requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to schedule an appointment or reserve a testing slot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No reservation is needed. You can launch your assessment immediately at any time (24/7 on demand) directly from your candidate portal.",
          },
        },
        {
          "@type": "Question",
          name: "Can I retake the diagnostic assessment to track my score progress?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can retake the assessment at any time to monitor your score improvement across Listening, Structure, and Reading before sitting for your official test date.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if my network disconnects or my device powers down during the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every selected response is saved automatically in real time. If interrupted, simply log back into your candidate account to resume at the exact question and remaining time without data loss.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${newsreader.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
