import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Provider from './Provider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Andreas Sujono ~ Tech Enabler',
  description:
    'living in Singapore working as a Full Stack Engineer at Native Finance. I have 6+ years of working experience as a full time, part time, and freelancer in more than 7 different companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
