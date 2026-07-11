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
  title: "ARCH Revenues | Outbound Systems",
  description: "AI-driven outbound acquisition systems for B2B SaaS companies between $20K and $100K MRR. Get qualified sales calls consistently.",
  alternates: {
    canonical: 'https://www.archrevenues.com',
    languages: {
      'en-US': 'https://www.archrevenues.com',
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


