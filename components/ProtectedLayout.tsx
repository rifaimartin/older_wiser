'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAfterLogin from './NavbarAfterLogin';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div>
      <NavbarAfterLogin />
      <main>{children}</main>
    </div>
  );
};

export default ProtectedLayout;