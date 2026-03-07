import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ARCH Revenues | Outbound Acquisition Systems for B2B Agencies",
  description:
    "We build and operate outbound acquisition systems exclusively for B2B agencies. Get consistent, qualified sales calls without learning cold email or hiring a full-time SDR.",
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
    "url": "https://archrevenues.com",
    "description": "We build and operate outbound acquisition systems exclusively for B2B agencies.",
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
        className="font-sans bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white"
        suppressHydrationWarning
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}


