import React from 'react';

const Footer: React.FC = () => {
 return (
   <footer className="bg-[#6A8270] text-white py-12">
     <div className="container mx-auto px-8">
       <div className="flex flex-col md:flex-row justify-between">
         {/* Social Media Section */}
         <div className="mb-8 md:mb-0">
           <p className="text-lg mb-4">We'd love to see you on social media</p>
           <div className="flex gap-6">
             <a href="#" className="hover:opacity-80">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z"/>
                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/>
                 <path d="M17.5 6.5h.01"/>
               </svg>
             </a>
             <a href="#" className="hover:opacity-80">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
               </svg>
             </a>
             <a href="#" className="hover:opacity-80">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                 <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
               </svg>
             </a>
             <a href="#" className="hover:opacity-80">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M22 2 11 13"/>
                 <path d="m22 2-7 20-4-9-9-4 20-7z"/>
               </svg>
             </a>
           </div>
         </div>

         {/* Navigation Sections */}
         <div className="flex gap-20">
           <div>
             <h3 className="font-semibold text-lg mb-4">More Navigation</h3>
             <ul className="space-y-2">
               <li><a href="#" className="hover:underline">Subscription</a></li>
               <li><a href="#" className="hover:underline">Vouchers</a></li>
             </ul>
           </div>

           <div>
             <h3 className="font-semibold text-lg mb-4">Activities</h3>
             <ul className="space-y-2">
               <li><a href="#" className="hover:underline">Health & Wellness</a></li>
               <li><a href="#" className="hover:underline">Cooking</a></li>
               <li><a href="#" className="hover:underline">Art & Crafts</a></li>
             </ul>
           </div>
         </div>
       </div>

       {/* Help Button */}
       <div className="flex justify-end mt-8">
         <button className="flex items-center gap-2 border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#576F5A] transition-colors">
           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
             <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
           </svg>
           Help
         </button>
       </div>
     </div>
   </footer>
 );
};

export default Footer;