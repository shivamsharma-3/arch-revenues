import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | ARCH Revenues',
  description: 'Frequently asked questions about our outbound acquisition systems.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
