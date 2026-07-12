import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get an Audit | ARCH Revenues',
  description: 'Request a free, no-fluff outbound audit for your B2B SaaS company. We review your current pipeline and identify missing systems.',
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
