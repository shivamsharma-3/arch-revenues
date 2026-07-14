import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Pilot | ARCH Revenues',
  description: 'Learn about our performance pilot program for B2B SaaS companies.',
};

export default function PerformancePilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
