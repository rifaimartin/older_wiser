"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Swal from "sweetalert2";

export const BatteryStatus = () => {
  const [batteryInfo, setBatteryInfo] = useState<{
    level: number;
    charging: boolean;
  } | null>(null);
  
  // Tambahkan state untuk tracking notifikasi
  const [hasShownNotification, setHasShownNotification] = useState(false);

  const { toggleDarkMode, isDarkMode } = useTheme();

  useEffect(() => {
    const getBatteryInfo = async () => {
      try {
        // @ts-ignore
        const battery = await navigator.getBattery();

        const updateBatteryInfo = () => {
          const level = battery.level * 100;

          console.log("🔋 Battery Status:", {
            level: `${level.toFixed(2)}%`,
            charging: battery.charging ? "Plugged In" : "Unplugged",
            chargingTime:
              battery.chargingTime === Infinity
                ? "Calculating..."
                : `${Math.floor(battery.chargingTime / 60)} minutes`,
            dischargingTime:
              battery.dischargingTime === Infinity
                ? "Calculating..."
                : `${Math.floor(battery.dischargingTime / 60)} minutes`,
            timestamp: new Date().toLocaleTimeString(),
          });

          setBatteryInfo({
            level,
            charging: battery.charging,
          });

          // Check for low battery dan belum pernah tampil notifikasi
          if (level <= 20 && !isDarkMode && !hasShownNotification) {
            setHasShownNotification(true); // Set flag bahwa notifikasi sudah ditampilkan
            
            Swal.fire({
              title: "Battery Low!",
              text: "Your battery is below 20%. Would you like to enable dark mode to save battery?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#6A8270",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, enable dark mode!",
            }).then((result) => {
              if (result.isConfirmed) {
                toggleDarkMode();
              }
            });
          }

          // Reset flag jika battery sudah di atas 20%
          if (level > 20) {
            setHasShownNotification(false);
          }
        };

        updateBatteryInfo();
        battery.addEventListener("levelchange", updateBatteryInfo);
        battery.addEventListener("chargingchange", updateBatteryInfo);

        return () => {
          battery.removeEventListener("levelchange", updateBatteryInfo);
          battery.removeEventListener("chargingchange", updateBatteryInfo);
        };
      } catch (error) {
        console.log("Battery API not supported");
      }
    };

    getBatteryInfo();
  }, [isDarkMode, toggleDarkMode, hasShownNotification]); // Tambahkan hasShownNotification ke dependencies

  if (!batteryInfo) return null;

  return (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
      <div className="relative flex items-center">
        {/* Battery Icon */}
        <div className="w-8 h-4 border-2 border-current rounded-sm relative">
          <div
            className={`absolute left-0 top-0 bottom-0 ${
              batteryInfo.level <= 20
                ? "bg-red-500"
                : batteryInfo.level <= 50
                ? "bg-yellow-500"
                : "bg-green-500"
            } transition-all duration-300`}
            style={{ width: `${batteryInfo.level}%` }}
          />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-2 bg-current rounded-r-sm" />
        </div>

        {/* Charging Icon */}
        {batteryInfo.charging && (
          <div className="absolute -right-6 text-yellow-500">
            {/* <svg
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
            </svg> */}
          </div>
        )}
      </div>

      <span className="text-sm font-medium">
        {batteryInfo.level.toFixed(0)}%
      </span>
    </div>
  );
};
