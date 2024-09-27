import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white ">
      <div className="flex items-center space-x-4 flex-grow">
        {/* <div className="text-xl font-semibold text-gray-700 mr-4">OLDERWISER</div> */}
        <div className="text-2xl font-serif text-green-800 whitespace-nowrap tracking-wide">OLDERWISER</div>
        <div className="relative flex-grow ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-3 pr-10 py-2 border-2  border-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-800"
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
      <button className="ml-4 px-3 py-1 text-sm font-semibold text-black hover:text-gray-800">Log In</button>
    </nav>
  );
};

export default Navbar;