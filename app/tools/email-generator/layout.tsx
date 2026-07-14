import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Cold Email Generator | ARCH Revenues',
  description: 'Enter your prospect\'s URL. We crawl their site, find their pain points, and write a personalized cold email in 60 seconds. Free.',
};

export default function EmailGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
