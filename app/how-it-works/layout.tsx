import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | ARCH Revenues',
  description: 'Discover our process: from mapping your ICP and building infrastructure to launching personalized AI-driven outbound campaigns that book demos.',
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
