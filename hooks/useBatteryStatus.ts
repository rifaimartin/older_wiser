import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTheme } from '@/contexts/ThemeContext';

export const useBatteryStatus = () => {
  const { toggleDarkMode, isDarkMode } = useTheme();

  useEffect(() => {
    const checkBattery = async () => {
      try {
        // @ts-ignore - karena API masih experimental
        const battery = await navigator.getBattery();
        
        const handleBatteryChange = () => {
          const batteryLevel = battery.level * 100;

          // Log battery status
          console.log('🔋 Battery Status:', {
            level: `${batteryLevel.toFixed(2)}%`,
            charging: battery.charging ? 'Plugged In' : 'Unplugged',
            chargingTime: battery.chargingTime === Infinity ? 
              'Calculating...' : 
              `${Math.floor(battery.chargingTime / 60)} minutes`,
            dischargingTime: battery.dischargingTime === Infinity ? 
              'Calculating...' : 
              `${Math.floor(battery.dischargingTime / 60)} minutes`,
            timestamp: new Date().toLocaleTimeString()
          });
          
          if (batteryLevel <= 20 && !isDarkMode) {
            Swal.fire({
              title: 'Battery Low!',
              text: 'Your battery is below 20%. Would you like to enable dark mode to save battery?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#6A8270',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, enable dark mode!',
              background: isDarkMode ? '#1a1a1a' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }).then((result) => {
              if (result.isConfirmed) {
                toggleDarkMode();
                Swal.fire({
                  title: 'Dark Mode Enabled!',
                  text: 'Dark mode has been enabled to help save your battery.',
                  icon: 'success',
                  confirmButtonColor: '#6A8270',
                  background: '#1a1a1a',
                  color: '#fff'
                });
              }
            });
          }
        };

        // Check initial battery level
        handleBatteryChange();

        // Listen for battery level changes
        battery.addEventListener('levelchange', handleBatteryChange);

        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange);
        };
      } catch (error) {
        console.log('Battery Status API not supported');
      }
    };

    checkBattery();
  }, [isDarkMode, toggleDarkMode]);
};