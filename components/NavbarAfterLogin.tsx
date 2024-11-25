'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DarkModeToggle } from './DarkModeToggle';

const NavbarAfterLogin = () => {
  const router = useRouter();
  
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      {/* Logo and Left Menu */}
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-serif text-[#6A8270] dark:text-white">
          OLDERWISER
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/categories" className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
            Categories
          </Link>
          <Link href="/explore" className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
            Explore
          </Link>
          <Link href="/share" className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
            Share
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
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

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        
        {/* Notifications */}
        <button className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Favorites */}
        <button className="text-gray-600 dark:text-gray-200 hover:text-[#6A8270] transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-200">Kalea</span>
          <img 
            src="https://static.vecteezy.com/system/resources/previews/010/964/616/original/avatar-old-woman-free-vector.jpg" 
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;