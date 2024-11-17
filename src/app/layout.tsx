'use client';

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Remove the data-cz-shortcut-listen attribute after mounting
  useEffect(() => {
    if (mounted) {
      const element = document.querySelector('[data-cz-shortcut-listen="true"]');
      if (element) {
        element.removeAttribute('data-cz-shortcut-listen');
      }
    }
  }, [mounted]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {mounted ? children : null}
      </body>
    </html>
  );
}
