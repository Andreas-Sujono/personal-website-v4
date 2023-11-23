import { Metadata } from 'next';
import { Layout } from '@/@pages/UIExploration/Layout';

export const metadata: Metadata = {
  title: 'UI Exploration - by Andreas Sujono',
  description: 'UI Components by Andreas Sujonon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
