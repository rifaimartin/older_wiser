'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ProfileDropdown = () => {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const router = useRouter();
 const user = JSON.parse(localStorage.getItem('user') || '{}');

 // Close dropdown when clicking outside
 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
       setIsOpen(false);
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleLogout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   router.push('/auth/login');
 };

 return (
   <div className="relative" ref={dropdownRef}>
     {/* Profile Trigger */}
     <button 
       onClick={() => setIsOpen(!isOpen)}
       className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
     >
       <span className="text-gray-700 dark:text-gray-200">{user.name}</span>
       <div className="w-8 h-8 rounded-full bg-[#6A8270] text-white flex items-center justify-center">
         {user.name?.charAt(0).toUpperCase()}
       </div>
     </button>

     {/* Dropdown Menu */}
     {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 top-full"> {/* Tambahkan z-50 dan top-full */}
         <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
           <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
           <p className="font-medium truncate dark:text-white">{user.email}</p>
         </div>

         {/* Membership Status */}
         <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
           <div className="flex items-center space-x-2">
             <span className="text-yellow-500">👑</span>
             <span className="text-sm font-medium dark:text-white">Free Member</span>
           </div>
           <button 
             onClick={() => router.push('/membership')}
             className="mt-1 text-sm text-[#6A8270] hover:underline"
           >
             Upgrade to Premium
           </button>
         </div>

         {/* Menu Items */}
         <button 
           onClick={() => router.push('/profile/settings')}
           className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
           text-gray-700 dark:text-gray-200"
         >
           Profile Settings
         </button>
         
         <button 
           onClick={handleLogout}
           className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
           text-red-600 dark:text-red-400"
         >
           Logout
         </button>
       </div>
     )}
   </div>
 );
};

export default ProfileDropdown;