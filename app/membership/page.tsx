'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '@/constants';

const membershipPlans = [
 {
   id: 'premium',
   name: 'Premium',
   price: '150.000',
   duration: '1 Month',
   features: [
     'Unlock more exciting activities',
     'Gain more points from finishing activities',
     'Claim points to get Exclusive Voucher',
     'Upgrade your "Member" badges',
     'Priority support'
   ],
   color: 'bg-gradient-to-br from-purple-600 to-blue-500'
 },
 {
   id: 'gold',
   name: 'Gold',
   price: '399.000', 
   duration: '3 Months',
   features: [
     'All Premium features',
     'Exclusive activities access',
     'Double points from activities',
     'Premium badges',
     'Dedicated support',
     'No ads'
   ],
   color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
 }
];

export default function MembershipPage() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);

 const handleUpgrade = async (planId: string) => {
   try {
     setIsLoading(true);
     const token = localStorage.getItem('token');

     // Get expiry date based on plan
     const expiryDate = new Date();
     if (planId === 'gold') {
       expiryDate.setMonth(expiryDate.getMonth() + 3);
     } else {
       expiryDate.setMonth(expiryDate.getMonth() + 1);
     }

     const response = await fetch(`${API_BASE_URL}/auth/upgrade-membership`, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         membershipLevel: planId,
         membershipExpiry: expiryDate
       })
     });

     if (!response.ok) {
       throw new Error('Failed to upgrade membership');
     }

     const data = await response.json();

     // Update local storage
     const userData = localStorage.getItem('user');
     if (userData) {
       const user = JSON.parse(userData);
       user.membershipLevel = planId;
       user.membershipExpiry = expiryDate;
       localStorage.setItem('user', JSON.stringify(user));
     }

     await Swal.fire({
       icon: 'success',
       title: 'Upgrade Successful!',
       text: `You are now a ${planId === 'gold' ? 'Gold' : 'Premium'} member!`,
       confirmButtonColor: '#6A8270'
     });

     router.push('/');

   } catch (error) {
     console.error('Error upgrading membership:', error);
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Failed to upgrade membership. Please try again.',
       confirmButtonColor: '#6A8270'
     });
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <div className="max-w-7xl mx-auto px-4 py-12">
     <h1 className="text-3xl font-bold text-center mb-2">Upgrade Your Membership</h1>
     <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
       Choose the plan that best suits your needs
     </p>

     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
       {membershipPlans.map((plan) => (
         <div 
           key={plan.id}
           className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
         >
           {/* Header */}
           <div className={`${plan.color} p-6 text-white`}>
             <h2 className="text-2xl font-bold">{plan.name}</h2>
             <div className="mt-4">
               <span className="text-3xl font-bold">Rp {plan.price}</span>
               <span className="text-sm opacity-80">/{plan.duration}</span>
             </div>
           </div>

           {/* Features */}
           <div className="p-6">
             <ul className="space-y-4">
               {plan.features.map((feature, index) => (
                 <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                   <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                   {feature}
                 </li>
               ))}
             </ul>

             <button
               onClick={() => handleUpgrade(plan.id)}
               disabled={isLoading}
               className={`mt-8 w-full py-3 px-6 rounded-full text-white font-semibold
               ${plan.color} hover:opacity-90 transition-opacity disabled:opacity-50`}
             >
               {isLoading ? 'Processing...' : `Upgrade to ${plan.name}`}
             </button>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}