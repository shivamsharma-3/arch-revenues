import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Founder Console | ARCH Revenues',
  description: 'Private autonomous SDR command center for founder-led agencies.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBFBFC] text-zinc-900 selection:bg-teal-500 selection:text-white antialiased font-sans flex flex-col">
      {children}
    </div>
  );
}
