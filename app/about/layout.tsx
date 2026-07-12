import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | ARCH Revenues',
  description: 'Learn about ARCH Revenues, founded by Shivam Sharma. We build unglamorous, highly-effective outbound systems for B2B SaaS companies.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
