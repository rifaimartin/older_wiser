"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { BatteryStatus } from '@/components/BatteryStatus';
import { ProfileDropdown } from './ProfileDropdown';

interface User {
  name: string;
  email: string;
  role: string;
}

const NavbarAfterLogin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  return (
    <nav className="flex items-center relative z-10 justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      {/* Logo and Left Menu */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="group cursor-pointer">
          <div className="text-2xl font-serif text-[#6A8270] dark:text-white transition-all duration-300 hover:text-[#7c9884] dark:hover:text-gray-200">
            OLDERWISER
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {isAdmin ? (
            // Admin Navigation Links
            <>
              <Link
                href="/admin/activities"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/admin/activities' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Manage Activities
              </Link>
              <Link
                href="/admin/users"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/admin/users' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Users
              </Link>
              <Link
                href="/admin/settings"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/admin/settings' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Settings
              </Link>
            </>
          ) : (
            // Regular User Navigation Links
            <>
              <Link
                href="/categories"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/categories' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Categories
              </Link>
              <Link
                href="/explore"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/explore' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Explore
              </Link>
              <Link
                href="/activities/share"
                className={`text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors ${
                  pathname === '/activities/share' ? 'text-[#6A8270] dark:text-white font-medium' : ''
                }`}
              >
                Share
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Search Bar - Only show for regular users */}
      {!isAdmin && (
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="search"
              placeholder="Search activities..."
              className="w-full pl-3 pr-10 py-2 border-2 border-[#6A8270] dark:border-green-600 
              dark:bg-gray-800 dark:text-gray-200 rounded-full
              focus:outline-none focus:ring-2 focus:ring-[#6A8270] dark:focus:ring-green-500
              transition-all duration-200"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6A8270] 
              dark:text-white transition-colors duration-200"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      )}

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <BatteryStatus />
        <div className="dark:text-white transition-colors duration-200 ml-6">
          <DarkModeToggle />
        </div>

        {/* Notifications - Only show for regular users */}
        {!isAdmin && (
          <button className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        )}

        {/* Favorites - Only show for regular users */}
        {!isAdmin && (
          <Link 
            href="/activities/favorites"
            className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>
        )}

        {/* User Profile */}
        <div className="relative">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;