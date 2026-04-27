import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResumeCraft — Free CV Builder | 10 Professional Templates',
  description: 'Build a professional CV in minutes. 10 distinct templates, real-time preview, PDF export. No signup, no AI, completely free. Your data never leaves your browser.',
  verification: {
    google: 'wN5o8MpN6EKYQ56Ybs-1nu9qXoV_m9WDv4xCWBtWXu0',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
