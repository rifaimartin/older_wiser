'use client';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import NavbarAfterLogin from "@/components/NavbarAfterLogin";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const pathname = usePathname();
 const isAuthPage = pathname.startsWith('/auth');
 const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

 return (
   <html lang="en">
     <body>
       <ThemeProvider>
         {isAuthPage ? (
           // Auth pages (login/register) - no navbar
           <main className="relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-200">
             {children}
           </main>
         ) : (
           // Regular pages - show navbar based on auth state
           <>
             {token ? <NavbarAfterLogin /> : <Navbar />}
             <main className="relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-200">
               {children}
             </main>
             <Footer />
           </>
         )}
       </ThemeProvider>
     </body>
   </html>
 );
}