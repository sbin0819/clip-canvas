import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/editor/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cliper - Dashboard',
  description: 'Cliper - Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
