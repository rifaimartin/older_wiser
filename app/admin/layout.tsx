'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      router.push('/');
    }
  }, [router]);

  return (
    <ThemeProvider>
      <NavbarAdmin />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </ThemeProvider>
  );
}