import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Pilot | ARCH Revenues',
  description: 'Learn about our Performance Pilot program — done-for-you outbound for founder-led agencies.',
};

export default function PerformancePilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
