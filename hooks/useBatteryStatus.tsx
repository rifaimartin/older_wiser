'use client';
import { useState, useEffect } from 'react';

export const BatteryStatus = () => {
 const [batteryInfo, setBatteryInfo] = useState<{
   level: number;
   charging: boolean;
 } | null>(null);

 useEffect(() => {
   const getBatteryInfo = async () => {
     try {
       // @ts-ignore - karena Battery API masih experimental
       const battery = await navigator.getBattery();
       
       const updateBatteryInfo = () => {
         setBatteryInfo({
           level: battery.level * 100,
           charging: battery.charging
         });
       };

       updateBatteryInfo();
       battery.addEventListener('levelchange', updateBatteryInfo);
       battery.addEventListener('chargingchange', updateBatteryInfo);

       return () => {
         battery.removeEventListener('levelchange', updateBatteryInfo);
         battery.removeEventListener('chargingchange', updateBatteryInfo);
       };
     } catch (error) {
       console.log('Battery API not supported');
     }
   };

   getBatteryInfo();
 }, []);

 if (!batteryInfo) return null;

 return (
   <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
     <div className="relative flex items-center">
       {/* Battery Icon */}
       <div className="w-8 h-4 border-2 border-current rounded-sm relative">
         {/* Battery Level */}
         <div 
           className={`absolute left-0 top-0 bottom-0 ${
             batteryInfo.level <= 20 ? 'bg-red-500' : 
             batteryInfo.level <= 50 ? 'bg-yellow-500' : 'bg-green-500'
           } transition-all duration-300`}
           style={{ width: `${batteryInfo.level}%` }}
         />
         {/* Battery Tip */}
         <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-2 bg-current rounded-r-sm"/>
       </div>
       
       {/* Charging Icon */}
       {batteryInfo.charging && (
         <div className="absolute -right-6 text-yellow-500">
           <svg 
             className="w-4 h-4" 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               strokeWidth={2} 
               d="M13 10V3L4 14h7v7l9-11h-7z"
             />
           </svg>
         </div>
       )}
     </div>
     
     {/* Battery Percentage */}
     <span className="text-sm font-medium">
       {batteryInfo.level.toFixed(0)}%
     </span>
   </div>
 );
};

export default BatteryStatus;