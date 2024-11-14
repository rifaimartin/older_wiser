'use client'
interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="space-y-8">
        {children}
      </div>
    </div>
    <div className="text-xs text-gray-500 mt-4 text-center">
      © 2024. All rights reserved
    </div>
  </div>
  );
};