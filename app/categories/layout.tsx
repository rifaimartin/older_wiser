import NavbarAfterLogin from "@/components/NavbarAfterLogin";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <NavbarAfterLogin />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-200">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}