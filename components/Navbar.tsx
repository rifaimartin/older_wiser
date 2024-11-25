"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DarkModeToggle } from "./DarkModeToggle";

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/register");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
 <div className="flex items-center space-x-4 flex-grow">
   <div className="text-2xl font-serif text-[#6A8270] dark:text-white transition-colors duration-200">
     OLDERWISER
   </div>
   <div className="relative flex-grow mr-8">
     <input
       className="w-full pl-3 pr-10 py-2 border-2 border-[#6A8270] dark:border-green-600 
       dark:bg-gray-800 dark:text-gray-200 rounded-full
       focus:outline-none focus:ring-2 focus:ring-[#6A8270] dark:focus:ring-green-500
       transition-all duration-200"
     />
     <svg
       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6A8270] 
       dark:text-white transition-colors duration-200"
       width="26"
       height="26"
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
 <div className="dark:text-white transition-colors duration-200 ml-6">
   <DarkModeToggle />
 </div>
 <button
   onClick={handleLoginClick}
   className="ml-4 px-3 py-1 text-sm font-semibold text-[#6A8270] dark:text-white
   hover:text-[#7c9884] dark:hover:text-gray-300 transition-colors duration-200"
 >
   Log In
 </button>
</nav>
  );
};

export default Navbar;
