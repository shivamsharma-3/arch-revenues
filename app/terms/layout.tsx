import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ARCH Revenues',
  description: 'Terms of service for ARCH Revenues.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
