import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";

import { Analytics } from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: '%s | ARCH Revenues',
    default: 'ARCH Revenues | Outbound Systems for B2B SaaS',
  },
  description: "AI-driven outbound acquisition systems for B2B SaaS companies between $20K and $100K MRR. Get qualified sales calls consistently.",
  alternates: {
    canonical: 'https://www.archrevenues.com',
    languages: {
      'en-US': 'https://www.archrevenues.com',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.archrevenues.com',
    title: 'ARCH Revenues | Outbound Systems for B2B SaaS',
    description: 'AI-driven outbound acquisition systems for B2B SaaS companies between $20K and $100K MRR.',
    siteName: 'ARCH Revenues',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@archrevenues',
    creator: '@shivamsharma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ARCH Revenues",
    "url": "https://www.archrevenues.com",
    "description": "AI-driven outbound acquisition systems for B2B SaaS companies between $20K and $100K MRR.",
    "founder": {
      "@type": "Person",
      "name": "Shivam Sharma",
      "jobTitle": "Founder"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "shivam@archrevenues.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/arch-revenues"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className="font-sans bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white overflow-x-hidden"
        suppressHydrationWarning
      >
        <AppWrapper>{children}</AppWrapper>
        <Analytics />
      </body>
    </html>
  );
}


