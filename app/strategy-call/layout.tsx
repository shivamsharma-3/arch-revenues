import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Strategy Call | ARCH Revenues',
  description: 'Book a 20-minute strategy call to see if our outbound acquisition systems are a fit for your B2B SaaS company.',
};

export default function StrategyCallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
