'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';

const NavbarAdmin = () => {
  const router = useRouter();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-2xl font-serif text-[#6A8270] dark:text-white">
              OLDERWISER ADMIN
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/admin/activities"
              className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270]"
            >
              Manage Activities
            </Link>
            <Link 
              href="/admin/users"
              className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270]"
            >
              Users
            </Link>
            <Link 
              href="/admin/settings"
              className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270]"
            >
              Settings
            </Link>
          </div>

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;