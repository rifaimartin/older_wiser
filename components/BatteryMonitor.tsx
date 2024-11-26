'use client';
import { useBatteryStatus } from '@/hooks/useBatteryStatus';

export const BatteryMonitor = () => {
  useBatteryStatus();
  return null;
};