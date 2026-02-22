import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Chatbot } from '@/components/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'ARCH Revenues | Outbound Acquisition Systems for Web Design Agencies',
  description: 'We build and operate outbound acquisition systems exclusively for web design agencies. Get consistent, qualified sales calls without learning cold email or hiring a full-time SDR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white" suppressHydrationWarning>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
