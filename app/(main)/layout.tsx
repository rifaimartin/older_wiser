// app/layout.tsx
'use client';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import NavbarAfterLogin from "@/components/NavbarAfterLogin";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/contexts/ThemeContext';
// import { BatteryMonitor } from '@/components/BatteryMonitor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <>
      <ThemeProvider>
        {/* <BatteryMonitor /> */}
        {isAuthPage ? (
          <main className="relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-200">
            {children}
          </main>
        ) : (
          <>
            {token ? <NavbarAfterLogin /> : <Navbar />}
            <main className="relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-200">
              {children}
            </main>
            <Footer />
          </>
        )}
      </ThemeProvider>
    </>
  );
}