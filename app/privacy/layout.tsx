import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ARCH Revenues',
  description: 'Privacy policy for ARCH Revenues.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
